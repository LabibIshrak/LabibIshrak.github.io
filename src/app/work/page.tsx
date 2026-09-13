import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TransitionLink } from "@/components/runtime";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Applications, systems design, and visual experiments by Hasin Ishrak Labib.",
};

export default function AllWorkPage() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain editorial-archive">
        <Navigation />

        <header className="editorial-archive-header editorial-container">
          <TransitionLink href="/" className="back-link">
            <ArrowLeft size={18} />
            Back to home
          </TransitionLink>

          <p className="editorial-label">APPLICATIONS / SYSTEMS / DESIGN</p>

          <h1 data-page-heading tabIndex={-1}>
            Different ideas.
            <br />
            The same care.
          </h1>

          <p className="editorial-archive-description">
            A collection of software projects, system studies, and visual
            experiments. Select a project to explore its case study.
          </p>
        </header>

        <WorkIndex all />
      </main>

      <Footer />
    </div>
  );
}
