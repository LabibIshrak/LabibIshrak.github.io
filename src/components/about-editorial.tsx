"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink } from "./runtime";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Second-year undergraduate building end-to-end solutions and exploring what's next in AI & ML research.";

export function AboutEditorial() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".editorial-word", {
          opacity: 0.18,
          y: 8,
          stagger: 0.045,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".editorial-statement",
            start: "top 85%",
            once: true,
          },
        });
      }, rootRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
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
    </section>
  );
}
