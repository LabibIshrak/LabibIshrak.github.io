export function RotatingGlobe() {
  return (
    <span className="location-globe" aria-hidden="true">
      <svg
        className="location-globe-frame"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
      >
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" />

        {/* Vertical axis */}
        <line x1="50" y1="5" x2="50" y2="95" />

        {/* Horizontal axis (Equator) */}
        <line x1="5" y1="50" x2="95" y2="50" />

        {/* Longitude ellipse */}
        <ellipse cx="50" cy="50" rx="22" ry="45" />

        {/* Latitude ellipse */}
        <ellipse cx="50" cy="50" rx="45" ry="18" />
      </svg>
    </span>
  );
}
