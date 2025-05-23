import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import logo from "./assets/logo.svg";
import TermsAndConditions from "../TermsAndConditions";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollTo = (id: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Increased delay for navigation
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-8 overflow-hidden" aria-label="Site Footer">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='white' fill-opacity='0.05' width='100%' height='100%'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <button onClick={() => smoothScrollTo("hero")} className="flex items-center gap-4 mb-6 group">
              <div className="relative h-[100px] w-[100px] rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg animate-pulse" />
                <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Nextorra Logo"
                    className="h-[92px] w-[92px] object-contain select-none"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-white via-indigo-500 to-cyan-400 bg-clip-text text-transparent select-none">
                Nextorra
              </span>
            </button>

            <p className="text-gray-300 mb-8 max-w-md">
              Empowering businesses with innovative digital solutions that drive growth and deliver measurable results in an ever-evolving digital landscape.
            </p>

            <div className="space-y-4 mb-8">
              <a href="mailto:contact@nextorra.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <span>contact.nextorra@protonmail.com</span>
              </a>

              <a href="tel:+918434237052" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <span>+91 8434237052</span>
              </a>

              <div className="flex items-center gap-3 text-gray-300 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <span>Jharkhand, India</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                {
                  href: "https://linkedin.com",
                  label: "linkedin",
                  iconPath: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.27h-3v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3v-10h2.88v1.37h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.63v5.56z"
                },
                {
                  href: "https://instagram.com",
                  label: "instagram",
                  iconPath: "M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 011.77 1.15 4.92 4.92 0 011.15 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 01-1.15 1.77 4.92 4.92 0 01-1.77 1.15c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 01-1.77-1.15 4.92 4.92 0 01-1.15-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 011.15-1.77A4.92 4.92 0 015.6 2.68c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm5.2-10.8a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
                },
                {
                  href: "https://facebook.com",
                  label: "facebook",
                  iconPath: "M18 0h-3c-3.3 0-6 2.7-6 6v3H6v4h3v10h5V13h4l1-4h-5V6c0-1.1.9-2 2-2h3V0z"
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={`Visit our ${item.label}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={item.iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-2" aria-label="Quick Links">
            <h3 className="text-lg font-bold mb-6 text-gradient">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", id: "hero" },
                { name: "About", id: "about" },
                { name: "Pricing", id: "pricing" },
                { name: "Portfolio", id: "portfolio" },
                { name: "Contact", id: "contact" },
                { name: "Terms & Conditions", path: '../TermsAndConditions'},
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.path ? navigate(link.path) : smoothScrollTo(link.id)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left"
                  >
                    <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="text-lg font-bold mb-6 text-gradient">Services</h3>
            <ul className="space-y-3">
              {[
                { name: "Social Media Marketing", path: "/services/social-media-marketing" },
                { name: "Lead Generation", path: "/services/lead-generation" },
                { name: "Website Design", path: "/services/website-design" },
                { name: "App Development", path: "/services/app-development" },
                { name: "Email Marketing", path: "/services/email-marketing" },
                { name: "Graphic Design", path: "/services/graphic-design" },
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(service.path)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group w-full text-left"
                  >
                    <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <section className="lg:col-span-3" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading" className="text-lg font-bold mb-6 text-gradient">Newsletter</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest updates and insights.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button type="submit" className="absolute top-1/2 right-1 -translate-y-1/2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </section>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          &copy; {currentYear} Nextorra. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
