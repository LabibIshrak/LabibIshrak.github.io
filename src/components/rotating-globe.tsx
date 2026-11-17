"use client";

import { useEffect, useRef } from "react";

/**
 * Wireframe globe built from CSS rings: three meridians sweep across a
 * tilted sphere that gently rocks back and forth, which reads as a
 * continuous 3D spin. Pure CSS animation; this component only pauses it
 * while the globe is off screen or the tab is hidden.
 */
export function RotatingGlobe() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let inView = true;

    function sync() {
      const running = inView && document.visibilityState === "visible";
      element!.dataset.paused = running ? "false" : "true";
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });

    observer.observe(element);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <span ref={ref} className="location-globe" aria-hidden="true">
      <span className="lg-sphere">
        <span className="lg-meridian" />
        <span className="lg-meridian" />
        <span className="lg-meridian" />
        <span className="lg-latitude" />
        <span className="lg-equator" />
      </span>
    </span>
  );
}
