"use client";

import { FileText } from "lucide-react";

export function EditorArea() {
  return (
    <div className="h-full bg-vs-editor-bg flex flex-col">
      <div className="flex bg-vs-tab-bg border-b border-vs-border overflow-x-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-vs-tab-active text-white border-r border-vs-border">
          <FileText size={14} className="text-blue-400" />
          <span className="text-sm">home.ts</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <pre className="text-sm text-vs-editor-foreground whitespace-pre-wrap break-words">
          <span className="text-purple-400">export</span>{' '}
          <span className="text-yellow-400">const</span>{' '}
          <span className="text-white">developer</span> = {'{'}
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">name</span>: <span className="text-green-400">"Fahim Chowdhury"</span>,
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">role</span>: <span className="text-green-400">"Full Stack Developer"</span>,
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">tech</span>: <span className="text-green-400">"Next.js, TypeScript, Tailwind CSS"</span>,
          <br />
          &nbsp;&nbsp;<span className="text-blue-400">location</span>: <span className="text-green-400">"Bangladesh"</span>,
          <br />
          {'}'};
          <br />
          <br />
          <span className="text-purple-400">export</span>{' '}
          <span className="text-yellow-400">default</span> <span className="text-white">developer</span>;
        </pre>
      </div>
    </div>
  );
}
