"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { projects } from "@/lib/content";
import { ProjectArtwork } from "./artwork";
import { TransitionLink } from "./runtime";

type WorkIndexProps = {
  all?: boolean;
};

export function WorkIndex({ all = false }: WorkIndexProps) {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProjects = all ? projects : projects.slice(0, 2);

  useEffect(() => {
    const root = rootRef.current;
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

        function hide() {
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

          setActiveIndex(Number(row.dataset.editorialProject));

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

          gsap.to(preview, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            overwrite: "auto",
          });
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
  }, []);

  return (
    <section
      ref={rootRef}
      id="work"
      className={`editorial-work ${all ? "editorial-work-all" : ""}`}
      aria-labelledby="editorial-work-title"
    >
      <div className="editorial-container">
        <div className="editorial-work-topline">
          <h2 id="editorial-work-title" className="editorial-label">
            {all ? "THE COMPLETE INDEX" : "RECENT WORK"}
          </h2>

          <span className="editorial-label">
            {String(visibleProjects.length).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="editorial-project-list">
          {visibleProjects.map((project, index) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              className="editorial-project-row"
              data-editorial-project={index}
              data-cursor="VIEW"
            >
              <div className="editorial-project-title">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>

              <p className="editorial-project-role">{project.role}</p>

              <ArrowUpRight
                className="editorial-project-arrow"
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <div className="editorial-mobile-art" aria-hidden="true">
                <ProjectArtwork project={project} />
              </div>
            </TransitionLink>
          ))}
        </div>

        {!all && (
          <div className="editorial-more-wrap">
            <TransitionLink
              href="/work"
              className="editorial-more-button"
              data-magnetic
              aria-label={`View all ${projects.length} projects`}
            >
              <span className="editorial-button-content">
                More work
                <sup>{projects.length}</sup>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </TransitionLink>
          </div>
        )}
      </div>

      <div
        ref={previewRef}
        className="editorial-project-preview"
        aria-hidden="true"
      >
        <ProjectArtwork project={projects[activeIndex]} />
      </div>
    </section>
  );
}
