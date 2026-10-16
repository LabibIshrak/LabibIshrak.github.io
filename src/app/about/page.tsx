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
    title: "Undergraduate Research Assistant",
    company: "American International University-Bangladesh",
    type: "Part-time",
    period: "Jun 2025 — Present",
    location: "Dhaka, Bangladesh",
    description:
      "Conducting research at the intersection of AI/ML and software engineering. Working on machine learning pipelines, intelligent systems, and publishing findings in academic venues.",
    skills: ["Machine Learning", "Python", "Research", "Data Analysis"],
  },
  {
    title: "Full-Stack Developer",
    company: "Freelance",
    type: "Self-employed",
    period: "Jan 2025 — Present",
    location: "Remote",
    description:
      "Building production-grade web and mobile applications for clients. End-to-end delivery from architecture and system design to pixel-level interface polish.",
    skills: ["Next.js", "Flutter", "Node.js", "Firebase", "REST APIs"],
  },
  {
    title: "Flutter Developer",
    company: "Personal Projects",
    type: "Self-directed",
    period: "Sep 2024 — Present",
    location: "Dhaka, Bangladesh",
    description:
      "Designing and developing cross-platform mobile applications using Flutter. Building recipe apps, fitness trackers, and utility tools with clean architecture patterns.",
    skills: ["Flutter", "Dart", "Firebase", "UI/UX Design"],
  },
  {
    title: "Competitive Programmer",
    company: "Codeforces / LeetCode",
    type: "Practice",
    period: "Jan 2024 — Present",
    location: "Online",
    description:
      "Solving algorithmic problems and participating in contests. Strengthening problem-solving skills in data structures, algorithms, and mathematical reasoning.",
    skills: ["C++", "Algorithms", "Data Structures", "Problem Solving"],
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
    title: "Dean's List",
    event: "AIUB Academic Excellence",
    year: "2025",
    description:
      "Recognized for outstanding academic performance in the Faculty of Science & Technology.",
  },
  {
    title: "Research Paper Submitted",
    event: "AI/ML Conference",
    year: "2025",
    description:
      "Submitted research paper on intelligent systems and machine learning pipelines to a peer-reviewed venue.",
  },
  {
    title: "Hackathon Finalist",
    event: "AIUB Hackathon 2024",
    year: "2024",
    description:
      "Built a full-stack application in 24 hours and reached the finalist round among 50+ teams.",
  },
  {
    title: "Open Source Contributor",
    event: "GitHub Community",
    year: "2024",
    description:
      "Contributed to open-source Flutter packages and developer tooling projects on GitHub.",
  },
];

/* ── Education data ── */

type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
};

const education: Education[] = [
  {
    degree: "B.Sc. in Computer Science & Software Engineering",
    institution: "American International University-Bangladesh (AIUB)",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    description:
      "Pursuing a comprehensive degree covering data structures, algorithms, software engineering principles, database systems, and artificial intelligence.",
    highlights: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Artificial Intelligence",
      "Software Engineering",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Dhaka College",
    period: "2021 — 2023",
    location: "Dhaka, Bangladesh",
    description:
      "Completed higher secondary education in the Science group with a focus on Mathematics, Physics, and Chemistry.",
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

            {/* ── Experience Timeline ── */}
            <section className="about-section" id="experience">
              <div className="about-section-header">
                <span className="eyebrow about-page-label">EXPERIENCE</span>
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
                <span className="eyebrow about-page-label">ACHIEVEMENTS</span>
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
                <span className="eyebrow about-page-label">EDUCATION</span>
                <div className="about-section-rule" />
              </div>

              <div className="education-list">
                {education.map((edu, i) => (
                  <div className="education-entry" key={i}>
                    <div className="education-left">
                      <span className="education-period">{edu.period}</span>
                      <span className="education-location">{edu.location}</span>
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
                <span className="eyebrow about-page-label">TECH STACKS</span>
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
