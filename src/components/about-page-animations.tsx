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
        const leadEl = root.querySelector(".about-page-lead");
        if (leadEl) {
          gsap.from(root.querySelectorAll(".about-reveal-word"), {
            opacity: 0.12,
            y: 6,
            stagger: 0.03,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leadEl,
              start: "top 85%",
              once: true,
            },
          });
        }

        // Stagger-in the old detail blocks (if present on other pages)
        const detailsEl = root.querySelector(".about-page-details");
        if (detailsEl) {
          gsap.from(root.querySelectorAll(".about-page-block"), {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: detailsEl,
              start: "top 80%",
              once: true,
            },
          });
        }

        // Stagger-in the old skill pills (if present on other pages)
        const skillsEl = root.querySelector(".about-page-skills");
        if (skillsEl) {
          gsap.from(root.querySelectorAll(".about-page-skill-grid li"), {
            opacity: 0,
            y: 20,
            scale: 0.92,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsEl,
              start: "top 85%",
              once: true,
            },
          });
        }

        // Fade in the contact section
        const connectEl = root.querySelector(".about-page-connect");
        if (connectEl) {
          gsap.from(connectEl, {
            opacity: 0,
            y: 35,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: connectEl,
              start: "top 88%",
              once: true,
            },
          });
        }

        // ── Portrait photo ──
        const portraitEl = root.querySelector(".about-portrait");
        if (portraitEl) {
          gsap.from(portraitEl, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portraitEl,
              start: "top 85%",
              once: true,
            },
          });
        }

        // ── Experience timeline entries ──
        const timelineEl = root.querySelector(".experience-timeline");
        if (timelineEl) {
          gsap.from(root.querySelectorAll(".timeline-entry"), {
            opacity: 0,
            y: 50,
            stagger: 0.18,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 80%",
              once: true,
            },
          });

          // Timeline line grows in
          gsap.from(root.querySelectorAll(".timeline-line"), {
            scaleY: 0,
            transformOrigin: "top center",
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 80%",
              once: true,
            },
          });

          // Timeline dots pulse in
          gsap.from(root.querySelectorAll(".timeline-dot"), {
            scale: 0,
            stagger: 0.18,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 80%",
              once: true,
            },
          });
        }

        // ── Achievement cards ──
        const achievementsEl = root.querySelector(".achievements-grid");
        if (achievementsEl) {
          gsap.from(root.querySelectorAll(".achievement-card"), {
            opacity: 0,
            y: 40,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: achievementsEl,
              start: "top 82%",
              once: true,
            },
          });
        }

        // ── Education entries ──
        const educationEl = root.querySelector(".education-list");
        if (educationEl) {
          gsap.from(root.querySelectorAll(".education-entry"), {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: educationEl,
              start: "top 82%",
              once: true,
            },
          });
        }

        // ── Tech categories ──
        const techEl = root.querySelector(".tech-grid");
        if (techEl) {
          gsap.from(root.querySelectorAll(".tech-category"), {
            opacity: 0,
            y: 35,
            stagger: 0.1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: techEl,
              start: "top 85%",
              once: true,
            },
          });

          // Tech pills stagger
          gsap.from(root.querySelectorAll(".tech-items li"), {
            opacity: 0,
            y: 15,
            scale: 0.9,
            stagger: 0.035,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger: techEl,
              start: "top 78%",
              once: true,
            },
          });
        }

        // ── Section headers slide in ──
        const sectionHeaders = root.querySelectorAll(".about-section-header");
        if (sectionHeaders.length) {
          sectionHeaders.forEach((header) => {
            gsap.from(header, {
              opacity: 0,
              x: -30,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: header,
                start: "top 85%",
                once: true,
              },
            });

            const rule = header.querySelector(".about-section-rule");
            if (rule) {
              gsap.from(rule, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: header,
                  start: "top 85%",
                  once: true,
                },
              });
            }
          });
        }
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

export { SplitWords };
