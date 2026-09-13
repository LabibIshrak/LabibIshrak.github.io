"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAME = "Hasin Ishrak Labib";

export function HeroMarquee() {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const groupRef = useRef<HTMLSpanElement>(null);
  const unitRef = useRef<HTMLSpanElement>(null);

  const [copies, setCopies] = useState(2);

  // Ensure each repeated group is wider than the viewport.
  // ResizeObserver also reacts when font metrics change.
  useEffect(() => {
    const root = rootRef.current;
    const unit = unitRef.current;

    if (!root || !unit) return;

    function measure() {
      if (!root || !unit) return;

      const unitWidth = unit.getBoundingClientRect().width;

      if (unitWidth > 0) {
        const required =
          Math.ceil(root.clientWidth / unitWidth) + 1;

        setCopies(Math.max(2, required));
      }
    }

    const observer = new ResizeObserver(measure);

    observer.observe(root);
    observer.observe(unit);
    measure();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const group = groupRef.current;

    if (!root || !track || !group) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Pixels per second.
      const DEFAULT_SPEED = 140;

      const motion = {
        speed: DEFAULT_SPEED,
      };

      let groupWidth = 0;
      let position = 0;
      let lastDirection = 0;

      const setX = gsap.quickSetter(track, "x", "px");

      function measureGroup() {
        const nextWidth = group!.getBoundingClientRect().width;

        if (nextWidth <= 0) return;

        // Preserve the loop's relative position during resizing.
        const phase = groupWidth > 0 ? position / groupWidth : -1;

        groupWidth = nextWidth;
        position = phase * groupWidth;

        setX(position);
      }

      const observer = new ResizeObserver(measureGroup);
      observer.observe(group);
      measureGroup();

      function resumeDefault() {
        lastDirection = 0;

        gsap.to(motion, {
          speed: DEFAULT_SPEED,
          duration: 0.85,
          ease: "power2.inOut",
          overwrite: true,
        });
      }

      // Restarted whenever scrolling changes position.
      const idleTimer = gsap
        .delayedCall(0.16, resumeDefault)
        .pause();

      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",

        onUpdate(self) {
          const velocity = self.getVelocity();

          if (Math.abs(velocity) < 1) return;

          const direction = velocity > 0 ? 1 : -1;

          if (direction !== lastDirection) {
            gsap.killTweensOf(motion);

            // Downward scrolling reverses immediately.
            // Upward scrolling reinforces the default direction.
            motion.speed =
              direction === 1 ? -DEFAULT_SPEED : DEFAULT_SPEED;

            lastDirection = direction;
          }

          idleTimer.restart(true);
        },
      });

      const tick = (_time: number, deltaMilliseconds: number) => {
        if (
          groupWidth <= 0 ||
          document.visibilityState === "hidden"
        ) {
          return;
        }

        // Prevent a large jump after an inactive browser tab.
        const deltaSeconds =
          Math.min(deltaMilliseconds, 50) / 1000;

        position += motion.speed * deltaSeconds;

        // Keep translation in [-groupWidth, 0).
        // Both groups are identical, so wrapping is invisible.
        position =
          ((((position + groupWidth) % groupWidth) + groupWidth) %
            groupWidth) -
          groupWidth;

        setX(position);
      };

      gsap.ticker.add(tick);

      return () => {
        observer.disconnect();
        trigger.kill();
        idleTimer.kill();
        gsap.ticker.remove(tick);
        gsap.killTweensOf(motion);
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => media.revert();
  }, []);

  return (
    <h1
      ref={rootRef}
      className="hero-marquee"
      data-page-heading
      tabIndex={-1}
      aria-label="Hasin Ishrak Labib — Software Developer"
    >
      <span
        ref={trackRef}
        className="hero-marquee-track"
        aria-hidden="true"
      >
        {[0, 1].map((groupIndex) => (
          <span
            key={groupIndex}
            ref={groupIndex === 0 ? groupRef : undefined}
            className="hero-marquee-group"
          >
            {Array.from({ length: copies }, (_, index) => (
              <span
                key={index}
                ref={
                  groupIndex === 0 && index === 0
                    ? unitRef
                    : undefined
                }
                className="hero-marquee-unit"
              >
                {NAME}
                <span className="hero-marquee-divider">—</span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
