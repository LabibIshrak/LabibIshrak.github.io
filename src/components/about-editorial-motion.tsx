"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Renders nothing; attaches the word-reveal to the server-rendered
 * #about section. CSS pre-hides `.editorial-word` under html.motion-ok,
 * so this animates explicitly from that state.
 */
export function AboutEditorialMotion({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".editorial-word",
          { opacity: 0.18, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.045,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".editorial-statement",
              start: "top 85%",
              once: true,
            },
          },
        );
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, [sectionId]);

  return null;
}
