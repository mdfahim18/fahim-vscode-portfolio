"use client";

import { Group, Panel, Separator } from "react-resizable-panels";
import { ActivityBar } from "@/components/activity-bar";
import { Sidebar } from "@/components/sidebar";
import { EditorArea } from "@/components/editor-area";
import { TerminalPanel } from "@/components/terminal-panel";
import { AIAssistantPanel } from "@/components/ai-panel";

export function VSCodeLayout() {
  return (
    <Group direction="horizontal" className="h-screen">
      <Panel defaultSize={5} minSize={4} maxSize={8}>
        <ActivityBar />
      </Panel>

      <Separator />

      <Panel defaultSize={20} minSize={15} maxSize={30}>
        <Sidebar />
      </Panel>

      <Separator />

      <Panel defaultSize={50} minSize={30}>
        <Group direction="vertical">
          <Panel defaultSize={70} minSize={30}>
            <EditorArea />
          </Panel>

          <Separator />

          <Panel defaultSize={30} minSize={20} maxSize={50}>
            <TerminalPanel />
          </Panel>
        </Group>
      </Panel>

      <Separator />

      <Panel defaultSize={25} minSize={20} maxSize={40}>
        <AIAssistantPanel />
      </Panel>
    </Group>
  );
}
