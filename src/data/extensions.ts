export interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  version: string;
  installs: string;
  rating: number;
  category: "Popular" | "Frontend" | "Backend" | "Tools" | "Languages";
  icon: string;
}

export const extensionsData: Extension[] = [
  { id: "react", name: "React", publisher: "Meta", description: "Build user interfaces with reusable components.", version: "18.2.0", installs: "20M+", rating: 5, category: "Frontend", icon: "Atom" },
  { id: "nextjs", name: "Next.js", publisher: "Vercel", description: "Build modern React applications with Next.js.", version: "15.0.0", installs: "10M+", rating: 5, category: "Frontend", icon: "Globe" },
  { id: "typescript", name: "TypeScript", publisher: "Microsoft", description: "Write safer and more maintainable JavaScript.", version: "5.0.0", installs: "30M+", rating: 5, category: "Languages", icon: "FileCode" },
  { id: "tailwind", name: "Tailwind CSS", publisher: "Tailwind Labs", description: "Style responsive interfaces using utility classes.", version: "3.4.0", installs: "15M+", rating: 5, category: "Frontend", icon: "Wind" },
  { id: "javascript", name: "JavaScript", publisher: "OpenJS Foundation", description: "Create interactive and dynamic web experiences.", version: "ES6+", installs: "50M+", rating: 5, category: "Languages", icon: "FileJson" },
  { id: "htmlcss", name: "HTML & CSS", publisher: "W3C", description: "Structure and style modern web pages.", version: "HTML5", installs: "50M+", rating: 5, category: "Frontend", icon: "Layout" },
  { id: "nodejs", name: "Node.js", publisher: "OpenJS Foundation", description: "Build fast server-side applications with JavaScript.", version: "20.0.0", installs: "25M+", rating: 5, category: "Backend", icon: "Server" },
  { id: "express", name: "Express.js", publisher: "OpenJS Foundation", description: "Create APIs and backend routes with Express.", version: "4.18.0", installs: "10M+", rating: 4, category: "Backend", icon: "Route" },
  { id: "python", name: "Python", publisher: "Python Software Foundation", description: "My first programming language and foundation.", version: "3.12.0", installs: "40M+", rating: 5, category: "Languages", icon: "Terminal" },
  { id: "git", name: "Git & GitHub", publisher: "GitHub", description: "Track changes and collaborate on software projects.", version: "2.40.0", installs: "50M+", rating: 5, category: "Tools", icon: "GitBranch" },
];
