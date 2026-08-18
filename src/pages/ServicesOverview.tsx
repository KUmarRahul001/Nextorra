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
} from 'lucide-react';
import SEO from '../components/SEO';
import { tier1Services, tier2Services, type Service } from '../data/services';
import config from '../config';

/** Map service slug → icon element */
const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="w-8 h-8" />,
  'full-stack-web-apps': <Code2 className="w-8 h-8" />,
  'app-development': <Smartphone className="w-8 h-8" />,
  'custom-software-api-integration': <Settings className="w-8 h-8" />,
  'erp-enterprise-applications': <Building2 className="w-8 h-8" />,
  'saas-products': <Cloud className="w-8 h-8" />,
  'desktop-applications': <Monitor className="w-8 h-8" />,
  'social-media-marketing': <Share2 className="w-8 h-8" />,
  'lead-generation': <Target className="w-8 h-8" />,
  'sms-marketing': <MessageSquare className="w-8 h-8" />,
  'email-marketing': <Mail className="w-8 h-8" />,
  'missed-call-service': <Phone className="w-8 h-8" />,
  'graphic-design': <Palette className="w-8 h-8" />,
  'voice-call-services': <PhoneCall className="w-8 h-8" />,
};

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <Link
    to={service.route}
    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
  >
    <div className="p-8">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {serviceIcons[service.slug] ?? <Globe className="w-8 h-8" />}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
        {service.description}
      </p>

      <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors text-sm">
        Learn More
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
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
        title={`Services – ${config.siteName}`}
        description={`Web development, mobile apps, ERP, SaaS platforms, custom software, and marketing support services from ${config.siteName}.`}
        keywords={`${config.siteName} services, web development, mobile apps, ERP, SaaS, custom software, API integration, app development`}
        url={`${config.siteUrl}/services`}
        canonical={`${config.siteUrl}/services`}
        schema={serviceSchema}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Software engineering and business support services — built to your requirements.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ── Tier 1: Software & Engineering ── */}
          <div className="mb-16">
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Primary Services
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Software &amp; Engineering
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Our core capability. We design and build software — from business websites to
                enterprise platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tier1Services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-16" />

          {/* ── Tier 2: Marketing & Business Support ── */}
          <div className="mb-16">
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold mb-3">
                Add-On Services
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Marketing &amp; Business Support
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Complementary services to support your marketing operations and business
                communications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tier2Services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Tell us about your project and we'll get back to you.
            </p>
            <Link
              to="/get-started"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesOverview;
