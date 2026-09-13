import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectArtwork } from "@/components/artwork";
import { TransitionLink } from "@/components/runtime";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project?.title ?? "Project not found",
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="page-shell">
      <main id="main" className="main-curtain case-main">
        <Navigation />

        <article className="case-study section-padding">
          <TransitionLink href="/" className="back-link">
            <ArrowLeft size={18} /> Back to index
          </TransitionLink>

          <div className="case-heading">
            <span className="eyebrow">
              PROJECT {project.number} / CASE STUDY SCAFFOLD
            </span>

            <h1 data-page-heading tabIndex={-1}>
              {project.title}
            </h1>
          </div>

          <div className="case-metadata">
            <div>
              <span className="footer-label">ROLE</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span className="footer-label">DISCIPLINE</span>
              <p>{project.category}</p>
            </div>
            <div>
              <span className="footer-label">TECHNOLOGY</span>
              <p>{project.technology}</p>
            </div>
          </div>

          <div className="case-artwork">
            <ProjectArtwork project={project} />
          </div>

          <section className="case-overview">
            <h2>The overview.</h2>
            <div>
              <p>{project.introduction}</p>
              <ul>
                {project.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="case-disclaimer">
                This page contains illustrative artwork and case-study
                prompts, not verified product screenshots or performance
                claims.
              </p>
            </div>
          </section>

          <TransitionLink
            href={`/work/${next.slug}`}
            className="next-project"
            data-cursor="NEXT"
          >
            <span className="eyebrow">NEXT PROJECT</span>
            <span className="next-project-title">
              {next.title}
              <ArrowUpRight aria-hidden="true" />
            </span>
          </TransitionLink>
        </article>
      </main>

      <Footer />
    </div>
  );
}
