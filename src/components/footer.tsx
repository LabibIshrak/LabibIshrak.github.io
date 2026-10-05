import { profile } from "@/lib/content";
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
        <div className="ale-footer-frame footer-content">
          <span className="ale-bracket is-left" aria-hidden="true" />
          <span className="ale-bracket is-right" aria-hidden="true" />

          <div className="ale-footer-columns">
            <div className="ale-footer-col">
              <h3 className="ale-footer-col-label">[ Socials ]</h3>
              <ul className="ale-footer-links">
                {socials.map(([label, href]) =>
                  href ? (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer">
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
              <h3 className="ale-footer-col-label">[ Nav ]</h3>
              <ul className="ale-footer-links">
                <li><a href="/about">About me</a></li>
                <li><a href="/#work">Work</a></li>
                <li><a href="#contact-intro">Contact</a></li>
              </ul>
            </div>

            <div className="ale-footer-col">
              <h3 className="ale-footer-col-label">[ Contact ]</h3>
              <ul className="ale-footer-links">
                {profile.email && (
                  <li>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="ale-footer-bar">
          <span>Small details, big impact</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <FooterMotion footerId={FOOTER_ID} />
      </footer>
    </>
  );
}
