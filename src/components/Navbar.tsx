import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from './assets/logo.png';

const services = [
  { name: 'Social Media Marketing', path: '/services/social-media-marketing' },
  { name: 'Lead Generation', path: '/services/lead-generation' },
  { name: 'SMS Marketing & SMPP', path: '/services/sms-marketing' },
  { name: 'Website Design', path: '/services/website-design' },
  { name: 'Full Stack Web App', path: '/services/full-stack-web-app' },
  { name: 'Email Marketing', path: '/services/email-marketing' },
  { name: 'Missed Call Service & IVR', path: '/services/missed-call-service' },
  { name: 'Graphic Design', path: '/services/graphic-design' },
  { name: 'Voice Call Services', path: '/services/voice-call-services' },
  { name: 'App Development', path: '/services/app-development' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group" 
            aria-label="Homepage" 
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:scale-110 transition-transform"></div>
              <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Company Logo" 
                  className="h-full w-full object-contain" 
                  loading="lazy" 
                  draggable={false} 
                />
              </div>
            </div>
            <span className="hidden sm:block text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-accent to-cyan-500 bg-clip-text text-transparent">
              Nextorra
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => handleScrollLink('about')} 
              className="nav-link px-3 py-2" 
              type="button"
            >
              About
            </button>
            <Link to="/internship" className="nav-link px-3 py-2">
              Internship
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesOpen(prev => !prev)}
                className="nav-link px-3 py-2 flex items-center gap-1 hover:text-accent transition-colors"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                type="button"
                aria-controls="services-menu"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div
                ref={servicesDropdownRef}
                id="services-menu"
                className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                role="menu"
              >
                {services.map(({ name, path }, index) => (
                  <Link
                    key={index}
                    to={path}
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 last:border-b-0 text-sm"
                    onClick={() => {
                      setServicesOpen(false);
                      setIsOpen(false);
                    }}
                    role="menuitem"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleScrollLink('pricing')} 
              className="nav-link px-3 py-2" 
              type="button"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleScrollLink('portfolio')} 
              className="nav-link px-3 py-2" 
              type="button"
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleScrollLink('clients')} 
              className="nav-link px-3 py-2" 
              type="button"
            >
              Clients
            </button>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/get-started"
              className="nav-link text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => navigate('/get-started')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              type="button"
            >
              Book Free Strategy Call
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors p-2"
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

      {/* Mobile Menu */}
      <div 
        id="mobile-menu" 
        className={`lg:hidden transition-all duration-300 overflow-hidden border-t border-gray-100 ${
          isOpen ? 'bg-white/95 backdrop-blur-xl' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
          <button 
            onClick={() => handleScrollLink('about')} 
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-left" 
            type="button"
          >
            About
          </button>
          
          <Link
            to="/internship"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Internship
          </Link>

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => setServicesOpen(prev => !prev)}
              className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 w-full text-left flex items-center justify-between transition-colors"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              type="button"
              aria-controls="mobile-services-menu"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div 
              id="mobile-services-menu" 
              className={`transition-all duration-300 overflow-hidden ${servicesOpen ? 'max-h-screen' : 'max-h-0'}`} 
              role="menu"
            >
              {services.map(({ name, path }, index) => (
                <Link
                  key={index}
                  to={path}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-8 pr-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                  role="menuitem"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <button 
            onClick={() => handleScrollLink('pricing')} 
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-left" 
            type="button"
          >
            Pricing
          </button>

          <button 
            onClick={() => handleScrollLink('portfolio')} 
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-left" 
            type="button"
          >
            Portfolio
          </button>

          <button 
            onClick={() => handleScrollLink('clients')} 
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-left" 
            type="button"
          >
            Clients
          </button>

          <Link
            to="/get-started"
            className="text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <button
            onClick={() => {
              navigate('/get-started');
              setIsOpen(false);
            }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg mt-2"
            type="button"
          >
            Book Free Strategy Call
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;