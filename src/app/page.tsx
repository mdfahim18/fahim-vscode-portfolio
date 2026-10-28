"use client";

import { ActivityBar } from "@/components/activity-bar";
import { Sidebar } from "@/components/sidebar";
import { EditorArea } from "@/components/editor-area";
import { TerminalPanel } from "@/components/terminal-panel";
import { AIAssistantPanel } from "@/components/ai-panel";

export default function VSCodePage() {
  return (
    <div className="h-screen w-full overflow-hidden overflow-x-hidden flex">
      {/* Activity Bar – visible on all screens */}
      <div className="w-12 shrink-0 bg-[#1e1e1e] border-r border-[#3c3c3c]">
        <ActivityBar />
      </div>

      {/* File Explorer – hidden on mobile/tablet, shown from md (768px+) */}
      <div className="hidden md:block w-64 shrink-0 bg-[#251e20] border-r border-[#3c3c3c]">
        <Sidebar />
      </div>

      {/* Center Column – full width on mobile, flexes on desktop */}
      <div className="flex flex-col flex-1 w-full min-w-0">
        {/* Editor Area */}
        <div className="flex-1 min-h-0">
          <EditorArea />
        </div>

        {/* Terminal – fixed height at bottom */}
        <div className="h-64 shrink-0 border-t border-[#3c3c3c]">
          <TerminalPanel />
        </div>
      </div>

      {/* AI Panel – hidden on mobile/tablet, shown from lg (1024px+) */}
      <div className="hidden lg:flex w-80 shrink-0 bg-[#1e1e1e] border-l border-[#3c3c3c] flex-col">
        <div className="flex-1 overflow-y-auto">
          <AIAssistantPanel />
        </div>
      </div>
    </div>
  );
}
