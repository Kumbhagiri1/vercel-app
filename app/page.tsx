"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Download, Sparkles, Menu, X } from "lucide-react";

type Message = {
  id: number;
  type: "user" | "ai";
  text: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm School AI by TalentDataSupply. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    if (!input.trim()) return;

    const text = input;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      // FIXED: Single fetch call with correct URL encoding
      const response = await fetch(
        "https://n8nclient.in/webhook/school_ai?message=" +
          encodeURIComponent(text)
      );

      // FIXED: Parse as text (not JSON) since webhook returns plain text
      const responseText = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: responseText || "No answer returned",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "ai",
          text: "⚠️ Error connecting to School AI service. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function exportChat() {
    const content = messages
      .map((m) => `${m.type === "user" ? "You" : "School AI"}: ${m.text}`)
      .join("\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `school-ai-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-72" : "w-0"} transition-all`}>
        <div className="h-full bg-white/5 border-r border-white/10 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">School AI</h1>
              <p className="text-xs text-gray-400">by TalentDataSupply</p>
            </div>
          </div>

          <button
            onClick={exportChat}
            className="mt-auto p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
          >
            <Download className="inline w-5 h-5 mr-2" />
            Export Chat
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="text-sm text-gray-400">School AI • Online</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xl p-4 rounded-2xl ${
                  m.type === "user"
                    ? "bg-purple-600"
                    : "bg-white/10 border border-white/20"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="bg-white/10 p-4 rounded-2xl w-fit">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/10 flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 bg-transparent border border-white/20 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all resize-none"
            placeholder="Ask School AI…"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-4 bg-purple-600 rounded-2xl disabled:opacity-50 hover:bg-purple-700 transition-all"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}