export function RotatingGlobe() {
  return (
    <span className="location-globe" aria-hidden="true">
      {/* Stationary frame: outer ring + latitude lines */}
      <svg
        className="location-globe-frame"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" />

        {/* Equator — strongest line */}
        <ellipse cx="50" cy="50" rx="45" ry="14" opacity="0.7" />

        {/* Tropic of Cancer */}
        <ellipse cx="50" cy="34" rx="37" ry="8" opacity="0.35" />

        {/* Tropic of Capricorn */}
        <ellipse cx="50" cy="66" rx="37" ry="8" opacity="0.35" />

        {/* Arctic circle */}
        <ellipse cx="50" cy="20" rx="22" ry="5" opacity="0.2" />

        {/* Antarctic circle */}
        <ellipse cx="50" cy="80" rx="22" ry="5" opacity="0.2" />

        {/* Vertical axis — subtle pole-to-pole line */}
        <ellipse cx="50" cy="50" rx="4" ry="45" opacity="0.25" />
      </svg>

      {/* Longitude meridians rotate around the vertical axis */}
      <span className="location-globe-rotor">
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <svg
            key={angle}
            className="location-globe-meridian"
            viewBox="0 0 100 100"
            fill="none"
            style={{
              transform: `rotateY(${angle}deg)`,
            }}
          >
            <circle cx="50" cy="50" r="45" />
          </svg>
        ))}
      </span>
    </span>
  );
}
