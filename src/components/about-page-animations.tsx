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
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

export { SplitWords };
