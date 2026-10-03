"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Client-only animation layer for the home page. The markup it wraps is
 * rendered on the server; this component only attaches GSAP effects.
 */
export function PortfolioMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        // CSS pre-hides this under html.motion-ok (no hydration flash),
        // so animate explicitly from the hidden state to visible.
        gsap.fromTo(
          ".hero-introduction",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
        );

        gsap.to(".hero-portrait-inner", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
