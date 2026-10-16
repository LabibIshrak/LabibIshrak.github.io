import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TransitionLink } from "@/components/runtime";
import { AboutPageAnimations, SplitWords } from "@/components/about-page-animations";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hasin Ishrak Labib — CSE undergraduate at PUST, Co-founder & CEO of Vantaloc, full-stack developer, and builder based in Bangladesh.",
};

const leadText =
  "I'm Hasin Ishrak Labib — a Computer Science & Engineering undergraduate, entrepreneur, and builder based in Bangladesh. I co-founded Vantaloc, a SaaS company delivering websites, AI agents, software, and mobile apps to clients worldwide.";

/* ── Experience timeline data ── */

type ExperienceEntry = {
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  skills?: string[];
};

const experiences: ExperienceEntry[] = [
  {
    title: "Co-founder & CEO",
    company: "Vantaloc",
    type: "Full-time",
    period: "2025 — Present",
    location: "Bangladesh",
    description:
      "Co-founded and lead Vantaloc, a SaaS company building websites, AI agents, software solutions, and Android applications for clients. Overseeing product strategy, technical architecture, and client delivery end-to-end.",
    skills: ["SaaS", "AI Agents", "Next.js", "Flutter", "Product Strategy", "Leadership"],
  },
  {
    title: "Product Lead",
    company: "Mezai Tech",
    type: "Part-time",
    period: "2025 — Present",
    location: "Bangladesh",
    description:
      "Leading product development at Mezai Tech, a digital service provider. Defining product roadmaps, coordinating cross-functional teams, and ensuring timely delivery of digital solutions for diverse clients.",
    skills: ["Product Management", "Digital Services", "Team Leadership", "Agile"],
  },
];

/* ── Achievements data ── */

type Achievement = {
  title: string;
  event: string;
  year: string;
  description: string;
};

const achievements: Achievement[] = [
  {
    title: "4th Place Nationally",
    event: "July Hackathon 2026",
    year: "2026",
    description:
      "Secured 4th position nationally in the July Hackathon 2026, competing against teams from across Bangladesh.",
  },
  {
    title: "Finalist",
    event: "PSTU Hackathon Final 2026",
    year: "2026",
    description:
      "Reached the final round of the PSTU Hackathon 2026, building and presenting a full solution under competitive pressure.",
  },
  {
    title: "Regional Championship Winner",
    event: "Creative Talent Hunt",
    year: "2018 — 2021",
    description:
      "Former Regional Championship Winner of Creative Talent Hunt. Held the title for three consecutive years from 2018 to 2021.",
  },
];

/* ── Education data ── */

type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  logo?: string;
  highlights?: string[];
};

const education: Education[] = [
  {
    degree: "B.Sc. Engineering in Computer Science & Engineering",
    institution: "Pabna University of Science and Technology (PUST)",
    period: "2024 — Present",
    location: "Pabna, Bangladesh",
    logo: "/pust-logo.png",
    description:
      "Pursuing a comprehensive engineering degree covering data structures, algorithms, software engineering, database systems, and artificial intelligence.",
    highlights: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Systems",
      "Artificial Intelligence",
      "Software Engineering",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Rajshahi College",
    period: "2021 — 2023",
    location: "Rajshahi, Bangladesh",
    logo: "/rajshahi-college-logo.png",
    description:
      "Completed higher secondary education in the Science group from one of the most prestigious colleges in Bangladesh.",
    highlights: ["Science Group", "Mathematics", "Physics"],
  },
];

/* ── Tech stack data ── */

type TechCategory = {
  category: string;
  items: string[];
};

