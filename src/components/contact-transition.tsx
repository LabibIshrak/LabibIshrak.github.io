"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/lib/content";

/** "Contact" in many languages; Bangla is just one voice among them. */
const WORDS = [
  "CONTACT",
  "CONTACTO",
  "CONTACTEZ",
  "CONTATTO",
  "KONTAKT",
  "CONTATO",
  "КОНТАКТ",
  "お問い合わせ",
  "联系",
  "연락",
  "যোগাযোগ",
  "ΕΠΑΦΗ",
];

/** Radial anchor points (vw / vh) the words drift toward as they fly past. */
const ANCHORS = [
  { x: -38, y: -38 }, { x: -14, y: -40 }, { x: 14, y: -40 }, { x: 38, y: -38 },
  { x: -42, y: -14 }, { x: -18, y: -18 }, { x: 18, y: -18 }, { x: 42, y: -14 },
  { x: -42, y: 14 }, { x: -18, y: 18 }, { x: 18, y: 18 }, { x: 42, y: 14 },
  { x: -38, y: 38 }, { x: -14, y: 40 }, { x: 14, y: 40 }, { x: 38, y: 38 },
];

const WORD_COUNT = 50;

/** Pre-built spans — avoids recreating 50 elements on every render. */
const wordSpans = Array.from({ length: WORD_COUNT }, (_, i) => (
  <span className="ct-word" key={i}>
    {WORDS[i % WORDS.length]}
  </span>
));

export function ContactTransition() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const content = root.querySelector<HTMLElement>(".ct-content");
    const words = gsap.utils.toArray<HTMLElement>(".ct-word", root);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Content sharpens into focus as the section arrives.
        gsap.fromTo(
          content,
          { autoAlpha: 0, yPercent: 25, scale: 0.96, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 60%",
              end: "top 25%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        // Warp tunnel: words rush from deep space past the camera.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const r = gsap.utils.random;

        words.forEach((word, i) => {
          const a = ANCHORS[i % ANCHORS.length];
          const wave = 0.12 * Math.floor(i / ANCHORS.length);
          const at = r(0, 0.52) + wave;
          const inDur = r(0.12, 0.18);
          const outDur = r(0.12, 0.18);
          const midX = a.x + r(-4, 4);
          const midY = a.y + r(-4, 4);
          const scale = r(0.7, 1.3);

          gsap.set(word, {
            xPercent: -50,
            yPercent: -50,
            x: `${a.x * r(0.08, 0.22)}vw`,
            y: `${a.y * r(0.08, 0.22)}vh`,
            z: r(-1600, -1100),
            scale: 0.35 * scale,
            autoAlpha: 0,
            filter: "blur(10px)",
          });

          tl.to(
            word,
            {
              x: `${midX}vw`,
              y: `${midY}vh`,
              z: 0,
              scale,
              autoAlpha: r(0.25, 0.62),
              filter: "blur(0px)",
              duration: inDur,
              ease: "power1.inOut",
            },
            at,
          ).to(
            word,
            {
              x: `${midX + r(-3, 3)}vw`,
              y: `${midY + r(-3, 3)}vh`,
              z: r(800, 1200),
              scale: scale * r(1.3, 1.65),
              autoAlpha: 0,
              filter: "blur(8px)",
              duration: outDur,
              ease: "power1.in",
            },
            at + inDur,
          );
        });
      }, root);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="contact-intro" className="contact-warp">
      <div className="ct-sticky">
        <div className="ct-words" aria-hidden="true">
          {wordSpans}
        </div>

        <div className="ct-content">
          <h2>CONTACT</h2>
          <p>
            Have a project in mind? Let&apos;s talk. Share a few details, and
            I&apos;ll get back to you as soon as possible.
          </p>
          <div className="ct-actions">
            {profile.email && (
              <a className="ct-button is-primary" href={`mailto:${profile.email}`} data-magnetic>
                BOOK A CALL
              </a>
            )}
            {profile.email && (
              <a className="ct-button is-dark" href={`mailto:${profile.email}?subject=Quote`} data-magnetic>
                GET A QUOTE
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
