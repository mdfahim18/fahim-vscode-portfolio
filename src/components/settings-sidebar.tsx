"use client";

import { Check, Palette, X } from "lucide-react";
import { themesData } from "@/data/themes";
import { useThemeStore } from "@/store/theme-store";
import { useUIStore } from "@/store/ui-store";

export function SettingsSidebar({ onClose }: { onClose: () => void }) {
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  const handleSelect = (themeId: string) => {
    setTheme(themeId);
    if (window.matchMedia("(max-width: 767px)").matches) {
      closeSidebar();
    }
  };

  return (
    <div className="h-full bg-vs-sidebar-bg border-r border-vs-border flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vs-border">
        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          SETTINGS
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

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <Palette size={13} className="text-vs-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Color Theme
          </span>
        </div>

        <div className="space-y-1 px-2 py-1">
          {themesData.map((theme) => {
            const active = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`relative flex w-full items-start gap-3 rounded border p-3 text-left transition-all ${
                  active
                    ? "border-vs-accent bg-vs-accent/10"
                    : "border-transparent hover:border-[#333333] hover:bg-[#141414]"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-200">
                      {theme.name}
                    </span>
                    {theme.isDefault && (
                      <span className="rounded bg-[#161616] px-1.5 py-0.5 text-[10px] text-gray-400">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {theme.description}
                  </div>
                </div>
                {active && (
                  <Check size={16} className="mt-0.5 shrink-0 text-vs-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
