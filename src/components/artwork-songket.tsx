"use client";

import { useId } from "react";
import { keyTimes, useSvgTimeline } from "./use-svg-timeline";

/**
 * Songket showpiece in the app's own colours (Bangladesh green and red).
 * Phones form an offline Bluetooth mesh; encrypted messages hop from peer
 * to peer and land in the real Songket chat UI on the centre device, while
 * red signal rings echo the app icon.
 *
 * Everything runs on one 12s SMIL timeline so it stays in sync and can be
 * paused with a single call while off screen.
 */

const LOOP = 12; // seconds
const FADE_OUT = 0.92;

const MONO = "ui-monospace, 'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace";

const INK = "#0b2419";
const SAGE = "#9cc4a8"; // threads, labels
const RED = "#e8333b";
const CYAN = "#1aa3d1";
const SEND = "#2e9e5b";

/* Mesh peers around the phone. */
const nodes = [
  { id: "nick", x: 112, y: 132 },
  { id: "jack", x: 206, y: 300 },
  { id: "rumi", x: 92, y: 468 },
  { id: "mina", x: 690, y: 118 },
  { id: "arif", x: 702, y: 336 },
  { id: "tara", x: 604, y: 498 },
] as const;

const PHONE = { x: 400, y: 300 };

const threads = [
  "M112 132L206 300",
  "M92 468L206 300",
  "M206 300L400 300",
  "M112 132L400 300",
  "M690 118L702 336",
  "M702 336L400 300",
  "M604 498L702 336",
  "M604 498L400 300",
  "M690 118L400 300",
  "M92 468L604 498",
];

/* Packets: route, departure and arrival as fractions of the loop. */
const packets = [
  { path: "M92 468L206 300L400 300", start: 0.04, end: 0.2, from: "rumi" },
  { path: "M112 132L206 300L400 300", start: 0.22, end: 0.38, from: "nick" },
  { path: "M690 118L702 336L400 300", start: 0.4, end: 0.56, from: "mina" },
  { path: "M400 300L604 498", start: 0.64, end: 0.76, from: "phone" },
];

