"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/Textarea";
import {Button} from "./ui/Button";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <motion.div
      className="p-4 bg-white shadow-lg rounded-2xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-64 overflow-y-auto p-2 border rounded-lg bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              msg.type === "bot"
                ? "bg-gray-200 self-start"
                : "bg-orange-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2 items-center">
        <Textarea
          className="flex-grow focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button className="h-10" onClick={handleSend}>Send</Button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
