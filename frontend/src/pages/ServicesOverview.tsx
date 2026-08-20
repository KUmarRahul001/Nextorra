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
  Clock,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import SEO from '../components/SEO';
import { tier1Services, tier2Services, type Service } from '../data/services';
import config from '../config';

/** Map service slug → icon element */
const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Globe className="w-6 h-6 text-blue-600" />,
  'full-stack-web-apps': <Code2 className="w-6 h-6 text-indigo-600" />,
  'app-development': <Smartphone className="w-6 h-6 text-blue-600" />,
  'custom-software-api-integration': <Settings className="w-6 h-6 text-indigo-600" />,
  'erp-enterprise-applications': <Building2 className="w-6 h-6 text-blue-600" />,
  'saas-products': <Cloud className="w-6 h-6 text-indigo-600" />,
  'desktop-applications': <Monitor className="w-6 h-6 text-blue-600" />,
  'social-media-marketing': <Share2 className="w-6 h-6 text-slate-500" />,
  'lead-generation': <Target className="w-6 h-6 text-slate-500" />,
  'sms-marketing': <MessageSquare className="w-6 h-6 text-slate-500" />,
  'email-marketing': <Mail className="w-6 h-6 text-slate-500" />,
  'missed-call-service': <Phone className="w-6 h-6 text-slate-500" />,
  'graphic-design': <Palette className="w-6 h-6 text-slate-500" />,
  'voice-call-services': <PhoneCall className="w-6 h-6 text-slate-500" />,
};

