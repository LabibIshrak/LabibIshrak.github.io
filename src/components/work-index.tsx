import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectArtwork } from "./artwork";
import { TransitionLink } from "./runtime";
import { WorkIndexMotion } from "./work-index-motion";

type WorkIndexProps = {
  all?: boolean;
};

export function WorkIndex({ all = false }: WorkIndexProps) {
  const visibleProjects = all ? projects : projects.slice(0, 2);

  return (
    <section
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

      <WorkIndexMotion sectionId="work" projects={visibleProjects} />
    </section>
  );
}
