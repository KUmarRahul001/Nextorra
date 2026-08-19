import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import logo from './assets/logo.png';
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
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname === '/') {
      performScroll();
    } else {
      navigate('/');
      setTimeout(performScroll, 300);
    }
  };

  const handleScrollLink = (id: string) => {
    smoothScrollTo(id);
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-2'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/80 py-3 sm:py-3.5'
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 flex-shrink-0" 
            aria-label="Homepage" 
            onClick={() => {
              setIsOpen(false);
              setServicesOpen(false);
            }}
          >
            <div className="h-8 w-8 rounded-lg overflow-hidden flex-shrink-0 bg-blue-600 flex items-center justify-center p-1 border border-blue-500/30">
              <img 
                src={logo} 
                alt="Rahnoxa Logo" 
                className="h-full w-full object-contain" 
                loading="eager" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
                Rahnoxa
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-0.5">
                Engineering
              </span>
            </div>
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

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button 
              onClick={() => handleScrollLink('contact')} 
              className="text-slate-600 hover:text-slate-900 px-2.5 lg:px-3 py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-slate-100 transition-colors"
              type="button"
            >
              Contact
            </button>
            <Link
              to="/get-started"
              className="px-3.5 lg:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm font-semibold transition-all shadow-sm"
              onClick={() => {
                setIsOpen(false);
                setServicesOpen(false);
              }}
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile & Small Screen Menu Toggle (< 800px / md) */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (< 800px) */}
      <div 
        id="mobile-menu" 
        className={`md:hidden transition-all duration-300 overflow-hidden border-b border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl ${
          isOpen ? 'max-h-[88vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1 text-slate-200">
          <button 
            onClick={() => handleScrollLink('about')} 
            className="text-left text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm" 
            type="button"
          >
            About
          </button>
          
          <Link
            to="/blog"
            className="text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm"
            onClick={() => setIsOpen(false)}
          >
            Blog &amp; Insights
          </Link>

          <Link
            to="/internship"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm"
          >
            Internship
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setServicesOpen(prev => !prev)}
              className="w-full text-left text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 flex items-center justify-between transition-colors font-medium text-sm"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              type="button"
              aria-controls="mobile-services-menu"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>
            
            <div 
              id="mobile-services-menu" 
              className={`transition-all duration-300 overflow-hidden pl-2 ${servicesOpen ? 'max-h-[500px] overflow-y-auto py-1' : 'max-h-0'}`} 
              role="menu"
            >
              <div className="my-1 py-1 px-3 bg-blue-950/40 border border-blue-900/30 rounded-lg">
                <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                  Software &amp; Engineering
                </p>
              </div>
              {tier1Services.map(({ name, route }) => (
                <Link
                  key={route}
                  to={route}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-4 pr-3 text-slate-300 hover:text-white hover:bg-blue-600/10 rounded-lg transition-colors text-xs"
                  role="menuitem"
                >
                  {name}
                </Link>
              ))}

              <div className="my-1 mt-2 py-1 px-3 bg-slate-900 border border-slate-800 rounded-lg">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Marketing &amp; Business Support
                </p>
              </div>
              {tier2Services.map(({ name, route }) => (
                <Link
                  key={route}
                  to={route}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-4 pr-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors text-xs"
                  role="menuitem"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <button 
            onClick={() => handleScrollLink('pricing')} 
            className="text-left text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm" 
            type="button"
          >
            Pricing
          </button>

          <button 
            onClick={() => handleScrollLink('portfolio')} 
            className="text-left text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm" 
            type="button"
          >
            Work
          </button>

          <button 
            onClick={() => handleScrollLink('why-choose')} 
            className="text-left text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm" 
            type="button"
          >
            Why Us
          </button>

          <Link
            to="/get-started"
            className="text-slate-300 hover:text-white py-2.5 px-4 rounded-xl hover:bg-slate-800/60 transition-colors font-medium text-sm"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <button
            onClick={() => {
              navigate('/get-started');
              setIsOpen(false);
            }}
            className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm"
            type="button"
          >
            Start a Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;