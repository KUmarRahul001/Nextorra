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
    window.addEventListener('scroll', handleScroll);
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
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    if (location.pathname === '/') {
      performScroll();
    } else {
      navigate('/');
      setTimeout(performScroll, 100);
    }
  };

  const handleScrollLink = (id: string) => {
    smoothScrollTo(id);
    setIsOpen(false);
    setServicesOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-effect shadow-glass py-2' : 'bg-transparent py-4'}`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3" aria-label="Homepage" onClick={() => setIsOpen(false)}>
            <div className="relative h-12 w-12 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg animate-pulse"></div>
              <div className="absolute inset-0.5 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Company Logo" className="h-10 w-auto object-contain" loading="lazy" draggable={false} />
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleScrollLink('about')} className="nav-link" type="button">About</button>
            <Link to="/internship" className="nav-link">Internship</Link>

            <div className="relative">
              <button
                ref={servicesButtonRef}
                onClick={() => setServicesOpen(prev => !prev)}
                className="nav-link flex items-center gap-1 services-button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                type="button"
                aria-controls="services-menu"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                ref={servicesDropdownRef}
                id="services-menu"
                className={`absolute top-full left-0 mt-2 w-64 glass-effect rounded-lg shadow-glass overflow-hidden border border-white/20 transition-all duration-300 ${servicesOpen ? 'opacity-100 visible max-h-screen' : 'opacity-0 invisible max-h-0'}`}
                role="menu"
              >
                {services.map(({ name, path }, index) => (
                  <Link
                    key={index}
                    to={path}
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                    onClick={() => setServicesOpen(false)}
                    role="menuitem"
                    tabIndex={servicesOpen ? 0 : -1}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <button onClick={() => handleScrollLink('pricing')} className="nav-link" type="button">Pricing</button>
            <button onClick={() => handleScrollLink('portfolio')} className="nav-link" type="button">Portfolio</button>
            <button onClick={() => handleScrollLink('clients')} className="nav-link" type="button">Clients</button>
            <button onClick={() => handleScrollLink('contact')} className="nav-link" type="button">Contact</button>
          </div>

          <button
            onClick={() => handleScrollLink('contact')}
            className="hidden md:flex items-center px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 shadow-glass transition-all duration-300"
            type="button"
          >
            Book Free Strategy Call
          </button>

          <button
            className="md:hidden text-white hover:text-accent transition-colors"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-screen glass-effect border-t border-white/20' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <button onClick={() => handleScrollLink('about')} className="text-white hover:text-accent py-2 border-b border-white/10 text-left" type="button">About</button>

          <Link
            to="/internship"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-accent py-2 border-b border-white/10 text-left"
          >
            Internship
          </Link>

          <div>
            <button
              onClick={() => setServicesOpen(prev => !prev)}
              className="text-white hover:text-accent py-2 border-b border-white/10 w-full text-left flex items-center justify-between"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              type="button"
              aria-controls="mobile-services-menu"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div id="mobile-services-menu" className={`transition-all duration-300 overflow-hidden ${servicesOpen ? 'max-h-screen' : 'max-h-0'}`} role="menu">
              {services.map(({ name, path }, index) => (
                <Link
                  key={index}
                  to={path}
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                  }}
                  className="block py-2 pl-4 text-white/80 hover:text-accent transition-colors"
                  role="menuitem"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <button onClick={() => handleScrollLink('pricing')} className="text-white hover:text-accent py-2 border-b border-white/10 text-left" type="button">Pricing</button>
          <button onClick={() => handleScrollLink('portfolio')} className="text-white hover:text-accent py-2 border-b border-white/10 text-left" type="button">Portfolio</button>
          <button onClick={() => handleScrollLink('clients')} className="text-white hover:text-accent py-2 border-b border-white/10 text-left" type="button">Clients</button>
          <button onClick={() => handleScrollLink('contact')} className="text-white hover:text-accent py-2 border-b border-white/10 text-left" type="button">Contact</button>

          <button
            onClick={() => handleScrollLink('contact')}
            className="bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-full transition-all duration-300 border border-white/20"
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
