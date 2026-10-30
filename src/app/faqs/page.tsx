"use client";
import { useState } from "react";
import { faqs } from "../utils/faqData";
import { FiSearch, FiChevronDown, FiHelpCircle, FiArrowRight, FiX } from "react-icons/fi";
import Link from "next/link";

export default function FAQComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-3">
            <FiHelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Find quick answers regarding shipping, ordering, returns, and payment options.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions or keywords (e.g. shipping, returns, payment)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 shadow-xs transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-orange-600 transition focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-orange-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No questions found matching &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Try searching with different terms or contact our support team.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-5 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Need Help Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-sm">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Can&rsquo;t find the answer you&rsquo;re looking for? Please reach out to our dedicated support team.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-full transition shadow-md shadow-orange-500/20"
          >
            <span>Contact Support</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
