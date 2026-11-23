export interface VirtualFile {
  name: string;
  language: "typescript" | "javascript" | "json" | "markdown";
  content: string;
}

export const files: Record<string, VirtualFile> = {
  "home.ts": {
    name: "home.ts",
    language: "typescript",
    content: `import { Skills, Stack } from "./about";

export const developer = {
  name: "Mahmudul Amin Fahim",
  role: "Software Engineer",
  tagline: "I build production-grade web apps with Next.js & TypeScript.",
  location: "Sylhet, Bangladesh (UTC+6)",
  email: "mahmudulaminfahim@gmail.com",
  socials: {
    github: "https://github.com/mdfahim18",
    linkedin: "https://www.linkedin.com/in/mahmudulaminfahim/",
    twitter: "https://x.com/mahmudulfahim18",
  },
} as const;

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export const quickStack: Stack[] = ["Next.js 15", "TypeScript", "Tailwind CSS", "Node.js"];

export const currentStatus = "Open to opportunities 🚀";

export default developer;
`,
  },

  "about.ts": {
    name: "about.ts",
    language: "typescript",
    content: `export type Stack =
  | "Next.js 15"
  | "React"
  | "TypeScript"
  | "Tailwind CSS"
  | "Node.js"
  | "PostgreSQL"
  | "MongoDB"
  | "Docker";

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
  languages: string[];
}

export const skills: Skills = {
  frontend: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "Prisma", "tRPC"],
  tools: ["Git", "Docker", "Vercel", "PostgreSQL"],
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
};

export const experience = [
  {
    company: "DiviExpand",
    role: "Software Engineer (Frontend)",
    period: "Feb 2025 - Present",
    highlights: [
      "Developed and published 'DiviAnimator', a GSAP-powered animation plugin for Divi 5, now live on the Elegant Themes Marketplace.",
      "Designed 15+ custom extensions and 10+ interactive modules including Gravity Falling Elements (Matter.js), Marquee, Sticky Elements, and Cursor Follower.",
      "Built custom admin panels using PHP and TypeScript to inject advanced animation settings into existing Divi modules.",
      "Leveraged GSAP and Matter.js to build high-performance, physics-based animations and responsive visual effects with per-device controls.",
    ],
  },
];

export function bio(): string {
  return \`I'm a software engineer from Sylhet, Bangladesh who loves
clean architecture, fast products and great developer UX.
I spend most of my time in VS Code — which is why
you're reading this portfolio inside one.\`;
}

export default { skills, experience, bio };
`,
  },

  "projects.ts": {
    name: "projects.ts",
    language: "typescript",
    content: `export interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  stars: number;
  url: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Shopping Cart App",
    description: "E-commerce web app with category filtering, sorting, price range, and a dynamic Redux-powered cart.",
    stack: ["Next.js", "Redux Toolkit", "Tailwind CSS"],
    stars: 0,
    url: "https://my-react-cart-project1.netlify.app/",
  },
  {
    id: 2,
    name: "Weather App",
    description: "Real-time weather app with location search, smart unit conversions (K→C, m/s→km/h), and dynamic day/night UI.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    stars: 0,
    url: "https://nextjs-weather-app-indol.vercel.app/",
  },
  {
    id: 3,
    name: "Shadcn Dashboard",
    description: "A responsive and modern dashboard interface designed for web applications with clean data visualization.",
    stack: ["Next.js", "React", "Tailwind CSS", "Shadcn UI"],
    stars: 0,
    url: "https://shadecn-dashboard-mu.vercel.app/",
  },
  {
    id: 4,
    name: "Car Showcase",
    description: "Car catalogue with custom filters, search, and pagination, fetching real-time data from Rapid API.",
    stack: ["Next.js", "Tailwind CSS", "Headless UI", "Rapid API"],
    stars: 0,
    url: "https://nextjs-car-showcase1.netlify.app/",
  },
  {
    id: 5,
    name: "Unsplash Image Gallery",
    description: "A sleek image gallery app powered by the Unsplash API. Explore and search high-quality photos.",
    stack: ["React", "Tailwind CSS", "Unsplash API"],
    stars: 0,
    url: "https://my-react-unsplash-image-project.netlify.app/",
  },
  {
    id: 6,
    name: "School Management System",
    description: "Frontend app for managing school activities with NextAuth, Recharts for data visualization, and Redux Toolkit.",
    stack: ["Next.js", "Tailwind CSS", "NextAuth", "Recharts", "Redux"],
    stars: 0,
    url: "https://github.com/mdfahim18",
  },
  {
    id: 7,
    name: "Anime Vault",
    description: "Explore popular anime series with server-side rendering, infinite scroll, and a responsive masonry layout.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    stars: 0,
    url: "https://nextjs-anime-vault.netlify.app/",
  }
];

export function getProject(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}

export default projects;
`,
  },

  "contact.ts": {
    name: "contact.ts",
    language: "typescript",
    content: `export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const contact = {
  email: "mahmudulaminfahim@gmail.com",
  location: "Sylhet, Bangladesh (UTC+6)",
  availability: "Available for freelance & full-time",
};

export function validate(form: ContactForm): string[] {
  const errors: string[] = [];
  if (form.name.trim().length < 2) errors.push("Name is too short");
  if (!/^[^@]+@[^@]+\\.[^@]+$/.test(form.email)) errors.push("Invalid email");
  if (form.message.trim().length < 10) errors.push("Message is too short");
  return errors;
}

// 💡 Tip: Run the "send" command in the integrated terminal below to test this mailer.
export async function send(form: ContactForm): Promise<{ ok: boolean }> {
  const errors = validate(form);
  if (errors.length > 0) return { ok: false };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) return { ok: true };
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

export default { contact, validate, send };
`,
  },
};

export const fileNames = Object.keys(files);