const ServiceCard: React.FC<{ service: Service; isPrimary?: boolean }> = ({ service, isPrimary }) => (
  <Link
    to={service.route}
    className={`group p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
      isPrimary
        ? 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
        : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
    } transform hover:-translate-y-1`}
  >
    <div>
      {/* Top Header: Icon + Pricing Box */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform duration-300">
          {serviceIcons[service.slug] ?? <Globe className="w-6 h-6 text-blue-600" />}
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold font-mono">Starting From</span>
          <span className="text-sm sm:text-base font-extrabold text-blue-600">{service.pricing.startingAt}</span>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>

      <p className="text-slate-600 mb-4 leading-relaxed text-xs sm:text-sm">
        {service.shortDescription}
      </p>

      {/* Highlights */}
      <div className="space-y-1.5 mb-5 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock className="h-3 w-3 text-blue-600 flex-shrink-0" />
          <span>Turnaround: <strong className="text-slate-900">{service.delivery}</strong></span>
        </div>
        {service.pricing.recommendedPrice && (
          <div className="flex items-center gap-1.5 text-slate-600">
            <CheckCircle2 className="h-3 w-3 text-emerald-600 flex-shrink-0" />
            <span>Recommended Package: <strong className="text-blue-700">{service.pricing.recommendedPrice}</strong></span>
          </div>
        )}
      </div>
    </div>

    <div className="flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700 transition-colors text-xs sm:text-sm pt-4 border-t border-slate-100">
      <span>View Packages &amp; Specs</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
    </div>
  </Link>
);

const ServicesOverview: React.FC = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rahnoxa Software Engineering & Digital Services',
    provider: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
      logo: `${config.siteUrl}/logo.png`,
    },
    areaServed: 'IN',
    serviceType: [...tier1Services, ...tier2Services].map((s) => s.name),
    description:
      `${config.siteName} provides transparent, affordable software engineering and digital services across India.`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '1499',
      highPrice: '275000',
      offerCount: '14',
      url: `${config.siteUrl}/services`,
    },
  };

  return (
    <>
      <SEO
        title={`Services, Pricing & Specifications – ${config.siteName}`}
        description={`Explore all software development, web applications, mobile apps, ERP systems, and digital services with transparent Indian pricing from ${config.siteName}.`}
        keywords={`${config.siteName} services, web development pricing, mobile apps cost, ERP systems, custom software price india`}
        url={`${config.siteUrl}/services`}
        canonical={`${config.siteUrl}/services`}
        schema={serviceSchema}
      />

      <div className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white font-sans gradient-mesh-light">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-6 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Transparent Commercial Service Catalog
          </span>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-5">
            Software Engineering &amp; Business Services
          </h1>
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Every service engineered for speed, clean architecture, and transparent Indian pricing. No surprise fees, no vendor lock-in.
          </p>

          {/* Quick Pillar Jump Bar */}
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <a href="#core-engineering" className="px-4 py-2 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 hover:text-blue-600 transition-colors shadow-2xs font-medium">
              Software &amp; Engineering (Tier 1)
            </a>
            <a href="#marketing-support" className="px-4 py-2 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 hover:text-blue-600 transition-colors shadow-2xs font-medium">
              Marketing &amp; Growth (Tier 2)
            </a>
            <a href="#rescue-services" className="px-4 py-2 bg-amber-50 border border-amber-200 hover:border-amber-400 rounded-lg text-amber-800 hover:text-amber-900 transition-colors shadow-2xs font-medium">
              Emergency &amp; Rescue Tiers 🚨
            </a>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Tier 1: Software & Engineering ── */}
          <div id="core-engineering" className="mb-20 pt-6">
            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-1">
                  Core Engineering (Tier 1)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Software &amp; Systems Engineering
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1">
                  Full-stack web applications, mobile apps, ERPs, SaaS architectures, and custom API pipelines.
                </p>
              </div>
              <span className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto font-mono">
                Starts from <strong className="text-blue-600 font-bold">₹4,999</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tier1Services.map((service) => (
                <ServiceCard key={service.slug} service={service} isPrimary={true} />
              ))}
            </div>
          </div>

          {/* ── Tier 2: Marketing & Business Support ── */}
          <div id="marketing-support" className="mb-20 pt-6">
            <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest block mb-1">
                  Operations &amp; Growth (Tier 2)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Marketing &amp; Business Growth Services
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1">
                  Google Business Profile local dominance, brand kits, SMS/Voice automation, and lead capture workflows.
                </p>
              </div>
              <span className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto font-mono">
                Starts from <strong className="text-blue-600 font-bold">₹1,999</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tier2Services.map((service) => (
                <ServiceCard key={service.slug} service={service} isPrimary={false} />
              ))}
            </div>
          </div>

          {/* ── Tier 3: Emergency & Rescue Protocol ── */}
          <div id="rescue-services" className="mb-20 pt-6">
            <div className="mb-8 border-b border-slate-200 pb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                Last-Minute Saver &amp; Emergency Rescue
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Emergency Technical Rescue Services
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1">
                When your site crashes, developer disappears, or launch is in 24 hours — Rahnoxa provides fixed-price rapid triage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Emergency Website Crash Fix', price: '₹2,999', sla: '< 4–8 Hours', desc: 'Fatal PHP/JS crashes, 500 errors, database connection repair' },
                { name: 'Broken DNS, Domain & SSL Fix', price: '₹1,499', sla: '< 2–4 Hours', desc: 'SSL certificate errors, DNS record repair, Cloudflare setup' },
                { name: 'Spam / Bouncing Email Fix', price: '₹1,999', sla: '< 2–4 Hours', desc: 'SPF, DKIM, DMARC security setup so emails reach inboxes' },
                { name: 'Hacked Website Cleanup', price: '₹4,999', sla: '< 12 Hours', desc: 'Malware script removal, backdoor cleanup, security hardening' },
              ].map((rescue, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 hover:border-amber-300 rounded-2xl flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono font-bold uppercase">{rescue.sla} SLA</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-2 mb-2">{rescue.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{rescue.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-extrabold text-slate-900">{rescue.price}</span>
                    <Link to="/get-started" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      Request Rescue →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-xl relative overflow-hidden text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Need a Custom Architecture or Fast-Track Scope?
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto mb-8">
              Discuss your project directly with our engineering team or chat with RahBot for instant scoping and quotes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-started"
                className="btn btn-primary px-8 py-3.5 font-bold text-sm sm:text-base"
              >
                Start Project Enquiry
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServicesOverview;
