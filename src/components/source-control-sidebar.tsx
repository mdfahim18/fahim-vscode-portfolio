"use client";

import { ChevronRight, GitCommit, GitMerge, X } from "lucide-react";
import { timelineData, type TimelineEntry } from "@/data/git-timeline";

interface Props {
  onClose: () => void;
}

const branchColors: Record<string, string> = {
  main: "bg-blue-400",
  education: "bg-purple-400",
  learning: "bg-green-400",
  career: "bg-yellow-400",
  future: "bg-red-400",
};

const mergeBorder: Record<string, string> = {
  main: "border-blue-300",
  education: "border-purple-300",
  learning: "border-green-300",
  career: "border-yellow-300",
  future: "border-red-300",
};

export function SourceControlSidebar({ onClose }: Props) {
  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vs-border">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          SOURCE CONTROL
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-vs-accent bg-vs-accent/10 border border-vs-accent/30 rounded px-1.5 py-0.5">
            main
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
      </div>

      <div className="flex-1 px-3 py-3 space-y-4">
        {timelineData.map((entry, idx) => (
          <TimelineRow key={entry.id} entry={entry} isLast={idx === timelineData.length - 1} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const color = branchColors[entry.branchName] ?? "bg-gray-400";
  const Icon = entry.isMerge ? GitMerge : GitCommit;
  const borderColor = mergeBorder[entry.branchName] ?? "border-gray-400";

  return (
    <div className="relative flex items-start gap-3">
      {!isLast && (
        <div className="absolute left-[11px] top-5 bottom-[-12px] w-px bg-gray-600" />
      )}

      <div
        className={`relative flex items-center justify-center rounded-full ${color} ${
          entry.isMerge ? `border-2 ${borderColor} w-7 h-7` : "w-6 h-6"
        }`}
        title={`branch: ${entry.branchName}`}
      >
        <Icon size={12} className="text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-200 leading-tight">{entry.message}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-gray-500">
          <span>{entry.date}</span>
          <span className="opacity-60">•</span>
          <code className="text-xs text-gray-600">{entry.id}</code>
        </div>
      </div>

      <ChevronRight size={14} className="text-gray-600 mt-0.5" />
    </div>
  );
}
