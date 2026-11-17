import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

const SITE = "https://ishraklabib.me";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    { url: `${SITE}/about`, priority: 0.8 },
    { url: `${SITE}/work`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE}/work/${p.slug}`, priority: 0.7 })),
  ];
}
