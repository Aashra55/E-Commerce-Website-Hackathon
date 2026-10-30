"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiHelpCircle } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 Welcome to our store. How can I assist you with your shopping today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    setMessages((prev) => [...prev, { type: "user", text: textToSend }]);
    if (!messageText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "I'm having a little trouble connecting right now. Please feel free to email support or try again shortly!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Any active discount codes?",
    "What is your return policy?",
    "How does shipping work?",
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            {msg.type === "bot" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                <RiRobot2Line className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.type === "bot"
                  ? "bg-white text-slate-800 border border-slate-100 rounded-tl-xs"
                  : "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-xs"
              }`}
            >
              {msg.text}
            </div>

            {msg.type === "user" && (
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white shrink-0 shadow-xs">
                <FiUser className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
            <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <RiRobot2Line className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-100 px-3 py-2 rounded-2xl rounded-tl-xs text-xs text-slate-500 flex items-center gap-1">
              <span>Assistant is typing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mb-1.5">
            <FiHelpCircle className="w-3 h-3" /> Quick questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="text-[11px] bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 px-2.5 py-1 rounded-full transition text-left"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            type="button"
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition ${
              input.trim() && !loading
                ? "bg-orange-600 hover:bg-orange-700 shadow-md hover:scale-105"
                : "bg-slate-300 cursor-not-allowed"
            }`}
            title="Send Message"
          >
            <FiSend className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
