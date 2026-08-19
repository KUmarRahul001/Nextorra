import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { tier1Services, tier2Services, type Service } from '../../data/services';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

/** Map service slug → lucide-react icon element */
const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="h-7 w-7 text-white" />,
  'full-stack-web-apps': <Code2 className="h-7 w-7 text-white" />,
  'app-development': <Smartphone className="h-7 w-7 text-white" />,
  'custom-software-api-integration': <Settings className="h-7 w-7 text-white" />,
  'erp-enterprise-applications': <Building2 className="h-7 w-7 text-white" />,
  'saas-products': <Cloud className="h-7 w-7 text-white" />,
  'desktop-applications': <Monitor className="h-7 w-7 text-white" />,
  'social-media-marketing': <Share2 className="h-7 w-7 text-white" />,
  'lead-generation': <Target className="h-7 w-7 text-white" />,
  'sms-marketing': <MessageSquare className="h-7 w-7 text-white" />,
  'email-marketing': <Mail className="h-7 w-7 text-white" />,
  'missed-call-service': <Phone className="h-7 w-7 text-white" />,
  'graphic-design': <Palette className="h-7 w-7 text-white" />,
  'voice-call-services': <PhoneCall className="h-7 w-7 text-white" />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
  onLearnMore: (route: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onLearnMore }) => (
  <motion.div
    key={service.slug}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group relative flex flex-col"
  >
    <div className="glass-effect rounded-2xl p-6 sm:p-7 h-full border border-white/10 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between shadow-xl">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* Top Header: Icon + Pricing Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-3 group-hover:scale-105 transition-transform duration-300 shadow-md">
            {serviceIcons[service.slug] ?? <Globe className="h-6 w-6 text-white" />}
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Starting From</span>
            <span className="text-sm sm:text-base font-extrabold text-cyan-300">{service.pricing?.startingAt || 'Custom'}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors duration-300">
          {service.name}
        </h3>

        <p className="text-slate-300 mb-4 text-xs sm:text-sm leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Turnaround Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 border border-slate-700/60 rounded-md text-[11px] text-slate-300 mb-4">
          <Clock className="h-3 w-3 text-cyan-400" />
          <span>{service.delivery || '3–7 Days'}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-white/10 mt-2">
        <button
          type="button"
          onClick={() => onLearnMore(service.route)}
          className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-blue-600 text-white transition-all duration-300 group/btn text-xs sm:text-sm font-semibold"
        >
          <span>View Specs &amp; Packages</span>
          <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleLearnMore = (route: string) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{`Our Services & Pricing – ${config.siteName}`}</title>
        <meta
          name="description"
          content={`${config.siteName} builds web apps, mobile apps, ERP systems, SaaS platforms, and custom software with transparent affordable Indian pricing.`}
        />
        <link rel="canonical" href={`${config.siteUrl}/services`} />
      </Helmet>

      <section className="section bg-gradient-to-b from-gray-900 to-primary-dark relative" id="services">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.1)_0%,transparent_100%)] opacity-50" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-semibold mb-3">
              Affordable &amp; Transparent Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
              Software &amp; Digital Services
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Explore starting prices, delivery timelines, and full specifications for every service.
            </p>
          </motion.div>

          {/* Tier 1 — Software & Engineering */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tier1Services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>

          {/* Tier 2 — Marketing & Business Support (collapsible) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <button
              type="button"
              onClick={() => setShowAll(prev => !prev)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm font-medium"
            >
              {showAll ? 'Hide' : 'Show'} Marketing &amp; Business Support Services ({tier2Services.length})
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`}
              />
            </button>
          </motion.div>

          {showAll && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 text-center">
                <span className="inline-block px-4 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-semibold">
                  Marketing &amp; Growth Support Services
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier2Services.map((service, index) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    index={index}
                    onLearnMore={handleLearnMore}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* View all services CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <button
              type="button"
              onClick={() => { navigate('/services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 group shadow-xl shadow-white/10 text-sm"
            >
              View Full Service Catalog
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
