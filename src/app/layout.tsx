import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Noto_Sans_Bengali } from "next/font/google";
import { Runtime } from "@/components/runtime";
import { bootScript } from "@/lib/boot";
import "./globals.css";
import "./editorial.css";

// Hanken Grotesk is a variable font: omitting `weight` serves one file
// covering every weight, so the in-between 450 "book" weight works.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  display: "swap",
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishraklabib.me"),
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
    <html lang="en" className={`${sans.variable} ${bengali.variable}`} suppressHydrationWarning>
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
