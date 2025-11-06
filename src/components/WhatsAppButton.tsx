import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-4 w-64 transform transition-all duration-300 animate-fade-in">
          <button
            onClick={() => setTooltipVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-gray-600 text-sm mb-3">
            Chat with us on WhatsApp for quick support and inquiries!
          </p>
          <a
            href="https://wa.me/919204743660?text=Hello%2C%20Nextorra"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with us
          </a>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setTooltipVisible(!isTooltipVisible)}
        className="relative group"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>

        {/* Main Button */}
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110">
          <FaWhatsapp className="h-6 w-6" />
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
