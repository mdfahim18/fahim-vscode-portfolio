"use client";

import { FileText, Search, GitBranch, Package, Settings } from "lucide-react";

const items = [
  { icon: FileText, label: "Explorer", active: true },
  { icon: Search, label: "Search" },
  { icon: GitBranch, label: "Git" },
  { icon: Package, label: "Extensions" },
  { icon: Settings, label: "Settings" },
];

export function ActivityBar() {
  return (
    <div className="h-full bg-vs-activity-bar-bg flex flex-col items-center pt-4 border-r border-vs-border">
      {items.map((item) => (
        <div
          key={item.label}
          className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded ${
            item.active
              ? "bg-vs-activity-bar-active text-white"
              : "text-gray-400 hover:bg-vs-activity-bar-hover-bg hover:text-white"
          } mb-1 transition-colors`}
          title={item.label}
        >
          <item.icon size={20} />
          {item.active && (
            <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r" />
          )}
        </div>
      ))}
    </div>
  );
}
