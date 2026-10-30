"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";

const ShareButtons = ({ url, message }: { url: string; message: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 pt-2">
      <span className="text-xs font-semibold text-slate-500 mr-1">Share:</span>

      {/* Facebook */}
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877F2] text-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center shadow-2xs"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            "_blank"
          )
        }
        title="Share on Facebook"
      >
        <FaFacebookF className="w-3.5 h-3.5" />
      </button>

      {/* Twitter */}
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center shadow-2xs"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=${encodeURIComponent(message)}`,
            "_blank"
          )
        }
        title="Share on Twitter"
      >
        <FaTwitter className="w-3.5 h-3.5" />
      </button>

      {/* WhatsApp */}
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#25D366] text-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center shadow-2xs"
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              `${message} ${url}`
            )}`,
            "_blank"
          )
        }
        title="Share on WhatsApp"
      >
        <FaWhatsapp className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition shadow-2xs"
        onClick={handleCopyLink}
        title="Copy Link to Clipboard"
      >
        {copied ? (
          <>
            <FiCheck className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-600">Copied!</span>
          </>
        ) : (
          <>
            <FiCopy className="w-3 h-3 text-slate-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
