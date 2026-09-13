"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Turning complex ideas into software that feels clear, considered, and effortless to use.";

export function AboutEditorial() {
  const rootRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, [expanded]);

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
              I’m Labib—a CS and Software Engineering
              student based in Bangladesh. My interests connect C++,
              Flutter, and the systems behind thoughtful applications.
            </p>

            <button
              type="button"
              className="editorial-about-button"
              data-magnetic
              aria-expanded={expanded}
              aria-controls="extended-biography"
              onClick={() => setExpanded((value) => !value)}
            >
              <span className="editorial-button-content">
                {expanded ? "A little less" : "About me"}
                {expanded ? (
                  <Minus size={18} aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={18} aria-hidden="true" />
                )}
              </span>
            </button>
          </div>
        </div>

        <div
          id="extended-biography"
          className="editorial-biography"
          hidden={!expanded}
        >
          <span className="editorial-label">BEYOND THE INTRODUCTION</span>

          <div>
            <p>{profile.about}</p>

            <ul className="editorial-skills" aria-label="Areas of interest">
              <li>C++</li>
              <li>Flutter</li>
              <li>Data structures</li>
              <li>Systems design</li>
              <li>Visual experimentation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
