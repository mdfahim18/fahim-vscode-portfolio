"use client";

import { Terminal as TerminalIcon, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Terminal } from "@xterm/xterm";
import { runCommand, saveToHistory } from "@/lib/terminal-commands";
import { useThemeStore, getTerminalTheme } from "@/store/theme-store";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function buildPrompt(accent: string) {
  const { r, g, b } = hexToRgb(accent);
  return `\x1b[38;2;${r};${g};${b}mfahim:~/portfolio$ ${RESET}`;
}

function buildWelcome(accent: string) {
  const { r, g, b } = hexToRgb(accent);
  return `${DIM}Welcome to Fahim's VS Code Terminal — type ${RESET}${BOLD}\x1b[38;2;${r};${g};${b}mhelp${RESET}${DIM} to begin${RESET}`;
}

export function TerminalPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const resetRef = useRef<((themeId: string) => void) | null>(null);
  const currentTheme = useThemeStore((s) => s.currentTheme);

  useEffect(() => {
    const term = termRef.current;
    if (!term) return;
    term.options.theme = getTerminalTheme(currentTheme);
    resetRef.current?.(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    let disposed = false;
    let currentLine = "";
    let term: Terminal | null = null;
    let clickHandler: (() => void) | null = null;
    let containerEl: HTMLDivElement | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const initTerminal = async () => {
      if (typeof window === "undefined") return;

      try {
        await import("@xterm/xterm/css/xterm.css");
        const { Terminal: XTerm } = await import("@xterm/xterm");
        const { FitAddon } = await import("@xterm/addon-fit");

        const el = containerRef.current;
        if (disposed || !el || termRef.current) return;
        containerEl = el;

        const initialTheme = useThemeStore.getState().currentTheme;

        term = new XTerm({
          theme: getTerminalTheme(initialTheme),
          fontSize: 13,
          fontFamily: "'Cascadia Code', monospace",
          cursorBlink: true,
          scrollback: 1000,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        termRef.current = term;
        term.open(el);
        try {
          fitAddon.fit();
        } catch {
          /* container may have zero size on first paint */
        }
        term.focus();

        clickHandler = () => term?.focus();
        el.addEventListener("click", clickHandler);

        resizeObserver = new ResizeObserver(() => {
          if (disposed) return;
          try {
            fitAddon.fit();
          } catch {
            /* ignore transient zero-size states */
          }
        });
        resizeObserver.observe(el);

        const writeBanner = (themeId: string) => {
          const accent = getTerminalTheme(themeId).cursor;
          term!.writeln(buildWelcome(accent));
          term!.write("\r\n");
          term!.write(buildPrompt(accent));
        };

        resetRef.current = (themeId: string) => {
          if (!term) return;
          term.clear();
          currentLine = "";
          writeBanner(themeId);
          term.scrollToBottom();
        };

        writeBanner(initialTheme);
        term.scrollToBottom();

        term.onData((data) => {
          // Enter
          if (data === "\r") {
            const line = currentLine;
            term!.write("\r\n");
            saveToHistory(line);

            const result = runCommand(line);

            if (result.clear) {
              term!.clear();
            } else {
              result.output.forEach((l) => term!.writeln(l));
              term!.write("\r\n");
            }

            currentLine = "";
            const accent = getTerminalTheme(
              useThemeStore.getState().currentTheme
            ).cursor;
            term!.write(buildPrompt(accent));
            term!.scrollToBottom();
            setTimeout(() => term?.scrollToBottom(), 10);
            return;
          }

          // Backspace
          if (data === "\x7f") {
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              term!.write("\b \b");
            }
            return;
          }

          // Ignore control / escape sequences (arrow keys, etc.)
          if (data < " " || data > "~") return;

          // Printable characters
          currentLine += data;
          term!.write(data);
        });
      } catch (err) {
        console.error("xterm init error:", err);
      }
    };

    initTerminal();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      if (clickHandler && containerEl) {
        containerEl.removeEventListener("click", clickHandler);
      }
      term?.dispose();
      if (termRef.current === term) {
        termRef.current = null;
      }
      resetRef.current = null;
    };
  }, []);

  const clearTerminal = () => {
    if (termRef.current) {
      termRef.current.clear();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-1 bg-[#111111] border-b border-[#2a2a2a] text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <TerminalIcon size={12} />
          <span className="text-white text-sm">TERMINAL</span>
        </span>
        <button
          onClick={clearTerminal}
          className="text-gray-400 hover:text-white"
          aria-label="Clear terminal"
        >
          <Trash2 size={12} />
        </button>
      </div>
      <div
        ref={containerRef}
        className="w-full flex-1 min-h-0 overflow-hidden cursor-text [&_.xterm]:p-2"
      />
    </div>
  );
}
