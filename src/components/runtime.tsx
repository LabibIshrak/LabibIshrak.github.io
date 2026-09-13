"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type NavigationContextValue = {
  navigate: (href: string) => Promise<void>;
  busy: boolean;
};

const NavigationContext = createContext<NavigationContextValue | null>(
  null,
);

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "こんにちは",
  "নমস্কার",
];

function Preloader() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const panel = panelRef.current;
    const word = wordRef.current;

    if (!panel || !word) return;

    let alreadySeen = false;

    try {
      alreadySeen = sessionStorage.getItem("bibni-intro-seen") === "1";
    } catch {
      // The portfolio still works when browser storage is unavailable.
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (pathname !== "/" || alreadySeen || reduced) {
      setVisible(false);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("bibni-intro-seen", "1");
        } catch {
          // Storage persistence is optional.
        }

        setVisible(false);
      },
    });

    greetings.forEach((greeting, index) => {
      timeline.call(
        () => {
          word.textContent = greeting;
        },
        [],
        index * 0.24,
      );
    });

    timeline.to(
      panel,
      {
        yPercent: -101,
        duration: 0.85,
        ease: "power4.inOut",
      },
      greetings.length * 0.24 + 0.15,
    );

    return () => {
      timeline.kill();
    };
    // This is an initial-visit treatment, not a route-change animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div ref={panelRef} className="preloader" aria-hidden="true">
      <span className="preloader-dot" />
      <span ref={wordRef}>Hello</span>
      <span className="preloader-edition">LABIB — PORTFOLIO</span>
    </div>
  );
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const moveX = gsap.quickTo(cursor, "x", {
          duration: 0.2,
          ease: "power3.out",
        });

        const moveY = gsap.quickTo(cursor, "y", {
          duration: 0.2,
          ease: "power3.out",
        });

        let activeMagnet: HTMLElement | null = null;

        function resetMagnet() {
          if (!activeMagnet) return;

          gsap.to(activeMagnet, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });

          activeMagnet = null;
        }

        function move(event: PointerEvent) {
          if (!cursor) return;

          const target = event.target as HTMLElement;
          const magnet = target.closest<HTMLElement>("[data-magnetic]");
          const link = target.closest("a, button");
          const labelTarget = target.closest<HTMLElement>("[data-cursor]");

          if (activeMagnet && activeMagnet !== magnet) {
            resetMagnet();
          }

          let x = event.clientX;
          let y = event.clientY;

          if (magnet) {
            activeMagnet = magnet;

            const bounds = magnet.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            gsap.to(magnet, {
              x: dx * 0.16,
              y: dy * 0.16,
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });

            // The cursor approaches the target's center while retaining
            // a small amount of direct pointer movement.
            x = centerX + dx * 0.3;
            y = centerY + dy * 0.3;
          }

          moveX(x);
          moveY(y);

          cursor.style.opacity = "1";
          cursor.dataset.mode = magnet
            ? "magnetic"
            : labelTarget
              ? "label"
              : link
                ? "link"
                : "default";

          cursor.textContent = labelTarget?.dataset.cursor ?? "";
        }

        function leave() {
          if (cursor) cursor.style.opacity = "0";
          resetMagnet();
        }

        window.addEventListener("pointermove", move);
        window.addEventListener("blur", leave);
        document.documentElement.addEventListener("pointerleave", leave);

        return () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("blur", leave);
          document.documentElement.removeEventListener(
            "pointerleave",
            leave,
          );
          resetMagnet();
          gsap.killTweensOf(cursor);
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-mode="default"
      aria-hidden="true"
    />
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const context = useContext(NavigationContext);

  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank" ||
          !href.startsWith("/") ||
          href.includes("#") ||
          !context
        ) {
          return;
        }

        event.preventDefault();

        if (!context.busy) {
          void context.navigate(href);
        }
      }}
    >
      {children}
    </Link>
  );
}

export function Runtime({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const curtain = useAnimationControls();

  const lenisRef = useRef<Lenis | null>(null);
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    });

    return () => media.revert();
  }, []);

  const navigate = useCallback(
    async (href: string) => {
      if (busyRef.current || href === pathname) return;

      if (reduced) {
        router.push(href);
        return;
      }

      busyRef.current = true;
      setBusy(true);
      pendingRef.current = href;
      lenisRef.current?.stop();

      // A failed navigation should never permanently cover the website.
      watchdogRef.current = setTimeout(() => {
        pendingRef.current = null;
        curtain.set({ y: "-101%" });
        busyRef.current = false;
        setBusy(false);
        lenisRef.current?.start();
      }, 12000);

      curtain.set({ y: "101%" });

      await curtain.start({
        y: "0%",
        transition: {
          duration: 0.55,
          ease: [0.76, 0, 0.24, 1],
        },
      });

      router.push(href, { scroll: false });
    },
    [curtain, pathname, reduced, router],
  );

  useEffect(() => {
    let frame = 0;

    if (pendingRef.current === pathname) {
      pendingRef.current = null;

      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
      }

      // Cancel any in-progress smooth scroll before changing position.
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      lenisRef.current?.scrollTo(0, {
        immediate: true,
        force: true,
      });
      window.scrollTo(0, 0);

      document.documentElement.style.scrollBehavior = previousBehavior;

      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        const heading = document.querySelector<HTMLElement>(
          "[data-page-heading]",
        );
        heading?.focus({ preventScroll: true });

        void curtain
          .start({
            y: "-101%",
            transition: {
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            },
          })
          .then(() => {
            busyRef.current = false;
            setBusy(false);
            lenisRef.current?.start();
          });
      });
    } else {
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => cancelAnimationFrame(frame);
  }, [pathname, curtain]);

  useEffect(() => {
    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ navigate, busy }}>
      {children}
      <Cursor />
      <Preloader />

      <motion.div
        className="route-curtain"
        initial={{ y: "101%" }}
        animate={curtain}
        style={{ pointerEvents: busy ? "auto" : "none" }}
        aria-hidden="true"
      >
        <span>Labib.</span>
        <span className="curtain-caption">A DIFFERENT PERSPECTIVE</span>
      </motion.div>

      <span className="sr-only" role="status">
        {busy ? "Opening page" : ""}
      </span>
    </NavigationContext.Provider>
  );
}
