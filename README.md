# fahim-vscode-portfolio

A production-level developer portfolio that looks and behaves **exactly like Visual Studio Code**. Visitors browse it through a simulated IDE: a resizable multi-pane layout, a real code editor, an interactive terminal, and an AI assistant panel on the right.

## Features

- **VS Code UI** — Activity bar, file explorer sidebar, editor area, bottom terminal, and AI chat panel, all driven by resizable panes.
- **Real editor** — Monaco (the engine behind VS Code) with a tab system.
- **Virtual file system** — Files are data, not server files. `src/data/files.ts` maps filenames to their stringified source.
- **Interactive terminal** — xterm.js with custom commands like `open contact.ts` that open files in the editor.
- **AI agent** — A RAG-style chat panel that answers questions strictly from `src/data/resume.ts` via a streaming API route.
- **Mobile mode** — On small screens the layout collapses into a bottom navigation bar with full-screen panel transitions.
- **Animations** — Framer Motion transitions, typewriter effects, and syntax-highlighted code blocks.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Layout | `react-resizable-panels` |
| Editor | `@monaco-editor/react` |
| Terminal | `xterm.js` + `xterm-addon-fit` |
| State | Zustand |
| Animation | Framer Motion |
| AI | Vercel AI SDK + OpenAI API |
| Icons | Lucide React + custom VS Code SVGs |

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm start       # run the production build
npm run lint    # eslint
```

### AI chat (Phase 4)

Create `.env.local` and add your key. The file is git-ignored by default:

```
OPENAI_API_KEY=sk-...
```

## Project Structure

```
src/
├── app/                 # App Router entry, layout, global styles
├── components/
│   ├── activity-bar.tsx # Left icon rail
│   ├── sidebar.tsx      # File explorer
│   ├── editor-area.tsx  # Monaco + tabs
│   ├── terminal-panel.tsx
│   ├── ai-panel.tsx     # AI chat
│   └── vscode-layout.tsx# Resizable pane tree
└── data/
    ├── files.ts         # Virtual file system (Phase 2)
    └── resume.ts        # Source of truth for the AI (Phase 4)
```

## How It Works

**Virtual file system.** There is no backend file system. A `data/files.ts` object maps filenames to code strings.

**Zustand store.** Holds `activeFile`, `openTabs`, and `terminalHistory`. Terminal commands update the store, which automatically opens the target file in the editor.

**AI agent.** An API route builds context from `data/resume.ts` and streams an OpenAI response, so answers stay grounded in the resume rather than the model's imagination.

## Roadmap

- [x] Phase 1 — Next.js setup & resizable VS Code layout
- [ ] Phase 2 — Virtual file system & Monaco editor integration
- [ ] Phase 3 — xterm.js terminal & custom commands
- [ ] Phase 4 — AI chat panel & Vercel AI SDK integration
- [ ] Phase 5 — Mobile responsiveness (bottom nav, fullscreen views)
- [ ] Phase 6 — Polish: animations, syntax highlighting, typewriter effects

## License

MIT — see [LICENSE](./LICENSE).
