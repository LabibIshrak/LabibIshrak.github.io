import { TransitionLink } from "@/components/runtime";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">404 / WRONG TURN</span>
      <h1 data-page-heading tabIndex={-1}>
        Nothing here.
      </h1>
      <TransitionLink href="/" className="email-chip">
        Back to the portfolio ↗
      </TransitionLink>
    </main>
  );
}
