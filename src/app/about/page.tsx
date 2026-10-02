import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TransitionLink } from "@/components/runtime";
import { AboutPageAnimations, SplitWords } from "@/components/about-page-animations";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hasin Ishrak Labib — Computer Science & Software Engineering undergraduate, full-stack developer, and AI/ML researcher based in Bangladesh.",
};

const leadText =
  "I'm Hasin Ishrak Labib, a second-year Computer Science & Software Engineering undergraduate based in Bangladesh. I build production-grade applications from the ground up and pursue research at the intersection of artificial intelligence and machine learning.";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain about-page-main">
        <Navigation />

        <AboutPageAnimations>
          <article className="about-page section-padding">
            <TransitionLink href="/" className="back-link">
              <ArrowLeft size={18} />
              Back to home
            </TransitionLink>

            <header className="about-page-header">
              <span className="eyebrow">WHO I AM</span>

              <h1 data-page-heading tabIndex={-1}>
                Labib — developer,
                <br />
                researcher, builder.
              </h1>
            </header>

            <div className="about-page-intro">
              <p className="about-page-lead">
                <SplitWords text={leadText} />
              </p>
            </div>

            <section className="about-page-details">
              <div className="about-page-block">
                <span className="eyebrow about-page-label">WHAT I DO</span>
                <p>
                  My work spans the full development cycle — from architecture
                  and system design to pixel-level interface polish. I write
                  robust C++ for performance-critical systems, build
                  cross-platform mobile experiences in Flutter, and develop
                  full-stack web applications. On the research side, I explore
                  machine learning pipelines and intelligent systems that solve
                  real-world problems.
                </p>
              </div>

              <div className="about-page-block">
                <span className="eyebrow about-page-label">HOW I THINK</span>
                <p>
                  Every project starts with a problem worth solving. I care about
                  the why before the how — understanding constraints, mapping out
                  edge cases, and choosing the simplest approach that still
                  delivers depth. Whether it&#39;s a mobile app for a real user or
                  an ML model for a research paper, the discipline is the same:
                  clarity over complexity, always.
                </p>
              </div>

              <div className="about-page-block">
                <span className="eyebrow about-page-label">BEYOND CODE</span>
                <p>
                  {profile.about}
                </p>
              </div>
            </section>

            <section className="about-page-skills">
              <span className="eyebrow about-page-label">AREAS OF FOCUS</span>
              <ul className="about-page-skill-grid">
                <li>C++ &amp; Systems Programming</li>
                <li>Flutter &amp; Cross-Platform</li>
                <li>AI / ML Research</li>
                <li>Full-Stack Development</li>
                <li>Data Structures &amp; Algorithms</li>
                <li>Systems Design</li>
                <li>Visual Experimentation</li>
                <li>Application Architecture</li>
              </ul>
            </section>

            <section className="about-page-connect">
              <span className="eyebrow about-page-label">GET IN TOUCH</span>
              <p className="about-page-connect-text">
                Interested in collaborating, discussing research, or just want to
                say hello? I&#39;m always open to new conversations.
              </p>
              {profile.email && (
                <a
                  className="about-page-email-link"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              )}
            </section>
          </article>
        </AboutPageAnimations>
      </main>

      <Footer />
    </div>
  );
}
