"use client";

import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  from: "ai" | "user";
  text: string;
  timestamp: string;
}

function now(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TIMEOUT_MESSAGE =
  "Sorry, the AI server is currently experiencing high demand or timed out. Please try again later.";

const ABORT_MESSAGE =
  "The AI server is taking too long to respond. Please try again.";

const initialMessages: Message[] = [
  {
    id: "init-1",
    from: "ai",
    text: "Hello! I'm Fahim's AI assistant. Ask me anything about his portfolio!",
    timestamp: "Welcome",
  },
];

export function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      from: "user",
      text,
      timestamp: now(),
    };

    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsTyping(true);

    const aiId = `ai-${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        full += decoder.decode(value, { stream: true });

        if (!started) {
          started = true;
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: aiId, from: "ai", text: full, timestamp: now() },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === aiId ? { ...m, text: full } : m))
          );
        }
      }

      if (!started) {
        throw new Error("Empty response");
      }
    } catch (err) {
      const isAbort =
        err instanceof DOMException && err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          from: "ai",
          text: isAbort ? ABORT_MESSAGE : TIMEOUT_MESSAGE,
          timestamp: now(),
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full bg-vs-sidebar-bg border-l border-vs-border flex flex-col">
      <div className="px-4 py-2 bg-vs-tab-bg border-b border-vs-border text-sm font-semibold text-gray-300 flex items-center gap-2">
        <Bot size={16} />
        <span>Codex Assistant</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${
              msg.from === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                msg.from === "user" ? "bg-vs-activity-bar-active" : "bg-vs-tab-hover-bg"
              }`}
            >
              {msg.from === "user" ? (
                <User size={13} className="text-white" />
              ) : (
                <Bot size={13} className="text-gray-200" />
              )}
            </div>

            <div
              className={`flex max-w-[80%] flex-col ${
                msg.from === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded px-3 py-2 text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-vs-activity-bar-active text-white"
                    : "bg-vs-tab-bg text-gray-200"
                }`}
              >
                {msg.text}
              </div>
              {msg.timestamp && (
                <span className="mt-0.5 px-1 text-[10px] text-gray-500">
                  {msg.timestamp}
                </span>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-vs-tab-hover-bg">
              <Bot size={13} className="text-gray-200" />
            </div>
            <div className="flex items-center gap-1.5 rounded bg-vs-tab-bg px-3 py-2 text-xs text-gray-400">
              <span>Typing</span>
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-vs-border flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Fahim..."
          className="flex-1 bg-vs-editor-bg border border-vs-border rounded px-2 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-vs-activity-bar-active"
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="bg-vs-activity-bar-active text-white rounded px-3 py-1.5 hover:opacity-90 disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
