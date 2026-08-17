import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { tier1Services } from "../data/services";
import config from "../config";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScrollTo = (id: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
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
      className="relative bg-slate-950 text-white pt-16 pb-8 overflow-hidden border-t border-slate-800"
      aria-label="Site Footer"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-5">
            <button
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 mb-4 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                N
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {config.siteName}
              </span>
            </button>

            <p className="text-slate-400 mb-6 max-w-sm text-sm leading-relaxed">
              Software engineering company building custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern organizations.
            </p>

            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${config.contact.email}`} 
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
              >
                <EnvelopeIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="break-all">{config.contact.email}</span>
              </a>

              <a 
                href={`tel:${config.contact.phone1.replace(/\s+/g, '')}`} 
                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm"
              >
                <PhoneIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>{config.contact.phone1} / {config.contact.phone2}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <MapPinIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>{config.contact.location} (Remote Delivery Worldwide)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="lg:col-span-3" aria-label="Navigation Links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                { name: "Home", id: "hero" },
                { name: "About", id: "about" },
                { name: "Services Overview", path: "/services" },
                { name: "Work & Demonstrations", id: "portfolio" },
                { name: "Why Nextorra", id: "why-choose" },
                { name: "Internships", path: "/internship" },
                { name: "Start a Project", path: "/get-started" },
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
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors w-full text-left"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Software & Engineering Services */}
          <nav className="lg:col-span-4" aria-label="Core Services">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Software Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {tier1Services.map((service) => (
                <li key={service.slug}>
                  <button
                    onClick={() => {
                      navigate(service.route);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors w-full text-left"
                  >
                    <ArrowRightIcon className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} Nextorra. All rights reserved. Software Development &amp; Technology Engineering.
          </div>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => {
                navigate('/privacy-policy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/terms-and-conditions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-400 transition-colors"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;