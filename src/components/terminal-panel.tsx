"use client";

import { Terminal as TerminalIcon, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function TerminalPanel() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let cleanup = false;

    const initTerminal = async () => {
      if (!terminalRef.current || termRef.current) return;
      if (typeof window === "undefined") return;

      try {
        await import("xterm/css/xterm.css");
        const { Terminal } = await import("xterm");

        const term = new Terminal({
          theme: {
            background: "#000000",
            foreground: "#00ff00",
            cursor: "#00ff00",
          },
          fontSize: 13,
          fontFamily: "monospace",
        });

        if (!cleanup) {
          termRef.current = term;
          term.open(terminalRef.current);
          term.writeln("Welcome to Fahim's VS Code Terminal\r\n$ ");
        }
      } catch (err) {
        console.error("Failed to load xterm:", err);
      }
    };

    initTerminal();

    return () => {
      cleanup = true;
    };
  }, []);

  return (
    <div className="h-full bg-vs-terminal-bg border-t border-vs-border flex flex-col">
      <div className="flex items-center justify-between px-3 py-1 bg-vs-tab-bg border-b border-vs-border text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <TerminalIcon size={12} />
          <span>TERMINAL</span>
        </span>
        <div className="flex items-center gap-1">
          <Trash2 size={12} className="cursor-pointer hover:text-white" title="Clear" />
        </div>
      </div>
      <div ref={terminalRef} className="flex-1 p-2 overflow-hidden" />
    </div>
  );
}
