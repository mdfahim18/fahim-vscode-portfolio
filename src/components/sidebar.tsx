"use client";

import { Folder, FolderOpen, FileText } from "lucide-react";

const files = [
  { name: "home.ts", icon: FileText, language: "TypeScript" },
  { name: "about.ts", icon: FileText, language: "TypeScript" },
  { name: "projects.ts", icon: FileText, language: "TypeScript" },
  { name: "contact.ts", icon: FileText, language: "TypeScript" },
];

export function Sidebar() {
  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border overflow-y-auto">
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
        Fahim's Portfolio
      </div>
      <div className="px-2">
        <div className="flex items-center gap-1 px-2 py-1 text-sm text-gray-300 hover:bg-vs-sidebar-item-hover-bg rounded cursor-pointer">
          <FolderOpen size={16} />
          <span>fahim-portfolio</span>
        </div>
        <div className="ml-6 mt-1 space-y-0.5">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-2 px-2 py-1 text-sm text-gray-300 hover:bg-vs-sidebar-item-hover-bg rounded cursor-pointer hover:text-white"
            >
              <file.icon size={16} className="text-blue-400" />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
