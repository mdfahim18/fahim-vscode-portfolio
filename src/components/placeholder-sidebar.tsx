"use client";

import { X } from "lucide-react";

export function PlaceholderSidebar({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {title}
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
      <p className="px-4 py-2 text-xs text-gray-500">
        This view is coming soon.
      </p>
    </div>
  );
}
