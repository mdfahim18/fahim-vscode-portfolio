"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import { FileText, X } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { files } from "@/data/files";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-gray-500">
      Loading editor...
    </div>
  ),
});

const fileColors: Record<string, string> = {
  ts: "text-blue-400",
  json: "text-yellow-400",
  md: "text-blue-300",
};

function fileColor(name: string) {
  return fileColors[name.split(".").pop() ?? ""] ?? "text-gray-400";
}

export function EditorArea() {
  const openTabs = useEditorStore((s) => s.openTabs);
  const activeFile = useEditorStore((s) => s.activeFile);
  const contents = useEditorStore((s) => s.contents);
  const setActiveFile = useEditorStore((s) => s.setActiveFile);
  const closeTab = useEditorStore((s) => s.closeTab);
  const updateContent = useEditorStore((s) => s.updateContent);
  const searchTarget = useEditorStore((s) => s.searchTarget);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const decorationsRef = useRef<editor.IEditorDecorationsCollection | null>(
    null
  );

  // Handle search-result navigation: reveal the line and highlight matches.
  useEffect(() => {
    const instance = editorRef.current;
    if (!instance) return;

    // Always clear previous highlights when the target or file changes.
    decorationsRef.current?.clear();
    decorationsRef.current = null;

    if (!searchTarget || searchTarget.file !== activeFile) return;

    // Give Monaco time to swap in the new file's model before decorating.
    const timer = setTimeout(() => {
      const ed = editorRef.current;
      if (!ed) return;

      const model = ed.getModel();
      if (!model) return;

      const query = searchTarget.query.trim();
      if (query !== "") {
        const matches = model.findMatches(
          query,
          false,
          false,
          false,
          null,
          false
        );

        const decorations: editor.IModelDeltaDecoration[] = matches.map(
          (match) => ({
            range: match.range,
            options: {
              inlineClassName: "monaco-search-highlight",
            },
          })
        );

        decorationsRef.current = ed.createDecorationsCollection(decorations);
      }

      ed.revealLineInCenter(searchTarget.line);
      ed.setPosition({ lineNumber: searchTarget.line, column: 1 });
      ed.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTarget, activeFile]);

  const active = activeFile ? files[activeFile] : undefined;

  return (
    <div className="h-full bg-vs-editor-bg flex flex-col min-w-0">
      <div className="flex bg-vs-tab-bg border-b border-vs-border overflow-x-auto shrink-0">
        {openTabs.map((name) => (
          <div
            key={name}
            onClick={() => setActiveFile(name)}
            className={`group flex cursor-pointer items-center gap-2 border-r border-vs-border px-3 py-2 text-sm select-none ${
              activeFile === name
                ? "bg-vs-tab-active text-white"
                : "text-gray-400 hover:bg-vs-tab-hover-bg"
            }`}
          >
            <FileText size={14} className={fileColor(name)} />
            <span>{name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(name);
              }}
              className="hidden group-hover:block text-gray-400 hover:text-white"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {active ? (
          <MonacoEditor
            height="100%"
            language={active.language}
            theme="vs-dark"
            value={contents[activeFile!] ?? active.content}
            onChange={(value) =>
              activeFile && updateContent(activeFile, value ?? "")
            }
            onMount={(ed) => {
              editorRef.current = ed;

              // Clear search highlights on interaction, like VS Code.
              const clearTarget = () => {
                const state = useEditorStore.getState();
                if (state.searchTarget) {
                  state.setSearchTarget(null);
                }
              };
              ed.onMouseDown(clearTarget);
              ed.onKeyDown(clearTarget);
            }}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "'Cascadia Code', 'Fira Code', monospace",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              padding: { top: 8 },
              lineNumbersMinChars: 4,
              renderLineHighlight: "all",
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-vs-border bg-vs-tab-bg px-3 py-1 text-[11px] text-gray-400">
        <span className="flex items-center gap-4">
          <span>TypeScript</span>
          <span>UTF-8</span>
        </span>
        <span>{active ? `${active.language} • Ln 1, Col 1` : "No file open"}</span>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
      <div className="text-6xl font-thin tracking-tight text-gray-600">VS Code</div>
      <p className="text-sm">No file open — pick one from the explorer</p>
    </div>
  );
}
