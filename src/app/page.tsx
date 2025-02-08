"use client";
import { useState } from "react";
import Chatbot from "./components/Chatbot";
import ProductsPage from "./products/page";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      {/* Products Page */}
      <ProductsPage />

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-5 right-5 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition"
      >
        💬
      </button>

      {/* Chatbot Container (Appears when Opened) */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-5 w-100 h-100 bg-white shadow-2xl rounded-xl border border-gray-200 z-[5000]">
          {/* Chatbot Header */}
          <div className="flex justify-between items-center p-3 bg-orange-500 text-white rounded-t-xl">
            <span>Chatbot</span>
            <button onClick={() => setIsChatOpen(false)} className="text-white text-lg">
              ✖
            </button>
          </div>

          {/* Chatbot Content */}
          <div className="p-3 h-[calc(100%-3rem)] overflow-auto">
            <Chatbot />
          </div>
        </div>
      )}
    </div>
  );
}
