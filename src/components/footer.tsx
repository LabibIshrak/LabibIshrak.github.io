import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import { FooterClock } from "./footer-clock";
import { FooterMotion } from "./footer-motion";
import { ContactTransition } from "./contact-transition";

const FOOTER_ID = "contact";

const socials = [
  ["GitHub", profile.github],
  ["LinkedIn", profile.linkedin],
  ["Last.fm", profile.lastfm],
];

export function Footer() {
  return (
    <>
      <ContactTransition />
      <footer id={FOOTER_ID} className="ale-footer">
        <div className="ale-footer-inner">
          {/* ── Top: heading + description + CTA ── */}
          <div className="ale-footer-top">
            <div className="ale-footer-heading-area">
              <h2 className="ale-footer-heading">Contact</h2>
              <p className="ale-footer-desc">
                Have a project in mind? Let&apos;s talk. Share a few details,
                and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {profile.email && (
              <a
                className="ale-footer-cta"
                href={`mailto:${profile.email}`}
                data-magnetic
              >
                <span className="ale-footer-cta-label">Get in touch</span>
                <ArrowUpRight size={20} />
              </a>
            )}
          </div>

          {/* ── Columns: Socials / Nav / Contact / Time ── */}
          <div className="ale-footer-columns">
            <div className="ale-footer-col">
              <span className="ale-footer-col-label">[ Socials ]</span>
              <ul className="ale-footer-links">
                {socials.map(([label, href]) =>
                  href ? (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer" data-magnetic>
                        {label}
                      </a>
                    </li>
                  ) : (
                    <li key={label} className="ale-footer-unconfigured">
                      {label}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="ale-footer-col">
              <span className="ale-footer-col-label">[ Nav ]</span>
              <ul className="ale-footer-links">
                <li><a href="/about" data-magnetic>About</a></li>
                <li><a href="/#work" data-magnetic>Work</a></li>
                <li><a href="#contact-intro" data-magnetic>Contact</a></li>
              </ul>
            </div>

            <div className="ale-footer-col">
              <span className="ale-footer-col-label">[ Contact ]</span>
              <ul className="ale-footer-links">
                {profile.email && (
                  <li>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </li>
                )}
              </ul>
            </div>

            <div className="ale-footer-col">
              <span className="ale-footer-col-label">[ Local time ]</span>
              <p className="ale-footer-time">
                <FooterClock timeZone={profile.timezone} />{" "}
                <span className="ale-footer-gmt">GMT+6</span>
              </p>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="ale-footer-bar">
            <span className="ale-footer-tagline">
              Small details, big impact.
            </span>
            <span className="ale-footer-copyright">
              © {new Date().getFullYear()}, {profile.nickname}
            </span>
          </div>
        </div>

        <FooterMotion footerId={FOOTER_ID} />
      </footer>
    </>
  );
}
