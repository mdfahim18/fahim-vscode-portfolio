"use client";

import { Bot, Send } from "lucide-react";
import { useState } from "react";

export function AIAssistantPanel() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I'm Fahim's AI assistant. Ask me anything about his portfolio!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: input },
        { from: "ai", text: "Thanks for asking! I'm still learning about Fahim's projects. 😄" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="h-full bg-vs-sidebar-bg border-l border-vs-border flex flex-col">
      <div className="px-4 py-2 bg-vs-tab-bg border-b border-vs-border text-sm font-semibold text-gray-300 flex items-center gap-2">
        <Bot size={16} />
        <span>Codex Assistant</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm ${
              msg.from === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded ${
                msg.from === "user"
                  ? "bg-vs-activity-bar-active text-white"
                  : "bg-vs-sidebar-item-hover-bg text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-vs-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about Fahim..."
          className="flex-1 bg-vs-editor-bg border border-vs-border rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-vs-activity-bar-active"
        />
        <button
          onClick={handleSend}
          className="bg-vs-activity-bar-active text-white rounded px-2 py-1 hover:opacity-90"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
