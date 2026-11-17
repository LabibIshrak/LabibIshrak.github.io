import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TransitionLink } from "@/components/runtime";
import { AboutPageAnimations, SplitWords } from "@/components/about-page-animations";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hasin Ishrak Labib — Co-founder & CEO of Vantaloc, CSE undergraduate at PUST, full-stack developer, and builder based in Bangladesh.",
};

const statement =
  "Building real products. Shipping software that works. Leading teams that move fast. Based in Bangladesh.";

/* ─── Data ─────────────────────────────────────────────────────── */

const experiences = [
  {
    title: "Co-founder & CEO",
    company: "Vantaloc",
    type: "Full-time · SaaS",
    period: "2025 — Present",
    location: "Bangladesh",
    description:
      "Co-founded and lead Vantaloc — a SaaS company building websites, AI agents, custom software, and Android applications for clients. End-to-end ownership: strategy, architecture, hiring, delivery.",
    skills: ["SaaS", "AI Agents", "Next.js", "Flutter", "Android", "Leadership"],
  },
  {
    title: "Product Lead",
    company: "Mezai Tech",
    type: "Part-time · Digital Services",
    period: "2025 — Present",
    location: "Bangladesh",
    description:
      "Driving product at Mezai Tech, a digital service provider. Setting roadmaps, leading cross-functional squads, and shipping digital solutions that clients actually use.",
    skills: ["Product Strategy", "Team Leadership", "Agile", "Digital Services"],
  },
];

const achievements = [
  {
    rank: "4th",
    scope: "Nationally",
    title: "July Hackathon 2026",
    year: "2026",
    description:
      "Secured 4th place nationally, competing against teams from top universities across Bangladesh.",
  },
  {
    rank: "Finalist",
    scope: "",
    title: "PSTU Hackathon Final",
    year: "2026",
    description:
      "Reached the grand final of PSTU Hackathon 2026 — built and presented a full working product under pressure.",
  },
  {
    rank: "3×",
    scope: "Champion",
    title: "Creative Talent Hunt",
    year: "2018 – 2021",
    description:
      "Regional Championship Winner for three consecutive years. Held the title from 2018 to 2021.",
  },
];

const education = [
  {
    degree: "B.Sc. Engineering",
    field: "Computer Science & Engineering",
    institution: "Pabna University of Science and Technology",
    short: "PUST",
    period: "2024 — Present",
    location: "Pabna, Bangladesh",
    logo: "/pust-logo.png",
  },
  {
    degree: "Higher Secondary Certificate",
    field: "Science Group",
    institution: "Rajshahi College",
    short: "RC",
    period: "2021 — 2023",
    location: "Rajshahi, Bangladesh",
    logo: "/rajshahi-college-logo.png",
  },
];

