import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~20–30% smaller than WebP; WebP stays as the fallback.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shake icon/animation barrels so only used modules ship.
    optimizePackageImports: ["lucide-react", "gsap"],
  },
};

export default nextConfig;
