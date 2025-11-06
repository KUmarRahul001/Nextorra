import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import logo from "./assets/logo.svg";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollTo = (id: string) => {
    // If already on home page, scroll directly
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  };

  return (
    <footer
      className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-8 overflow-hidden"
      aria-label="Site Footer"
      role="contentinfo"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='white' fill-opacity='0.05' width='100%' height='100%'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-4 mb-6 group"
            >
              <div className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px] rounded-lg flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg animate-pulse" />
                <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Nextorra Logo"
                    className="h-full w-full object-contain select-none"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-500 to-cyan-400 bg-clip-text text-transparent select-none">
                Nextorra
              </span>
            </button>

            <p className="text-gray-300 mb-8 max-w-md text-sm md:text-base">
              Empowering businesses with innovative digital solutions that drive growth and deliver measurable results in an ever-evolving digital landscape.
            </p>

            <div className="space-y-4 mb-8">
              <a 
                href="mailto:contact.nextorra@protonmail.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <span className="text-sm md:text-base break-all">contact.nextorra@protonmail.com</span>
              </a>

              <a 
                href="tel:+918434237052" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 flex-shrink-0">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <span className="text-sm md:text-base">+91 8434237052</span>
              </a>

              <div className="flex items-center gap-3 text-gray-300 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 flex-shrink-0">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <span className="text-sm md:text-base">Jharkhand, India</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Visit our LinkedIn"
                title="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-pink-600 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Visit our Instagram"
                title="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.921h-11.042v-5.891h11.042v5.891zm-5.521-6.947c-1.6 0-2.905-1.305-2.905-2.905 0-1.6 1.305-2.905 2.905-2.905 1.6 0 2.905 1.305 2.905 2.905 0 1.6-1.305 2.905-2.905 2.905z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-blue-700 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Visit our Facebook"
                title="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-2" aria-label="Quick Links">
            <h3 className="text-base md:text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-500 to-cyan-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", id: "hero" },
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Portfolio", id: "portfolio" },
                { name: "Contact", path: '/get-started' },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (link.path) {
                        navigate(link.path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (link.id) {
                        smoothScrollTo(link.id);
                      }
                    }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left text-sm md:text-base"
                  >
                    <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/terms-and-conditions"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group text-sm md:text-base"
                >
                  <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group text-sm md:text-base"
                >
                  <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="text-base md:text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-500 to-cyan-400">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Social Media Marketing", path: "/services/social-media-marketing" },
                { name: "Lead Generation", path: "/services/lead-generation" },
                { name: "Website Design", path: "/services/website-design" },
                { name: "App Development", path: "/services/app-development" },
                { name: "Email Marketing", path: "/services/email-marketing" },
                { name: "SMS Marketing", path: "/services/sms-marketing" },
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(service.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left text-sm md:text-base"
                  >
                    <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <section className="lg:col-span-3" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading" className="text-base md:text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-500 to-cyan-400">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-6 text-sm md:text-base">Subscribe to our newsletter for the latest updates and insights.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-1 -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white px-3 md:px-4 py-2 rounded-md transition-colors text-sm"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </section>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs md:text-sm text-gray-400">
          &copy; {currentYear} Nextorra. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;