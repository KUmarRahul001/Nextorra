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
} from 'lucide-react';
import { tier1Services, tier2Services, type Service } from '../../data/services';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

/** Map service slug → lucide-react icon element */
const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="h-8 w-8 text-white" />,
  'full-stack-web-apps': <Code2 className="h-8 w-8 text-white" />,
  'app-development': <Smartphone className="h-8 w-8 text-white" />,
  'custom-software-api-integration': <Settings className="h-8 w-8 text-white" />,
  'erp-enterprise-applications': <Building2 className="h-8 w-8 text-white" />,
  'saas-products': <Cloud className="h-8 w-8 text-white" />,
  'desktop-applications': <Monitor className="h-8 w-8 text-white" />,
  'social-media-marketing': <Share2 className="h-8 w-8 text-white" />,
  'lead-generation': <Target className="h-8 w-8 text-white" />,
  'sms-marketing': <MessageSquare className="h-8 w-8 text-white" />,
  'email-marketing': <Mail className="h-8 w-8 text-white" />,
  'missed-call-service': <Phone className="h-8 w-8 text-white" />,
  'graphic-design': <Palette className="h-8 w-8 text-white" />,
  'voice-call-services': <PhoneCall className="h-8 w-8 text-white" />,
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
    className="group relative"
  >
    <div className="glass-effect rounded-xl p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent p-4 group-hover:scale-110 transition-transform duration-300">
          {serviceIcons[service.slug] ?? <Globe className="h-8 w-8 text-white" />}
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
      </div>

      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">
        {service.name}
      </h3>

      <p className="text-gray-300 mb-6 relative z-10 text-sm leading-relaxed">
        {service.shortDescription}
      </p>

      {/* CTA */}
      <div className="pt-4 mt-auto border-t border-white/10">
        <button
          type="button"
          onClick={() => onLearnMore(service.route)}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group/btn text-sm"
        >
          Learn More
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
        <title>{`Our Services – ${config.siteName}`}</title>
        <meta
          name="description"
          content={`${config.siteName} builds web apps, mobile apps, ERP systems, SaaS platforms, and custom software — plus marketing support services.`}
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
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              What We Build
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Software &amp; Engineering Services
            </h2>
            <p className="text-gray-300 text-lg">
              From business websites to enterprise platforms — we design, build, and ship software.
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
            >
              {showAll ? 'Hide' : 'Show'} Marketing &amp; Business Support Services
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
                <span className="inline-block px-4 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-medium">
                  Marketing &amp; Business Support
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 group shadow-xl shadow-white/10"
            >
              View All Services
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
