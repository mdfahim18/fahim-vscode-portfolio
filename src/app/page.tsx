"use client";

import { useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { ActivityBar } from "@/components/activity-bar";
import { Sidebar } from "@/components/sidebar";
import { EditorArea } from "@/components/editor-area";
import { TerminalPanel } from "@/components/terminal-panel";
import { AIAssistantPanel } from "@/components/ai-panel";

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

export default function VSCodePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const showSidebar = isSidebarOpen && isTablet;
  const showAI = isDesktop;
  const layoutKey = `${isTablet}-${isDesktop}`;

  const hSeparator =
    "w-1 bg-[#3c3c3c] hover:bg-blue-500 transition-colors cursor-col-resize";
  const vSeparator =
    "h-1 bg-[#3c3c3c] hover:bg-blue-500 transition-colors cursor-row-resize";

  return (
    <div className="h-screen w-full overflow-hidden overflow-x-hidden flex">
      <div className="w-12 shrink-0 bg-[#1e1e1e] border-r border-[#3c3c3c]">
        <ActivityBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      <Group
        key={layoutKey}
        orientation="horizontal"
        className="flex-1 min-w-0 h-full"
      >
        {showSidebar && (
          <>
            <Panel
              id="sidebar"
              defaultSize="20"
              minSize="15"
              maxSize="30"
              className="overflow-hidden bg-[#251e20] border-r border-[#3c3c3c]"
            >
              <Sidebar />
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
              className="overflow-hidden bg-[#1e1e1e] border-l border-[#3c3c3c]"
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
