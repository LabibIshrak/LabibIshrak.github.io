"use client";

import { useId } from "react";
import { keyTimes, useSvgTimeline } from "./use-svg-timeline";

/**
 * Lunar Life showpiece, in the game's own palette (space black, Mars
 * orange). A tablet plays a 14-sol mission in 14 seconds: the sol counter
 * and life-support meters tick, a dust storm rolls in, a solar-storm choice
 * card appears and "Shelter the crew" is picked, then the rocket launches
 * and the mission ends HOME, while a ship traces the way back to Earth.
 */

const LOOP = 14; // seconds: one sol per second
const DUR = `${LOOP}s`;

const MONO = "ui-monospace, 'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace";
const COND = "'Saira Condensed', 'Arial Narrow', 'Roboto Condensed', sans-serif";

const SPACE = "#0b0b0c";
const ORANGE = "#ff6a2b";
const MUTED = "#8b8b90";

/* Deterministic star field (same on server and client). */
const stars = (() => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 46 }, () => ({
    x: Math.round(rand() * 800),
    y: Math.round(rand() * 600),
    r: rand() < 0.15 ? 1.6 : 0.9,
    twinkle: rand() < 0.35,
    delay: (rand() * 4).toFixed(2),
  }));
})();

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

function Meter({ x, label, color, widths, times }: {
  x: number;
  label: string;
  color: string;
  widths: string;
  times: number[];
}) {
  return (
    <g>
      <text x={x} y="13" fontSize="7.5" fill={MUTED} letterSpacing="0.8">{label}</text>
      <rect x={x} y="18" width="46" height="4" rx="2" fill="#2a2a2e" />
      <rect x={x} y="18" width="40" height="4" rx="2" fill={color}>
        <animate attributeName="width" values={widths} keyTimes={keyTimes(...times)} dur={DUR} repeatCount="indefinite" />
      </rect>
    </g>
  );
}

