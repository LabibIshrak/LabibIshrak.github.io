import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RotatingGlobe } from "@/components/rotating-globe";
import { AboutPageAnimations } from "@/components/about-page-animations";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hasin Ishrak Labib — Co-founder & CEO of Vantaloc, CSE undergraduate at PUST, full-stack developer, and builder based in Bangladesh.",
};

/* ─── Data ─────────────────────────────────────────────────────── */

const experiences = [
  {
    title: "Co-founder & CEO",
    company: "Vantaloc",
    logo: "/vantaloc-logo.png",
    type: "Full-time · SaaS",
    period: "2025 — Present",
    description:
      "Co-founded and lead Vantaloc — a SaaS company building websites, AI agents, custom software, and Android applications for clients. End-to-end ownership: strategy, architecture, hiring, delivery.",
    skills: ["SaaS", "AI Agents", "Next.js", "Flutter", "Android", "Leadership"],
  },
  {
    title: "Product Lead",
    company: "Mezai Tech",
    logo: "/mezai-tech-logo.png",
    type: "Part-time · Digital Services",
    period: "2025 — Present",
    description:
      "Driving product at Mezai Tech, a digital service provider. Setting roadmaps, leading cross-functional squads, and shipping digital solutions that clients actually use.",
    skills: ["Product Strategy", "Team Leadership", "Agile", "Digital Services"],
  },
];

const achievements = [
  {
    rank: "1st",
    scope: "Engineering Solution",
    title: "July Hackathon 2026",
    year: "2026",
    description:
      "Won 1st place in the Engineering Solution category and finished 4th nationally overall, competing against teams from top universities across Bangladesh.",
  },
  {
    rank: "Finalist",
    scope: "Grand final",
    title: "PSTU Hackathon 2026",
    year: "2026",
    description:
      "Reached the grand final — built and presented a full working product under pressure.",
  },
  {
    rank: "3×",
    scope: "Language & Literature",
    title: "Creative Talent Hunt",
    year: "2018 — 2021",
    description:
      "Regional Champion in Language & Literature — Bangla and English — for three consecutive years, holding the title from 2018 to 2021.",
  },
];

const education = [
  {
    degree: "B.Sc. Engineering",
    field: "Computer Science & Engineering",
    institution: "Pabna University of Science and Technology",
    period: "2024 — Present",
    location: "Pabna, Bangladesh",
    logo: "/pust-logo.png",
  },
  {
    degree: "Higher Secondary Certificate",
    field: "Science Group",
    institution: "Rajshahi College",
    period: "2021 — 2023",
    location: "Rajshahi, Bangladesh",
    logo: "/rajshahi-college-logo.svg",
  },
];

