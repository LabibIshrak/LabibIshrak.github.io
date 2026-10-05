"use client";

import { useEffect, useRef } from "react";

const R = 45;
const MERIDIANS = 6; // great circles, spaced 30deg apart
const PERIOD_MS = 8000; // one full revolution

/** Half-ellipse from north to south pole for a meridian at longitude `lon` (radians). */
function meridianPath(lon: number) {
  const s = Math.sin(lon);
  const rx = Math.abs(s) * R;
  if (rx < 0.3) return `M50 ${50 - R} L50 ${50 + R}`;
  const sweep = s > 0 ? 1 : 0;
  return `M50 ${50 - R} A${rx.toFixed(2)} ${R} 0 0 ${sweep} 50 ${50 + R}`;
}

export function RotatingGlobe() {
  const frontRefs = useRef<(SVGPathElement | null)[]>([]);
  const backRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduce ? 0 : ((now - start) / PERIOD_MS) * Math.PI * 2;
      for (let i = 0; i < MERIDIANS; i++) {
        const base = (i * Math.PI) / MERIDIANS + t;
        // Each great circle = two meridians, `base` and `base + PI`.
        // The one whose cos > 0 faces the viewer.
        const frontLon = Math.cos(base) >= 0 ? base : base + Math.PI;
        const backLon = frontLon + Math.PI;
        frontRefs.current[i]?.setAttribute("d", meridianPath(frontLon));
        backRefs.current[i]?.setAttribute("d", meridianPath(backLon));
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span className="location-globe" aria-hidden="true">
      <svg
        className="location-globe-frame"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        {/* Back-side meridians (faint, gives depth) */}
        <g className="location-globe-back">
          {Array.from({ length: MERIDIANS }).map((_, i) => (
            <path key={`b${i}`} ref={(el) => { backRefs.current[i] = el; }} />
          ))}
        </g>

        {/* Latitude lines stay fixed when spinning around the vertical axis */}
        <line x1="5" y1="50" x2="95" y2="50" />
        <ellipse cx="50" cy="50" rx="39" ry="7" transform="translate(0 -22.5)" />
        <ellipse cx="50" cy="50" rx="39" ry="7" transform="translate(0 22.5)" />

        {/* Front-side meridians */}
        <g>
          {Array.from({ length: MERIDIANS }).map((_, i) => (
            <path key={`f${i}`} ref={(el) => { frontRefs.current[i] = el; }} />
          ))}
        </g>

        {/* Outline */}
        <circle cx="50" cy="50" r={R} />
      </svg>
    </span>
  );
}
