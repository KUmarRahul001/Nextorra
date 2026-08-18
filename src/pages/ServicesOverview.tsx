import React from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles,
} from 'lucide-react';
import SEO from '../components/SEO';
import { tier1Services, tier2Services, type Service } from '../data/services';
import config from '../config';

/** Map service slug → icon element */
const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="w-7 h-7" />,
  'full-stack-web-apps': <Code2 className="w-7 h-7" />,
  'app-development': <Smartphone className="w-7 h-7" />,
  'custom-software-api-integration': <Settings className="w-7 h-7" />,
  'erp-enterprise-applications': <Building2 className="w-7 h-7" />,
  'saas-products': <Cloud className="w-7 h-7" />,
  'desktop-applications': <Monitor className="w-7 h-7" />,
  'social-media-marketing': <Share2 className="w-7 h-7" />,
  'lead-generation': <Target className="w-7 h-7" />,
  'sms-marketing': <MessageSquare className="w-7 h-7" />,
  'email-marketing': <Mail className="w-7 h-7" />,
  'missed-call-service': <Phone className="w-7 h-7" />,
  'graphic-design': <Palette className="w-7 h-7" />,
  'voice-call-services': <PhoneCall className="w-7 h-7" />,
};

const ServiceCard: React.FC<{ service: Service; isPrimary?: boolean }> = ({ service, isPrimary }) => (
  <Link
    to={service.route}
    className={`group p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
      isPrimary
        ? 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 hover:border-blue-500/50 shadow-xl shadow-black/30 hover:shadow-blue-500/10'
        : 'bg-slate-900/40 hover:bg-slate-900/80 border-slate-800/80 hover:border-slate-700 shadow-md'
    } transform hover:-translate-y-1`}
  >
    <div>
      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-600/20 border border-blue-400/20">
        {serviceIcons[service.slug] ?? <Globe className="w-7 h-7" />}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {service.name}
      </h3>

      <p className="text-slate-400 mb-6 leading-relaxed text-sm">
        {service.description}
      </p>
    </div>

    <div className="flex items-center text-cyan-400 font-semibold group-hover:text-blue-300 transition-colors text-sm pt-4 border-t border-slate-800/80">
      <span>Explore Specifications &amp; Pricing</span>
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </Link>
);

const ServicesOverview: React.FC = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Software Engineering & Business Services',
    provider: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
      logo: `${config.siteUrl}/logo.png`,
    },
    areaServed: ['IN', 'GB', 'CA', 'AT', 'AU'],
    serviceType: [...tier1Services, ...tier2Services].map((s) => s.name),
    description:
      `${config.siteName} provides software engineering services — web apps, mobile apps, ERP systems, SaaS platforms, custom software — alongside marketing support services.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: 'Custom',
      availability: 'https://schema.org/InStock',
      url: `${config.siteUrl}/services`,
    },
  };

  return (
    <>
      <SEO
        title={`Services & Engineering Capabilities – ${config.siteName}`}
        description={`Web development, mobile apps, ERP, SaaS platforms, custom software, and marketing support services from ${config.siteName}.`}
        keywords={`${config.siteName} services, web development, mobile apps, ERP, SaaS, custom software, API integration, app development`}
        url={`${config.siteUrl}/services`}
        canonical={`${config.siteUrl}/services`}
        schema={serviceSchema}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            End-to-End Technology Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Software Engineering &amp; Business Services
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From modern responsive websites and mission-critical ERPs to scalable SaaS infrastructure and targeted marketing automation.
          </p>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Tier 1: Software & Engineering ── */}
          <div className="mb-20">
            <div className="mb-10 border-b border-slate-800/80 pb-6">
              <span className="inline-block px-3.5 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Core Engineering (Tier 1)
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                Software &amp; Systems Engineering
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Our flagship capability. Custom application development, multi-tenant cloud platforms, ERPs, and bespoke API architectures built to scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tier1Services.map((service) => (
                <ServiceCard key={service.slug} service={service} isPrimary={true} />
              ))}
            </div>
          </div>

          {/* ── Tier 2: Marketing & Business Support ── */}
          <div className="mb-20">
            <div className="mb-10 border-b border-slate-800/80 pb-6">
              <span className="inline-block px-3.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Operations &amp; Growth (Tier 2)
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                Marketing &amp; Business Growth Services
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Complementary growth services designed to expand client reach, power outreach workflows, and elevate brand authority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tier2Services.map((service) => (
                <ServiceCard key={service.slug} service={service} isPrimary={false} />
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-3xl p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Have a Specific System Architecture in Mind?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Tell us about your requirements or chat with RahBot for immediate scope estimation and engineering consultations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-started"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                Start a Discovery Call
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicesOverview;
