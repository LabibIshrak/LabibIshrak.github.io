"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ProjectArtwork } from "./artwork";
import { type Project } from "@/lib/content";

type WorkIndexMotionProps = {
  sectionId: string;
  projects: Project[];
};

export function WorkIndexMotion({ sectionId, projects }: WorkIndexMotionProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
