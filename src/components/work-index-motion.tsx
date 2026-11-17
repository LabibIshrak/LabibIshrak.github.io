"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ProjectArtwork } from "./artwork";
import { type Project } from "@/lib/content";
import { useTransitionNavigate } from "./runtime";

type WorkIndexMotionProps = {
  sectionId: string;
  projects: Project[];
};

export function WorkIndexMotion({ sectionId, projects }: WorkIndexMotionProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const nav = useTransitionNavigate();
  const navRef = useRef(nav);

  useEffect(() => {
    navRef.current = nav;
  }, [nav]);

  useEffect(() => {
    const root = document.getElementById(sectionId);
    const preview = previewRef.current;

    if (!root || !preview) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(preview, "x", {
          duration: 0.3,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(preview, "y", {
          duration: 0.3,
          ease: "power3.out",
        });

        let isVisible = false;
        let lastIndex = -1;

        function hide() {
          if (!isVisible) return;
          isVisible = false;
          lastIndex = -1;
          gsap.to(preview, {
            autoAlpha: 0,
            scale: 0.93,
            duration: 0.2,
            overwrite: "auto",
          });
        }

        function move(event: PointerEvent) {
          const row = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-editorial-project]",
          );

          if (!row) {
            hide();
            return;
          }

          const index = Number(row.dataset.editorialProject);
          if (index !== lastIndex) {
            setActiveIndex(index);
            lastIndex = index;
            
            if (!isVisible) {
              isVisible = true;
              gsap.to(preview, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.25,
                overwrite: "auto",
              });
            }
          }

          // Keep the floating thumbnail inside the viewport.
          const x = gsap.utils.clamp(
            170,
            window.innerWidth - 170,
            event.clientX,
          );

          const y = gsap.utils.clamp(
            140,
            window.innerHeight - 140,
            event.clientY,
          );

          xTo(x);
          yTo(y);
        }

        root.addEventListener("pointermove", move);
        root.addEventListener("pointerleave", hide);
        root.addEventListener("click", hide);
        window.addEventListener("blur", hide);

        return () => {
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerleave", hide);
          root.removeEventListener("click", hide);
          window.removeEventListener("blur", hide);
          gsap.killTweensOf(preview);
        };
      },
    );

    // Touch screens have no hover, so a tap plays the same row animation
    // (title slides + greys, arrow nudges, artwork pops) for a beat
    // before the page curtain comes in.
    media.add(
      "(hover: none), (pointer: coarse)",
      () => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        let timer: ReturnType<typeof setTimeout> | null = null;
        let activeRow: HTMLElement | null = null;

        function onClick(event: MouseEvent) {
          const row = (event.target as HTMLElement).closest<HTMLAnchorElement>(
            "a[data-editorial-project]",
          );
          const href = row?.getAttribute("href");
          const nav = navRef.current;

          if (
            !row ||
            !href ||
            reduce ||
            !nav ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          // Take over from the link so the animation is visible first.
          event.preventDefault();
          event.stopPropagation();

          if (timer || nav.busy) return;

          activeRow = row;
          row.classList.add("is-touched");

          const art = row.querySelector(".editorial-mobile-art");
          if (art) {
            gsap.fromTo(
              art,
              { scale: 1 },
              {
                scale: 0.96,
                duration: 0.3,
                ease: "power3.out",
                yoyo: true,
                repeat: 1,
              },
            );
          }

          timer = setTimeout(() => {
            timer = null;
            void navRef.current?.navigate(href);
          }, 420);
        }

        // Clear the pressed state if the user comes back to this page.
        function reset() {
          activeRow?.classList.remove("is-touched");
          activeRow = null;
        }

        root.addEventListener("click", onClick, true);
        window.addEventListener("pageshow", reset);

        return () => {
          root.removeEventListener("click", onClick, true);
          window.removeEventListener("pageshow", reset);
          if (timer) clearTimeout(timer);
          reset();
        };
      },
    );

    return () => media.revert();
  }, [sectionId]);

  return (
    <div
      ref={previewRef}
      className="editorial-project-preview"
      aria-hidden="true"
    >
      {projects[activeIndex] && (
        <ProjectArtwork project={projects[activeIndex]} />
      )}
    </div>
  );
}
