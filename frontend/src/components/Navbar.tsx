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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40 py-1'
          : 'bg-transparent py-3'
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group" 
            aria-label="Homepage" 
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-10 w-10 rounded-xl overflow-hidden flex-shrink-0 p-0.5 bg-gradient-to-tr from-blue-600 to-cyan-400 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Rahnoxa Logo" 
                  className="h-7 w-7 object-contain group-hover:scale-105 transition-transform" 
                  loading="lazy" 
                  draggable={false} 
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Rahnoxa
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button 
              onClick={() => handleScrollLink('about')} 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors" 
              type="button"
            >
              About
            </button>
            <Link 
              to="/internship" 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors"
            >
              Internship
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesOpen(prev => !prev)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  servicesOpen
                    ? 'text-blue-400 bg-slate-800/60'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                type="button"
                aria-controls="services-menu"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>
              
              <div
                ref={servicesDropdownRef}
                id="services-menu"
                className={`absolute top-full left-0 mt-2.5 w-84 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/60 border border-slate-700/80 overflow-hidden transition-all duration-200 origin-top-left ${
                  servicesOpen
                    ? 'opacity-100 scale-100 visible'
                    : 'opacity-0 scale-95 invisible pointer-events-none'
                }`}
                role="menu"
              >
                {/* Software & Engineering — Tier 1 */}
                <div className="px-4 py-2.5 bg-slate-950/70 border-b border-slate-800">
                  <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                    Software &amp; Engineering
                  </p>
                </div>
                <div className="py-1">
                  {tier1Services.map(({ name, route }) => (
                    <Link
                      key={route}
                      to={route}
                      className="flex items-center justify-between px-4 py-2 text-slate-300 hover:text-white hover:bg-blue-600/10 hover:border-l-2 hover:border-blue-500 transition-all text-sm group"
                      onClick={() => {
                        setServicesOpen(false);
                        setIsOpen(false);
                      }}
                      role="menuitem"
                    >
                      <span>{name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-blue-400 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* Marketing & Business Support — Tier 2 */}
                <div className="px-4 py-2.5 bg-slate-950/70 border-y border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Marketing &amp; Business Support
                  </p>
                </div>
                <div className="py-1">
                  {tier2Services.map(({ name, route }) => (
                    <Link
                      key={route}
                      to={route}
                      className="flex items-center justify-between px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 hover:border-l-2 hover:border-slate-400 transition-all text-sm group"
                      onClick={() => {
                        setServicesOpen(false);
                        setIsOpen(false);
                      }}
                      role="menuitem"
                    >
                      <span>{name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-slate-400 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleScrollLink('pricing')} 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors" 
              type="button"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleScrollLink('portfolio')} 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors" 
              type="button"
            >
              Work
            </button>
            <Link 
              to="/blog" 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors"
              onClick={() => {
                setIsOpen(false);
                setServicesOpen(false);
              }}
            >
              Blog
            </Link>
            <button 
              onClick={() => handleScrollLink('why-choose')} 
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors" 
              type="button"
            >
              Why Us
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              to="/get-started"
              className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => navigate('/get-started')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 border border-blue-400/30 hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              type="button"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
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

      {/* Mobile Menu Dropdown */}
      <div 
        id="mobile-menu" 
        className={`lg:hidden transition-all duration-300 overflow-hidden border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl ${
          isOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
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
              className={`transition-all duration-300 overflow-hidden pl-3 ${servicesOpen ? 'max-h-screen py-1' : 'max-h-0'}`} 
              role="menu"
            >
              <p className="pl-4 pt-2 pb-1 text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                Software &amp; Engineering
              </p>
              {tier1Services.map(({ name, route }) => (
                <Link
                  key={route}
                  to={route}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-6 pr-4 text-slate-300 hover:text-white hover:bg-blue-600/10 rounded-lg transition-colors text-xs"
                  role="menuitem"
                >
                  {name}
                </Link>
              ))}

              <p className="pl-4 pt-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-t border-slate-800/60 mt-2">
                Marketing &amp; Business Support
              </p>
              {tier2Services.map(({ name, route }) => (
                <Link
                  key={route}
                  to={route}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-6 pr-4 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors text-xs"
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