const techStacks = [
  { category: "Languages", items: ["C++", "Python", "TypeScript", "JavaScript", "Dart", "Java", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "HTML5", "CSS3", "GSAP", "Framer Motion"] },
  { category: "Mobile", items: ["Flutter", "Dart", "Firebase", "Android SDK"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
  { category: "AI / ML", items: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"] },
  { category: "Tools & DevOps", items: ["Git", "GitHub", "Docker", "Linux", "Figma", "VS Code"] },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ─── Page ──────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain about-lux-main">
        <Navigation />

        <AboutPageAnimations>
          {/* ── Hero ── */}
          <section className="ab-hero">
            <div className="ab-wrap is-medium">
              <h1 className="ab-display" data-page-heading tabIndex={-1}>
                <span className="ab-line"><span>Building real products</span></span>
                <span className="ab-line"><span>with code that ships</span></span>
              </h1>
            </div>

            <div className="ab-globe-line">
              <span className="ab-rule" data-ab-rule />
              <div className="ab-globe-badge" data-ab-globe>
                <RotatingGlobe />
              </div>
            </div>

            <div className="ab-wrap is-medium">
              <ArrowDownRight className="ab-hero-arrow" strokeWidth={1.25} aria-hidden="true" />
            </div>
          </section>

          {/* ── Intro + portrait ── */}
          <section className="ab-intro">
            <div className="ab-wrap is-medium ab-intro-grid">
              <div className="ab-intro-copy">
                <p data-ab-reveal>
                  I&apos;m a second-year Computer Science &amp; Engineering
                  undergraduate at PUST, co-founder and CEO of Vantaloc, and
                  Product Lead at Mezai Tech. I build websites, AI agents,
                  software and Android apps — and I care about the details
                  that make them feel right.
                </p>
                <p className="ab-muted" data-ab-reveal>
                  Problem solver. Always building.
                </p>

                <dl className="ab-facts" data-ab-reveal>
                  <div>
                    <dt>Role</dt>
                    <dd>Founder · Developer</dd>
                  </div>
                  <div>
                    <dt>Based in</dt>
                    <dd>Bangladesh</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd className="ab-available">
                      <span className="ab-dot" aria-hidden="true" />
                      Available for work
                    </dd>
                  </div>
                </dl>
              </div>

              <figure className="ab-portrait" data-ab-portrait>
                <div className="ab-portrait-inner">
                  <Image
                    src="/about-portrait.jpg"
                    alt="Black and white portrait of Hasin Ishrak Labib"
                    fill
                    sizes="(max-width: 760px) 92vw, 42vw"
                    className="ab-portrait-img"
                    priority
                  />
                </div>
              </figure>
            </div>
          </section>

          {/* ── Experience ── */}
          <section className="ab-band" id="experience">
            <div className="ab-wrap">
              <h2 className="ab-heading" data-ab-reveal>
                Where I&apos;m building …
              </h2>

              <div className="ab-columns is-two">
                {experiences.map((exp, i) => (
                  <article className="ab-col" key={exp.company} data-ab-reveal>
                    <h5 className="ab-index">{pad(i + 1)}</h5>
                    <div className="ab-exp-head">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={52}
                        height={52}
                        className="ab-exp-logo"
                      />
                      <div>
                        <h3 className="ab-col-title">{exp.title}</h3>
                        <p className="ab-col-sub">
                          {exp.company} <span>· {exp.type}</span>
                        </p>
                      </div>
                    </div>
                    <p className="ab-col-meta">{exp.period}</p>
                    <p className="ab-col-text">{exp.description}</p>
                    <p className="ab-col-tags">{exp.skills.join("  /  ")}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Achievements ── */}
          <section className="ab-section" id="achievements">
            <div className="ab-wrap">
              <h2 className="ab-heading" data-ab-reveal>
                Recognition
              </h2>

              <ol className="ab-columns is-three ab-awards">
                {achievements.map((ach, i) => (
                  <li className="ab-col ab-award" key={ach.title} data-ab-reveal>
                    <h5 className="ab-index">
                      <span>{pad(i + 1)}</span>
                      <span>{ach.year}</span>
                    </h5>
                    <span className="ab-award-num">{ach.rank}</span>
                    <span className="ab-award-scope">{ach.scope}</span>
                    <h3 className="ab-col-title">{ach.title}</h3>
                    <p className="ab-col-text">{ach.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Education ── */}
          <section className="ab-section is-tight" id="education">
            <div className="ab-wrap">
              <div className="ab-section-head" data-ab-reveal>
                <h2 className="ab-heading">Education</h2>
                <span className="ab-count">{pad(education.length)}</span>
              </div>

              <ul className="ab-rows">
                {education.map((edu) => (
                  <li className="ab-edu" key={edu.institution} data-ab-reveal>
                    <div className="ab-edu-logo">
                      <Image src={edu.logo} alt="" width={64} height={64} />
                    </div>
                    <div className="ab-edu-main">
                      <h3>{edu.degree}</h3>
                      <p>{edu.field}</p>
                    </div>
                    <div className="ab-edu-inst">
                      <p>{edu.institution}</p>
                      <span>{edu.location}</span>
                    </div>
                    <span className="ab-edu-period">{edu.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Toolbox ── */}
          <section className="ab-band is-last" id="tech">
            <div className="ab-wrap">
              <h2 className="ab-heading" data-ab-reveal>
                What I work with …
              </h2>

              <div className="ab-columns is-three">
                {techStacks.map((cat, i) => (
                  <div className="ab-col" key={cat.category} data-ab-reveal>
                    <h5 className="ab-index">{pad(i + 1)}</h5>
                    <h3 className="ab-col-title">{cat.category}</h3>
                    <ul className="ab-stack">
                      {cat.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AboutPageAnimations>
      </main>

      <Footer />
    </div>
  );
}
