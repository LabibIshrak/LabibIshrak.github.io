"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/** Renders nothing; attaches the scrubbed footer reveal on desktop. */
export function FooterMotion({ footerId }: { footerId: string }) {
  useEffect(() => {
    const footer = document.getElementById(footerId);
    if (!footer) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          gsap.from(".footer-content", {
            y: 70,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          });
        }, footer);

        return () => context.revert();
      },
    );

    return () => media.revert();
  }, [footerId]);

  return null;
}
