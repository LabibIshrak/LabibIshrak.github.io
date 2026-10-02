"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { TransitionLink } from "./runtime";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (open && event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="navigation">
      <TransitionLink
        href="/"
        className="wordmark"
        aria-label="Labib home"
        data-magnetic
      >
        <span className="wordmark-symbol">©</span>
        <span>Code by Labib</span>
      </TransitionLink>

      <nav className="desktop-navigation" aria-label="Main navigation">
        <TransitionLink href="/about" data-magnetic>About</TransitionLink>
        <a href="/#work" data-magnetic>Work</a>
        <a href="#contact" data-magnetic>
          Contact <ArrowUpRight size={15} />
        </a>
      </nav>

      <button
        ref={triggerRef}
        className="mobile-menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav
        id="mobile-menu"
        className="mobile-menu"
        hidden={!open}
        aria-label="Mobile navigation"
      >
        <TransitionLink href="/about" onClick={() => setOpen(false)}>
          About
          <ArrowUpRight />
        </TransitionLink>
        <a href="/#work" onClick={() => setOpen(false)}>
          Work
          <ArrowUpRight />
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
          <ArrowUpRight />
        </a>
      </nav>
    </header>
  );
}
