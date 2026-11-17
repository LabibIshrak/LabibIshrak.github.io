import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WorkArchive } from "@/components/work-archive";
import "./work.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Apps, systems and design work by Hasin Ishrak Labib, including Songket, winner of July Hackathon 2026.",
};

export default function WorkPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain wk-main">
        <Navigation />

        <header className="wk-hero">
          <div className="wk-wrap">
            <h1 className="wk-display" data-page-heading tabIndex={-1}>
              Software built for
              <br />
              the real world
            </h1>
          </div>
        </header>

        <WorkArchive />
      </main>

      <Footer />
    </div>
  );
}
