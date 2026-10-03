import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { AboutEditorial } from "./about-editorial";
import { WorkIndex } from "./work-index";
import { HeroMarquee } from "./hero-marquee";
import { RotatingGlobe } from "./rotating-globe";
import { PortfolioMotion } from "./portfolio-motion";

export function Portfolio() {
  return (
    <PortfolioMotion>
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
            {/* LCP image: optimised (AVIF/WebP), responsive and preloaded. */}
            <Image
              src="/portrait.png"
              alt="Hasin Ishrak Labib"
              className="profile-photo"
              width={588}
              height={1003}
              sizes="(max-width: 600px) 115vw, (max-width: 900px) 82vw, min(60vw, 820px)"
              preload
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
    </PortfolioMotion>
  );
}