const techStacks = [
  { category: "Languages",      items: ["C++", "Python", "TypeScript", "JavaScript", "Dart", "Java", "SQL"] },
  { category: "Frontend",       items: ["React", "Next.js", "HTML5", "CSS3", "GSAP", "Framer Motion"] },
  { category: "Mobile",         items: ["Flutter", "Dart", "Firebase", "Android SDK"] },
  { category: "Backend",        items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
  { category: "AI / ML",        items: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"] },
  { category: "Tools & DevOps", items: ["Git", "GitHub", "Docker", "Linux", "Figma", "VS Code"] },
];

/* ─── Page ──────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain about-lux-main">
        <Navigation />

        <AboutPageAnimations>

          {/* ── HERO ──────────────────────────────────── */}
          <section className="alux-hero">
            <div className="alux-hero-inner">
              <TransitionLink href="/" className="alux-back">
                <ArrowLeft size={16} />
                <span>Home</span>
              </TransitionLink>

              <div className="alux-hero-text">
                <p className="alux-eyebrow">About</p>
                <h1 className="alux-h1" data-page-heading tabIndex={-1}>
                  <span className="alux-h1-line">Hasin</span>
                  <span className="alux-h1-line alux-h1-italic">Ishrak</span>
                  <span className="alux-h1-line">Labib</span>
                </h1>
              </div>

              <div className="alux-hero-meta">
                <div className="alux-meta-col">
                  <span className="alux-meta-label">Role</span>
                  <span className="alux-meta-val">Founder · Developer</span>
                </div>
                <div className="alux-meta-col">
                  <span className="alux-meta-label">Based in</span>
                  <span className="alux-meta-val">Bangladesh</span>
                </div>
                <div className="alux-meta-col">
                  <span className="alux-meta-label">Status</span>
                  <span className="alux-meta-val alux-available">
                    <span className="alux-dot" />
                    Available for work
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── INTRO + PHOTO ─────────────────────────── */}
          <section className="alux-intro">
            <div className="alux-intro-photo">
              <Image
                src="/portrait-placeholder.png"
                alt="Hasin Ishrak Labib"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="alux-intro-img"
                priority
              />
              <span className="alux-photo-tag">Labib, 2025</span>
            </div>

            <div className="alux-intro-content">
              <p className="alux-statement">
                <SplitWords text={statement} />
              </p>

              <p className="alux-bio">
                Second-year Computer Science & Engineering undergraduate at PUST.
                Co-founder and CEO of <strong>Vantaloc</strong> — a SaaS company
                delivering websites, AI agents, software, and Android apps to
                clients. Product Lead at <strong>Mezai Tech</strong>. Competitive
                programmer. Former three-time regional champion.
              </p>

              {profile.email && (
                <a className="alux-email-cta" href={`mailto:${profile.email}`}>
                  <span>{profile.email}</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </section>

          {/* ── EXPERIENCE ────────────────────────────── */}
          <section className="alux-section" id="experience">
            <header className="alux-section-head">
              <span className="alux-eyebrow">Experience</span>
              <span className="alux-section-count">{String(experiences.length).padStart(2, "0")}</span>
            </header>

            <div className="alux-timeline">
              {experiences.map((exp, i) => (
                <div className="alux-tl-row" key={i}>
                  <div className="alux-tl-left">
                    <span className="alux-tl-period">{exp.period}</span>
                    <span className="alux-tl-location">{exp.location}</span>
                  </div>

                  <div className="alux-tl-track">
                    <span className="alux-tl-dot" />
                    {i < experiences.length - 1 && <span className="alux-tl-line" />}
                  </div>

                  <div className="alux-tl-body">
                    <div className="alux-tl-top">
                      <h3 className="alux-tl-title">{exp.title}</h3>
                      <span className="alux-tl-badge">{exp.type}</span>
                    </div>
                    <p className="alux-tl-company">{exp.company}</p>
                    <p className="alux-tl-desc">{exp.description}</p>
                    <ul className="alux-tl-tags">
                      {exp.skills.map((s, si) => (
                        <li key={si}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ACHIEVEMENTS ──────────────────────────── */}
          <section className="alux-section" id="achievements">
            <header className="alux-section-head">
              <span className="alux-eyebrow">Achievements</span>
              <span className="alux-section-count">{String(achievements.length).padStart(2, "0")}</span>
            </header>

            <div className="alux-awards">
              {achievements.map((ach, i) => (
                <div className="alux-award-row" key={i}>
                  <div className="alux-award-rank">
                    <span className="alux-award-num">{ach.rank}</span>
                    {ach.scope && <span className="alux-award-scope">{ach.scope}</span>}
                  </div>
                  <div className="alux-award-body">
                    <div className="alux-award-top">
                      <h3 className="alux-award-title">{ach.title}</h3>
                      <span className="alux-award-year">{ach.year}</span>
                    </div>
                    <p className="alux-award-desc">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ─────────────────────────────── */}
          <section className="alux-section" id="education">
            <header className="alux-section-head">
              <span className="alux-eyebrow">Education</span>
              <span className="alux-section-count">{String(education.length).padStart(2, "0")}</span>
            </header>

            <div className="alux-edu-list">
              {education.map((edu, i) => (
                <div className="alux-edu-row" key={i}>
                  <div className="alux-edu-logo-wrap">
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      width={56}
                      height={56}
                      className="alux-edu-logo"
                    />
                  </div>
                  <div className="alux-edu-body">
                    <div className="alux-edu-top">
                      <div>
                        <h3 className="alux-edu-degree">
                          {edu.degree}
                          <span className="alux-edu-field"> — {edu.field}</span>
                        </h3>
                        <p className="alux-edu-inst">{edu.institution}</p>
                      </div>
                      <div className="alux-edu-right">
                        <span className="alux-edu-period">{edu.period}</span>
                        <span className="alux-edu-loc">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TECH STACKS ───────────────────────────── */}
          <section className="alux-section" id="tech">
            <header className="alux-section-head">
              <span className="alux-eyebrow">Tech Stacks</span>
              <span className="alux-section-count">{String(techStacks.length).padStart(2, "0")}</span>
            </header>

            <div className="alux-tech-grid">
              {techStacks.map((cat, i) => (
                <div className="alux-tech-col" key={i}>
                  <h4 className="alux-tech-cat">{cat.category}</h4>
                  <ul className="alux-tech-list">
                    {cat.items.map((item, ti) => (
                      <li key={ti}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────── */}
          <section className="alux-cta">
            <p className="alux-cta-label">Get in touch</p>
            <h2 className="alux-cta-heading">
              Let&apos;s build<br />
              something real.
            </h2>
            {profile.email && (
              <a className="alux-cta-link" href={`mailto:${profile.email}`}>
                <span>{profile.email}</span>
                <ArrowUpRight size={20} />
              </a>
            )}
          </section>

        </AboutPageAnimations>
      </main>

      <Footer />
    </div>
  );
}
