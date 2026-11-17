export const profile = {
  name: "Hasin Ishrak Labib",
  nickname: "Labib",
  role: "Software Developer",
  location: "Bangladesh",
  timezone: "Asia/Dhaka",

  // Add your real contact destinations before publishing.
  email: "labib.240113@s.pust.ac.bd",
  github: "https://github.com/LabibIshrak",
  linkedin: "https://www.linkedin.com/in/hasin-ishrak-labib",
  instagram: "https://www.instagram.com/ishraklabib_/",
  spotify: "https://open.spotify.com/user/31lj5ttyzrbauvlbagrfzubnp7my",
  letterboxd: "https://letterboxd.com/ishraklabib/",

  introduction:
    "Helping build robust applications and complex systems. No nonsense, always on the cutting edge.",

  about:
    "I am a CS and Software Engineering student based in Bangladesh, specializing in core data structures, C++, and Flutter development. When I'm not writing code, I'm deep into grand strategy game mechanics, designing alternative history mods, or crafting physical historical standees.",
};

export type ProjectKind = "Development" | "Design" | "Systems";

export type Project = {
  slug: string;
  number: string;
  title: string;
  /** What you did: shown as "Services" in the index. */
  role: string;
  /** Short descriptor, e.g. "Mobile application". */
  category: string;
  technology: string;
  /** Filter group on the work page. */
  kind: ProjectKind;
  year?: string;
  color: string;
  artwork: "songket" | "lunar" | "calcrex" | "bongojatra";
  introduction: string;
  focus: string[];

  /* Rich case-study fields. A project with `problem` gets the full layout. */
  award?: string;
  location?: string;
  credits?: string[];
  links?: { label: string; href: string }[];
  problem?: string;
  features?: { title: string; text: string }[];
  stack?: [string, string][];
  /** YouTube video; aspect is the player shape, e.g. "16 / 9". */
  video?: { id: string; title: string; aspect?: string };
};

