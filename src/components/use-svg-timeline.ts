"use client";

import { useEffect, useRef } from "react";

/**
 * Runs an SVG's SMIL timeline only while it is on screen and the tab is
 * visible. With reduced motion it shows a single still frame instead.
 */
export function useSvgTimeline(stillAt: number) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    function sync() {
      if (!svg) return;
      if (reduce.matches) {
        svg.setCurrentTime(stillAt);
        svg.pauseAnimations();
        return;
      }
      if (inView && document.visibilityState === "visible") {
        svg.unpauseAnimations();
      } else {
        svg.pauseAnimations();
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });

    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [stillAt]);

  return ref;
}

/** "0;0.2;0.25;1" from numbers, for SMIL keyTimes. */
export const keyTimes = (...t: number[]) => t.map((v) => v.toFixed(3)).join(";");
