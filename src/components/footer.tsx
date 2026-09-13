"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState("—");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    function update() {
      setTime(formatter.format(new Date()));
    }

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const footer = ref.current;
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
  }, []);

  const socials = [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["Last.fm", profile.lastfm],
  ];

  return (
    <footer ref={ref} id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-topline">
          <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
          <ArrowDownRight size={34} strokeWidth={1.3} aria-hidden="true" />
        </div>

        <h2>
          Let&apos;s work
          <br />
          <span>together.</span>
        </h2>

        <div className="footer-contact-line">
          <div className="footer-rule" />

          {profile.email ? (
            <a
              className="round-button footer-email-button"
              href={`mailto:${profile.email}`}
              data-magnetic
            >
              Get in touch
              <ArrowUpRight size={23} />
            </a>
          ) : (
            <button
              className="round-button footer-email-button"
              disabled
              title="Set your email in src/lib/content.ts"
            >
              Email
              <span className="button-note">ADD ADDRESS</span>
            </button>
          )}
        </div>

        {profile.email ? (
          <a className="email-chip" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        ) : (
          <p className="setup-note">
            Set your email and social URLs in src/lib/content.ts.
          </p>
        )}

        <div className="footer-bottom">
          <div>
            <span className="footer-label">VERSION</span>
            <p>{new Date().getFullYear()} © Labib</p>
          </div>

          <div className="clock-block">
            <span className="footer-label">LOCAL TIME / BANGLADESH</span>
            <p>
              <time>{time}</time> <span className="muted">GMT+6</span>
            </p>
          </div>

          <div className="footer-social-block">
            <span className="footer-label">ELSEWHERE</span>
            <div className="footer-socials">
              {socials.map(([label, href]) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                  >
                    {label}
                  </a>
                ) : (
                  <span
                    key={label}
                    className="unconfigured-link"
                    title={`Configure your ${label} URL`}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
