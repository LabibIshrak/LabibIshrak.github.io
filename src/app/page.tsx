import { Navigation } from "@/components/navigation";
import { Portfolio } from "@/components/portfolio";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="page-shell">
      <main id="main" className="main-curtain">
        <Navigation />
        <Portfolio />
      </main>

      <Footer />
    </div>
  );
}
