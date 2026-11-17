"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Motion for the about page. Everything is set up in JS with gsap.from,
 * so the page is fully readable without JavaScript or with reduced motion.
 */
export function AboutPageAnimations({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Headline lines rise out of their masks.
        gsap.from(".ab-line > span", {
          yPercent: 105,
          duration: 1.1,
          stagger: 0.09,
          ease: "power4.out",
          delay: 0.1,
        });

        // The hairline draws in and the globe pops onto it.
        gsap.from("[data-ab-rule]", {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          delay: 0.25,
        });

        gsap.from("[data-ab-globe]", {
          scale: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          delay: 0.7,
        });

        // Globe drifts slightly as the hero scrolls away.
        gsap.to("[data-ab-globe]", {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: ".ab-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Portrait: unmask on entry, then a gentle parallax inside its frame.
        const portrait = root.querySelector("[data-ab-portrait]");
        if (portrait) {
          gsap.from(portrait, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: { trigger: portrait, start: "top 85%", once: true },
          });

          gsap.to(portrait.querySelector(".ab-portrait-inner"), {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: portrait,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Everything else fades up as it enters, in small batches.
        gsap.utils.toArray<HTMLElement>("[data-ab-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      }, root);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
