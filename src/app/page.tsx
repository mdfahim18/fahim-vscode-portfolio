"use client";

import { ActivityBar } from "@/components/activity-bar";
import { Sidebar } from "@/components/sidebar";
import { EditorArea } from "@/components/editor-area";
import { TerminalPanel } from "@/components/terminal-panel";
import { AIAssistantPanel } from "@/components/ai-panel";

export default function VSCodePage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Activity Bar – fixed width */}
      <div className="w-12 bg-[#1e1e1e] border-r border-[#3c3c3c] flex-shrink-0">
        <ActivityBar />
      </div>

      {/* File Explorer – fixed width */}
      <div className="w-64 bg-[#251e20] border-r border-[#3c3c3c] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Center Column – main edit area (tabs + code + terminal) */}
      <div className="flex flex-col flex-1">
        {/* Editor Area – takes remaining space */}
        <div className="flex-1">
          <EditorArea />
        </div>

        {/* Terminal – fixed height at bottom */}
        <div className="h-64 border-t border-[#3c3c3c]">
          <TerminalPanel />
        </div>
      </div>

      {/* AI Panel – fixed width */}
      <div className="w-80 bg-[#1e1e1e] border-l border-[#3c3c3c] flex-shrink-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <AIAssistantPanel />
        </div>
      </div>
    </div>
  );
}
