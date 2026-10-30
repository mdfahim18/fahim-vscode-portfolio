"use client";

import { useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { ActivityBar } from "@/components/activity-bar";
import { Sidebar } from "@/components/sidebar";
import { SearchSidebar } from "@/components/search-sidebar";
import { SourceControlSidebar } from "@/components/source-control-sidebar";
import { ExtensionsSidebar } from "@/components/extensions-sidebar";
import { PlaceholderSidebar } from "@/components/placeholder-sidebar";
import { EditorArea } from "@/components/editor-area";
import { TerminalPanel } from "@/components/terminal-panel";
import { AIAssistantPanel } from "@/components/ai-panel";
import { useUIStore, type SidebarView } from "@/store/ui-store";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const VIEW_TITLES: Record<SidebarView, string> = {
  explorer: "Explorer",
  search: "Search",
  git: "Source Control",
  extensions: "Extensions",
  settings: "Settings",
};

export default function VSCodePage() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const activeSidebarView = useUIStore((s) => s.activeSidebarView);
  const closeSidebar = useUIStore((s) => s.closeSidebar);

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const showSidebar = isSidebarOpen;
  const showAI = isDesktop;
  const layoutKey = `${isTablet}-${isDesktop}`;

  const sidebarContent = renderSidebarContent(activeSidebarView);

  const hSeparator =
    "w-1 bg-[#262626] hover:bg-vs-accent transition-colors cursor-col-resize";
  const vSeparator =
    "h-1 bg-[#262626] hover:bg-vs-accent transition-colors cursor-row-resize";

  return (
    <div className="h-screen w-full overflow-hidden overflow-x-hidden flex">
      <div className="relative z-50 w-12 shrink-0 bg-[#0a0a0a] border-r border-[#262626]">
        <ActivityBar />
      </div>

      {/* Mobile backdrop + overlay sidebar */}
      {!isTablet && showSidebar && (
        <>
          <div
            className="fixed inset-0 left-12 z-40 bg-black/50"
            onClick={closeSidebar}
          />
          <div className="absolute inset-y-0 left-12 z-50 h-full w-64 overflow-hidden rounded-r-lg border-r border-white/10 bg-[#0a0a0a]/85 shadow-2xl backdrop-blur-md">
            {sidebarContent}
          </div>
        </>
      )}

      <Group
        key={layoutKey}
        orientation="horizontal"
        className="flex-1 min-w-0 h-full"
      >
        {isTablet && showSidebar && (
          <>
            <Panel
              id="sidebar"
              defaultSize="20"
              minSize="15"
              maxSize="30"
              className="overflow-hidden bg-[#0a0a0a] border-r border-[#262626]"
            >
              {sidebarContent}
            </Panel>
            <Separator className={hSeparator} />
          </>
        )}

        <Panel id="center" defaultSize="60" minSize="40" className="min-w-0">
          <Group orientation="vertical" className="h-full">
            <Panel
              id="editor"
              defaultSize="70"
              minSize="30"
              className="overflow-hidden"
            >
              <EditorArea />
            </Panel>

            <Separator className={vSeparator} />

            <Panel
              id="terminal"
              defaultSize={isDesktop ? "30" : "22"}
              minSize="15"
              maxSize="60"
              className="overflow-hidden"
            >
              <TerminalPanel />
            </Panel>
          </Group>
        </Panel>

        {showAI && (
          <>
            <Separator className={hSeparator} />
            <Panel
              id="ai"
              defaultSize="20"
              minSize="15"
              maxSize="35"
              className="overflow-hidden bg-[#0a0a0a] border-l border-[#262626]"
            >
              <div className="h-full overflow-y-auto">
                <AIAssistantPanel />
              </div>
            </Panel>
          </>
        )}
      </Group>
    </div>
  );
}

function renderSidebarContent(activeSidebarView: SidebarView) {
  const closeSidebar = useUIStore.getState().closeSidebar;

  switch (activeSidebarView) {
    case "explorer":
      return <Sidebar onClose={closeSidebar} />;
    case "search":
      return <SearchSidebar onClose={closeSidebar} />;
    case "git":
      return <SourceControlSidebar onClose={closeSidebar} />;
    case "extensions":
      return <ExtensionsSidebar onClose={closeSidebar} />;
    default:
      return (
        <PlaceholderSidebar
          title={VIEW_TITLES[activeSidebarView]}
          onClose={closeSidebar}
        />
      );
  }
}
