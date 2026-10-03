"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, CustomEase } from "@/lib/gsap";
import { INTRO_CLASS, INTRO_STORAGE_KEY } from "@/lib/boot";

// Same cubic-bezier the curtain used with framer-motion: [0.76, 0, 0.24, 1].
const CURTAIN_EASE = CustomEase.create(
  "route-curtain",
  "M0,0 C0.76,0 0.24,1 1,1",
);

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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHash(
  hash: string,
  lenis: Lenis | null,
  immediate: boolean,
) {
  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, immediate ? { immediate: true, force: true } : {});
  } else {
    target.scrollIntoView(immediate ? { behavior: "instant" } : undefined);
  }
}

function Preloader() {
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const panel = panelRef.current;
    const word = wordRef.current;

    if (!panel || !word) return;

    const root = document.documentElement;

    // The pre-paint boot script decides whether the intro should play
    // (first visit to "/" this session, no reduced-motion preference).
    // Without that class the panel is display:none, so nothing flashes.
    if (!root.classList.contains(INTRO_CLASS)) {
      setVisible(false);
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {
          // Storage persistence is optional.
        }

        root.classList.remove(INTRO_CLASS);
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

        // Cached hit-testing results for the element under the pointer.
        let lastTarget: EventTarget | null = null;
        let magnet: HTMLElement | null = null;
        let link: Element | null = null;
        let labelTarget: HTMLElement | null = null;

        // Magnet state. The resting center is measured once per magnet
        // (and again after scroll/resize) instead of on every move.
        let activeMagnet: HTMLElement | null = null;
        let magnetX: ReturnType<typeof gsap.quickTo> | null = null;
        let magnetY: ReturnType<typeof gsap.quickTo> | null = null;
        let restCenterX = 0;
        let restCenterY = 0;
        let boundsDirty = true;

        // Last values written to the DOM, so we only write on change.
        let shown = false;
        let lastMode = cursor.dataset.mode ?? "default";
        let lastLabel = cursor.textContent ?? "";

        function measureMagnet(element: HTMLElement) {
          const bounds = element.getBoundingClientRect();
          // Subtract the current magnetic offset to get the resting center.
          restCenterX =
            bounds.left + bounds.width / 2 -
            (gsap.getProperty(element, "x") as number);
          restCenterY =
            bounds.top + bounds.height / 2 -
            (gsap.getProperty(element, "y") as number);
          boundsDirty = false;
        }

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
          magnetX = null;
          magnetY = null;
        }

        function invalidateBounds() {
          boundsDirty = true;
        }

        function move(event: PointerEvent) {
          if (!cursor) return;

          const target = event.target as HTMLElement;

          if (target !== lastTarget) {
            lastTarget = target;
            magnet = target.closest<HTMLElement>("[data-magnetic]");
            link = target.closest("a, button");
            labelTarget = target.closest<HTMLElement>("[data-cursor]");
          }

          if (activeMagnet && activeMagnet !== magnet) {
            resetMagnet();
          }

          let x = event.clientX;
          let y = event.clientY;

          if (magnet) {
            if (activeMagnet !== magnet) {
              activeMagnet = magnet;
              gsap.killTweensOf(magnet, "x,y");
              measureMagnet(magnet);
              magnetX = gsap.quickTo(magnet, "x", {
                duration: 0.35,
                ease: "power3.out",
              });
              magnetY = gsap.quickTo(magnet, "y", {
                duration: 0.35,
                ease: "power3.out",
              });
            } else if (boundsDirty) {
              measureMagnet(magnet);
            }

            // Live center = resting center + current magnetic offset,
            // identical to reading getBoundingClientRect() each move but
            // without forcing a layout.
            const centerX =
              restCenterX + (gsap.getProperty(magnet, "x") as number);
            const centerY =
              restCenterY + (gsap.getProperty(magnet, "y") as number);
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            magnetX?.(dx * 0.16);
            magnetY?.(dy * 0.16);

            // The cursor approaches the target's center while retaining
            // a small amount of direct pointer movement.
            x = centerX + dx * 0.3;
            y = centerY + dy * 0.3;
          }

          moveX(x);
          moveY(y);

          if (!shown) {
            cursor.style.opacity = "1";
            shown = true;
          }

          const mode = magnet
            ? "magnetic"
            : labelTarget
              ? "label"
              : link
                ? "link"
                : "default";

          if (mode !== lastMode) {
            cursor.dataset.mode = mode;
            lastMode = mode;
          }

          const label = labelTarget?.dataset.cursor ?? "";

          if (label !== lastLabel) {
            cursor.textContent = label;
            lastLabel = label;
          }
        }

        function leave() {
          if (cursor && shown) {
            cursor.style.opacity = "0";
            shown = false;
          }
          resetMagnet();
        }

        window.addEventListener("pointermove", move);
        window.addEventListener("blur", leave);
        window.addEventListener("scroll", invalidateBounds, { passive: true });
        window.addEventListener("resize", invalidateBounds);
        document.documentElement.addEventListener("pointerleave", leave);

        return () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("blur", leave);
          window.removeEventListener("scroll", invalidateBounds);
          window.removeEventListener("resize", invalidateBounds);
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

type PendingNavigation = {
  path: string;
  hash: string;
};

export function Runtime({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const curtainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathnameRef = useRef(pathname);
  const pendingRef = useRef<PendingNavigation | null>(null);
  const busyRef = useRef(false);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

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

  // Stable for the lifetime of the app: reads the pathname from a ref,
  // so consumers of the context don't re-render on every route change.
  const navigate = useCallback(
    async (href: string) => {
      if (busyRef.current) return;

      const hashIndex = href.indexOf("#");
      const path =
        hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
      const hash = hashIndex === -1 ? "" : href.slice(hashIndex + 1);

      // Same page: only an in-page anchor jump (e.g. "/#work" on "/").
      if (path === pathnameRef.current) {
        if (hash) {
          window.history.pushState(null, "", href);
          scrollToHash(hash, lenisRef.current, false);
        }
        return;
      }

      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }

      const curtain = curtainRef.current;
      if (!curtain) {
        router.push(href);
        return;
      }

      busyRef.current = true;
      setBusy(true);
      pendingRef.current = { path, hash };
      lenisRef.current?.stop();

      // A failed navigation should never permanently cover the website.
      watchdogRef.current = setTimeout(() => {
        pendingRef.current = null;
        gsap.killTweensOf(curtain);
        gsap.set(curtain, { y: 0, yPercent: -101 });
        busyRef.current = false;
        setBusy(false);
        lenisRef.current?.start();
      }, 12000);

      gsap.killTweensOf(curtain);
      gsap.set(curtain, { y: 0, yPercent: 101 });

      await new Promise<void>((resolve) => {
        gsap.to(curtain, {
          yPercent: 0,
          duration: 0.55,
          ease: CURTAIN_EASE,
          onComplete: resolve,
        });
      });

      router.push(href, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    let frame = 0;
    const pending = pendingRef.current;

    if (pending && pending.path === pathname) {
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

        if (pending.hash) {
          scrollToHash(pending.hash, lenisRef.current, true);
        }

        const heading = document.querySelector<HTMLElement>(
          "[data-page-heading]",
        );
        heading?.focus({ preventScroll: true });

        const curtain = curtainRef.current;

        const finish = () => {
          busyRef.current = false;
          setBusy(false);
          lenisRef.current?.start();
        };

        if (!curtain) {
          finish();
          return;
        }

        gsap.to(curtain, {
          yPercent: -101,
          duration: 0.65,
          ease: CURTAIN_EASE,
          onComplete: finish,
        });
      });
    } else {
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, []);

  const contextValue = useMemo(
    () => ({ navigate, busy }),
    [navigate, busy],
  );

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
      <Cursor />
      <Preloader />

      <div
        ref={curtainRef}
        className="route-curtain"
        style={{
          transform: "translateY(101%)",
          pointerEvents: busy ? "auto" : "none",
        }}
        aria-hidden="true"
      >
        <span>Labib.</span>
        <span className="curtain-caption">A DIFFERENT PERSPECTIVE</span>
      </div>

      <span className="sr-only" role="status">
        {busy ? "Opening page" : ""}
      </span>
    </NavigationContext.Provider>
  );
}
