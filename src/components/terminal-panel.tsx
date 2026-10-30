"use client";

import { Terminal as TerminalIcon, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Terminal } from "@xterm/xterm";
import { runCommand, saveToHistory } from "@/lib/terminal-commands";

const PROMPT = "\x1b[38;2;255;92;0mfahim\x1b[0m:\x1b[38;2;220;38;38m~/portfolio\x1b[0m$ ";

export function TerminalPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);

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

        term = new XTerm({
          theme: {
            background: "#0a0a0a",
            foreground: "#e0e0e0",
            cursor: "#ff5c00",
          },
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

        term.writeln(
          "\x1b[2mWelcome to Fahim's VS Code Terminal — type \x1b[38;2;255;92;0mhelp\x1b[0m to begin"
        );
        term.write("\r\n");
        term.write(PROMPT);
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
            term!.write(PROMPT);
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
