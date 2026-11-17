"use client";

import { useId } from "react";
import { keyTimes, useSvgTimeline } from "./use-svg-timeline";

/**
 * Calcrex showpiece, in the app's own dark palette. Behind, a full-bleed
 * graph plane draws y = 2 sin x like a graphing calculator. On the phone,
 * √144 + 5! is typed key by key with a live preview, then = lands 132.
 * Meanwhile a photographed problem is scanned, recognised and solved by
 * the AI, and its parabola is plotted with both roots marked.
 */

const LOOP = 12;
const DUR = `${LOOP}s`;

const MONO = "ui-monospace, 'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace";
const SANS = "Roboto, 'Google Sans', 'Segoe UI', system-ui, sans-serif";

const BG = "#121317";
const SCREEN = "#1b1c21";
const KEY = "#2d2e33";
const OP = "#3e414b";
const BLUE = "#7ba4f4";
const ORANGE = "#f57c00";
const PURPLE = "#5e35b1";
const TEAL = "#26a69a";
const SALMON = "#8f5d5d";
const TEXT = "#e6e6ea";
const MUTED = "#85868b";

/* Graph plane: origin and pixels per unit. */
const OX = 110;
const OY = 340;
const U = 44;

function plot(f: (x: number) => number, x0: number, x1: number, step = 0.05) {
  const pts: string[] = [];
  for (let x = x0; x <= x1 + 1e-9; x += step) {
    pts.push(`${(OX + x * U).toFixed(1)} ${(OY - f(x) * U).toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
}

const SIN = plot((x) => 2 * Math.sin(x), -OX / U, (800 - OX) / U);
const SIN_TRACE = plot((x) => 2 * Math.sin(x), -1.8, 8.4);
const PARABOLA = plot((x) => x * x - 5 * x + 6, 0.2, 4.8);

const GRID_X = Array.from({ length: 20 }, (_, i) => OX + (i - 2) * U).filter((x) => x >= 0 && x <= 800);
const GRID_Y = Array.from({ length: 16 }, (_, i) => OY + (i - 8) * U).filter((y) => y >= 0 && y <= 600);

/** Visible for [from, to) of the loop, switching instantly. */
function Phase({ from, to, children }: { from: number; to: number; children: React.ReactNode }) {
  const values = from === 0 ? "1;0" : "0;1;0";
  const kt = from === 0 ? keyTimes(0, to) : keyTimes(0, from, to);
  return (
    <g opacity={from === 0 ? 1 : 0}>
      <animate attributeName="opacity" values={values} keyTimes={kt} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
      {children}
    </g>
  );
}

/** Fades in at `from`, out at `to`. */
function fade(from: number, to: number, ramp = 0.025) {
  return {
    attributeName: "opacity",
    values: "0;0;1;1;0;0",
    keyTimes: keyTimes(0, from, from + ramp, to - ramp, to, 1),
    dur: DUR,
    repeatCount: "indefinite",
  } as const;
}

/** Strokes a path (pathLength 1) on between `from` and `to`, wipes at the seam. */
function Draw({ from, to }: { from: number; to: number }) {
  return (
    <animate
      attributeName="stroke-dashoffset"
      values="1;1;0;0"
      keyTimes={keyTimes(0, from, to, 1)}
      calcMode="spline"
      keySplines="0 0 1 1;0.55 0 0.25 1;0 0 1 1"
      dur={DUR}
      repeatCount="indefinite"
    />
  );
}

function Key({ x, y, w, h, rx, fill, label, color = TEXT, size, press, weight = 400 }: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  fill: string;
  label: React.ReactNode;
  color?: string;
  size: number;
  press?: number;
  weight?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
      {press !== undefined && (
        <rect x={x} y={y} width={w} height={h} rx={rx} fill="#fff" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0.42;0;0"
            keyTimes={keyTimes(0, press, press + 0.004, press + 0.035, 1)}
            dur={DUR}
            repeatCount="indefinite"
          />
        </rect>
      )}
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.36}
        textAnchor="middle"
        fontSize={size}
        fontWeight={weight}
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

/* Key presses for √144 + 5! = */
const P = { sqrt: 0.08, one: 0.13, four1: 0.18, four2: 0.22, plus: 0.27, five: 0.31, fact: 0.36, eq: 0.42 };

const typed: [number, number, string][] = [
  [P.sqrt, P.one, "√"],
  [P.one, P.four1, "√1"],
  [P.four1, P.four2, "√14"],
  [P.four2, P.plus, "√144"],
  [P.plus, P.five, "√144+"],
  [P.five, P.fact, "√144+5"],
  [P.fact, P.eq, "√144+5!"],
];

const preview: [number, number, string][] = [
  [P.four2, P.plus, "12"],
  [P.five, P.fact, "17"],
  [P.fact, P.eq, "132"],
];

/* Scientific rows: 6 keys each. */
const SCI = [
  ["1st", "DEG", "INV", "sin", "cos", "tan"],
  ["x²", "x³", "xⁿ", "√", "ln", "log"],
  ["MODE", "π", "e", "1/x", "|x|", "n!"],
];

/* Main pad: 4 keys per row. */
const PAD = [
  ["AC", "( )", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  [".", "0", "⌫", "="],
];

const PRESS: Record<string, number> = {
  "√": P.sqrt,
  "1": P.one,
  "+": P.plus,
  "5": P.five,
  "n!": P.fact,
  "=": P.eq,
};

function padFill(label: string, col: number) {
  if (label === "AC") return SALMON;
  if (label === "=") return BLUE;
  return col === 3 ? OP : KEY;
}

function sciFill(label: string) {
  if (label === "1st") return ORANGE;
  if (label === "DEG") return BLUE;
  if (label === "MODE") return PURPLE;
  return KEY;
}

function Phone() {
  const W = 204;
  const sciW = 29;
  const sciGap = (W - 10 - sciW * 6) / 5;
  const padW = 44;
  const padGap = (W - 10 - padW * 4) / 3;

  return (
    <g fontFamily={SANS}>
      {/* Status bar */}
      <text x="18" y="22" fontSize="9" fill={TEXT} fontWeight="500">11:01</text>
      <rect x="168" y="14" width="20" height="9" rx="4.5" fill="#e6e6ea" />
      <rect x="179" y="14" width="9" height="9" rx="4.5" fill="#6b6c72" />

      {/* Top icons: AI, history, graph, more */}
      <g stroke={TEXT} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M108 40 L110 45 L115 47 L110 49 L108 54 L106 49 L101 47 L106 45Z" fill={TEXT} stroke="none" />
        <circle cx="137" cy="47" r="5.5" />
        <path d="M137 44 V47 L139 49" />
        <path d="M158 51 L162 46 L165 48.5 L170 43" />
        <circle cx="184" cy="42" r="0.9" fill={TEXT} />
        <circle cx="184" cy="47" r="0.9" fill={TEXT} />
        <circle cx="184" cy="52" r="0.9" fill={TEXT} />
      </g>

      {/* Mode chips */}
      <g fontSize="7.5" fontWeight="600" fill="#a9aab0" letterSpacing="0.4">
        <rect x="12" y="64" width="24" height="13" rx="3" fill="#25262b" />
        <text x="24" y="73.5" textAnchor="middle">DEG</text>
        <rect x="40" y="64" width="24" height="13" rx="3" fill="#25262b" />
        <text x="52" y="73.5" textAnchor="middle">DEC</text>
      </g>

      {/* Display: before = */}
      <g textAnchor="end">
        <Phase from={0} to={P.sqrt}>
          <text x="186" y="152" fontSize="34" fontWeight="300" fill={TEXT}>0</text>
        </Phase>
        {typed.map(([from, to, s]) => (
          <Phase key={s} from={from} to={to}>
            <text x="186" y="152" fontSize="30" fontWeight="300" fill={TEXT}>{s}</text>
          </Phase>
        ))}
        {preview.map(([from, to, s]) => (
          <Phase key={s} from={from} to={to}>
            <text x="190" y="176" fontSize="15" fill={MUTED}>{s}</text>
          </Phase>
        ))}

        {/* Cursor */}
        <rect x="190" y="124" width="2" height="34" rx="1" fill={BLUE}>
          <animate attributeName="opacity" values="1;0;1;0;1;0;1;0;1;0;0;0" keyTimes={keyTimes(0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, P.eq, 1)} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
        </rect>

        {/* After = */}
        <g opacity="0">
          <animate {...fade(P.eq, 0.97, 0.02)} />
          <text x="190" y="106" fontSize="14" fill={MUTED}>√144+5! =</text>
          <g>
            <animateTransform attributeName="transform" type="translate" values="0 14;0 14;0 0;0 0" keyTimes={keyTimes(0, P.eq, P.eq + 0.03, 1)} calcMode="spline" keySplines="0 0 1 1;0.2 0.8 0.2 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
            <text x="190" y="160" fontSize="48" fontWeight="300" fill={TEXT}>132</text>
          </g>
        </g>
      </g>

      {/* Scientific keys */}
      {SCI.map((row, r) =>
        row.map((label, c) => (
          <Key
            key={label}
            x={5 + c * (sciW + sciGap)}
            y={190 + r * 25}
            w={sciW}
            h={21}
            rx={5}
            fill={sciFill(label)}
            label={label}
            size={label.length > 3 ? 6.5 : 8.5}
            weight={label === "MODE" || label === "1st" ? 600 : 400}
            press={PRESS[label]}
          />
        )),
      )}

      {/* Main pad */}
      {PAD.map((row, r) =>
        row.map((label, c) => (
          <Key
            key={label}
            x={5 + c * (padW + padGap)}
            y={270 + r * 39}
            w={padW}
            h={34}
            rx={11}
            fill={padFill(label, c)}
            label={label}
            color={label === "=" ? "#0f1a33" : c === 3 ? "#c9ccd6" : TEXT}
            size={label === "AC" ? 13 : 15}
            weight={label === "=" ? 700 : 300}
            press={label === "4" ? undefined : PRESS[label]}
          />
        )),
      )}

      {/* The two presses of 4 */}
      {[P.four1, P.four2].map((t) => (
        <rect key={t} x={5} y={270 + 2 * 39} width={padW} height={34} rx={11} fill="#fff" opacity="0">
          <animate attributeName="opacity" values="0;0;0.42;0;0" keyTimes={keyTimes(0, t, t + 0.004, t + 0.035, 1)} dur={DUR} repeatCount="indefinite" />
        </rect>
      ))}
    </g>
  );
}

export function CalcrexArtwork({ title }: { title: string }) {
  // Still frame (reduced motion): 132 on screen, the problem solved and plotted.
  const svgRef = useSvgTimeline(LOOP * 0.82);
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `cx-${name}-${uid}`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      role="img"
      aria-label={`${title}: a scientific calculator solving √144 + 5!, plotting graphs and solving a scanned equation with AI`}
      className="calcrex-art"
    >
      <defs>
        <radialGradient id={id("vignette")} cx="40%" cy="52%" r="70%">
          <stop offset="55%" stopColor={BG} stopOpacity="0" />
          <stop offset="100%" stopColor={BG} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.28" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("paper")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efe9dc" />
          <stop offset="100%" stopColor="#d9d1c0" />
        </linearGradient>
        <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0.55" />
        </linearGradient>
        <clipPath id={id("screen")}>
          <rect width="204" height="468" rx="27" />
        </clipPath>
        <clipPath id={id("photo")}>
          <rect x="16" y="44" width="92" height="70" rx="8" />
        </clipPath>
        <clipPath id={id("type")}>
          <rect x="124" y="50" width="0" height="26">
            <animate attributeName="width" values="0;0;190;190" keyTimes={keyTimes(0, 0.56, 0.62, 1)} dur={DUR} repeatCount="indefinite" />
          </rect>
        </clipPath>
      </defs>

      {/* ── Graph plane ── */}
      <g>
        <g stroke="#1d1f25" strokeWidth="1">
          {GRID_X.map((x) => <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="600" />)}
          {GRID_Y.map((y) => <line key={`gy${y}`} x1="0" y1={y} x2="800" y2={y} />)}
        </g>
        <g stroke="#3a3d46" strokeWidth="1.2">
          <line x1={OX} y1="0" x2={OX} y2="600" />
          <line x1="0" y1={OY} x2="800" y2={OY} />
        </g>
        <g fontFamily={MONO} fontSize="9" fill="#55575e">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <text key={`tx${n}`} x={OX + n * U} y={OY + 15} textAnchor="middle">{n}</text>
          ))}
          {[-4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => (
            <text key={`ty${n}`} x={OX - 8} y={OY - n * U + 3} textAnchor="end">{n}</text>
          ))}
        </g>

        {/* Curves fade together at the loop seam */}
        <g>
          <animate attributeName="opacity" values="1;1;0;0" keyTimes={keyTimes(0, 0.95, 0.99, 1)} dur={DUR} repeatCount="indefinite" />

          {/* f1: y = 2 sin x */}
          <path d={SIN} pathLength={1} fill="none" stroke={BLUE} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset="1">
            <Draw from={0.03} to={0.26} />
          </path>

          {/* Tracer riding the wave */}
          <g opacity="0">
            <animate {...fade(0.26, 0.95)} />
            <animateMotion path={SIN_TRACE} keyPoints="0;0;1;1" keyTimes={keyTimes(0, 0.26, 0.95, 1)} calcMode="linear" dur={DUR} repeatCount="indefinite" />
            <circle r="16" fill={`url(#${id("glow")})`} />
            <circle r="5" fill={BLUE} stroke={BG} strokeWidth="2" />
          </g>

          {/* f2: y = x² − 5x + 6 */}
          <path d={PARABOLA} pathLength={1} fill="none" stroke={ORANGE} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset="1">
            <Draw from={0.64} to={0.76} />
          </path>

          {/* Roots */}
          {[2, 3].map((r, i) => (
            <g key={r} transform={`translate(${OX + r * U} ${OY})`} opacity="0">
              <animate {...fade(0.76 + i * 0.015, 0.97, 0.01)} />
              <circle r="5" fill="none" stroke={ORANGE} strokeWidth="1.5">
                <animate attributeName="r" values="5;5;18;18" keyTimes={keyTimes(0, 0.76 + i * 0.015, 0.83 + i * 0.015, 1)} dur={DUR} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;1;0;0" keyTimes={keyTimes(0, 0.76 + i * 0.015, 0.83 + i * 0.015, 1)} dur={DUR} repeatCount="indefinite" />
              </circle>
              <circle r="5" fill={ORANGE} stroke={BG} strokeWidth="2" />
            </g>
          ))}
        </g>

        <rect width="800" height="600" fill={`url(#${id("vignette")})`} />
      </g>

      {/* ── Function list ── */}
      <g fontFamily={SANS} fontSize="12">
        <g opacity="0">
          <animate {...fade(0.03, 0.97)} />
          <rect x="36" y="66" width="140" height="28" rx="14" fill={SCREEN} stroke="#2c2e35" />
          <circle cx="52" cy="80" r="5" fill={BLUE} />
          <text x="64" y="84" fill={TEXT}><tspan fill={MUTED} fontFamily={MONO} fontSize="10">f1 </tspan> y = 2 sin x</text>
        </g>
        <g opacity="0">
          <animate {...fade(0.64, 0.97)} />
          <rect x="36" y="100" width="178" height="28" rx="14" fill={SCREEN} stroke="#2c2e35" />
          <circle cx="52" cy="114" r="5" fill={ORANGE} />
          <text x="64" y="118" fill={TEXT}><tspan fill={MUTED} fontFamily={MONO} fontSize="10">f2 </tspan> y = x² − 5x + 6</text>
        </g>
      </g>

      {/* ── Scan + AI card ── */}
      <g transform="translate(36 404)" opacity="0">
        <animate {...fade(0.46, 0.97)} />
        <animateTransform attributeName="transform" type="translate" values="36 420;36 420;36 404;36 404" keyTimes={keyTimes(0, 0.46, 0.5, 1)} calcMode="spline" keySplines="0 0 1 1;0.2 0.8 0.2 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />

        <rect width="336" height="130" rx="18" fill={SCREEN} stroke="#2c2e35" />
        <path d="M23 18 L25 23 L30 25 L25 27 L23 32 L21 27 L16 25 L21 23Z" fill={BLUE} />
        <text x="38" y="29" fontFamily={SANS} fontSize="12" fontWeight="500" fill={TEXT}>Scan problem</text>
        <text x="318" y="29" textAnchor="end" fontFamily={MONO} fontSize="9" fill={MUTED} letterSpacing="1">CALCREX AI</text>

        {/* Photographed problem */}
        <g clipPath={`url(#${id("photo")})`}>
          <rect x="16" y="44" width="92" height="70" fill={`url(#${id("paper")})`} />
          <g stroke="#c9c0ab" strokeWidth="0.8">
            <line x1="16" y1="62" x2="108" y2="62" />
            <line x1="16" y1="80" x2="108" y2="80" />
            <line x1="16" y1="98" x2="108" y2="98" />
          </g>
          <text x="62" y="86" textAnchor="middle" fontFamily="'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive" fontSize="13" fill="#24315e" transform="rotate(-4 62 84)">
            x²−5x+6=0
          </text>
          {/* Scan beam */}
          <g opacity="0">
            <animate {...fade(0.49, 0.57, 0.01)} />
            <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 72;0 72" keyTimes={keyTimes(0, 0.49, 0.57, 1)} dur={DUR} repeatCount="indefinite" />
            <rect x="16" y="20" width="92" height="24" fill={`url(#${id("beam")})`} />
            <rect x="16" y="43" width="92" height="1.5" fill={TEAL} />
          </g>
        </g>
        <rect x="16" y="44" width="92" height="70" rx="8" fill="none" stroke="#3a3c44" />

        {/* Recognised, then solved */}
        <text x="124" y="54" fontFamily={MONO} fontSize="8" fill={MUTED} letterSpacing="1">RECOGNIZED</text>
        <g clipPath={`url(#${id("type")})`}>
          <text x="124" y="72" fontFamily={SANS} fontSize="15" fill={TEXT}>x² − 5x + 6 = 0</text>
        </g>
        <g opacity="0">
          <animate {...fade(0.64, 0.97)} />
          <text x="124" y="92" fontFamily={MONO} fontSize="10" fill={MUTED}>(x − 2)(x − 3) = 0</text>
        </g>
        <g opacity="0" fontFamily={SANS} fontSize="17" fontWeight="600" fill={ORANGE}>
          <animate {...fade(0.69, 0.97)} />
          <text x="124" y="114">x = 2  ·  x = 3</text>
        </g>
        {/* Thinking dots */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={128 + i * 9} cy="88" r="2.4" fill={BLUE} opacity="0">
            <animate attributeName="opacity" values="0;0;1;0.2;1;0;0" keyTimes={keyTimes(0, 0.62, 0.625 + i * 0.004, 0.63 + i * 0.004, 0.636 + i * 0.004, 0.64, 1)} dur={DUR} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* ── Phone ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" dur="6s" repeatCount="indefinite" />
        <rect x="514" y="52" width="232" height="496" rx="38" fill="#000" opacity="0.45" transform="translate(6 12)" />
        <rect x="520" y="58" width="220" height="484" rx="35" fill="#0b0c0f" stroke="#2c2e35" strokeWidth="1.5" />
        <g transform="translate(528 66)" clipPath={`url(#${id("screen")})`}>
          <rect width="204" height="468" fill={SCREEN} />
          <Phone />
        </g>
      </g>

      {/* ── Captions ── */}
      <g fontFamily={MONO} fontSize="11" letterSpacing="1.4">
        <text x="36" y="44" fill={BLUE}>CALCREX</text>
        <text x="764" y="44" textAnchor="end" fill={MUTED}>SCIENTIFIC · GRAPHING · AI</text>
        <text x="36" y="572" fill={MUTED}>SCAN IT · SOLVE IT · PLOT IT</text>
        <text x="764" y="572" textAnchor="end" fill={MUTED}>NO ADS. EVER.</text>
      </g>
    </svg>
  );
}
