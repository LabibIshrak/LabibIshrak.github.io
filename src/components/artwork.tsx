import type { Project } from "@/lib/content";

export function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div
      className={`project-artwork artwork-${project.artwork}`}
      style={{ backgroundColor: project.color }}
    >
      <svg
        viewBox="0 0 800 600"
        role="img"
        aria-label={`Placeholder concept artwork for ${project.title}`}
      >
        {project.artwork === "recipe" && (
          <>
            <rect x="255" y="65" width="290" height="480" rx="36" fill="#f8f8f0" />
            <rect x="335" y="80" width="130" height="15" rx="8" fill="#263d30" />
            <text x="285" y="150" fontSize="30" fill="#263d30">
              Mamoni&apos;s
            </text>
            <text x="285" y="180" fontSize="13" fill="#69786b">
              A LITTLE TASTE OF HOME
            </text>
            <circle cx="400" cy="305" r="91" fill="#e7e1ce" />
            <circle cx="400" cy="305" r="70" fill="#a7bb81" />
            <path d="M350 320Q390 210 450 300Q430 360 350 320" fill="#687f49" />
            <rect x="285" y="430" width="230" height="48" rx="24" fill="#263d30" />
            <text x="355" y="460" fontSize="14" fill="#fff">Find a recipe</text>
          </>
        )}

        {project.artwork === "fitness" && (
          <>
            <rect x="100" y="110" width="600" height="380" rx="20" fill="#202027" />
            <text x="140" y="165" fontSize="18" fill="#fff">YOUR DAILY MOMENTUM</text>
            <text x="140" y="245" fontSize="60" fill="#e2deff">Move better.</text>
            <circle cx="563" cy="290" r="76" fill="none" stroke="#484354" strokeWidth="19" />
            <path
              d="M563 214A76 76 0 1 1 489 307"
              fill="none"
              stroke="#b9a7ff"
              strokeWidth="19"
              strokeLinecap="round"
            />
            <text x="537" y="300" fontSize="30" fill="#fff">84</text>
            <path
              d="M145 399L190 365L229 380L270 330L309 345L350 302L398 315"
              fill="none"
              stroke="#b9a7ff"
              strokeWidth="5"
            />
          </>
        )}

        {project.artwork === "system" && (
          <>
            <rect x="70" y="75" width="660" height="450" rx="8" fill="#21303a" />
            <g stroke="#758f9e" strokeWidth="2" fill="none">
              <path d="M400 160V260M200 260H600M200 260V375M400 260V375M600 260V375" />
              <circle cx="400" cy="155" r="48" />
              <rect x="135" y="375" width="130" height="65" />
              <rect x="335" y="375" width="130" height="65" />
              <rect x="535" y="375" width="130" height="65" />
            </g>
            <g fill="#e0e8ed" fontSize="12" textAnchor="middle">
              <text x="400" y="160">WORLD</text>
              <text x="200" y="413">SYSTEMS</text>
              <text x="400" y="413">NARRATIVE</text>
              <text x="600" y="413">MECHANICS</text>
            </g>
            <text x="100" y="490" fontSize="16" fill="#9db1bd">
              REICHSWACHT / SYSTEM STUDY
            </text>
          </>
        )}

        {project.artwork === "emblem" && (
          <>
            <g stroke="#b8b2a7" strokeWidth="1">
              <path d="M100 100H700M100 300H700M100 500H700M200 70V530M400 70V530M600 70V530" />
            </g>
            <g fill="#292b28">
              <path d="M180 360L270 190L360 360H315L270 275L225 360Z" />
              <path d="M440 190H610V235H485V275H585V320H485V360H440Z" />
            </g>
            <text x="270" y="435" textAnchor="middle" fontSize="12" fill="#52564e">
              FORM / 01
            </text>
            <text x="525" y="435" textAnchor="middle" fontSize="12" fill="#52564e">
              FORM / 02
            </text>
          </>
        )}
      </svg>

      <span className="artwork-caption">CONCEPT PLACEHOLDER</span>
    </div>
  );
}

export function ProfilePlaceholder() {
  return (
    <svg
      viewBox="0 0 700 800"
      className="profile-placeholder"
      role="img"
      aria-label="Abstract portrait placeholder; replace with a photograph of Hasin"
    >
      <circle cx="350" cy="275" r="190" fill="#b9bdc6" opacity="0.11" />
      <circle cx="350" cy="300" r="116" fill="#737985" />
      <path
        d="M100 800V685C100 510 202 440 350 440S600 510 600 685V800Z"
        fill="#555c69"
      />
      <path
        d="M245 255C245 155 465 138 470 286C429 267 390 229 365 205C338 242 290 265 245 255Z"
        fill="#30353e"
      />
      <path d="M105 797L239 482L350 640L460 482L600 797Z" fill="#444b58" />
      <circle cx="350" cy="300" r="235" fill="none" stroke="#dde0e7" opacity="0.13" />
    </svg>
  );
}
