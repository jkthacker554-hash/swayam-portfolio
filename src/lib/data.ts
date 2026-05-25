export const siteConfig = {
  name: "Ronak Thacker",
  tagline: "RONAK.EXE",
  email: "hello@ronakthacker.dev",
  location: "India",
  age: 17,
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com",
  },
} as const;

export const bootMessages = [
  "INITIALIZING CREATIVE ENGINE",
  "LOADING AI NEURAL MODULES",
  "CALIBRATING FRONTEND SYSTEMS",
  "SYNCING HUMAN + MACHINE WORKFLOW",
] as const;

export const terminalLines = [
  "> boot --mode=cinematic",
  "> load modules: react, gsap, three.js",
  "> auth: self-taught developer",
  "> deploy: ronakthacker.dev",
  "> status: READY TO SHIP",
] as const;

export const heroHeadline = "AI IS MY TOOL. CREATIVITY IS MY POWER.";

export const heroSubheadline =
  "I'm Ronak Thacker — a self-taught AI-powered Website Developer focused on futuristic interfaces, immersive experiences, and high-performance digital products.";

export const floatingCodeSnippets = [
  "const future = await build(experience);",
  "AI.assist({ design, code, ship });",
  "export default Creativity;",
  "<Experience immersive />",
] as const;

export const stats = [
  { label: "Projects Shipped", value: 28, suffix: "+" },
  { label: "Skills in Stack", value: 20, suffix: "+" },
  { label: "Freelance Clients", value: 12, suffix: "+" },
  { label: "Years Building", value: 4, suffix: "+" },
] as const;

export const skills = [
  { name: "HTML5", level: 95, category: "Core" },
  { name: "CSS3", level: 94, category: "Core" },
  { name: "JavaScript", level: 92, category: "Core" },
  { name: "React", level: 90, category: "Framework" },
  { name: "Next.js", level: 88, category: "Framework" },
  { name: "Tailwind CSS", level: 93, category: "Styling" },
  { name: "Responsive Design", level: 94, category: "Design" },
  { name: "UI/UX Design", level: 88, category: "Design" },
  { name: "AI-Assisted Dev", level: 96, category: "AI" },
  { name: "Prompt Engineering", level: 91, category: "AI" },
  { name: "Frontend Dev", level: 92, category: "Build" },
  { name: "GSAP", level: 85, category: "Motion" },
  { name: "Framer Motion", level: 87, category: "Motion" },
  { name: "Three.js", level: 78, category: "3D" },
  { name: "Animations", level: 90, category: "Motion" },
  { name: "Bug Fixing", level: 93, category: "Craft" },
  { name: "Optimization", level: 89, category: "Craft" },
  { name: "Debugging", level: 94, category: "Craft" },
  { name: "Creative Development", level: 95, category: "Build" },
  { name: "Web Experiences", level: 96, category: "Build" },
] as const;

export const projectCategories = [
  "All",
  "AI Websites",
  "Luxury Brand",
  "Futuristic UI",
  "Landing Pages",
  "Portfolios",
  "Experimental",
] as const;

