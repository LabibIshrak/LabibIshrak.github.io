import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProjectArtwork } from "@/components/artwork";
import { TransitionLink } from "@/components/runtime";
import { YouTubeEmbed } from "@/components/youtube-embed";
import "../work.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project?.title ?? "Project not found",
    description: project?.introduction,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const primaryLink = project.links?.[0];
  const isFull = Boolean(project.problem);

  return (
    <div className="page-shell">
      <main id="main" className="main-curtain wk-main cs-main">
        <Navigation />

        <article>
          {/* ── Title + meta ── */}
          <header className="cs-hero">
            <div className="wk-wrap is-medium">
              {project.award && (
                <p className="cs-award">
                  <span className="cs-award-dot" aria-hidden="true" />
                  {project.award}
                </p>
              )}

              <h1 className="cs-title" data-page-heading tabIndex={-1}>
                {project.title}
              </h1>

              <dl className="cs-meta">
                <div>
                  <dt>Role / Services</dt>
                  <dd>{project.role}</dd>
                  <dd>{project.technology}</dd>
                </div>
                <div>
                  <dt>Credits</dt>
                  {(project.credits ?? ["Hasin Ishrak Labib"]).map((credit) => (
                    <dd key={credit}>{credit}</dd>
                  ))}
                </div>
                <div>
                  <dt>Location &amp; year</dt>
                  <dd>
                    {project.location ?? "Bangladesh"}
                    {project.year && <> © {project.year}</>}
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          {/* ── Hero visual ── */}
          <div className="cs-visual">
            <div className="wk-wrap">
              <div className="cs-visual-inner">
                {primaryLink && (
                  <a
                    className="cs-live"
                    href={primaryLink.href}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                  >
                    <span>
                      {primaryLink.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                )}
                <div className="cs-frame">
                  <ProjectArtwork project={project} />
                </div>
              </div>
            </div>
          </div>

          {isFull ? (
            <>
              {/* ── Overview + problem ── */}
              <section className="cs-text">
                <div className="wk-wrap is-medium cs-text-grid">
                  <h2 className="cs-label">Overview</h2>
                  <p className="cs-statement">{project.introduction}</p>

                  <h2 className="cs-label">The problem</h2>
                  <p className="cs-body">{project.problem}</p>
                </div>
              </section>

              {/* ── Features ── */}
              {project.features && (
                <section className="cs-band">
                  <div className="wk-wrap">
                    <h2 className="cs-heading">How it works …</h2>
                    <div className="cs-features">
                      {project.features.map((feature, i) => (
                        <div key={feature.title} className="cs-feature">
                          <span className="cs-index">{pad(i + 1)}</span>
                          <h3>{feature.title}</h3>
                          <p>{feature.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── Stack + demo ── */}
              <section className="cs-tech">
                <div className="wk-wrap cs-tech-grid">
                  {project.stack && (
                    <div>
                      <h2 className="cs-heading">Under the hood</h2>
                      <dl className="cs-stack">
                        {project.stack.map(([label, value]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {project.video && (
                    <div className="cs-video">
                      <h2 className="cs-label">See it running</h2>
                      <div className="cs-video-frame">
                        <YouTubeEmbed id={project.video.id} title={project.video.title} />
                      </div>
                    </div>
                  )}
                </div>

                {project.links && (
                  <div className="wk-wrap cs-links">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="cs-link"
                        data-magnetic
                      >
                        <span>
                          {link.label}
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </>
          ) : (
            <section className="cs-text">
              <div className="wk-wrap is-medium cs-text-grid">
                <h2 className="cs-label">Overview</h2>
                <div>
                  <p className="cs-statement">{project.introduction}</p>
                  <ul className="cs-focus">
                    {project.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="cs-note">
                    Case study in progress: artwork is illustrative, not a
                    product screenshot.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Next case ── */}
          <nav className="cs-next" aria-label="Next project">
            <div className="wk-wrap is-medium">
              <TransitionLink
                href={`/work/${next.slug}`}
                className="cs-next-link"
                data-cursor="NEXT"
              >
                <span className="cs-label">Next case</span>
                <span className="cs-next-title">{next.title}</span>
              </TransitionLink>

              <TransitionLink href="/work" className="wk-pill cs-all" data-magnetic>
                All work<sup>{projects.length}</sup>
              </TransitionLink>
            </div>
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
}
