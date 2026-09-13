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

export type Project = {
  slug: string;
  number: string;
  title: string;
  role: string;
  category: string;
  technology: string;
  color: string;
  artwork: "recipe" | "fitness" | "system" | "emblem";
  introduction: string;
  focus: string[];
};

export const projects: Project[] = [
  {
    slug: "mamonis-recipe",
    number: "01",
    title: "Mamoni's Recipe App",
    role: "Design & Development",
    category: "Mobile application",
    technology: "Flutter",
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
    number: "02",
    title: "AI-Backed Fitness Application",
    role: "Full-Stack UI & Backend",
    category: "Application development",
    technology: "Stack to be documented",
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
    number: "03",
    title: "REICHSWACHT System Design",
    role: "Alternative History Modding & Lore",
    category: "Systems & worldbuilding",
    technology: "Modding / systems design",
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
    number: "04",
    title: "Custom Minimalist Emblems",
    role: "Vector Graphic Design",
    category: "Visual identity",
    technology: "Vector design",
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
