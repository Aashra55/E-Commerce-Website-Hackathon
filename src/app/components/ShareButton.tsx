'use client';
import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const ShareButtons = ({ url, message }: { url: string; message: string }) => {
  return (
    <div className="flex justify-center space-x-4 p-4">
      {/* Facebook */}
      <button
        className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank'
          )
        }
      >
        <FaFacebook size={24} />
      </button>

      {/* Twitter */}
      <button
        className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
              message
            )}`,
            '_blank'
          )
        }
      >
        <FaTwitter size={24} />
      </button>

      {/* WhatsApp */}
      <button
        className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(`${message} ${url}`)}`,
            '_blank'
          )
        }
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default ShareButtons;
