import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Outfit } from "next/font/google";
import { Runtime } from "@/components/runtime";
import { bootScript } from "@/lib/boot";
import "./globals.css";
import "./editorial.css";

// Outfit is a variable font: omitting `weight` serves one variable file
// that covers every weight instead of separate static files.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: {
    default: "Hasin Ishrak Labib — Software Developer",
    template: "%s — Labib",
  },
  description:
    "Hasin Ishrak Labib, a CS and Software Engineering student based in Bangladesh. C++, Flutter, applications, and systems design.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1d20",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The boot script adds classes to <html> before hydration.
    <html lang="en" className={`${outfit.variable} ${bengali.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Runtime>{children}</Runtime>
      </body>
    </html>
  );
}
