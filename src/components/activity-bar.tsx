"use client";

import { FileText, Search, GitBranch, Package, Settings } from "lucide-react";
import { useUIStore, type SidebarView } from "@/store/ui-store";

interface Item {
  id: SidebarView;
  label: string;
  icon: typeof FileText;
}

const items: Item[] = [
  { id: "explorer", label: "Explorer", icon: FileText },
  { id: "search", label: "Search", icon: Search },
  { id: "git", label: "Source Control", icon: GitBranch },
  { id: "extensions", label: "Extensions", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

export function ActivityBar() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const activeSidebarView = useUIStore((s) => s.activeSidebarView);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <div className="h-full bg-vs-activity-bar-bg flex flex-col items-center pt-4 border-r border-vs-border">
      {items.map((item) => {
        const active = isSidebarOpen && activeSidebarView === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleSidebar(item.id)}
            className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded ${
              active
                ? "bg-vs-activity-bar-active text-white"
                : "text-gray-400 hover:bg-vs-activity-bar-hover-bg hover:text-white"
            } mb-1 transition-colors`}
            title={item.label}
            aria-pressed={active}
          >
            <item.icon size={20} />
            {active && (
              <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r" />
            )}
          </button>
        );
      })}
    </div>
  );
}
