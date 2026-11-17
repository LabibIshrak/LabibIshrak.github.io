"use client";

import { useSyncExternalStore } from "react";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/content";
import { RETURN_STORAGE_KEY, useSiteNavigation } from "./runtime";

type ReturnTarget = { path: string; y: number };

const noop = () => () => {};

function readStored(): string | null {
  try {
    return sessionStorage.getItem(RETURN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null, current: string): ReturnTarget | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as ReturnTarget;
    if (typeof value.path !== "string" || !value.path.startsWith("/")) return null;
    if (value.path === current) return null;
    return { path: value.path, y: Number(value.y) || 0 };
  } catch {
    return null;
  }
}

/** Human name for where the link goes. */
export function returnLabel(path: string) {
  if (path === "/") return "Back home";
  if (path === "/work") return "Back to work";
  if (path === "/about") return "Back to about";
  const project = projects.find((p) => `/work/${p.slug}` === path);
  return project ? `Back to ${project.title}` : "Go back";
}

/**
 * Sends visitors back to the page (and scroll position) they entered the
 * inner pages from. Without a record, e.g. on a direct visit, it uses
 * `fallback` and lands at the top.
 */
export function ReturnLink({
  fallback,
  className,
  eyebrow,
}: {
  fallback: string;
  className?: string;
  /** Large layout: a small label above a big title. */
  eyebrow?: string;
}) {
  const pathname = usePathname();
  const nav = useSiteNavigation();
  const raw = useSyncExternalStore(noop, readStored, () => null);
  const target = parse(raw, pathname) ?? { path: fallback, y: 0 };

  return (
    <a
      href={target.path}
      className={className}
      data-magnetic
      onClick={(event) => {
        if (!nav || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        if (!nav.busy) void nav.navigate(target.path, target.y ? { y: target.y } : undefined);
      }}
    >
      {eyebrow ? (
        <>
          <span className="return-eyebrow">{eyebrow}</span>
          <span className="return-title">
            <ArrowLeft aria-hidden="true" />
            {returnLabel(target.path)}
          </span>
        </>
      ) : (
        <>← {returnLabel(target.path)}</>
      )}
    </a>
  );
}
