"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps each word in a span so GSAP can animate them individually.
 * Preserves spaces between words.
 */
function SplitWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="about-reveal-word">
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

export function AboutPageAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        // Animate the lead paragraph words
        gsap.from(".about-reveal-word", {
          opacity: 0.12,
          y: 6,
          stagger: 0.03,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-page-lead",
            start: "top 85%",
            once: true,
          },
        });

        // Stagger-in the detail blocks
        gsap.from(".about-page-block", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-page-details",
            start: "top 80%",
            once: true,
          },
        });

        // Stagger-in the skill pills
        gsap.from(".about-page-skill-grid li", {
          opacity: 0,
          y: 20,
          scale: 0.92,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-page-skills",
            start: "top 85%",
            once: true,
          },
        });

        // Fade in the contact section
        gsap.from(".about-page-connect", {
          opacity: 0,
          y: 35,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-page-connect",
            start: "top 88%",
            once: true,
          },
        });

        // ── Experience timeline entries ──
        gsap.from(".timeline-entry", {
          opacity: 0,
          y: 50,
          stagger: 0.18,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 80%",
            once: true,
          },
        });

        // Timeline line grows in
        gsap.from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top center",
          stagger: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 80%",
            once: true,
          },
        });

        // Timeline dots pulse in
        gsap.from(".timeline-dot", {
          scale: 0,
          stagger: 0.18,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 80%",
            once: true,
          },
        });

        // ── Achievement cards ──
        gsap.from(".achievement-card", {
          opacity: 0,
          y: 40,
          scale: 0.96,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".achievements-grid",
            start: "top 82%",
            once: true,
          },
        });

        // ── Education entries ──
        gsap.from(".education-entry", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".education-list",
            start: "top 82%",
            once: true,
          },
        });

        // ── Tech categories ──
        gsap.from(".tech-category", {
          opacity: 0,
          y: 35,
          stagger: 0.1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 85%",
            once: true,
          },
        });

        // Tech pills stagger
        gsap.from(".tech-items li", {
          opacity: 0,
          y: 15,
          scale: 0.9,
          stagger: 0.035,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 78%",
            once: true,
          },
        });

        // ── Section headers slide in ──
        gsap.from(".about-section-header", {
          opacity: 0,
          x: -30,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            once: true,
          },
        });

        // Section rule lines grow
        gsap.from(".about-section-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 85%",
            once: true,
          },
        });
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

export { SplitWords };
