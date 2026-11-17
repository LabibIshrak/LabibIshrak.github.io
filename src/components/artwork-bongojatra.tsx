"use client";

import { useId } from "react";
import { keyTimes, useSvgTimeline } from "./use-svg-timeline";

/**
 * BongoJatra showpiece, in the app's Bangladesh green and red. Behind, a
 * transit map of the country carries buses, trains and launches on their
 * own lines. On the phone, a trip is booked end to end: search Pabna to
 * Rajshahi, the AI picks the coach, seat 3D is chosen, and a QR ticket is
 * issued. Then the booked coach sets off along the map.
 */

const LOOP = 14;
const DUR = `${LOOP}s`;

const MONO = "ui-monospace, 'IBM Plex Mono', 'SFMono-Regular', Menlo, Consolas, monospace";
const SANS = "Outfit, 'Segoe UI', system-ui, sans-serif";
const BANGLA = "'Noto Sans Bengali', 'Hind Siliguri', 'Nirmala UI', sans-serif";

const BG = "#033a2b";
const GREEN = "#006a4e";
const RED = "#f42a41";
const BUS = "#f4a22a";
const TRAIN = "#e8f1ec";
const LAUNCH = "#2a9d8f";
const INK = "#0d1b2a";
const GREY = "#6b7c93";
const LINE = "#e5e7eb";
const PALE = "#8fc4ae";

/* Cities on the map: [x, y, English, Bangla, label side]. */
const CITIES = {
  rangpur: [150, 118, "Rangpur", "রংপুর", "r"],
  bogura: [214, 182, "Bogura", "বগুড়া", "r"],
  rajshahi: [80, 236, "Rajshahi", "রাজশাহী", "b"],
  pabna: [182, 272, "Pabna", "পাবনা", "t"],
  sylhet: [452, 176, "Sylhet", "সিলেট", "r"],
  dhaka: [318, 306, "Dhaka", "ঢাকা", "r"],
  khulna: [150, 428, "Khulna", "খুলনা", "l"],
  barishal: [288, 446, "Barishal", "বরিশাল", "b"],
  chattogram: [456, 452, "Chattogram", "চট্টগ্রাম", "b"],
} as const;

type City = keyof typeof CITIES;
const pt = (c: City) => `${CITIES[c][0]} ${CITIES[c][1]}`;

/* Lines, metro-map style. */
const TRAIN_LINES = [
  `M${pt("rangpur")}L${pt("bogura")}L214 236L${pt("pabna")}`,
  `M${pt("rajshahi")}L130 236L${pt("pabna")}L246 306L${pt("dhaka")}L400 388L${pt("chattogram")}`,
  `M${pt("dhaka")}L380 244L${pt("sylhet")}`,
  `M${pt("pabna")}L182 380L${pt("khulna")}`,
];
const BUS_LINES = [
  `M${pt("pabna")}Q250 262 ${pt("dhaka")}`,
  `M${pt("dhaka")}Q210 360 ${pt("khulna")}`,
  `M${pt("dhaka")}Q420 210 ${pt("sylhet")}`,
  `M${pt("rangpur")}Q100 180 ${pt("rajshahi")}`,
];
const LAUNCH_LINES = [
  `M${pt("dhaka")}C300 360 330 400 ${pt("barishal")}`,
  `M${pt("khulna")}C200 470 240 420 ${pt("barishal")}`,
];

/* The booked trip: Pabna → Rajshahi by coach. */
const TRIP = `M${pt("pabna")}Q132 300 ${pt("rajshahi")}`;

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

