"use client";

import { useState } from "react";
import {
  Search,
  Check,
  Star,
  Download,
  Atom,
  Globe,
  FileCode,
  Wind,
  FileJson,
  Layout,
  Server,
  Route,
  Terminal,
  GitBranch,
} from "lucide-react";
import { extensionsData, type Extension } from "@/data/extensions";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom: Atom,
  Globe: Globe,
  FileCode: FileCode,
  Wind: Wind,
  FileJson: FileJson,
  Layout: Layout,
  Server: Server,
  Route: Route,
  Terminal: Terminal,
  GitBranch: GitBranch,
};

const categories: Extension["category"][] = [
  "Popular",
  "Frontend",
  "Backend",
  "Tools",
  "Languages",
];

function IconFor(name: string) {
  const Icon = iconMap[name] ?? Atom;
  return <Icon className="h-5 w-5 text-blue-400" />;
}

export function ExtensionsSidebar({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Extension["category"]>("Popular");
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(
    extensionsData[0]
  );

  const filtered = extensionsData.filter((ext) => {
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "Popular" || ext.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vs-border">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          EXTENSIONS
        </span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-xs"
          title="Collapse"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Extensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded bg-[#1e1e1e] pl-7 pr-2 py-1 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto px-3 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-[#2d2d2d] text-gray-300 hover:bg-[#3a3a3a] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Extension list */}
        <div className="space-y-1 px-2">
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-sm text-gray-500">
              No extensions found.
            </div>
          )}
          {filtered.map((ext) => (
            <ExtensionCard
              key={ext.id}
              ext={ext}
              isSelected={selectedExtension?.id === ext.id}
              onSelect={() => setSelectedExtension(ext)}
            />
          ))}
        </div>
      </div>

      {/* Details panel */}
      {selectedExtension && (
        <div className="border-t border-vs-border p-2 md:p-4 space-y-2 md:space-y-3 max-h-[35vh] md:max-h-none overflow-y-auto">
          <div className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Extension Details
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#2d2d2d]">
              {IconFor(selectedExtension.icon)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-200">
                {selectedExtension.name}
              </div>
              <div className="text-xs text-gray-500">
                {selectedExtension.publisher} • v{selectedExtension.version}
              </div>
              <div className="mt-1 text-xs text-gray-300 break-words">
                {selectedExtension.description}
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {selectedExtension.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {selectedExtension.installs}
                </span>
                <span>{selectedExtension.category}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <button
              type="button"
              disabled
              title="Feature coming soon"
              className="w-full rounded bg-blue-500 px-3 py-1 md:py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed blur-[0.5px]"
            >
              Hire Me
            </button>
            <p className="text-center text-[10px] text-gray-500">
              Feature coming soon
            </p>

            <div className="max-md:hidden rounded bg-[#1e1e1e] px-2 py-1.5 text-xs text-gray-400">
              <span>Want to hire me? Drop a line:</span>
              <code className="ml-1 text-gray-300">
                mahmudulaminfahim@gmail.com
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExtensionCard({
  ext,
  isSelected,
  onSelect,
}: {
  ext: Extension;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full rounded border p-3 text-left transition-all ${
        isSelected
          ? "border-blue-500 bg-[#1e2a3a]"
          : "border-transparent bg-transparent hover:border-gray-600 hover:bg-[#2a2a2a]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#2d2d2d]">
          {IconFor(ext.icon)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-200">{ext.name}</span>
            <span className="inline-flex items-center gap-1 rounded bg-green-500/10 px-1.5 py-0.25 text-[10px] font-medium text-green-400">
              <Check className="h-3 w-3" /> Installed
            </span>
          </div>
          <div className="text-xs text-gray-500">{ext.publisher}</div>
          <div className="mt-1 text-xs text-gray-400 line-clamp-2">
            {ext.description}
          </div>
        </div>
      </div>
    </button>
  );
}
