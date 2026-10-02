"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";
import { ProfilePlaceholder } from "./artwork";
import { AboutEditorial } from "./about-editorial";
import { WorkIndex } from "./work-index";
import { HeroMarquee } from "./hero-marquee";
import { RotatingGlobe } from "./rotating-globe";

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".hero-introduction", {
          opacity: 0,
          y: 35,
          duration: 1,
          ease: "power3.out",
        });

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

  return (
    <div ref={rootRef}>
      <section className="hero">
        <div className="location-badge">
          <span className="location-badge-copy">
            Located
            <br />
            in
            <br />
            Bangladesh
          </span>
          <span className="globe-circle">
            <RotatingGlobe />
          </span>
        </div>

        <div className="hero-portrait">
          <div className="hero-portrait-inner">
            <img
              src="/portrait.png"
              alt="Hasin Ishrak Labib"
              className="profile-photo"
            />
          </div>
        </div>

        <div className="hero-introduction">
          <ArrowDownRight className="hero-direction" strokeWidth={1.5} />
          <p>Software Engineer</p>
          <p className="hero-subtext">&amp; ML Researcher</p>
        </div>

        <HeroMarquee />
      </section>
      {/* The closing section above belongs to your existing hero. */}

      <AboutEditorial />
      <WorkIndex />
    </div>
  );
}
