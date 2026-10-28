"use client";

import { Terminal as TerminalIcon, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Terminal } from "xterm";
import { runCommand, saveToHistory } from "@/lib/terminal-commands";

const PROMPT = "\x1b[32mfahim\x1b[0m:\x1b[34m~/portfolio\x1b[0m$ ";

export function TerminalPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);

  useEffect(() => {
    let disposed = false;
    let currentLine = "";
    let term: Terminal | null = null;
    let clickHandler: (() => void) | null = null;
    let containerEl: HTMLDivElement | null = null;

    const initTerminal = async () => {
      if (typeof window === "undefined") return;

      try {
        await import("xterm/css/xterm.css");
        const { Terminal: XTerm } = await import("xterm");

        // Re-check after async: the component may have unmounted or remounted
        // (React Strict Mode / responsive panel remount) while we awaited.
        const el = containerRef.current;
        if (disposed || !el || termRef.current) return;
        containerEl = el;

        term = new XTerm({
          theme: {
            background: "#1e1e1e",
            foreground: "#d4d4d4",
            cursor: "#aeafad",
          },
          fontSize: 13,
          fontFamily: "'Cascadia Code', monospace",
          cursorBlink: true,
        });
        termRef.current = term;
        term.open(el);
        term.focus();

        clickHandler = () => term?.focus();
        el.addEventListener("click", clickHandler);

        term.writeln(
          "\x1b[2mWelcome to Fahim's VS Code Terminal — type \x1b[32mhelp\x1b[0m to begin"
        );
        term.write("\r\n");
        term.write(PROMPT);

        term.onKey((e) => {
          const { domEvent } = e;
          const key = domEvent.key;

          if (key === "\r") {
            domEvent.preventDefault();
            term!.write("\r\n");
            saveToHistory(currentLine);
            const result = runCommand(currentLine);
            if (result.clear) {
              term!.reset();
            } else {
              result.output.forEach((l) => term!.writeln(l));
              term!.write("\r\n");
            }
            currentLine = "";
            term!.write(PROMPT);
            return;
          }

          if (key === "Backspace") {
            domEvent.preventDefault();
            if (currentLine.length > 0) {
              currentLine = currentLine.slice(0, -1);
              term!.write("\b \b");
            }
            return;
          }

          if (key.length === 1 && key >= " " && key <= "~") {
            currentLine += key;
            term!.write(key);
          }

          if (key === "\x03") {
            domEvent.preventDefault();
            term!.write("^C\r\n");
            currentLine = "";
            term!.write(PROMPT);
          }
        });
      } catch (err) {
        console.error("xterm init error:", err);
      }
    };

    initTerminal();

    return () => {
      disposed = true;
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
      termRef.current.reset();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-1 bg-[#2d2d30] border-b border-[#3c3c40] text-xs text-gray-400">
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
      <div ref={containerRef} className="flex-1 overflow-hidden cursor-text" />
    </div>
  );
}
