import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Globe,
  Code2,
  Smartphone,
  Settings,
  Building2,
  Cloud,
  Monitor,
  Share2,
  Target,
  MessageSquare,
  Mail,
  Phone,
  Palette,
  PhoneCall,
  ArrowRight,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { tier1Services, tier2Services, type Service } from '../../data/services';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="h-5 w-5 text-blue-400" />,
  'full-stack-web-apps': <Code2 className="h-5 w-5 text-indigo-400" />,
  'app-development': <Smartphone className="h-5 w-5 text-cyan-400" />,
  'custom-software-api-integration': <Settings className="h-5 w-5 text-blue-400" />,
  'erp-enterprise-applications': <Building2 className="h-5 w-5 text-indigo-400" />,
  'saas-products': <Cloud className="h-5 w-5 text-cyan-400" />,
  'desktop-applications': <Monitor className="h-5 w-5 text-blue-400" />,
  'social-media-marketing': <Share2 className="h-5 w-5 text-slate-400" />,
  'lead-generation': <Target className="h-5 w-5 text-slate-400" />,
  'sms-marketing': <MessageSquare className="h-5 w-5 text-slate-400" />,
  'email-marketing': <Mail className="h-5 w-5 text-slate-400" />,
  'missed-call-service': <Phone className="h-5 w-5 text-slate-400" />,
  'graphic-design': <Palette className="h-5 w-5 text-slate-400" />,
  'voice-call-services': <PhoneCall className="h-5 w-5 text-slate-400" />,
};

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'engineering' | 'growth'>('engineering');

  const displayedServices = activeTab === 'engineering' ? tier1Services : tier2Services;

  return (
    <>
      <Helmet>
        <title>{`Engineering & Business Services | ${config.siteName}`}</title>
        <meta
          name="description"
          content="Explore Rahnoxa's software development services: Full-Stack Web Apps, Mobile Engineering, Custom ERP Systems, and Growth Marketing."
        />
      </Helmet>

      <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
                Capabilities &amp; Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Software Services Engineered for Scale
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Clear deliverables, transparent commercial pricing, and structured delivery schedules.
              </p>
            </div>

            {/* Segmented Control Tabs */}
            <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('engineering')}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'engineering'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Core Engineering (Tier 1)
              </button>
              <button
                onClick={() => setActiveTab('growth')}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'growth'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Growth &amp; Comms (Tier 2)
              </button>
            </div>
          </div>

          {/* Structured Service Rows / Editorial List */}
          <div className="divide-y divide-slate-800/80 border-y border-slate-800/80 mb-16">
            {displayedServices.map((service, index) => (
              <div
                key={service.slug}
                onClick={() => {
                  navigate(service.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group py-6 sm:py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-900/50 px-4 -mx-4 rounded-xl transition-colors cursor-pointer"
              >
                {/* Left: Index + Icon + Name + Description */}
                <div className="flex items-start gap-4 sm:gap-6 max-w-3xl">
                  <span className="font-mono text-xs text-slate-500 pt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex-shrink-0 group-hover:border-blue-500/40 transition-colors">
                    {serviceIcons[service.slug] ?? <Globe className="h-5 w-5 text-blue-400" />}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Right: Pricing, Delivery & CTA link */}
                <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-850">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">
                      Starting At
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {service.pricing?.startingAt || 'Custom Scope'}
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
                    <Clock className="h-3 w-3 text-blue-400" />
                    <span>{service.delivery || '3–7 Days'}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-blue-600 text-slate-400 group-hover:text-white border border-slate-800 group-hover:border-blue-500 transition-all flex items-center justify-center">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Overview Link */}
          <div className="text-center">
            <button
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
            >
              <span>View Full Services Catalog &amp; Deliverables</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServicesSection;
