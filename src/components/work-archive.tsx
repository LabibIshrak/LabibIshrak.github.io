"use client";

import { useState } from "react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { projects, type ProjectKind } from "@/lib/content";
import { ProjectArtwork } from "./artwork";
import { TransitionLink } from "./runtime";
import { WorkIndexMotion } from "./work-index-motion";

const SECTION_ID = "work-archive";
const kinds: ProjectKind[] = ["Development", "Systems", "Design"];

type View = "list" | "grid";

export function WorkArchive() {
  const [filter, setFilter] = useState<ProjectKind | "All">("All");
  const [view, setView] = useState<View>("list");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.kind === filter);

  const filters: { label: ProjectKind | "All"; count: number }[] = [
    { label: "All", count: projects.length },
    ...kinds
      .map((kind) => ({
        label: kind,
        count: projects.filter((p) => p.kind === kind).length,
      }))
      .filter((f) => f.count > 0),
  ];

  return (
    <section id={SECTION_ID} className="wk-archive" data-view={view}>
      <div className="wk-wrap">
        <div className="wk-controls">
          <div className="wk-filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.label}
                type="button"
                className="wk-pill"
                aria-pressed={filter === f.label}
                onClick={() => setFilter(f.label)}
                data-magnetic
              >
                {f.label}
                {f.label !== "All" && <sup>{f.count}</sup>}
              </button>
            ))}
          </div>

          <div className="wk-views" role="group" aria-label="Layout">
            <button
              type="button"
              className="wk-view-btn"
              aria-pressed={view === "list"}
              aria-label="List view"
              onClick={() => setView("list")}
              data-magnetic
            >
              <List size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="wk-view-btn"
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              onClick={() => setView("grid")}
              data-magnetic
            >
              <LayoutGrid size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* List view (desktop) */}
        <div className="wk-list">
          <div className="wk-list-head" aria-hidden="true">
            <span>Project</span>
            <span>Type</span>
            <span>Services</span>
            <span>Year</span>
          </div>

          {visible.map((project, index) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              className="wk-row"
              data-editorial-project={index}
              data-cursor="VIEW"
            >
              <h2 className="wk-row-title">{project.title}</h2>
              <p>{project.category}</p>
              <p>{project.role}</p>
              <p>{project.year ?? "—"}</p>
            </TransitionLink>
          ))}
        </div>

        {/* Grid view (and always on phones) */}
        <div className="wk-grid">
          {visible.map((project) => (
            <TransitionLink
              key={project.slug}
              href={`/work/${project.slug}`}
              className="wk-card"
              data-cursor="VIEW"
            >
              <div className="wk-card-art">
                <ProjectArtwork project={project} />
              </div>
              <h2 className="wk-card-title">
                {project.title}
                <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
              </h2>
              <div className="wk-card-meta">
                <span>{project.role}</span>
                <span>{project.year ?? "—"}</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>

      <WorkIndexMotion sectionId={SECTION_ID} projects={visible} />
    </section>
  );
}
