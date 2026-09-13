export function RotatingGlobe() {
  return (
    <span className="location-globe" aria-hidden="true">
      {/* Stationary silhouette and latitude lines */}
      <svg
        className="location-globe-frame"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="45" />

        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="15"
        />

        <path d="M5 50H95" />
      </svg>

      {/* Longitude circles rotate around the vertical axis */}
      <span className="location-globe-rotor">
        {[0, 60, 120].map((angle) => (
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
