import type { Project } from "@/lib/content";
import { SongketArtwork } from "./artwork-songket";
import { LunarArtwork } from "./artwork-lunar";
import { CalcrexArtwork } from "./artwork-calcrex";
import { BongoJatraArtwork } from "./artwork-bongojatra";

const showpieces = {
  songket: SongketArtwork,
  lunar: LunarArtwork,
  calcrex: CalcrexArtwork,
  bongojatra: BongoJatraArtwork,
} satisfies Record<Project["artwork"], (props: { title: string }) => React.ReactNode>;

export function ProjectArtwork({ project }: { project: Project }) {
  const Showpiece = showpieces[project.artwork];

  return (
    <div
      className={`project-artwork artwork-${project.artwork}`}
      style={{ backgroundColor: project.color }}
    >
      <Showpiece title={project.title} />
    </div>
  );
}
