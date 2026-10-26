"use client";

import { FolderOpen, FileText, X } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { fileNames } from "@/data/files";

const fileIcons: Record<string, string> = {
  ts: "text-blue-400",
  tsx: "text-blue-400",
  json: "text-yellow-400",
  md: "text-blue-300",
};

function getFileColor(name: string) {
  const ext = name.split(".").pop() ?? "";
  return fileIcons[ext] ?? "text-gray-400";
}

export function Sidebar() {
  const activeFile = useEditorStore((s) => s.activeFile);
  const openFile = useEditorStore((s) => s.openFile);

  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Explorer
        </span>
        <button
          className="text-gray-500 hover:text-white text-xs"
          title="Collapse Sidebar"
        >
          <X size={12} />
        </button>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-1 px-2 py-1 text-[13px] text-gray-300 hover:bg-vs-sidebar-item-hover-bg rounded cursor-pointer">
          <FolderOpen size={16} className="text-gray-400" />
          <span className="font-medium">FAHIM-PORTFOLIO</span>
        </div>

        <div className="ml-3 mt-1 space-y-px">
          {fileNames.map((name) => (
            <button
              key={name}
              onClick={() => openFile(name)}
              className={`w-full flex items-center gap-2 px-2 py-1 text-[13px] rounded cursor-pointer text-left transition-colors ${
                activeFile === name
                  ? "bg-vs-sidebar-item-active text-white"
                  : "text-gray-300 hover:bg-vs-sidebar-item-hover-bg hover:text-white"
              }`}
            >
              <FileText size={15} className={getFileColor(name)} />
              <span className="truncate">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