export function LunarArtwork({ title }: { title: string }) {
  // Still frame (reduced motion): the choice card, mid-mission.
  const svgRef = useSvgTimeline(LOOP * 0.45);
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `ll-${name}-${uid}`;

  const fadeIn = (from: number, to: number) => ({
    values: "0;0;1;1;0;0",
    keyTimes: keyTimes(0, from, from + 0.025, to - 0.025, to, 1),
  });

  const card = fadeIn(0.27, 0.53);
  const home = fadeIn(0.8, 0.95);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      role="img"
      aria-label={`${title}: a Mars mission game playing on a tablet, from dust storm to launch day`}
      className="lunar-art"
    >
      <defs>
        <radialGradient id={id("mars")} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#f6aa76" />
          <stop offset="40%" stopColor="#e2622b" />
          <stop offset="78%" stopColor="#a33d18" />
          <stop offset="100%" stopColor="#4e1c0c" />
        </radialGradient>
        <radialGradient id={id("halo")} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor={ORANGE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("planet")}>
          <circle cx="650" cy="300" r="230" />
        </clipPath>
        <radialGradient id={id("shadow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d0d08" />
          <stop offset="42%" stopColor="#6b2c15" />
          <stop offset="72%" stopColor="#c8642f" />
          <stop offset="100%" stopColor="#e08a4a" />
        </linearGradient>
        <linearGradient id={id("hull")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f1f2f4" />
          <stop offset="60%" stopColor="#d3d6dc" />
          <stop offset="100%" stopColor="#a9aeb7" />
        </linearGradient>
      </defs>

      {/* ── Space ── */}
      <rect width="800" height="600" fill={SPACE} />
      <g fill="#f3efe8">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity="0.55">
            {s.twinkle && (
              <animate attributeName="opacity" values="0.55;0.1;0.55" dur="3.2s" begin={`${s.delay}s`} repeatCount="indefinite" />
            )}
          </circle>
        ))}
      </g>

      {/* ── Mars ── */}
      <circle cx="650" cy="300" r="310" fill={`url(#${id("halo")})`} />
      <circle cx="650" cy="300" r="254" fill="none" stroke="#2c2c31" strokeWidth="1.4" />
      <circle cx="650" cy="300" r="230" fill={`url(#${id("mars")})`} />
      <g clipPath={`url(#${id("planet")})`} fill="#7d2d12" opacity="0.3">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;-460 0" dur="80s" repeatCount="indefinite" />
          {[0, 460].map((dx) => (
            <g key={dx} transform={`translate(${dx} 0)`}>
              <circle cx="566" cy="214" r="13" />
              <circle cx="694" cy="362" r="21" />
              <circle cx="612" cy="452" r="9" />
              <circle cx="764" cy="226" r="8" />
              <circle cx="826" cy="418" r="15" />
              <circle cx="528" cy="334" r="7" />
              <circle cx="868" cy="150" r="6" />
            </g>
          ))}
        </g>
      </g>

      {/* ── The way home ── */}
      <path d="M440 250 Q250 40 78 92" fill="none" stroke={ORANGE} strokeWidth="1.2" strokeDasharray="2 7" opacity="0.55" />
      <circle cx="70" cy="94" r="8" fill="#3f7fe8" />
      <circle cx="67" cy="91" r="2.4" fill="#cfe1ff" opacity="0.8" />
      <text x="70" y="122" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill={MUTED} letterSpacing="1.4">EARTH</text>
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={keyTimes(0, 0.74, 0.76, 0.94, 0.96, 1)} dur={DUR} repeatCount="indefinite" />
        <animateMotion path="M440 250 Q250 40 78 92" keyPoints="0;0;1;1" keyTimes={keyTimes(0, 0.74, 0.96, 1)} calcMode="linear" dur={DUR} repeatCount="indefinite" />
        <circle r="9" fill={ORANGE} opacity="0.25" />
        <circle r="3.2" fill="#ffe2cc" />
      </g>

      {/* ── Tablet ── */}
      <ellipse cx="305" cy="498" rx="230" ry="16" fill={`url(#${id("shadow")})`} />
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />

        <rect x="68" y="168" width="474" height="304" rx="26" fill="#141416" />
        <rect x="69" y="169" width="472" height="302" rx="25" fill="none" stroke="#2e2e33" />
        <circle cx="305" cy="176" r="2.2" fill="#2e2e33" />

        {/* Screen: 640×394 scene scaled into the 442×272 display. A group, not a
            nested <svg>, so it shares the outer SMIL clock and pauses with it. */}
        <g transform="translate(84 184) scale(0.6906)">
          <clipPath id={id("screen")}>
            <rect width="640" height="394" rx="14" />
          </clipPath>

          <g clipPath={`url(#${id("screen")})`}>
            {/* Sky + land */}
            <rect width="640" height="394" fill={`url(#${id("sky")})`} />
            <g fill="#f3efe8" opacity="0.5">
              <circle cx="60" cy="52" r="1" /><circle cx="180" cy="80" r="0.8" /><circle cx="300" cy="40" r="1.1" />
              <circle cx="410" cy="66" r="0.8" /><circle cx="600" cy="48" r="1" /><circle cx="250" cy="110" r="0.7" />
            </g>
            <circle cx="530" cy="104" r="28" fill="none" stroke="#fbe7cf" strokeOpacity="0.22" />
            <circle cx="530" cy="104" r="15" fill="#fbe7cf" />

            <path d="M0 250Q80 226 160 240T320 236T480 232T640 240V394H0Z" fill="#b4572b" />
            <path d="M0 282Q100 258 210 272T420 268T640 276V394H0Z" fill="#954420" />
            <path d="M0 318Q160 304 320 312T640 314V394H0Z" fill="#6c2f17" />

            {/* Habitat */}
            <path d="M58 316A62 62 0 0 1 182 316Z" fill="#e9e4dc" />
            <path d="M120 254A62 62 0 0 1 182 316H150Q150 280 120 254Z" fill="#cfc8bd" />
            <rect x="92" y="286" width="56" height="9" rx="4.5" fill="#2a2d33" />
            <rect x="110" y="300" width="18" height="16" rx="3" fill="#b9b2a7" />
            <path d="M152 262L164 236" stroke="#d9d4cc" strokeWidth="2" />
            <circle cx="164" cy="236" r="3" fill={ORANGE}>
              <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <rect x="180" y="294" width="74" height="22" rx="11" fill="#ddd7ce" />
            {[198, 216, 234].map((cx) => (
              <circle key={cx} cx={cx} cy="305" r="4" fill="#2a2d33" />
            ))}

            {/* Solar panels */}
            {[280, 326].map((x) => (
              <g key={x}>
                <path d={`M${x + 18} 300V314`} stroke="#3a1a0d" strokeWidth="2" />
                <path d={`M${x} 300L${x + 12} 282H${x + 40}L${x + 28} 300Z`} fill="#23324f" stroke="#8aa0c8" strokeWidth="0.8" />
              </g>
            ))}

            {/* Junior astronaut */}
            <g transform="translate(262 296)">
              <rect x="-5" y="6" width="10" height="13" rx="3" fill="#f3f2ef" />
              <circle cx="0" cy="2" r="6" fill="#f3f2ef" />
              <ellipse cx="0.8" cy="2" rx="3.8" ry="3" fill="#d29a2a" />
              <rect x="-1.5" y="10" width="3" height="3" fill={ORANGE} />
            </g>

            {/* Launch pad + tower */}
            <rect x="436" y="312" width="118" height="6" rx="2" fill="#3a1a0d" />
            <g stroke="#c9c4bc" strokeWidth="1.5" fill="none">
              <path d="M522 312V150M536 312V150" />
              <path d="M522 168L536 186L522 204L536 222L522 240L536 258L522 276L536 294L522 312" />
              <path d="M504 206H522" />
            </g>

            {/* Rocket: sits on the pad, then launches */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0;0 0;0 -440;0 -440"
                keyTimes={keyTimes(0, 0.6, 0.8, 1)}
                calcMode="spline"
                keySplines="0 0 1 1;0.55 0 0.9 0.6;0 0 1 1"
                dur={DUR}
                repeatCount="indefinite"
              />

              {/* Flame */}
              <g opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={keyTimes(0, 0.56, 0.58, 0.8, 0.81, 1)} dur={DUR} repeatCount="indefinite" />
                <ellipse cx="486" cy="330" rx="10" ry="28" fill="#ff8a3d">
                  <animate attributeName="ry" values="28;36;25;32;28" dur="0.28s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="486" cy="322" rx="5" ry="16" fill="#ffe3a3">
                  <animate attributeName="ry" values="16;20;14;18;16" dur="0.22s" repeatCount="indefinite" />
                </ellipse>
              </g>

              <path d="M486 148C500 164 504 180 504 196V296H468V196C468 180 472 164 486 148Z" fill={`url(#${id("hull")})`} />
              <rect x="468" y="222" width="36" height="7" fill={ORANGE} />
              <rect x="468" y="272" width="36" height="5" fill={ORANGE} />
              <circle cx="486" cy="198" r="6.5" fill="#2a2d33" stroke="#9aa0a8" strokeWidth="1.5" />
              <path d="M468 268L450 302L468 296Z" fill={ORANGE} />
              <path d="M504 268L522 302L504 296Z" fill="#d9541e" />
              <rect x="476" y="296" width="20" height="8" rx="2" fill="#6b6f78" />
            </g>

            {/* Launch smoke */}
            {[
              { x: 456, y: 318, d: 0 },
              { x: 516, y: 320, d: 0.015 },
              { x: 486, y: 326, d: 0.03 },
            ].map((p) => {
              const t = 0.58 + p.d;
              const kt = keyTimes(0, t, t + 0.08, t + 0.2, 1);
              return (
                <circle key={p.x} cx={p.x} cy={p.y} r="0" fill="#e9dfd3" opacity="0">
                  <animate attributeName="r" values="0;0;26;40;40" keyTimes={kt} dur={DUR} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.75;0;0" keyTimes={kt} dur={DUR} repeatCount="indefinite" />
                </circle>
              );
            })}

            {/* Dust storm */}
            <g opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={keyTimes(0, 0.12, 0.19, 0.33, 0.42, 1)} dur={DUR} repeatCount="indefinite" />
              <rect width="640" height="394" fill="#8a3a17" opacity="0.5" />
              <g stroke="#f3b37e" strokeWidth="1.2" strokeLinecap="round" opacity="0.6">
                <animateTransform attributeName="transform" type="translate" values="0 0;-90 22" dur="0.7s" repeatCount="indefinite" />
                {Array.from({ length: 18 }, (_, i) => {
                  const x = (i * 83) % 760;
                  const y = 40 + ((i * 57) % 330);
                  return <path key={i} d={`M${x} ${y}l46 -11`} />;
                })}
              </g>
            </g>

            {/* HUD */}
            <rect width="640" height="30" fill={SPACE} opacity="0.78" />
            <g fontFamily={MONO}>
              <text x="14" y="19" fontSize="8" fill={MUTED} letterSpacing="1">SOL</text>
              <g fontSize="12" fill={ORANGE} fontWeight="600">
                <Phase from={0} to={0.12}><text x="36" y="20">03</text></Phase>
                <Phase from={0.12} to={0.26}><text x="36" y="20">05</text></Phase>
                <Phase from={0.26} to={0.54}><text x="36" y="20">06</text></Phase>
                <Phase from={0.54} to={0.8}><text x="36" y="20">13</text></Phase>
                <Phase from={0.8} to={1}><text x="36" y="20">14</text></Phase>
              </g>
              <g fontSize="8" fill="#d9d6d0" letterSpacing="1.2" textAnchor="middle">
                <Phase from={0} to={0.12}><text x="250" y="19">PART 1 · ARRIVAL</text></Phase>
                <Phase from={0.12} to={0.54}><text x="250" y="19">PART 2 · SURVIVAL</text></Phase>
                <Phase from={0.54} to={1}><text x="250" y="19">PART 3 · THE WAY HOME</text></Phase>
              </g>
              <Meter x={420} label="POWER" color="#ffd36b" widths="40;40;12;12;32;40" times={[0, 0.12, 0.3, 0.42, 0.52, 1]} />
              <Meter x={490} label="O₂" color="#7fd0ff" widths="38;38;27;36;38" times={[0, 0.3, 0.44, 0.6, 1]} />
              <Meter x={560} label="FUEL" color={ORANGE} widths="10;10;44;44;6;10" times={[0, 0.34, 0.52, 0.6, 0.8, 1]} />
            </g>

            {/* Choice card */}
            <g opacity="0">
              <animate attributeName="opacity" values={card.values} keyTimes={card.keyTimes} dur={DUR} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 16;0 16;0 0;0 0;0 0;0 0" keyTimes={card.keyTimes} dur={DUR} repeatCount="indefinite" />

              <rect x="112" y="274" width="416" height="104" rx="12" fill="#111113" opacity="0.96" />
              <rect x="112.5" y="274.5" width="415" height="103" rx="11.5" fill="none" stroke="#2e2e33" />
              <text x="132" y="298" fontFamily={MONO} fontSize="9" fill={ORANGE} letterSpacing="1.2">
                SOL 06 · SOLAR STORM INBOUND
              </text>
              <text x="132" y="313" fontFamily={MONO} fontSize="7.5" fill={MUTED}>
                NASA DONKI record · Kp 9 · 10 May 2024
              </text>

              <rect x="128" y="326" width="186" height="38" rx="7" fill="#18181b" stroke="#3a3a40">
                <animate attributeName="stroke" values="#3a3a40;#ff6a2b" keyTimes={keyTimes(0, 0.41)} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
                <animate attributeName="fill" values="#18181b;#2a160d" keyTimes={keyTimes(0, 0.41)} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
              </rect>
              <rect x="326" y="326" width="186" height="38" rx="7" fill="#18181b" stroke="#3a3a40" />
              <g fontFamily={COND} fontSize="13" fontWeight="600" fill="#f3f1ed" letterSpacing="0.3">
                <text x="142" y="349"><tspan fill={ORANGE}>A</tspan>  Shelter the crew</text>
                <text x="340" y="349"><tspan fill={MUTED}>B</tspan>  Keep working outside</text>
              </g>

              {/* A tap on option A */}
              <g opacity="0">
                <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" keyTimes={keyTimes(0, 0.33, 0.35, 0.43, 0.45, 1)} dur={DUR} repeatCount="indefinite" />
                <animateMotion path="M430 392L222 350" keyPoints="0;0;1;1" keyTimes={keyTimes(0, 0.34, 0.4, 1)} calcMode="spline" keySplines="0 0 1 1;0.3 0 0.2 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
                <circle r="7" fill="#fff" />
                <circle r="7" fill="none" stroke="#fff" strokeWidth="1.5">
                  <animate attributeName="r" values="7;7;22;22" keyTimes={keyTimes(0, 0.405, 0.44, 1)} dur={DUR} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes={keyTimes(0, 0.404, 0.405, 0.44, 1)} dur={DUR} repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* Ending */}
            <g opacity="0">
              <animate attributeName="opacity" values={home.values} keyTimes={home.keyTimes} dur={DUR} repeatCount="indefinite" />
              <rect width="640" height="394" fill={SPACE} opacity="0.55" />
              <text x="320" y="200" textAnchor="middle" fontFamily={COND} fontSize="78" fontWeight="700" fill="#f6f3ee" letterSpacing="6">
                HOME
              </text>
              <text x="320" y="230" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={ORANGE} letterSpacing="2">
                ALL CREW SAFE · SOL 14
              </text>
            </g>

            {/* Loop seam */}
            <rect width="640" height="394" fill={SPACE}>
              <animate attributeName="opacity" values="1;0;0;1;1" keyTimes={keyTimes(0, 0.03, 0.95, 0.985, 1)} dur={DUR} repeatCount="indefinite" />
            </rect>
          </g>
        </g>
      </g>

      {/* ── Captions ── */}
      <g fontFamily={MONO} fontSize="11" letterSpacing="1.4">
        <text x="36" y="44" fill={ORANGE}>LUNAR LIFE</text>
        <text x="764" y="44" textAnchor="end" fill={MUTED}>NASA SPACE APPS 2026</text>
        <text x="36" y="572" fill={MUTED}>14 SOLS · 12 CHOICES · REAL NASA DATA</text>
        <text x="764" y="572" textAnchor="end" fill={MUTED}>ENGLISH · বাংলা</text>
      </g>
    </svg>
  );
}
