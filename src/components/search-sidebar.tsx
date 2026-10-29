"use client";

import { useMemo, useState } from "react";
import { FileText, Search, X } from "lucide-react";
import { files } from "@/data/files";
import { useEditorStore } from "@/store/editor-store";

interface Match {
  lineNumber: number;
  lineText: string;
}

interface FileResult {
  fileName: string;
  matches: Match[];
}

export function SearchSidebar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const openFile = useEditorStore((s) => s.openFile);
  const setSearchTarget = useEditorStore((s) => s.setSearchTarget);

  const handleOpen = (fileName: string, line: number) => {
    openFile(fileName);
    setSearchTarget({ file: fileName, line, query: query.trim() });
  };

  const results = useMemo<FileResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const grouped: FileResult[] = [];

    for (const [fileName, fileData] of Object.entries(files)) {
      const lines = fileData.content.split("\n");
      const matches: Match[] = [];

      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(q)) {
          matches.push({ lineNumber: index + 1, lineText: line });
        }
      });

      if (matches.length > 0) {
        grouped.push({ fileName, matches });
      }
    }

    return grouped;
  }, [query]);

  const hasQuery = query.trim() !== "";

  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Search
        </span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-xs"
          title="Collapse Sidebar"
          aria-label="Close sidebar"
        >
          <X size={12} />
        </button>
      </div>

      <div className="px-3 shrink-0">
        <div className="flex items-center gap-2 rounded bg-vs-editor-bg border border-vs-border px-2 py-1">
          <Search size={14} className="text-gray-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full min-w-0 bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-500 hover:text-white shrink-0"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex-1 overflow-y-auto px-2">
        {!hasQuery ? (
          <p className="px-2 text-xs text-gray-500">
            Type to search Fahim&apos;s portfolio files.
          </p>
        ) : results.length === 0 ? (
          <p className="px-2 text-xs text-gray-500">
            No results found for &quot;{query}&quot;
          </p>
        ) : (
          results.map((file) => (
            <div key={file.fileName} className="mb-2">
              <button
                onClick={() =>
                  handleOpen(file.fileName, file.matches[0]?.lineNumber ?? 1)
                }
                className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[13px] text-gray-200 hover:bg-vs-sidebar-item-hover-bg"
              >
                <FileText size={14} className="text-blue-400 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{file.fileName}</span>
                <span className="ml-auto shrink-0 rounded-full bg-vs-tab-hover-bg px-1.5 text-[10px] text-gray-400">
                  {file.matches.length}
                </span>
              </button>

              <div className="mt-0.5">
                {file.matches.map((match) => (
                  <button
                    key={match.lineNumber}
                    onClick={() => handleOpen(file.fileName, match.lineNumber)}
                    className="flex w-full items-center gap-2 px-2 py-0.5 text-left text-xs text-gray-400 hover:bg-[#2a2d2e] cursor-pointer"
                  >
                    <span className="w-6 shrink-0 pr-2 text-right text-gray-500">
                      {match.lineNumber}
                    </span>
                    <span className="min-w-0 flex-1 truncate whitespace-nowrap">
                      {match.lineText || " "}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}