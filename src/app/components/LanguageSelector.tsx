"use client";
import React, { useState, useRef, useEffect } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "EN", fullLabel: "English", flag: "🇺🇸" },
    { code: "es", label: "ES", fullLabel: "Español", flag: "🇪🇸" },
    { code: "fr", label: "FR", fullLabel: "Français", flag: "🇫🇷" },
    { code: "ar", label: "AR", fullLabel: "العربية", flag: "🇸🇦" },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        aria-label="Select Language"
      >
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="uppercase">{currentLanguage?.code}</span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-36 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Select Language
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-colors duration-150 ${
                selectedLanguage === lang.code
                  ? "bg-orange-50 text-orange-600 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.fullLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