const techStacks: TechCategory[] = [
  {
    category: "Languages",
    items: ["C++", "Python", "TypeScript", "JavaScript", "Dart", "Java", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "HTML5", "CSS3", "GSAP", "Framer Motion"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "Dart", "Firebase", "Android SDK"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    category: "AI / ML",
    items: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "GitHub", "VS Code", "Docker", "Linux", "Figma"],
  },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain about-page-main about-page-light">
        <Navigation />

        <AboutPageAnimations>
          <article className="about-page section-padding">
            <TransitionLink href="/" className="back-link about-back-link">
              <ArrowLeft size={18} />
              Back to home
            </TransitionLink>

            <header className="about-page-header">
              <span className="eyebrow about-light-eyebrow">WHO I AM</span>

              <h1 data-page-heading tabIndex={-1}>
                Labib — developer,
                <br />
                entrepreneur, builder.
              </h1>
            </header>

            {/* ── Intro with photo ── */}
            <div className="about-page-intro about-intro-split">
              <div className="about-intro-text">
                <p className="about-page-lead">
                  <SplitWords text={leadText} />
                </p>
              </div>
              <div className="about-portrait-wrap">
                <div className="about-portrait">
                  <Image
                    src="/portrait-placeholder.png"
                    alt="Hasin Ishrak Labib"
                    width={420}
                    height={520}
                    className="about-portrait-img"
                    priority
                  />
                </div>
                <span className="about-portrait-caption">
                  Hasin Ishrak Labib — Bangladesh
                </span>
              </div>
            </div>

            {/* ── Experience Timeline ── */}
            <section className="about-section" id="experience">
              <div className="about-section-header">
                <span className="eyebrow about-light-eyebrow">EXPERIENCE</span>
                <div className="about-section-rule" />
              </div>

              <div className="experience-timeline">
                {experiences.map((exp, i) => (
                  <div className="timeline-entry" key={i}>
                    <div className="timeline-track">
                      <div className="timeline-dot" />
                      {i < experiences.length - 1 && (
                        <div className="timeline-line" />
                      )}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-top">
                        <div>
                          <h3 className="timeline-title">{exp.title}</h3>
                          <p className="timeline-company">
                            {exp.company}
                            <span className="timeline-type"> · {exp.type}</span>
                          </p>
                        </div>
                        <span className="timeline-period">{exp.period}</span>
                      </div>
                      <p className="timeline-location">{exp.location}</p>
                      <p className="timeline-description">{exp.description}</p>
                      {exp.skills && (
                        <ul className="timeline-skills">
                          {exp.skills.map((skill, si) => (
                            <li key={si}>{skill}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Achievements ── */}
            <section className="about-section" id="achievements">
              <div className="about-section-header">
                <span className="eyebrow about-light-eyebrow">ACHIEVEMENTS</span>
                <div className="about-section-rule" />
              </div>

              <div className="achievements-grid">
                {achievements.map((ach, i) => (
                  <div className="achievement-card" key={i}>
                    <div className="achievement-index">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="achievement-body">
                      <h3 className="achievement-title">{ach.title}</h3>
                      <p className="achievement-event">
                        {ach.event}
                        <span className="achievement-year"> — {ach.year}</span>
                      </p>
                      <p className="achievement-desc">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Education ── */}
            <section className="about-section" id="education">
              <div className="about-section-header">
                <span className="eyebrow about-light-eyebrow">EDUCATION</span>
                <div className="about-section-rule" />
              </div>

              <div className="education-list">
                {education.map((edu, i) => (
                  <div className="education-entry" key={i}>
                    <div className="education-left">
                      {edu.logo && (
                        <div className="education-logo-wrap">
                          <Image
                            src={edu.logo}
                            alt={edu.institution}
                            width={52}
                            height={52}
                            className="education-logo"
                          />
                        </div>
                      )}
                      <div className="education-meta">
                        <span className="education-period">{edu.period}</span>
                        <span className="education-location">{edu.location}</span>
                      </div>
                    </div>
                    <div className="education-right">
                      <h3 className="education-degree">{edu.degree}</h3>
                      <p className="education-institution">{edu.institution}</p>
                      <p className="education-description">{edu.description}</p>
                      {edu.highlights && (
                        <ul className="education-highlights">
                          {edu.highlights.map((h, hi) => (
                            <li key={hi}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Tech Stacks ── */}
            <section className="about-section" id="tech-stacks">
              <div className="about-section-header">
                <span className="eyebrow about-light-eyebrow">TECH STACKS</span>
                <div className="about-section-rule" />
              </div>

              <div className="tech-grid">
                {techStacks.map((cat, i) => (
                  <div className="tech-category" key={i}>
                    <h4 className="tech-category-label">{cat.category}</h4>
                    <ul className="tech-items">
                      {cat.items.map((item, ti) => (
                        <li key={ti}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Get in Touch ── */}
            <section className="about-page-connect">
              <span className="eyebrow about-light-eyebrow">GET IN TOUCH</span>
              <p className="about-page-connect-text">
                Interested in collaborating, discussing ideas, or just want to
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
