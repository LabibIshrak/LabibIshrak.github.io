"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="about-reveal-word">
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

export function AboutPageAnimations({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {

        /* ── Hero h1 lines slide up ── */
        const h1Lines = root.querySelectorAll(".alux-h1-line");
        if (h1Lines.length) {
          gsap.from(h1Lines, {
            y: "110%",
            opacity: 0,
            stagger: 0.12,
            duration: 1.1,
            ease: "power4.out",
          });
        }

        /* ── Hero eyebrow + meta fade ── */
        const heroEyebrow = root.querySelector(".alux-hero .alux-eyebrow");
        if (heroEyebrow) {
          gsap.from(heroEyebrow, { opacity: 0, y: 14, duration: 0.7, delay: 0.3, ease: "power3.out" });
        }
        const heroMeta = root.querySelector(".alux-hero-meta");
        if (heroMeta) {
          gsap.from(heroMeta, { opacity: 0, y: 20, duration: 0.8, delay: 0.55, ease: "power3.out" });
        }

        /* ── Intro photo reveal ── */
        const photo = root.querySelector(".alux-intro-photo");
        if (photo) {
          gsap.from(photo, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: photo, start: "top 85%", once: true },
          });
        }

        /* ── Statement words ── */
        const statementWords = root.querySelectorAll(".about-reveal-word");
        if (statementWords.length) {
          gsap.from(statementWords, {
            opacity: 0.1,
            y: 8,
            stagger: 0.025,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: root.querySelector(".alux-statement"), start: "top 85%", once: true },
          });
        }

        /* ── Bio + email CTA ── */
        const introCols = root.querySelectorAll(".alux-bio, .alux-email-cta");
        if (introCols.length) {
          gsap.from(introCols, {
            opacity: 0, y: 25, stagger: 0.12, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: root.querySelector(".alux-intro-content"), start: "top 82%", once: true },
          });
        }

        /* ── Section heads ── */
        root.querySelectorAll(".alux-section-head").forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* ── Timeline rows ── */
        const tlRows = root.querySelectorAll(".alux-tl-row");
        if (tlRows.length) {
          tlRows.forEach((row, i) => {
            gsap.from(row, {
              opacity: 0, y: 40, duration: 0.75, ease: "power3.out",
              delay: i * 0.08,
              scrollTrigger: { trigger: row, start: "top 85%", once: true },
            });
          });

          // timeline lines grow
          root.querySelectorAll(".alux-tl-line").forEach((line) => {
            gsap.from(line, {
              scaleY: 0, transformOrigin: "top", duration: 0.9, ease: "power2.out",
              scrollTrigger: { trigger: line, start: "top 85%", once: true },
            });
          });
        }

        /* ── Award rows ── */
        root.querySelectorAll(".alux-award-row").forEach((row, i) => {
          gsap.from(row, {
            opacity: 0, x: -30, duration: 0.7, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
        });

        /* ── Award big numbers count-up feel ── */
        root.querySelectorAll(".alux-award-num").forEach((el) => {
          gsap.from(el, {
            opacity: 0, scale: 0.7, duration: 0.65, ease: "back.out(1.8)",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* ── Education rows ── */
        root.querySelectorAll(".alux-edu-row").forEach((row, i) => {
          gsap.from(row, {
            opacity: 0, y: 30, duration: 0.7, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
        });

        /* ── Tech grid cols ── */
        const techCols = root.querySelectorAll(".alux-tech-col");
        if (techCols.length) {
          gsap.from(techCols, {
            opacity: 0, y: 30, stagger: 0.07, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: root.querySelector(".alux-tech-grid"), start: "top 82%", once: true },
          });

          gsap.from(root.querySelectorAll(".alux-tech-list li"), {
            opacity: 0, scale: 0.88, y: 10, stagger: 0.03, duration: 0.4, ease: "power2.out",
            scrollTrigger: { trigger: root.querySelector(".alux-tech-grid"), start: "top 75%", once: true },
          });
        }

        /* ── CTA heading ── */
        const ctaEl = root.querySelector(".alux-cta");
        if (ctaEl) {
          gsap.from(ctaEl.querySelector(".alux-cta-heading"), {
            opacity: 0, y: 60, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: ctaEl, start: "top 80%", once: true },
          });
          gsap.from(ctaEl.querySelector(".alux-cta-link"), {
            opacity: 0, y: 30, duration: 0.7, delay: 0.25, ease: "power3.out",
            scrollTrigger: { trigger: ctaEl, start: "top 80%", once: true },
          });
        }

        /* ── Old selectors (backward-compat for other pages) ── */
        const leadEl = root.querySelector(".about-page-lead");
        if (leadEl) {
          gsap.from(root.querySelectorAll(".about-reveal-word"), {
            opacity: 0.12, y: 6, stagger: 0.03, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: leadEl, start: "top 85%", once: true },
          });
        }

        const connectEl = root.querySelector(".about-page-connect");
        if (connectEl) {
          gsap.from(connectEl, {
            opacity: 0, y: 35, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: connectEl, start: "top 88%", once: true },
          });
        }

      }, root);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

export { SplitWords };