/** A phone screen that slides in from the right at `from` and out to the left at `to`. */
function Screen({ from, to, children }: { from: number; to: number; children: React.ReactNode }) {
  const t = 0.025;
  const first = from === 0;
  return (
    <g opacity={first ? 1 : 0}>
      <animate
        attributeName="opacity"
        values={first ? "1;1;0;0;1" : "0;0;1;1;0;0"}
        keyTimes={first ? keyTimes(0, to - t, to, 0.97, 1) : keyTimes(0, from, from + t, to - t, to, 1)}
        dur={DUR}
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values={first ? "0 0;0 0;-50 0;-50 0;0 0" : "204 0;204 0;0 0;0 0;-50 0;-50 0"}
        keyTimes={first ? keyTimes(0, to - t, to, 0.97, 1) : keyTimes(0, from, from + t, to - t, to, 1)}
        calcMode="spline"
        keySplines={first ? "0 0 1 1;0.6 0 0.4 1;0 0 1 1;0 0 1 1" : "0 0 1 1;0.2 0.8 0.2 1;0 0 1 1;0.6 0 0.4 1;0 0 1 1"}
        dur={DUR}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

/** A finger tap at (x, y) around time `at`. */
function Tap({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0">
      <animate attributeName="opacity" values="0;0;0.85;0.85;0;0" keyTimes={keyTimes(0, at - 0.03, at - 0.015, at + 0.01, at + 0.03, 1)} dur={DUR} repeatCount="indefinite" />
      <circle r="8" fill="#0d1b2a" opacity="0.25" />
      <circle r="8" fill="none" stroke="#0d1b2a" strokeWidth="1.5">
        <animate attributeName="r" values="8;8;20;20" keyTimes={keyTimes(0, at, at + 0.03, 1)} dur={DUR} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes={keyTimes(0, at - 0.001, at, at + 0.03, 1)} dur={DUR} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function Header({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <g>
      <rect width="204" height="62" fill={GREEN} />
      {back && <path d="M22 44 L14 38 L22 32 M14 38 H30" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
      <text x="102" y="43" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">{title}</text>
    </g>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  const c = light ? "#fff" : INK;
  return (
    <g fill={c}>
      <text x="16" y="17" fontSize="8.5" fontWeight="500">12:17</text>
      <rect x="168" y="10" width="20" height="9" rx="4.5" opacity="0.85" />
    </g>
  );
}

/* Seat grid: 6 rows × A B | C D. */
const OCCUPIED = new Set(["1B", "2D", "3C", "4A", "5A", "5B", "5C", "6D"]);
const QR = (() => {
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cells: [number, number][] = [];
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      const finder = (x < 4 && y < 4) || (x > 10 && y < 4) || (x < 4 && y > 10);
      if (!finder && rand() < 0.48) cells.push([x, y]);
    }
  }
  return cells;
})();

function Phone({ id }: { id: (n: string) => string }) {
  /* Timeline (fractions of the loop). */
  const searchTap = 0.2;
  const pickTap = 0.44;
  const seatTap = 0.6;
  const contTap = 0.7;

  return (
    <g fontFamily={SANS}>
      <rect width="204" height="454" fill="#fff" />

      {/* ── 1 · Search ── */}
      <Screen from={0} to={0.24}>
        <rect width="204" height="454" fill="#fff" />
        <StatusBar />
        <text x="16" y="50" fontSize="13" fontWeight="600" fill={GREEN}>BongoJatra</text>
        <circle cx="90" cy="40" r="2.2" fill={RED} />
        <text x="16" y="78" fontSize="16" fontWeight="600" fill={GREEN}>Good morning, Labib</text>

        <rect x="12" y="96" width="180" height="214" rx="12" fill="#fff" stroke="#eef0f3" />
        <g fontSize="11.5" fontWeight="500" fill={INK}>
          <path d="M30 116 a5 5 0 1 1 0.01 0 M30 126 l-4 -6 h8z" fill="none" stroke={GREY} strokeWidth="1.2" />
          <text x="46" y="125">Pabna</text>
          <line x1="31" y1="134" x2="31" y2="156" stroke={LINE} />
          {/* Swap */}
          <circle cx="166" cy="145" r="11" fill="#fde4e7" />
          <g stroke={RED} strokeWidth="1.4" strokeLinecap="round" fill="none">
            <path d="M163 150 V140 M160 143 L163 140 L166 143" />
            <path d="M169 140 V150 M166 147 L169 150 L172 147" />
          </g>
          <path d="M30 162 a5 5 0 1 1 0.01 0 M26 166 l4 6 l4 -6z" fill={GREEN} />
          <text x="46" y="171">Rajshahi</text>
          <line x1="20" y1="188" x2="184" y2="188" stroke={LINE} />
          <rect x="25" y="200" width="11" height="11" rx="2" fill="none" stroke={GREEN} strokeWidth="1.3" />
          <line x1="25" y1="204" x2="36" y2="204" stroke={GREEN} strokeWidth="1.3" />
          <text x="46" y="210">Today, 18 Nov</text>
          <line x1="20" y1="226" x2="184" y2="226" stroke={LINE} />
          <circle cx="30" cy="243" r="5.5" fill="none" stroke={GREY} strokeWidth="1.2" />
          <path d="M30 240 V243 L32 245" stroke={GREY} strokeWidth="1.2" fill="none" />
          <text x="46" y="247" fontWeight="400">Any Time</text>
        </g>
        <rect x="22" y="266" width="160" height="30" rx="8" fill={GREEN} />
        <text x="102" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Search</text>

        <text x="16" y="336" fontSize="8" fill={GREY} letterSpacing="0.6">POPULAR ROUTES</text>
        <g fontSize="9" fill={INK}>
          <rect x="16" y="346" width="84" height="22" rx="11" fill="#fff" stroke={LINE} />
          <text x="58" y="360" textAnchor="middle">Pabna → Dhaka</text>
          <rect x="106" y="346" width="96" height="22" rx="11" fill="#fff" stroke={LINE} />
          <text x="154" y="360" textAnchor="middle">Pabna → Rajshahi</text>
        </g>

        {/* Tab bar */}
        <line x1="0" y1="414" x2="204" y2="414" stroke={LINE} />
        <g fontSize="7.5" textAnchor="middle" fill={GREY}>
          <text x="26" y="440" fill={GREEN} fontWeight="600">Search</text>
          <text x="77" y="440">Explore</text>
          <text x="128" y="440">Tickets</text>
          <text x="178" y="440">Profile</text>
        </g>
        <circle cx="25" cy="425" r="4" fill="none" stroke={GREEN} strokeWidth="1.5" />
        <line x1="28" y1="428" x2="31" y2="431" stroke={GREEN} strokeWidth="1.5" />
        <circle cx="77" cy="426" r="5" fill={GREY} />
        <rect x="122" y="421" width="12" height="9" rx="2" fill={GREY} />
        <circle cx="178" cy="423" r="3" fill={GREY} />
        <path d="M172 432 a6 5 0 0 1 12 0z" fill={GREY} />

        <Tap x={102} y={281} at={searchTap} />
      </Screen>

      {/* ── 2 · Results + AI pick ── */}
      <Screen from={0.24} to={0.48}>
        <rect width="204" height="454" fill="#f7f9fc" />
        <Header title="Pabna → Rajshahi" />
        <StatusBar light />

        <g fontSize="9" fontWeight="500">
          {["All", "Bus", "Train"].map((label, i) => (
            <g key={label}>
              <rect x={12 + i * 52} y="72" width="46" height="20" rx="10" fill={i === 0 ? GREEN : "#fff"} stroke={i === 0 ? GREEN : LINE} />
              <text x={35 + i * 52} y="85" textAnchor="middle" fill={i === 0 ? "#fff" : INK}>{label}</text>
            </g>
          ))}
        </g>

        {/* AI suggestion */}
        <g>
          <rect x="12" y="102" width="180" height="88" rx="10" fill="#fff" />
          <rect x="12" y="102" width="3.5" height="88" fill={GREEN} />
          <rect x="24" y="112" width="58" height="14" rx="7" fill="#e3efeb" />
          <text x="53" y="122" textAnchor="middle" fontSize="7" fontWeight="700" fill={GREEN}>AI Suggestion</text>
          <g clipPath={`url(#${id("type")})`}>
            <text x="24" y="142" fontSize="10" fontWeight="600" fill={INK}>Take the Local AC Coach.</text>
            <text x="24" y="157" fontSize="8" fill={GREY}>Leaves at 08:00 and gets you there</text>
            <text x="24" y="168" fontSize="8" fill={GREY}>in 1h 30m, in comfort.</text>
          </g>
          <text x="24" y="182" fontSize="7.5" fill={BUS}>Tip: grab a window seat for the Padma views.</text>
        </g>

        {/* Option cards */}
        {[
          { name: "Local AC Coach", type: "BUS", color: BUS, time: "08:00 → 09:30", price: "৳120", pick: true },
          { name: "Silk City Express", type: "TRAIN", color: "#264653", time: "07:00 → 08:30", price: "৳85" },
          { name: "BRTC Local", type: "BUS", color: BUS, time: "07:30 → 09:20", price: "৳80" },
        ].map((o, i) => {
          const y = 200 + i * 72;
          return (
            <g key={o.name}>
              <rect x="12" y={y} width="180" height="62" rx="10" fill="#fff" stroke={o.pick ? GREEN : "#fff"} />
              <rect x="12" y={y} width="5" height="62" rx="2" fill={o.color} />
              <text x="26" y={y + 17} fontSize="10" fontWeight="600" fill={INK}>{o.name}</text>
              <text x="26" y={y + 31} fontSize="7" fill={GREY} letterSpacing="0.5">{o.type}</text>
              <text x="26" y={y + 50} fontSize="9.5" fill={INK}>{o.time}</text>
              <text x="182" y={y + 50} textAnchor="end" fontSize="13" fontWeight="700" fill={GREEN}>{o.price}</text>
              {o.pick && (
                <g>
                  <rect x="140" y={y + 8} width="44" height="14" rx="7" fill={GREEN} />
                  <text x="162" y={y + 18} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">AI Pick</text>
                </g>
              )}
            </g>
          );
        })}

        <Tap x={90} y={232} at={pickTap} />
      </Screen>

      {/* ── 3 · Seat ── */}
      <Screen from={0.48} to={0.74}>
        <rect width="204" height="454" fill="#fff" />
        <Header title="Select Seat" />
        <StatusBar light />
        <text x="14" y="84" fontSize="11" fontWeight="600" fill={INK}>Local AC Coach</text>
        <text x="14" y="98" fontSize="9" fill={GREY}>Pabna → Rajshahi</text>
        <rect x="150" y="74" width="40" height="15" rx="7.5" fill="#eef0f3" />
        <text x="170" y="85" textAnchor="middle" fontSize="7.5" fontWeight="600" fill={INK}>AC</text>
        <text x="190" y="99" textAnchor="end" fontSize="8" fontWeight="600" fill={GREEN}>29 available</text>

        <path d="M22 380 V128 Q22 110 40 110 H164 Q182 110 182 128 V380" fill="none" stroke={LINE} strokeWidth="1.5" />
        <rect x="152" y="118" width="22" height="20" rx="4" fill="#fff" stroke="#c9ced6" />
        <rect x="157" y="122" width="12" height="8" rx="2" fill={GREY} />

        {[1, 2, 3, 4, 5, 6].map((row) =>
          ["A", "B", "C", "D"].map((col, c) => {
            const seat = `${row}${col}`;
            const x = [30, 64, 112, 146][c];
            const y = 146 + (row - 1) * 36;
            const taken = OCCUPIED.has(seat);
            const isTarget = seat === "3D";
            return (
              <g key={seat}>
                <rect x={x} y={y} width="28" height="28" rx="5" fill={taken ? "#e7e9ec" : "#f3f7f5"} stroke={taken ? "#c9ced6" : GREEN} strokeWidth="1.3" />
                {isTarget && (
                  <rect x={x} y={y} width="28" height="28" rx="5" fill={GREEN} opacity="0">
                    <animate attributeName="opacity" values="0;1" keyTimes={keyTimes(0, seatTap)} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
                  </rect>
                )}
                <text x={x + 14} y={y + 17.5} textAnchor="middle" fontSize="9" fontWeight="600" fill={taken ? "#a2a9b4" : INK}>
                  {seat}
                </text>
                {isTarget && (
                  <text x={x + 14} y={y + 17.5} textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff" opacity="0">
                    <animate attributeName="opacity" values="0;1" keyTimes={keyTimes(0, seatTap)} calcMode="discrete" dur={DUR} repeatCount="indefinite" />
                    {seat}
                  </text>
                )}
              </g>
            );
          }),
        )}

        <rect x="0" y="384" width="204" height="70" fill="#fff" />
        <line x1="0" y1="384" x2="204" y2="384" stroke={LINE} />
        <text x="14" y="404" fontSize="8" fill={GREY}>Selected Seat</text>
        <Phase from={0} to={seatTap}>
          <text x="14" y="424" fontSize="15" fontWeight="700" fill="#c9ced6">—</text>
        </Phase>
        <Phase from={seatTap} to={1}>
          <text x="14" y="424" fontSize="15" fontWeight="700" fill={GREEN}>3D</text>
        </Phase>
        <rect x="110" y="398" width="80" height="30" rx="8" fill={GREEN} />
        <text x="150" y="417" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#fff">Continue</text>

        <Tap x={160} y={232} at={seatTap} />
        <Tap x={150} y={413} at={contTap} />
      </Screen>

      {/* ── 4 · Ticket ── */}
      <Screen from={0.74} to={0.97}>
        <rect width="204" height="454" fill="#f7f9fc" />
        <Header title="Your Ticket" />
        <StatusBar light />

        <g>
          <animateTransform attributeName="transform" type="translate" values="0 18;0 18;0 0;0 0" keyTimes={keyTimes(0, 0.75, 0.79, 1)} calcMode="spline" keySplines="0 0 1 1;0.2 0.8 0.2 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
          <rect x="14" y="76" width="176" height="350" rx="12" fill="#fff" />
          <rect x="14" y="76" width="176" height="46" rx="12" fill={GREEN} />
          <rect x="14" y="108" width="176" height="14" fill={GREEN} />
          <text x="102" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">BongoJatra</text>
          <text x="102" y="112" textAnchor="middle" fontFamily={BANGLA} fontSize="7.5" fill="#cfe5dc">বাংলাদেশের যোগাযোগ ব্যবস্থা</text>

          <text x="28" y="148" fontSize="7" fill={GREY} letterSpacing="0.5">FROM</text>
          <text x="176" y="148" textAnchor="end" fontSize="7" fill={GREY} letterSpacing="0.5">TO</text>
          <text x="28" y="166" fontSize="14" fontWeight="700" fill={INK}>Pabna</text>
          <text x="176" y="166" textAnchor="end" fontSize="14" fontWeight="700" fill={INK}>Rajshahi</text>
          <path d="M80 161 H102 M98 157 L102 161 L98 165" stroke={GREEN} strokeWidth="1.4" fill="none" strokeLinecap="round" />

          <g fontSize="7" fill={GREY} letterSpacing="0.5">
            <text x="28" y="192">DATE</text>
            <text x="86" y="192">TIME</text>
            <text x="140" y="192">SEAT</text>
          </g>
          <g fontSize="10.5" fontWeight="600" fill={INK}>
            <text x="28" y="207">18 Nov</text>
            <text x="86" y="207">08:00</text>
            <text x="140" y="207" fill={GREEN}>3D</text>
          </g>

          {/* Tear line */}
          <circle cx="14" cy="228" r="7" fill="#f7f9fc" />
          <circle cx="190" cy="228" r="7" fill="#f7f9fc" />
          <line x1="26" y1="228" x2="178" y2="228" stroke={LINE} strokeDasharray="4 3" />

          {/* QR */}
          <g transform="translate(57 244)">
            <rect x="-6" y="-6" width="102" height="102" rx="6" fill="#fff" stroke={LINE} />
            {[[0, 0], [66, 0], [0, 66]].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width="24" height="24" fill={INK} />
                <rect x={x + 4} y={y + 4} width="16" height="16" fill="#fff" />
                <rect x={x + 8} y={y + 8} width="8" height="8" fill={INK} />
              </g>
            ))}
            {QR.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x * 6} y={y * 6} width="6" height="6" fill={INK} />
            ))}
            {/* Scan sweep */}
            <rect x="-2" width="94" height="2" fill={RED} opacity="0">
              <animate attributeName="opacity" values="0;0;0.8;0.8;0;0" keyTimes={keyTimes(0, 0.8, 0.81, 0.88, 0.89, 1)} dur={DUR} repeatCount="indefinite" />
              <animate attributeName="y" values="0;0;90;90" keyTimes={keyTimes(0, 0.8, 0.88, 1)} dur={DUR} repeatCount="indefinite" />
            </rect>
          </g>

          <text x="102" y="366" textAnchor="middle" fontSize="8" fill={GREY}>Valid for date of travel only</text>
          <text x="102" y="380" textAnchor="middle" fontSize="8" fill={GREY}>Payment: bKash · ৳120</text>
          <rect x="34" y="392" width="136" height="24" rx="7" fill={GREEN} />
          <text x="102" y="408" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fff">Download PDF</text>
        </g>

        {/* Confirmed stamp */}
        <g transform="translate(160 136)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes={keyTimes(0, 0.79, 0.8, 1)} dur={DUR} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" additive="sum" values="1.8;1.8;0.88;1;1" keyTimes={keyTimes(0, 0.79, 0.806, 0.816, 1)} calcMode="spline" keySplines="0 0 1 1;0.3 0 0.6 1;0.4 0 0.6 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
          <circle r="15" fill={RED} />
          <path d="M-6 0 L-2 4 L6 -5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Screen>
    </g>
  );
}

