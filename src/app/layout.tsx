import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Runtime } from "@/components/runtime";
import "./globals.css";
import "./editorial.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={outfit.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Runtime>{children}</Runtime>
      </body>
    </html>
  );
}
