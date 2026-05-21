export const bootMessages = [
  "INITIALIZING EXPERIENCE",
  "LOADING VISUAL SYSTEMS",
  "CALIBRATING MOTION ENGINE",
  "WELCOME TO SWAYAM.EXE",
] as const;

export const stats = [
  { label: "Projects Delivered", value: 48, suffix: "+" },
  { label: "Hours in Timeline", value: 12000, suffix: "+" },
  { label: "Brands Collaborated", value: 24, suffix: "+" },
  { label: "Awards & Features", value: 12, suffix: "+" },
] as const;

export const skills = [
  { name: "Figma", level: 96, category: "Design" },
  { name: "After Effects", level: 94, category: "Motion" },
  { name: "Premiere Pro", level: 92, category: "Video" },
  { name: "Photoshop", level: 90, category: "Design" },
  { name: "Blender", level: 78, category: "3D" },
  { name: "Framer", level: 85, category: "Design" },
  { name: "Webflow", level: 82, category: "Web" },
  { name: "JavaScript", level: 75, category: "Code" },
] as const;

export const featuredProjects = [
  {
    id: "neon-drift",
    title: "NEON DRIFT",
    category: "Featured",
    type: "video" as const,
    description: "Cinematic brand film with glitch typography and neon cityscapes.",
    tags: ["Color Grade", "Sound Design", "VFX"],
    gradient: "from-cyan-500/20 via-purple-600/30 to-rose-500/20",
  },
  {
    id: "pulse-os",
    title: "PULSE OS",
    category: "Featured",
    type: "ui" as const,
    description: "Futuristic operating system UI for a music-tech startup.",
    tags: ["UX Research", "Design System", "Prototyping"],
    gradient: "from-blue-500/20 via-violet-600/30 to-fuchsia-500/20",
  },
  {
    id: "void-protocol",
    title: "VOID PROTOCOL",
    category: "Featured",
    type: "video" as const,
    description: "Sci-fi trailer edit with particle simulations and HUD overlays.",
    tags: ["Editing", "Motion Graphics", "Compositing"],
    gradient: "from-sky-500/20 via-indigo-600/30 to-red-500/20",
  },
] as const;

export const videoProjects = [
  {
    id: "v1",
    title: "CHROMATIC RUSH",
    year: "2025",
    role: "Editor · Colorist",
    duration: "2:14",
    gradient: "from-[#00d4ff]/30 to-[#a855f7]/40",
  },
  {
    id: "v2",
    title: "MIDNIGHT SIGNAL",
    year: "2024",
    role: "Director's Cut",
    duration: "4:02",
    gradient: "from-[#a855f7]/30 to-[#ff2d55]/30",
  },
  {
    id: "v3",
    title: "SYNTH WAVE '89",
    year: "2024",
    role: "VFX · Edit",
    duration: "1:48",
    gradient: "from-[#ff2d55]/20 to-[#00d4ff]/30",
  },
  {
    id: "v4",
    title: "AURORA FRAME",
    year: "2023",
    role: "Full Post",
    duration: "3:30",
    gradient: "from-cyan-500/25 to-purple-600/35",
  },
] as const;

export const uiProjects = [
  {
    id: "u1",
    title: "NEXUS BANK",
    platform: "Mobile · Web",
    description: "Neo-banking app with glass UI and biometric flows.",
    color: "#00d4ff",
  },
  {
    id: "u2",
    title: "ECHO STUDIO",
    platform: "Desktop",
    description: "DAW interface redesign for professional producers.",
    color: "#a855f7",
  },
  {
    id: "u3",
    title: "ORBIT HEALTH",
    platform: "Mobile",
    description: "Wellness dashboard with real-time vitals visualization.",
    color: "#ff2d55",
  },
  {
    id: "u4",
    title: "GRID COMMERCE",
    platform: "Web",
    description: "Headless e-commerce with immersive product storytelling.",
    color: "#00d4ff",
  },
] as const;

export const timeline = [
  {
    year: "2025",
    title: "Lead Visual Designer",
    org: "Aether Labs",
    description: "Driving motion systems and brand films for AI products.",
  },
  {
    year: "2023",
    title: "Senior Video Editor",
    org: "Pulse Creative",
    description: "Led post-production for global campaign launches.",
  },
  {
    year: "2021",
    title: "UI/UX Designer",
    org: "Nova Digital",
    description: "Shipped 15+ product interfaces from research to handoff.",
  },
  {
    year: "2019",
    title: "Freelance Creator",
    org: "Independent",
    description: "Built portfolio across music videos, apps, and brand films.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Swayam doesn't deliver assets — he delivers worlds. Every frame feels intentional.",
    author: "Maya Chen",
    role: "Creative Director, Pulse",
  },
  {
    quote:
      "The UI work felt like using software from 2030. Our conversion jumped 40%.",
    author: "James Okonkwo",
    role: "CEO, Nexus Bank",
  },
  {
    quote:
      "Rare blend of editor precision and designer empathy. A true visual architect.",
    author: "Elena Vasquez",
    role: "Head of Brand, Aether",
  },
] as const;

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#featured", label: "Work" },
  { href: "#video", label: "Video" },
  { href: "#ui", label: "UI/UX" },
  { href: "#skills", label: "Skills" },
  { href: "#timeline", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;
