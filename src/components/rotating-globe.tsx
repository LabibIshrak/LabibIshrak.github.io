export function RotatingGlobe() {
  return (
    <span className="location-globe" aria-hidden="true">
      {/* Stationary silhouette, latitude lines, and tropics */}
      <svg
        className="location-globe-frame"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" />

        {/* Equator */}
        <ellipse cx="50" cy="50" rx="45" ry="14" />

        {/* Tropic of Cancer */}
        <ellipse cx="50" cy="33" rx="36" ry="9" opacity="0.5" />

        {/* Tropic of Capricorn */}
        <ellipse cx="50" cy="67" rx="36" ry="9" opacity="0.5" />
      </svg>

      {/* Longitude circles rotate around the vertical axis */}
      <span className="location-globe-rotor">
        {[0, 45, 90, 135].map((angle) => (
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