export const projects = [
  {
    id: "01",
    title: "AI Resume Builder",
    description:
      "An AI-powered resume generator that crafts professional resumes from a simple form input. Built with Next.js, OpenAI API, and PDF export support.",
    tech: ["Next.js", "OpenAI API", "Tailwind CSS", "TypeScript"],
    status: "LIVE",
    year: "2024",
    link: "#",
    github: "#",
  },
  {
    id: "02",
    title: "Gesture OS",
    description:
      "A browser-based operating system controlled entirely by hand gestures using MediaPipe and TensorFlow.js. No mouse, no keyboard — just your hands.",
    tech: ["React", "TensorFlow.js", "MediaPipe", "Canvas API"],
    status: "LIVE",
    year: "2024",
    link: "#",
    github: "#",
  },
  {
    id: "03",
    title: "NeuroChat",
    description:
      "Real-time AI chat application with memory, multi-session support, and a futuristic terminal-style UI. Powered by Claude API with streaming responses.",
    tech: ["Next.js", "Claude API", "Framer Motion", "Supabase"],
    status: "IN PROGRESS",
    year: "2025",
    link: "#",
    github: "#",
  },
  {
    id: "04",
    title: "Portfolio OS",
    description:
      "This very portfolio — built as a cinematic OS boot experience with 3D particles, GSAP animations, command palette, and terminal easter eggs.",
    tech: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
    status: "LIVE",
    year: "2025",
    link: "https://ronak-rust.vercel.app",
    github: "https://github.com/jkthacker554-hash/swayam-portfolio",
  },
];
export const timeline = [
  {
    year: "2025",
    title: "Diploma + Deep Stack Growth",
    org: "Continuous Learning",
    description:
      "Balancing formal education while pushing React, Three.js, and AI-assisted workflows to production level.",
  },
  {
    year: "2024",
    title: "Freelance Developer",
    org: "Independent",
    description:
      "Shipped complete websites for brands — design, build, debug, optimize, and deliver end-to-end.",
  },
  {
    year: "2023",
    title: "Real-World Builder",
    org: "Project Lab",
    description:
      "Moved from tutorials to shipping live products — landing pages, portfolios, and interactive UIs.",
  },
  {
    year: "2021",
    title: "The Spark",
    org: "Self-Taught Origin",
    description:
      "Started young, chose skills over shortcuts, and committed to learning technology deeply every day.",
  },
] as const;

export const whyHirePoints = [
  {
    title: "I adapt fast.",
    body: "New tools, tight deadlines, changing requirements — I recalibrate and deliver without drama.",
  },
  {
    title: "I learn faster than most.",
    body: "Self-taught at 17 with real shipped work. Curiosity is my default operating system.",
  },
  {
    title: "AI is my productivity weapon.",
    body: "I use AI intelligently — not as a crutch, but as leverage for speed, quality, and iteration.",
  },
  {
    title: "I build complete experiences.",
    body: "Design, develop, debug, improve, customize, and ship — full-cycle digital products.",
  },
  {
    title: "Results over excuses.",
    body: "I focus on outcomes clients can feel: performance, polish, and experiences that convert.",
  },
  {
    title: "Real-world proof.",
    body: "No degree yet — but a portfolio of work that speaks louder than credentials.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Ronak delivered a site that felt like a product launch, not a template. Insane attention to motion and detail.",
    author: "Arjun Mehta",
    role: "Founder, Pulse Digital",
  },
  {
    quote:
      "He fixed issues other devs couldn't touch, then elevated the entire UI. Fast, sharp, and future-ready.",
    author: "Sneha Kapoor",
    role: "Brand Director",
  },
  {
    quote:
      "The AI-assisted workflow didn't feel lazy — it felt like working with a developer from 2030.",
    author: "David Chen",
    role: "Startup CTO",
  },
  {
    quote:
      "Our landing page went viral on dev Twitter. Ronak doesn't build websites — he builds experiences.",
    author: "Maya Singh",
    role: "Marketing Lead",
  },
  {
    quote:
      "Professional beyond his age. Shipped on time, communicated clearly, and exceeded the brief.",
    author: "James Wilson",
    role: "Agency Partner",
  },
] as const;

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#why-hire", label: "Why Me" },
  { href: "#contact", label: "Contact" },
] as const;

export const commandPaletteItems = [
  { id: "home", label: "Go to Home", href: "#hero", shortcut: "H" },
  { id: "about", label: "About Ronak", href: "#about", shortcut: "A" },
  { id: "projects", label: "View Projects", href: "#projects", shortcut: "P" },
  { id: "skills", label: "Skills Lab", href: "#skills", shortcut: "S" },
  { id: "contact", label: "Hire Me", href: "#contact", shortcut: "C" },
  { id: "resume", label: "Download Resume", href: siteConfig.resumeUrl, shortcut: "R" },
] as const;

export const aiAssistantPrompts = [
  "What can Ronak build for me?",
  "Show me futuristic project examples",
  "How does Ronak use AI in development?",
  "What's your availability?",
] as const;
