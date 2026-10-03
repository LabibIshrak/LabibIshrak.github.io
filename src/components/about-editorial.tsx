import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "./runtime";
import { AboutEditorialMotion } from "./about-editorial-motion";

const statement =
  "Second-year undergraduate building end-to-end solutions and exploring what's next in AI & ML research.";

const SECTION_ID = "about";

export function AboutEditorial() {
  return (
    <section
      id={SECTION_ID}
      className="editorial-about"
      aria-labelledby="editorial-about-title"
    >
      <div className="editorial-container">
        <p className="editorial-label">A LITTLE ABOUT ME</p>

        <div className="editorial-about-grid">
          <h2 id="editorial-about-title" className="editorial-statement">
            {statement.split(" ").map((word, index) => (
              <span key={index} className="editorial-word">
                {word}{" "}
              </span>
            ))}
          </h2>

          <div className="editorial-aside">
            <p>
              I&#39;m Labib — a Computer Science &amp; Software Engineering
              student who ships production-grade applications and dives deep
              into machine learning research. From intelligent systems to
              polished interfaces, I bridge the gap between idea and
              implementation.
            </p>

            <TransitionLink
              href="/about"
              className="editorial-about-button"
              data-magnetic
              aria-label="Learn more about Labib"
            >
              <span className="editorial-button-content">
                About me
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </TransitionLink>
          </div>
        </div>
      </div>

      <AboutEditorialMotion sectionId={SECTION_ID} />
    </section>
  );
}