function Reveal({ at, children }: { at: number; children: React.ReactNode }) {
  const kt = keyTimes(0, at, at + 0.03, FADE_OUT, FADE_OUT + 0.04, 1);

  return (
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes={kt}
        dur={`${LOOP}s`}
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0 8;0 8;0 0;0 0;0 0;0 0"
        keyTimes={kt}
        dur={`${LOOP}s`}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

function Packet({ path, start, end }: { path: string; start: number; end: number }) {
  return (
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes={keyTimes(0, start - 0.002, start, end, end + 0.01, 1)}
        dur={`${LOOP}s`}
        repeatCount="indefinite"
      />
      <animateMotion
        path={path}
        keyPoints="0;0;1;1"
        keyTimes={keyTimes(0, start, end, 1)}
        calcMode="linear"
        dur={`${LOOP}s`}
        repeatCount="indefinite"
      />
      <circle r="10" fill={RED} opacity="0.28" />
      <circle r="4.5" fill="#ffd9db" />
    </g>
  );
}

function Pulse({ x, y, at }: { x: number; y: number; at: number }) {
  const kt = keyTimes(0, at - 0.002, at, at + 0.14, 1);

  return (
    <circle cx={x} cy={y} r="8" fill="none" stroke={RED} strokeWidth="1.4" opacity="0">
      <animate attributeName="r" values="8;8;8;58;58" keyTimes={kt} dur={`${LOOP}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes={kt} dur={`${LOOP}s`} repeatCount="indefinite" />
    </circle>
  );
}

const waveform = [5, 9, 14, 8, 17, 11, 6, 13, 18, 10, 7, 12, 15, 8, 5, 10, 13, 6];

export function SongketArtwork({ title }: { title: string }) {
  // Still frame (reduced motion): every message on screen.
  const svgRef = useSvgTimeline(LOOP * 0.8);
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `sk-${name}-${uid}`;

  const S = { x: 312, y: 84, w: 176, h: 442 }; // phone screen

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      role="img"
      aria-label={`${title}: phones relaying encrypted messages over an offline Bluetooth mesh`}
      className="songket-art"
    >
      <defs>
        {/* A fine woven diamond texture. */}
        <pattern id={id("weave")} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M18 0L36 18L18 36L0 18Z" fill="none" stroke={SAGE} strokeWidth="0.6" />
          <path d="M18 11L25 18L18 25L11 18Z" fill={SAGE} opacity="0.5" />
        </pattern>

        <radialGradient id={id("fade")} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={INK} stopOpacity="0" />
          <stop offset="100%" stopColor={INK} stopOpacity="1" />
        </radialGradient>

        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.22" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={id("photo")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f3b2c" />
          <stop offset="100%" stopColor="#0c1712" />
        </linearGradient>

        <clipPath id={id("screen")}>
          <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="24" />
        </clipPath>

        <clipPath id={id("played")}>
          <rect x="350" y="0" width="0" height="600">
            <animate
              attributeName="width"
              values="0;0;96;96;0"
              keyTimes={keyTimes(0, 0.4, 0.62, FADE_OUT, 1)}
              dur={`${LOOP}s`}
              repeatCount="indefinite"
            />
          </rect>
        </clipPath>
      </defs>

      {/* Backdrop */}
      <rect width="800" height="600" fill={INK} />
      <rect width="800" height="600" fill={`url(#${id("weave")})`} opacity="0.1" />
      <rect width="800" height="600" fill={`url(#${id("fade")})`} />

      {/* Threads */}
      <g stroke={SAGE} strokeWidth="1" opacity="0.38" fill="none">
        {threads.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Bluetooth range */}
      <g fill="none" stroke={SAGE} strokeWidth="0.8" strokeDasharray="2 5" opacity="0.22">
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r="46" />
        ))}
      </g>

      {packets.map((p) => {
        const origin = p.from === "phone" ? PHONE : nodes.find((n) => n.id === p.from)!;
        return <Pulse key={`pulse-${p.start}`} x={origin.x} y={origin.y} at={p.start} />;
      })}

      {/* Peers */}
      <g fontFamily={MONO} fontSize="11" fill={SAGE}>
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="12" fill={INK} stroke={SAGE} strokeWidth="1" />
            <circle cx={n.x} cy={n.y} r="4.5" fill={SAGE} />
            <text x={n.x} y={n.y + 30} textAnchor="middle" opacity="0.75">
              @{n.id}
            </text>
          </g>
        ))}
      </g>

      {packets.map((p) => (
        <Packet key={p.start} path={p.path} start={p.start} end={p.end} />
      ))}

      {/* Signal rings, after the app icon */}
      <g fill="none" stroke={RED} strokeWidth="1.5">
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={PHONE.x} cy={PHONE.y} r="120" opacity="0">
            <animate attributeName="r" values="120;300" dur="6s" begin={`${i * 2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0" dur="6s" begin={`${i * 2}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* Phone */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0;0 -6;0 0"
          dur="6s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        />

        <ellipse cx="400" cy="300" rx="190" ry="210" fill={`url(#${id("glow")})`} />
        <rect x="300" y="70" width="200" height="470" rx="34" fill="#05080b" />
        <rect x="301.5" y="71.5" width="197" height="467" rx="32.5" fill="none" stroke="#2a3138" />

        <g clipPath={`url(#${id("screen")})`} fontFamily={MONO}>
          <rect x={S.x} y={S.y} width={S.w} height={S.h} fill="#fbfbf8" />

          {/* Status bar */}
          <text x="326" y="104" fontSize="8.5" fill="#222">1:32</text>
          <rect x="455" y="97" width="16" height="7" rx="2" fill="none" stroke="#222" strokeWidth="1" />
          <rect x="457" y="99" width="10" height="3" fill="#222" />

          {/* Header */}
          <text x="324" y="128" fontSize="11">
            <tspan fill={CYAN} fontWeight="600">Songket/</tspan>
            <tspan fill="#8a8f95">@labib</tspan>
          </text>
          <text x="476" y="128" fontSize="8.5" fill={CYAN} textAnchor="end">
            #mesh • 6
          </text>
          <line x1={S.x} x2={S.x + S.w} y1="138" y2="138" stroke="#e6e6e1" />

          {/* 1 · text */}
          <Reveal at={0.2}>
            <text x="324" y="160" fontSize="8.5" fill="#d08a1a">&lt;@rumi&gt;</text>
            <text x="324" y="174" fontSize="8.5" fill="#2b2f33">no signal here. is</text>
            <text x="324" y="186" fontSize="8.5" fill="#2b2f33">anyone near the library?</text>
            <text x="324" y="198" fontSize="7" fill="#a3a7ab">[12:41:03] · 2 hops</text>
          </Reveal>

          {/* 2 · voice note */}
          <Reveal at={0.38}>
            <text x="324" y="222" fontSize="8.5" fill="#d08a1a">&lt;@nick&gt;</text>
            <circle cx="334" cy="244" r="9" fill="#6b4fd8" />
            <path d="M331 239.5L338 244L331 248.5Z" fill="#fff" />
            <g fill="#cfd2d6">
              {waveform.map((h, i) => (
                <rect key={i} x={352 + i * 5.2} y={244 - h / 2} width="2.6" height={h} rx="1.3" />
              ))}
            </g>
            <g fill={SEND} clipPath={`url(#${id("played")})`}>
              {waveform.map((h, i) => (
                <rect key={i} x={352 + i * 5.2} y={244 - h / 2} width="2.6" height={h} rx="1.3" />
              ))}
            </g>
            <text x="476" y="247" fontSize="7" fill="#a3a7ab" textAnchor="end">00:04</text>
          </Reveal>

          {/* 3 · compressed photo */}
          <Reveal at={0.56}>
            <text x="324" y="276" fontSize="8.5" fill="#d08a1a">&lt;@mina&gt;</text>
            <rect x="324" y="284" width="118" height="84" rx="8" fill={`url(#${id("photo")})`} />
            <circle cx="383" cy="326" r="30" fill="#2c5a40" />
            <path d="M362 330Q378 306 396 318Q412 312 420 300Q410 326 392 330Q378 342 362 330Z" fill="#f2f2ee" />
            <text x="324" y="381" fontSize="7" fill="#a3a7ab">photo · compressed 84 KB</text>
          </Reveal>

          {/* 4 · reply, sent back into the mesh */}
          <Reveal at={0.62}>
            <text x="324" y="404" fontSize="8.5" fill={CYAN}>&lt;@labib&gt;</text>
            <text x="324" y="418" fontSize="8.5" fill="#2b2f33">on my way, relaying</text>
            <text x="324" y="430" fontSize="8.5" fill="#2b2f33">through @tara ✓</text>
          </Reveal>

          {/* Composer */}
          <line x1={S.x} x2={S.x + S.w} y1="482" y2="482" stroke="#e6e6e1" />
          <text x="324" y="505" fontSize="8.5" fill="#b4b8bc">type a message...</text>
          <circle cx="468" cy="502" r="11" fill={SEND} />
          <path d="M463 502H473M469 498L473 502L469 506" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>

        <rect x="370" y="78" width="60" height="6" rx="3" fill="#05080b" />
      </g>

      {/* Captions */}
      <g fontFamily={MONO} fill={SAGE} fontSize="11" letterSpacing="1.4">
        <text x="36" y="44" opacity="0.85">SONGKET</text>
        <text x="764" y="44" textAnchor="end" opacity="0.55">OFFLINE · P2P MESH</text>
        <text x="36" y="572" opacity="0.55">NO SERVER · NO DATA · ENCRYPTED</text>
        <text x="764" y="572" textAnchor="end" opacity="0.55">~50 M / HOP</text>
      </g>
    </svg>
  );
}
