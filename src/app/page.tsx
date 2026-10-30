"use client";
import { useState } from "react";
import Chatbot from "./components/Chatbot";
import ProductsPage from "./products/page";
import Link from "next/link";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiMessageSquare,
  FiX,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const scrollToShop = () => {
    const shopElement = document.getElementById("shop-section");
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 lg:py-28">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xs">
              <FiStar className="w-3.5 h-3.5 text-orange-400 animate-pulse fill-orange-400" />
              <span>SPRING & SUMMER 2026 COLLECTION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Timeless Elegance,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Modern Craft
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Discover curated apparel, shoes, and luxury lifestyle pieces crafted with premium sustainable materials designed for everyday confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={scrollToShop}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-102 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold tracking-wide transition-all text-center"
              >
                Our Story
              </Link>
            </div>

            {/* Highlight Metric Strip */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-800 max-w-xl mx-auto text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-orange-400">10k+</p>
                <p className="text-xs text-slate-400 font-medium">Curated Styles</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">4.9 ★</p>
                <p className="text-xs text-slate-400 font-medium">Customer Rating</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-orange-400">99.8%</p>
                <p className="text-xs text-slate-400 font-medium">On-Time Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Badges Strip */}
      <section className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-center gap-3.5 p-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <FiTruck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Free Worldwide Delivery</h4>
                <p className="text-xs text-slate-500">Orders over $75 qualify</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <FiShield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">100% Secure Checkout</h4>
                <p className="text-xs text-slate-500">256-bit encrypted SSL</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FiRefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">30-Day Easy Returns</h4>
                <p className="text-xs text-slate-500">Hassle-free exchange policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <FiHeadphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">24/7 Dedicated Support</h4>
                <p className="text-xs text-slate-500">Instant expert assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Shop Section */}
      <div id="shop-section">
        <ProductsPage />
      </div>

      {/* Floating Chatbot Trigger Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/40 hover:scale-108 active:scale-95 transition-all duration-200 flex items-center justify-center group"
        aria-label="Toggle Shopping Assistant"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/* Floating Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  AI
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">Shopping Assistant</h3>
                <p className="text-[11px] text-emerald-400 font-medium">Online • Instant answers</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content Body */}
          <div className="flex-1 h-[calc(100%-4rem)] overflow-hidden">
            <Chatbot />
          </div>
        </div>
      )}
    </div>
  );
}