export const projects: Project[] = [
  {
    slug: "songket",
    number: "01",
    title: "Songket",
    role: "Branding & Product",
    category: "Hackathon · Winner",
    technology: "Kotlin · Jetpack Compose · BLE",
    kind: "Development",
    year: "2026",
    color: "#0b2419",
    artwork: "songket",
    award: "Winner — July Hackathon 2026 · Best project nationally",
    location: "Bangladesh",
    credits: ["Team Binary Bandits"],
    links: [
      { label: "GitHub", href: "https://github.com/BinaryBandits-Hackathon/songket" },
      { label: "Watch demo", href: "https://youtu.be/ezjVDFpkaeY" },
    ],
    introduction:
      "Songket is an off-grid messenger that keeps people talking when the internet is gone. It builds a peer-to-peer mesh over Bluetooth Low Energy: no servers, no cell towers, no mobile data. Every phone is a node, so messages hop from device to device until they arrive, encrypted end to end the whole way.",
    problem:
      "During the July Uprising and the 2024 floods, millions of people in Bangladesh lost their connection at the moment they needed it most. Every mainstream messenger depends on central servers, so when the network went down, rescue work slowed, families were cut off and nobody could coordinate. Songket is built for exactly that moment.",
    features: [
      {
        title: "Bluetooth mesh",
        text: "Phones discover each other automatically and relay messages across multiple hops, with a time-to-live on every packet. Each phone that joins extends the range.",
      },
      {
        title: "End-to-end encryption",
        text: "X25519 key exchange and AES-256-GCM. Phones in the middle forward packets they can't read, change or replay.",
      },
      {
        title: "Store and forward",
        text: "If someone is out of range, the message waits in an encrypted cache and is delivered the moment a route reappears.",
      },
      {
        title: "Private messages",
        text: "One-to-one channels that run independently of the public #mesh chat, for things like coordinates or medical needs.",
      },
      {
        title: "Photos and voice",
        text: "Images are compressed before they travel, and voice notes come through clearly, all without a single byte of mobile data.",
      },
      {
        title: "Emergency wipe",
        text: "A rapid triple tap on the logo destroys every message, key and local database instantly, in case a phone is taken.",
      },
    ],
    stack: [
      ["Platform", "Android 8.0+ (API 26)"],
      ["Language", "Kotlin, Coroutines"],
      ["Interface", "Jetpack Compose, Material Design 3"],
      ["Architecture", "MVVM"],
      ["Networking", "Bluetooth Low Energy mesh, TTL-based multi-hop routing"],
      ["Cryptography", "BouncyCastle: X25519, Ed25519, AES-256-GCM"],
      ["Storage", "EncryptedSharedPreferences"],
    ],
    video: { id: "ezjVDFpkaeY", title: "Songket: decentralized offline mesh messaging demo", aspect: "1 / 1" },
    focus: [],
  },
  {
    slug: "lunar-life",
    number: "02",
    title: "Lunar Life",
    role: "Design & Development",
    category: "Educational game",
    technology: "TypeScript · React 19 · Vite · SVG",
    kind: "Development",
    year: "2026",
    color: "#0b0b0c",
    artwork: "lunar",
    award: "NASA Space Apps Challenge 2026 · Junior Astronaut Mission Trainer",
    location: "Bangladesh",
    credits: ["Team Binary Bandits"],
    links: [
      { label: "Play now", href: "https://nasa-hack-26.pages.dev" },
      { label: "GitHub", href: "https://github.com/BinaryBandits-Hackathon/lunar-lifeline" },
      { label: "Watch trailer", href: "https://youtu.be/CDM39_Nv56k" },
    ],
    introduction:
      "Lunar Life makes kids aged 7 to 12 the commander of a 14-sol mission on Mars. Twelve hard choices, each with a real cost in fuel, time and crew health, and every danger drawn from real NASA data. Kids don't memorise facts; they use them to bring their crew home. It runs in any browser, in English and Bangla, with nothing to install.",
    problem:
      "Space science feels distant to kids. They read about radiation and dust storms, but never feel why astronauts care, and millions of children in Bangladesh rarely get a science game in their own language at all. NASA's challenge asked for a junior astronaut trainer. We built one where the trade-offs are real.",
    features: [
      {
        title: "Real NASA data",
        text: "Solar storms come from NASA's DONKI space-weather records, with real dates and strengths. Radiation doses use what the Curiosity rover measured on the Martian surface.",
      },
      {
        title: "Choices that matter",
        text: "A hidden model tracks fuel, time and crew health. We tested all 4,096 possible paths: only about 41% get home, and every one of the 12 decisions can change the ending.",
      },
      {
        title: "Every fact is sourced",
        text: "Each fact card links to the NASA page it comes from, from InSight to MOXIE, and automated tests make sure the links are there.",
      },
      {
        title: "A crew worth saving",
        text: "Mei the doctor, Tunde the engineer and Pip the robot chat, joke and get interrupted by disasters, so kids want to see the story through.",
      },
      {
        title: "Learning after the ending",
        text: "The debrief shows the one choice that flipped your ending, what each decision cost, and your radiation dose against NASA's career limit.",
      },
      {
        title: "Made for every kid",
        text: "A full Bangla version, read-aloud, reduced motion, keyboard play and large text. No accounts, ads or tracking, and it works offline once loaded.",
      },
    ],
    stack: [
      ["Language", "TypeScript"],
      ["Framework", "React 19, Vite"],
      ["Graphics", "Hand-coded inline SVG, no image assets"],
      ["Audio", "Synthesised live with the Web Audio API"],
      ["Data", "NASA DONKI space-weather records via api.nasa.gov"],
      ["Testing", "Vitest: 100+ tests across all 4,096 paths"],
      ["Hosting", "Cloudflare Pages, installable and offline-ready"],
    ],
    video: { id: "CDM39_Nv56k", title: "Lunar Lifeline trailer, NASA Space Apps 2026", aspect: "16 / 9" },
    focus: [],
  },
  {
    slug: "calcrex",
    number: "03",
    title: "Calcrex",
    role: "Design & Development",
    category: "Calculator app",
    technology: "Android · Graphing · AI solver",
    kind: "Development",
    year: "2025",
    color: "#121317",
    artwork: "calcrex",
    award: "Solo project · Scientific, graphing and AI in one app",
    location: "Bangladesh",
    introduction:
      "Calcrex is a modern scientific calculator built to be the only one you need. It handles every kind of scientific calculation, plots graphs the way Desmos does, and solves problems step by step with built-in AI, the way Wolfram Alpha does. Point the camera at a problem and it reads it for you. And there are no ads, ever.",
    problem:
      "Phone calculators stop at the basics. So students end up juggling three apps: one for scientific work, a graphing site for plots and a solver for anything harder, most of them stuffed with ads. Calcrex puts all of it into one clean, ad-free app.",
    features: [
      {
        title: "Full scientific mode",
        text: "A clean everyday keypad that opens into trig and inverse functions, powers, roots, logs, factorials, absolute value, π and e, with extra pages of functions behind the 1st key.",
      },
      {
        title: "Graphs like Desmos",
        text: "Plot several functions at once, f1, f2 and more, including equations in x and y such as x² + y² − 4 for a circle. Zoom, recentre and go full screen, with a keyboard built for graphing.",
      },
      {
        title: "Scan a problem",
        text: "Take a photo or pick one from the gallery. Calcrex reads the expression, lets you fix it if needed, and solves it.",
      },
      {
        title: "AI that shows its work",
        text: "Ask a maths question and the built-in AI solves it step by step, so you learn how to get the answer, not just what it is.",
      },
      {
        title: "Modes at a glance",
        text: "Angle and number modes sit right above the display, and a MODE key switches between them, so you always know how the answer was worked out.",
      },
      {
        title: "No ads. Ever.",
        text: "No banners, no pop-ups, no waiting out a video to see your result. Just the calculator, with your history one tap away.",
      },
    ],
    focus: [],
  },
  {
    slug: "bongojatra",
    number: "04",
    title: "BongoJatra",
    role: "Design & Development",
    category: "Transport platform",
    technology: "Flutter · Java · Groq AI",
    kind: "Development",
    year: "2026",
    color: "#033a2b",
    artwork: "bongojatra",
    award: "University project · Bus, train and launch in one search",
    location: "Bangladesh",
    links: [
      { label: "GitHub", href: "https://github.com/LabibIshrak/academic_projects/tree/main/bongojatra" },
    ],
    introduction:
      "BongoJatra is a unified transport platform for Bangladesh. Buses, trains and river launches live in one app, so a single search shows every way to get between two cities. An AI advisor picks the best option for you, and you can choose your seat, pay and walk away with a QR ticket, all in one flow.",
    problem:
      "Travelling across Bangladesh means checking a different place for every mode: bus counters, the railway site, launch terminals. Nobody compares them side by side, so passengers rarely know whether the bus, the train or the launch is faster, cheaper or more comfortable today. BongoJatra puts every mode on one screen.",
    features: [
      {
        title: "One search, every mode",
        text: "Pick where you're going and when. Bus, train and launch results come back together, filterable and sortable by price, speed or comfort.",
      },
      {
        title: "AI that picks for you",
        text: "An AI advisor reads every option for your route and recommends one, explains why it fits whether you want fastest, cheapest, most comfortable or scenic, and adds a practical travel tip.",
      },
      {
        title: "Real seat maps",
        text: "Each vehicle has its own layout: 2+2 coach seats, train classes and coaches, and launch decks and cabins, with taken seats greyed out.",
      },
      {
        title: "Explore the country",
        text: "Browse all eight divisions and nearby cities from where you are, with the modes that serve them and the lowest fare, in English and Bangla.",
      },
      {
        title: "Pay the local way",
        text: "Check out with bKash or a card, then get a ticket with a QR code that you can download as a PDF.",
      },
      {
        title: "Your trips in one place",
        text: "Sign in with Google to keep every booking together, view your tickets again, and cancel when plans change.",
      },
    ],
    stack: [
      ["App", "Flutter, with flutter_animate and Google Fonts"],
      ["Backend", "Plain Java 17 HTTP server, no frameworks"],
      ["AI", "Groq API, Llama 3.1 8B, with a local fallback"],
      ["Sign-in", "Google sign-in with Firebase Authentication"],
      ["Tickets", "PDF generation and QR codes on device"],
    ],
    focus: [],
  },
];
