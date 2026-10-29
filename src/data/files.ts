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
  role: "Full Stack Developer",
  tagline: "I build production-grade web apps with Next.js & TypeScript.",
  location: "Bangladesh",
  email: "fahim@example.com",
  socials: {
    github: "https://github.com/mdfahim18",
    linkedin: "https://linkedin.com/in/mdfahim18",
    twitter: "https://twitter.com/mdfahim18",
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
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2023 - Present",
    highlights: [
      "Delivered 10+ production web apps for international clients",
      "Specialized in Next.js App Router + TypeScript projects",
    ],
  },
];

export function bio(): string {
  return \`I'm a full stack developer from Bangladesh who loves
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
    name: "fahim-vscode-portfolio",
    description:
      "A production-level interactive portfolio that looks and works like VS Code, with a terminal, AI agent and Monaco editor.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zustand"],
    stars: 128,
    url: "https://github.com/mdfahim18/fahim-vscode-portfolio",
  },
  {
    id: 2,
    name: "saas-dashboard",
    description:
      "Analytics dashboard with real-time charts, role-based auth and multi-tenant billing.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    stars: 87,
    url: "https://github.com/mdfahim18",
  },
  {
    id: 3,
    name: "ai-chat-client",
    description:
      "Streaming chat UI built on the Vercel AI SDK with markdown + code highlighting.",
    stack: ["Next.js", "Vercel AI SDK", "OpenAI"],
    stars: 64,
    url: "https://github.com/mdfahim18",
  },
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
  email: "fahim@example.com",
  location: "Bangladesh (UTC+6)",
  availability: "Available for freelance & full-time",
};

export function validate(form: ContactForm): string[] {
  const errors: string[] = [];
  if (form.name.trim().length < 2) errors.push("Name is too short");
  if (!/^[^@]+@[^@]+\\.[^@]+$/.test(form.email)) errors.push("Invalid email");
  if (form.message.trim().length < 10) errors.push("Message is too short");
  return errors;
}

export async function send(form: ContactForm): Promise<{ ok: boolean }> {
  const errors = validate(form);
  if (errors.length > 0) return { ok: false };
  console.log("Sending message from", form.email);
  return { ok: true };
}

export default { contact, validate, send };
`,
  },
};

export const fileNames = Object.keys(files);
