const green = "\x1b[32m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";

export interface CommandResult {
  output: string[];
  clear?: boolean;
}

const HELP: CommandResult = {
  output: [
    `${cyan}Available commands:${reset}`,
    `  ${green}help${reset}            Show this help message`,
    `  ${green}about${reset}           About Mahmudul Amin Fahim`,
    `  ${green}skills${reset}          Technical skill set`,
    `  ${green}projects${reset}        List portfolio projects`,
    `  ${green}contact${reset}         How to get in touch`,
    `  ${green}ls${reset}              List portfolio files`,
    `  ${green}clear${reset}           Clear the terminal`,
    `  ${green}sudo hire-fahim${reset} ${yellow}(careful...)${reset}`,
    "",
    `${dim}Tip: press Tab on 'sudo hire-fahim' for a shortcut.${reset}`,
  ],
};

const ABOUT: CommandResult = {
  output: [
    `${cyan}Mahmudul Amin Fahim — Full Stack Developer${reset}`,
    "",
    "I'm a full stack developer from Bangladesh who loves",
    "clean architecture, fast products and great developer UX.",
    "I spend most of my time in VS Code — which is why",
    "you're reading this portfolio inside one.",
    "",
    `${dim}Stack: Next.js · TypeScript · Tailwind CSS · Node.js${reset}`,
  ],
};

const SKILLS: CommandResult = {
  output: [
    `${cyan}Skills${reset}`,
    `  Frontend : Next.js, React, Tailwind CSS, Framer Motion`,
    `  Backend  : Node.js, Express, Prisma, tRPC`,
    `  Tools    : Git, Docker, Vercel, PostgreSQL`,
    `  Languages: TypeScript, JavaScript, Python, SQL`,
  ],
};

const PROJECTS: CommandResult = {
  output: [
    `${cyan}Projects${reset}`,
    `  ${green}1.${reset} fahim-vscode-portfolio  ${dim}Next.js · TypeScript · Zustand${reset}`,
    `     A portfolio that works like VS Code (you are using it now)`,
    `  ${green}2.${reset} saas-dashboard          ${dim}Next.js · Prisma · Stripe${reset}`,
    `     Analytics dashboard with real-time charts and billing`,
    `  ${green}3.${reset} ai-chat-client          ${dim}Next.js · Vercel AI SDK${reset}`,
    `     Streaming chat UI with markdown + code highlighting`,
    "",
    `${dim}Source: https://github.com/mdfahim18${reset}`,
  ],
};

const CONTACT: CommandResult = {
  output: [
    `${cyan}Contact${reset}`,
    `  Email    : mahmudulaminfahim@gmail.com`,
    `  Location : Bangladesh (UTC+6)`,
    `  Status   : ${green}Available for freelance & full-time${reset}`,
    `  GitHub   : https://github.com/mdfahim18`,
    `  LinkedIn : https://www.linkedin.com/in/mahmudulaminfahim/`,
  ],
};

const LS: CommandResult = {
  output: [
    `${cyan}explorer/fahim-portfolio${reset}`,
    `  ${green}home.ts${reset}`,
    `  ${green}about.ts${reset}`,
    `  ${green}projects.ts${reset}`,
    `  ${green}contact.ts${reset}`,
    "",
    `${dim}Open them from the sidebar →${reset}`,
  ],
};

const HIRE_EGG: CommandResult = {
  output: [
    `${yellow}We trust you have received a satisfactory introduction to Fahim.${reset}`,
    "",
    `${green}`,
    "   _____ _    _ ____  _   _ ___   ____ ____  _   _ _   _",
    "  |  ___| |  | |  _ \\| | | |_ _| / ___|  _ \\| | | | \\ | |",
    "  | |_  | |\\/| | |_) | |_| || |  \\___ \\ |_) | | | |  \\| |",
    "  |  _| | |  | |  _ <|  _  || |   ___) |  _ <| |_| | |\\  |",
    "  |_|   |_|  |_|_| \\_\\_| |_|___| |____/|_| \\_\\\\___/|_| \\_|",
    `${reset}`,
    "",
    `${green}Access granted. Let's build something great together.${reset}`,
    `${dim}Ping him at mahmudulaminfahim@gmail.com — response time < 24h.${reset}`,
  ],
};

const UNKNOWN = (cmd: string): CommandResult => ({
  output: [
    `${red}command not found:${reset} ${cmd}`,
    `${dim}Type 'help' to see available commands.${reset}`,
  ],
});

const HISTORY_KEY = "terminal-history";

export function runCommand(raw: string): CommandResult {
  const input = raw.trim();

  if (input === "") return { output: [] };

  if (input === "clear") return { output: [], clear: true };
  if (input === "help") return HELP;
  if (input === "about") return ABOUT;
  if (input === "skills") return SKILLS;
  if (input === "projects") return PROJECTS;
  if (input === "contact") return CONTACT;
  if (input === "ls") return LS;
  if (input === "whoami") return { output: ["fahim"] };
  if (input === "date") return { output: [new Date().toString()] };
  if (input === "sudo hire-fahim" || input === "hire") return HIRE_EGG;
  if (input.startsWith("sudo")) {
    return {
      output: [
        `${yellow}fahim is not in the sudoers file.${reset}`,
        `${dim}This incident has been reported. (try: sudo hire-fahim)${reset}`,
      ],
    };
  }

  return UNKNOWN(input);
}

export function saveToHistory(line: string): void {
  if (typeof window === "undefined" || !line.trim()) return;
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const history: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    if (history[history.length - 1] !== line) {
      history.push(line);
      window.localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history.slice(-50))
      );
    }
  } catch {
    // localStorage unavailable — ignore
  }
}

export function loadHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
