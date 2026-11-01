# fahim-vscode-portfolio

A production-level developer portfolio that looks and behaves **exactly like Visual Studio Code**. Visitors explore it through a simulated IDE: a resizable multi-pane layout, a real code editor, an interactive terminal, a themed activity bar with multiple sidebars, and an AI assistant panel.

## Features

- **VS Code UI** — Activity bar, explorer, editor area, bottom terminal, and AI chat panel, all driven by resizable panes.
- **Real editor** — Monaco (the engine behind VS Code) with a tab system. Read-only by default.
- **Virtual file system** — Files are data, not server files. `src/data/files.ts` maps filenames to their source strings.
- **Interactive terminal** — xterm.js with a custom command set (`help`, `about`, `skills`, `projects`, `contact`, `ls`, `sudo hire-fahim`, …).
- **Source Control sidebar** — A career journey rendered as a Git graph with branch-colored commits and merge nodes.
- **Extensions sidebar** — Skills presented as VS Code Marketplace-style extensions with search, category filters, and a details panel.
- **Themes** — Five switchable themes (Cyberpunk, Tokyo Night, Dracula, Matrix, Synthwave) with Neon accents. Themes cascade to the UI, the Monaco editor, and the terminal prompt in real time.
- **Font customization** — Editor font size, weight, family (Google Fonts), and letter spacing, live-applied to Monaco.
- **Search** — Cross-file search with match highlighting and line navigation in the editor.
- **AI agent** — A chat panel that streams answers grounded in `src/data/context.ts` via the Vercel AI SDK.
- **Mobile mode** — On small screens the sidebar becomes a glassmorphism overlay above the editor, auto-closing on selection.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based theme tokens), Framer Motion |
| Layout | `react-resizable-panels` |
| Editor | `@monaco-editor/react` |
| Terminal | `@xterm/xterm` + `@xterm/addon-fit` |
| State | Zustand |
| Animation | Framer Motion |
| AI | Vercel AI SDK + Google Gemini (`@ai-sdk/google`) |
| Icons | Lucide React |

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

### AI chat

Create `.env.local` and add your Google Gemini API key. The file is git-ignored by default:

```
GEMINI_API_KEY=...
```

Without a key, the chat API returns an error; the rest of the UI works fine.

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # Streaming AI endpoint (Gemini)
│   ├── globals.css           # Theme variables, scrollbar, animations
│   ├── layout.tsx            # Root layout + Google Fonts
│   └── page.tsx              # IDE shell / pane layout / sidebar routing
├── components/
│   ├── activity-bar.tsx      # Left icon rail
│   ├── sidebar.tsx           # File explorer
│   ├── search-sidebar.tsx    # Cross-file search
│   ├── source-control-sidebar.tsx # Git career timeline
│   ├── extensions-sidebar.tsx     # Skills as extensions
│   ├── settings-sidebar.tsx       # Accordion settings (theme + font)
│   ├── placeholder-sidebar.tsx    # Empty-state fallback
│   ├── editor-area.tsx       # Monaco + tabs
│   ├── terminal-panel.tsx    # xterm.js terminal
│   └── ai-panel.tsx          # AI chat
├── data/
│   ├── files.ts              # Virtual file system
│   ├── context.ts            # Source of truth for the AI
│   ├── git-timeline.ts       # Career timeline entries
│   ├── extensions.ts         # Skills-as-extensions data
│   ├── themes.ts             # Theme metadata
│   └── monaco-themes.ts      # Monaco token/color themes
├── lib/
│   └── terminal-commands.ts  # Terminal command implementations
└── store/
    ├── editor-store.ts       # Files, tabs, dirty state, search target
    ├── ui-store.ts           # Sidebar open/view state
    └── theme-store.ts        # Theme, font, and terminal theme
```

## How It Works

**Virtual file system.** There is no backend file system. `data/files.ts` maps filenames to code strings, and the editor renders them.

**Zustand stores.** Three stores separate concerns:
- `editor-store` — open tabs, active file, contents, and search targets.
- `ui-store` — which sidebar is open and whether it is visible.
- `theme-store` — current theme, typography settings, and persistence to `localStorage`.

**Theming.** Themes are plain CSS variables swapped on `<html>` via `theme-<id>` classes, mirrored into Monaco via `data/monaco-themes.ts` and into xterm from `getTerminalTheme()`, so the editor, terminal prompt, and UI all recolor together.

**AI agent.** `app/api/chat/route.ts` streams a Gemini response grounded in `data/context.ts`, keeping answers about Fahim accurate.

## Roadmap

- [x] Phase 1 — Next.js setup & resizable VS Code layout
- [x] Phase 2 — Virtual file system & Monaco editor integration
- [x] Phase 3 — xterm.js terminal & custom commands
- [x] Phase 4 — AI chat panel & Vercel AI SDK integration
- [x] Phase 5 — Mobile responsiveness (overlay sidebar)
- [x] Phase 6 — Polish: animations, syntax highlighting, typewriter effects
- [x] Phase 7 — Sidebars: search, source control, extensions, settings
- [x] Phase 8 — Multi-theme system, Monaco/xterm theming & font customization

## License

MIT — see [LICENSE](./LICENSE).
