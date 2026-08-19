import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { tier1Services, tier2Services } from '../data/services';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesOpen &&
        !servicesDropdownRef.current?.contains(event.target as Node) &&
        !servicesButtonRef.current?.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  // Lock body scroll only when mobile menu drawer is actually opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const smoothScrollTo = (id: string) => {
    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const navHeight = 64;
        const targetTop = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }
    };

    if (location.pathname === '/') {
      performScroll();
    } else {
      navigate('/');
      setTimeout(performScroll, 350);
    }
  };

  const handleScrollLink = (id: string) => {
    smoothScrollTo(id);
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3'
      }`}
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14">
          {/* Clean Horizontal Brand Lockup */}
          <Link 
            to="/" 
            className="flex flex-col items-start justify-center flex-shrink-0 group focus:outline-none" 
            aria-label="Homepage" 
            onClick={() => {
              setIsOpen(false);
              setServicesOpen(false);
            }}
          >
            <img 
              src="/brand/logo-horizontal-clean.png" 
              alt="Rahnoxa Logo" 
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
              loading="eager" 
            />
            <span className="text-[9px] text-blue-600 font-mono tracking-[0.25em] uppercase font-extrabold pl-12 -mt-1 sm:-mt-1.5 hidden sm:block">
              ENGINEERING
            </span>
          </Link>

          {/* Desktop Menu (Desktop >= 1200px / xl, Tablet >= 800px / md) */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1.5 xl:gap-2">
            <button 
              onClick={() => handleScrollLink('about')} 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors" 
              type="button"
            >
              About
            </button>
            <Link 
              to="/internship" 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Internship
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesOpen(prev => !prev)}
                className={`flex items-center gap-1 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                  servicesOpen
                    ? 'text-blue-600 bg-slate-100 border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                type="button"
                aria-controls="services-menu"
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              
              {/* 2-Column Mega Menu for clean visibility & solid opaque background */}
              <div
                ref={servicesDropdownRef}
                id="services-menu"
                className={`absolute top-full left-0 sm:-left-20 lg:left-0 mt-3 w-[320px] sm:w-[580px] lg:w-[620px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-200 origin-top-left z-50 ${
                  servicesOpen
                    ? 'opacity-100 scale-100 visible pointer-events-auto'
                    : 'opacity-0 scale-95 invisible pointer-events-none'
                }`}
                role="menu"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 max-h-[75vh] overflow-y-auto">
                  {/* Column 1: Software & Engineering — Tier 1 */}
                  <div className="p-3 bg-white">
                    <div className="px-3 py-1.5 mb-2 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                        Software &amp; Engineering
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      {tier1Services.map(({ name, route }) => (
                        <Link
                          key={route}
                          to={route}
                          className="flex items-center justify-between px-3 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all text-xs font-medium group"
                          onClick={() => {
                            setServicesOpen(false);
                            setIsOpen(false);
                          }}
                          role="menuitem"
                        >
                          <span className="truncate pr-2">{name}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-blue-600 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Marketing & Business Support — Tier 2 */}
                  <div className="p-3 bg-slate-50/70">
                    <div className="px-3 py-1.5 mb-2 bg-slate-100 border border-slate-200 rounded-lg">
                      <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Marketing &amp; Business Support
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      {tier2Services.map(({ name, route }) => (
                        <Link
                          key={route}
                          to={route}
                          className="flex items-center justify-between px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all text-xs font-medium group"
                          onClick={() => {
                            setServicesOpen(false);
                            setIsOpen(false);
                          }}
                          role="menuitem"
                        >
                          <span className="truncate pr-2">{name}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-600 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer bar inside mega menu */}
                <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Looking for a custom scope?</span>
                  <Link
                    to="/services"
                    onClick={() => {
                      setServicesOpen(false);
                      setIsOpen(false);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleScrollLink('pricing')} 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors" 
              type="button"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleScrollLink('portfolio')} 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors" 
              type="button"
            >
              Work
            </button>
            <Link 
              to="/blog" 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors"
              onClick={() => {
                setIsOpen(false);
                setServicesOpen(false);
              }}
            >
              Blog
            </Link>
            <button 
              onClick={() => handleScrollLink('why-choose')} 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors" 
              type="button"
            >
              Why Us
            </button>
          </div>

          {/* Right Action Button & Contact Link */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <Link 
              to="/contact" 
              className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => {
                navigate('/get-started');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary text-xs lg:text-sm px-4 lg:px-5 py-2 rounded-lg font-semibold shadow-sm"
              type="button"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                navigate('/get-started');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary text-xs px-3 py-1.5 rounded-lg font-semibold"
              type="button"
            >
              Start
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              type="button"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Solid Background) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleScrollLink('about')}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-left"
              type="button"
            >
              About
            </button>
            <Link
              to="/internship"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              Internship
            </Link>
            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              All Services
            </Link>
            <button
              onClick={() => handleScrollLink('pricing')}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-left"
              type="button"
            >
              Pricing
            </button>
            <button
              onClick={() => handleScrollLink('portfolio')}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-left"
              type="button"
            >
              Work
            </button>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              Blog
            </Link>
            <button
              onClick={() => handleScrollLink('why-choose')}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-left"
              type="button"
            >
              Why Us
            </button>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              Contact
            </Link>
            <div className="pt-3">
              <button
                onClick={() => {
                  navigate('/get-started');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className="btn btn-primary w-full py-2.5 rounded-lg text-sm font-semibold shadow-sm"
                type="button"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;