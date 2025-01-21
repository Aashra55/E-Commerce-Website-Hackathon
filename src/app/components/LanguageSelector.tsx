// components/LanguageSelector.tsx
import React, { useState } from "react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
    // Optional: Add functionality to change the app's language here.
  };

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        {currentLanguage?.label}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute right-0 z-10 w-40 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
