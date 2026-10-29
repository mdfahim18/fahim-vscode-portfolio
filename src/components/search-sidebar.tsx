"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export function SearchSidebar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2">
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

      <div className="px-3">
        <div className="flex items-center gap-2 rounded bg-vs-editor-bg border border-vs-border px-2 py-1">
          <Search size={14} className="text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none"
          />
        </div>
        <p className="mt-3 px-1 text-xs text-gray-500">
          {query
            ? `No results for "${query}"`
            : "Type to search Fahim's portfolio files."}
        </p>
      </div>
    </div>
  );
}