export function BongoJatraArtwork({ title }: { title: string }) {
  // Still frame (reduced motion): the ticket issued, the coach on its way.
  const svgRef = useSvgTimeline(LOOP * 0.86);
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `bj-${name}-${uid}`;

  const vehicles: { path: string; kind: "bus" | "train" | "launch"; dur: number; begin: number }[] = [
    { path: TRAIN_LINES[1], kind: "train", dur: 9, begin: 0 },
    { path: TRAIN_LINES[2], kind: "train", dur: 7, begin: -3 },
    { path: TRAIN_LINES[0], kind: "train", dur: 7, begin: -5 },
    { path: BUS_LINES[0], kind: "bus", dur: 4.67, begin: 0 },
    { path: BUS_LINES[1], kind: "bus", dur: 7, begin: -2 },
    { path: BUS_LINES[2], kind: "bus", dur: 7, begin: -4.5 },
    { path: LAUNCH_LINES[0], kind: "launch", dur: 7, begin: -1 },
    { path: LAUNCH_LINES[1], kind: "launch", dur: 7, begin: -4 },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      role="img"
      aria-label={`${title}: a transit map of Bangladesh with buses, trains and launches, and a phone booking a coach from Pabna to Rajshahi`}
      className="bongojatra-art"
    >
      <defs>
        <radialGradient id={id("bg")} cx="35%" cy="45%" r="75%">
          <stop offset="0%" stopColor="#065a43" />
          <stop offset="100%" stopColor={BG} />
        </radialGradient>
        <pattern id={id("dots")} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="#ffffff" opacity="0.07" />
        </pattern>
        <clipPath id={id("screen")}>
          <rect width="204" height="454" rx="27" />
        </clipPath>
        <clipPath id={id("type")}>
          <rect x="22" y="130" width="0" height="44">
            <animate attributeName="width" values="0;0;170;170" keyTimes={keyTimes(0, 0.29, 0.36, 1)} dur={DUR} repeatCount="indefinite" />
          </rect>
        </clipPath>
      </defs>

      <rect width="800" height="600" fill={`url(#${id("bg")})`} />
      <rect width="800" height="600" fill={`url(#${id("dots")})`} />

      {/* ── Transit map ── */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {LAUNCH_LINES.map((d) => (
          <path key={d} d={d} stroke={LAUNCH} strokeWidth="3" strokeDasharray="2 6" />
        ))}
        {BUS_LINES.map((d) => (
          <path key={d} d={d} stroke={BUS} strokeWidth="2.4" opacity="0.75" />
        ))}
        {TRAIN_LINES.map((d) => (
          <g key={d}>
            <path d={d} stroke={TRAIN} strokeWidth="4.5" opacity="0.9" />
            <path d={d} stroke={BG} strokeWidth="1.6" strokeDasharray="3 5" opacity="0.8" />
          </g>
        ))}

        {/* The booked trip lights up once the AI picks it */}
        <path d={TRIP} stroke={BUS} strokeWidth="2.4" opacity="0.75" />
        <path d={TRIP} pathLength={1} stroke={RED} strokeWidth="4" strokeDasharray="1 1" strokeDashoffset="1">
          <animate attributeName="stroke-dashoffset" values="1;1;0;0;1" keyTimes={keyTimes(0, 0.36, 0.46, 0.96, 1)} calcMode="spline" keySplines="0 0 1 1;0.55 0 0.25 1;0 0 1 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
        </path>
      </g>

      {/* Ambient traffic */}
      {vehicles.map((v, i) => (
        <g key={i}>
          <animateMotion path={v.path} dur={`${v.dur}s`} begin={`${v.begin}s`} repeatCount="indefinite" rotate={v.kind === "launch" ? undefined : "auto"} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
          {v.kind === "train" && <rect x="-9" y="-3.5" width="18" height="7" rx="3.5" fill="#fff" stroke={BG} strokeWidth="1" />}
          {v.kind === "bus" && <rect x="-6" y="-4" width="12" height="8" rx="2.5" fill={BUS} stroke={BG} strokeWidth="1" />}
          {v.kind === "launch" && <path d="M-8 -2 H8 L5 4 H-5Z M-3 -2 V-6 H3 V-2" fill={LAUNCH} stroke={BG} strokeWidth="0.8" />}
        </g>
      ))}

      {/* Cities */}
      {(Object.keys(CITIES) as City[]).map((key) => {
        const [x, y, en, bn, side] = CITIES[key];
        const tx = side === "r" ? x + 12 : side === "l" ? x - 12 : x;
        const ty = side === "b" ? y + 22 : side === "t" ? y - 26 : y + 1;
        const anchor = side === "r" ? "start" : side === "l" ? "end" : "middle";
        const major = key === "dhaka";
        return (
          <g key={key}>
            <circle cx={x} cy={y} r={major ? 8 : 6} fill="#fff" stroke={BG} strokeWidth="2.5" />
            <text x={tx} y={ty} textAnchor={anchor} stroke={BG} strokeWidth="4" strokeLinejoin="round" paintOrder="stroke" fontFamily={SANS} fontSize={major ? 15 : 12} fontWeight="600" fill="#fff">{en}</text>
            <text x={tx} y={ty + 13} textAnchor={anchor} stroke={BG} strokeWidth="3" strokeLinejoin="round" paintOrder="stroke" fontFamily={BANGLA} fontSize="9" fill={PALE}>{bn}</text>
          </g>
        );
      })}

      {/* You are here: Pabna */}
      <g transform={`translate(${pt("pabna")})`}>
        <circle r="6" fill="none" stroke={RED} strokeWidth="2">
          <animate attributeName="r" values="6;20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill={RED} />
      </g>

      {/* The booked coach sets off once the ticket is issued */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={keyTimes(0, 0.8, 0.82, 0.94, 0.96, 1)} dur={DUR} repeatCount="indefinite" />
        <animateMotion path={TRIP} keyPoints="0;0;1;1" keyTimes={keyTimes(0, 0.82, 0.95, 1)} calcMode="spline" keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1" dur={DUR} repeatCount="indefinite" />
        <circle r="14" fill={RED} opacity="0.25" />
        <rect x="-9" y="-6" width="18" height="12" rx="3.5" fill={RED} stroke="#fff" strokeWidth="1.5" />
        <rect x="-7" y="-16" width="14" height="9" rx="2" fill="#fff" />
        <text y="-9" textAnchor="middle" fontFamily={SANS} fontSize="6.5" fontWeight="700" fill={RED}>3D</text>
      </g>

      {/* ── Legend ── */}
      <g fontFamily={SANS} fontSize="9" fontWeight="600" letterSpacing="0.6">
        {[
          { label: "BUS", c: BUS, x: 36 },
          { label: "TRAIN", c: TRAIN, x: 84 },
          { label: "LAUNCH", c: LAUNCH, x: 142 },
        ].map((l) => (
          <g key={l.label}>
            <rect x={l.x} y="512" width={l.label.length * 7 + 20} height="20" rx="10" fill="#ffffff" fillOpacity="0.1" />
            <circle cx={l.x + 9} cy="522" r="3" fill={l.c} />
            <text x={l.x + 16} y="525.5" fill="#e8f1ec">{l.label}</text>
          </g>
        ))}
      </g>

      {/* ── Phone ── */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" dur="7s" repeatCount="indefinite" />
        <rect x="532" y="66" width="220" height="470" rx="35" fill="#0d1b2a" />
        <g transform="translate(540 74)" clipPath={`url(#${id("screen")})`}>
          <Phone id={id} />
        </g>
      </g>

      {/* ── Captions ── */}
      <g fontFamily={MONO} fontSize="11" letterSpacing="1.4">
        <text x="36" y="44" fill="#fff">BONGOJATRA</text>
        <text x="764" y="44" textAnchor="end" fill={PALE}>BUS · TRAIN · LAUNCH</text>
        <text x="36" y="572" fill={PALE}>ONE SEARCH · ALL OF BANGLADESH</text>
        <text x="764" y="572" textAnchor="end" fill={PALE}>AI PICKS THE BEST ROUTE</text>
      </g>
    </svg>
  );
}
