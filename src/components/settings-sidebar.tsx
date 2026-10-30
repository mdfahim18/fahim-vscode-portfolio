"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Palette, X } from "lucide-react";
import { themesData } from "@/data/themes";
import { useThemeStore } from "@/store/theme-store";
import { useUIStore } from "@/store/ui-store";

function AccordionSection({
  id,
  title,
  subtitle,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-vs-border">
      <button
        onClick={() => onToggle(id)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[#141414] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-gray-500">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            {title}
          </span>
          <span className="block text-[11px] text-gray-500 truncate">
            {subtitle}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.15 }}
          className="shrink-0 text-gray-500"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SettingsSidebar({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string>("color-theme");

  const currentTheme = useThemeStore((s) => s.currentTheme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? "" : id));
  };

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
        <AccordionSection
          id="color-theme"
          title="Color Theme"
          subtitle="Select your preferred editor and UI theme."
          icon={<Palette size={13} className="text-vs-accent" />}
          isOpen={openSection === "color-theme"}
          onToggle={toggleSection}
        >
          <div className="space-y-1">
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
        </AccordionSection>

        {/* TODO: Font Size section (accordion) goes here */}
        {/* TODO: Font Weight section (accordion) goes here */}
        {/* TODO: Terminal, Editor, Tab Size, etc. sections go here */}
      </div>
    </div>
  );
}
