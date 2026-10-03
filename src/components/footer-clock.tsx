"use client";

import { useEffect, useRef } from "react";

/**
 * Live clock that writes straight to the DOM (no React re-renders) and
 * only ticks while it is on screen and the tab is visible.
 */
export function FooterClock({ timeZone }: { timeZone: string }) {
  const ref = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    let timer: ReturnType<typeof setInterval> | null = null;
    let inView = false;

    function update() {
      element!.textContent = formatter.format(new Date());
    }

    function start() {
      if (timer) return;
      update();
      timer = setInterval(update, 1000);
    }

    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    }

    function sync() {
      if (inView && document.visibilityState === "visible") start();
      else stop();
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
      stop();
    };
  }, [timeZone]);

  return <time ref={ref}>—</time>;
}
