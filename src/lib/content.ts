export const profile = {
  name: "Hasin Ishrak Labib",
  nickname: "Labib",
  role: "Software Developer",
  location: "Bangladesh",
  timezone: "Asia/Dhaka",

  // Add your real contact destinations before publishing.
  email: "241hasinishraklabib@gmail.com",
  github: "",
  linkedin: "",
  lastfm: "",

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
  artwork: "songket" | "recipe" | "fitness" | "system" | "emblem";
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
  video?: { id: string; title: string };
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
    credits: [
      "Team: Binary Bandits",
      "Branding: Hasin Ishrak Labib",
      "Development: Tijul Kabir",
    ],
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
    video: { id: "ezjVDFpkaeY", title: "Songket: decentralized offline mesh messaging demo" },
    focus: [],
  },
  {
    slug: "mamonis-recipe",
    number: "02",
    title: "Mamoni's Recipe App",
    role: "Design & Development",
    category: "Mobile application",
    technology: "Flutter",
    kind: "Development",
    color: "#cfddd0",
    artwork: "recipe",
    introduction:
      "A Flutter recipe application. This case-study scaffold is ready for the actual product story, interface screens, implementation details, and development decisions.",
    focus: [
      "Document the recipe browsing and detail flows.",
      "Explain the Flutter component structure and state management.",
      "Add real screenshots and describe what you learned.",
    ],
  },
  {
    slug: "ai-fitness",
    number: "03",
    title: "AI-Backed Fitness Application",
    role: "Full-Stack UI & Backend",
    category: "Application development",
    technology: "Stack to be documented",
    kind: "Development",
    color: "#c5c4ed",
    artwork: "fitness",
    introduction:
      "An AI-backed fitness application. Replace this scaffold with the actual user problem, the role of AI, the backend architecture, and the boundaries of the system.",
    focus: [
      "Describe the core fitness workflow and intended audience.",
      "Document the frontend/backend contract and AI integration.",
      "Add measured results only when they are available.",
    ],
  },
  {
    slug: "reichswacht",
    number: "04",
    title: "REICHSWACHT System Design",
    role: "Alternative History Modding & Lore",
    category: "Systems & worldbuilding",
    technology: "Modding / systems design",
    kind: "Systems",
    color: "#b4c4cd",
    artwork: "system",
    introduction:
      "An alternative-history modding and lore project. Use this page to explain the fictional setting, interacting systems, design constraints, and implementation approach.",
    focus: [
      "Introduce the fictional world and the design brief.",
      "Show how mechanics and narrative systems connect.",
      "Include representative diagrams and in-game examples.",
    ],
  },
  {
    slug: "minimalist-emblems",
    number: "05",
    title: "Custom Minimalist Emblems",
    role: "Vector Graphic Design",
    category: "Visual identity",
    technology: "Vector design",
    kind: "Design",
    color: "#ded9cf",
    artwork: "emblem",
    introduction:
      "A collection of minimalist vector emblems. Replace these abstract placeholders with your original marks, construction studies, and real design rationale.",
    focus: [
      "Show the original briefs and visual constraints.",
      "Include construction grids and iteration studies.",
      "Demonstrate legibility across different sizes.",
    ],
  },
];
