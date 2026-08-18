import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-full left-0 mb-4 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-2xl p-4 w-64 transform transition-all duration-300 animate-fade-in backdrop-blur-md">
          <button
            onClick={() => setTooltipVisible(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close tooltip"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-slate-200 text-sm mb-3">
            Chat directly with the Rahnoxa engineering team on WhatsApp for quick scoping and support!
          </p>
          <a
            href="https://wa.me/918434237052?text=Hello%20Rahnoxa%20Team%2C%20I%20would%20like%20to%20discuss%20a%20software%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-md"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setTooltipVisible(!isTooltipVisible)}
        className="relative group flex items-center justify-center"
        aria-label="WhatsApp Contact"
      >
        {/* Subtle Glow Ripple */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30"></div>

        {/* Floating Action Button */}
        <div className="relative bg-gradient-to-tr from-green-600 to-green-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-green-500/30 border border-green-400/30 transition-all duration-300 transform hover:scale-110">
          <FaWhatsapp className="h-6 w-6" />
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
