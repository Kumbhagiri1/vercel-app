"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Download, Sparkles, Menu, X } from "lucide-react";

type Message = {
  id: number;
  type: "user" | "ai";
  text: string;
};

export default function SchoolAIChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      text: "Hello! I’m School AI by TalentDataSupply. How can I help you today?",
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

    const userText = input;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://n8nclient.in/webhook/school_ai?message=" +
          encodeURIComponent(userText)
      );

      const responseData: { answer?: string } = await res.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        text:
          responseData.answer ??
          "I couldn’t find an answer for that. Please try again.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "ai",
          text: "⚠️ Error connecting to School AI service.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function exportToDoc() {
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
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300`}
      >
        <div className="h-full backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">School AI</h1>
              <p className="text-xs text-gray-400">
                by TalentDataSupply
              </p>
            </div>
          </div>

          <button
            onClick={exportToDoc}
            className="mt-auto w-full p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Chat
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="text-sm text-gray-400">
            School AI • Online
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl p-4 rounded-2xl ${
                  m.type === "user"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500"
                    : "backdrop-blur-xl bg-white/10 border border-white/20"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 animate-pulse">
                School AI is typing…
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 backdrop-blur-xl bg-white/5 border-t border-white/10">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask School AI…"
              className="flex-1 bg-transparent border border-white/20 rounded-2xl p-4 outline-none resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl disabled:opacity-50"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
