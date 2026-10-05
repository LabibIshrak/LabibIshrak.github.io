"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Words cycled in the centre of the stage. Bangla sits in the middle and closes the loop. */
const WORDS: { text: string; lang: string }[] = [
  { text: "Contact", lang: "en" },
  { text: "Contacto", lang: "es" },
  { text: "যোগাযোগ", lang: "bn" },
  { text: "Kontakt", lang: "de" },
  { text: "連絡", lang: "ja" },
  { text: "Contatto", lang: "it" },
  { text: "Связь", lang: "ru" },
  { text: "কথা বলি", lang: "bn" },
];

/** Greetings for the drifting marquee rows. */
const ROWS = [
  ["Hello", "হ্যালো", "Hola", "Bonjour", "こんにちは", "Ciao", "নমস্কার", "Olá"],
  ["Let's talk", "চলো কথা বলি", "Hablemos", "Parlons", "話そう", "Parliamo", "Reden wir"],
  ["Say hi", "শুভেচ্ছা", "Salut", "Hallo", "안녕", "Привет", "Ahoj", "স্বাগতম"],
];

export function ContactTransition() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLElement>(".ct-word");
        const rows = gsap.utils.toArray<HTMLElement>(".ct-row-track");

        gsap.set(words, { yPercent: 110 });
        gsap.set(words[0], { yPercent: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: ".ct-stage",
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Marquee rows drift in alternating directions for the whole pin.
        rows.forEach((row, i) => {
          tl.fromTo(
            row,
            { xPercent: i % 2 ? -45 : 0 },
            { xPercent: i % 2 ? 0 : -45, ease: "none", duration: WORDS.length },
            0,
          );
        });

        // Centre word: each language rolls up through a mask.
        words.forEach((word, i) => {
          if (i === 0) return;
          const at = i - 0.5;
          tl.to(words[i - 1], { yPercent: -110, duration: 0.6 }, at);
          tl.to(word, { yPercent: 0, duration: 0.6 }, at);
        });

        tl.fromTo(
          ".ct-counter-bar",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: WORDS.length },
          0,
        );

        // Finale: accent circle swallows the stage, inviting the footer.
        tl.fromTo(
          ".ct-orb",
          { scale: 0 },
          { scale: 1, duration: 1.4, ease: "power2.in" },
          WORDS.length - 0.6,
        );
        tl.to(
          ".ct-rows, .ct-center, .ct-meta",
          { opacity: 0, duration: 0.6 },
          WORDS.length - 0.2,
        );
        tl.fromTo(
          ".ct-finale",
          { opacity: 0, yPercent: 30 },
          { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" },
          WORDS.length + 0.4,
        );
      }, root);

      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} id="contact-intro" className="contact-transition" aria-label="Contact intro">
      <div className="ct-stage">
        <div className="ct-rows" aria-hidden="true">
          {ROWS.map((row, i) => (
            <div className="ct-row" key={i}>
              <div className="ct-row-track">
                {[...row, ...row, ...row].map((w, j) => (
                  <span key={j}>
                    {w}
                    <i className="ct-dot" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ct-center">
          <span className="eyebrow">GET IN TOUCH — যোগাযোগ</span>
          <div className="ct-mask">
            {WORDS.map((w) => (
              <span className="ct-word" lang={w.lang} key={w.text}>
                {w.text}
              </span>
            ))}
          </div>
        </div>

        <div className="ct-meta" aria-hidden="true">
          <span className="eyebrow">SCROLL</span>
          <div className="ct-counter">
            <div className="ct-counter-bar" />
          </div>
          <span className="eyebrow">MANY LANGUAGES, ONE INBOX</span>
        </div>

        <div className="ct-orb" aria-hidden="true" />

        <div className="ct-finale" aria-hidden="true">
          <span>Let&apos;s talk</span>
          <span lang="bn">চলো কথা বলি ↓</span>
        </div>
      </div>
    </section>
  );
}
