import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight as ArrowRight,
  FiCheck as Check,
  FiStar as Star,
  FiZap as Zap,
  FiClock as Clock,
  FiAlertCircle as AlertCircle,
  FiHelpCircle as HelpCircle,
  FiShield as ShieldCheck,
} from 'react-icons/fi';
import { HiSparkles as Sparkles } from 'react-icons/hi2';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from './Breadcrumb';
import config from '../config';

interface ServicePackage {
  name: string;
  price: string;
  amount?: number;
  delivery?: string;
  recommended?: boolean;
  features: string[];
}

interface ServicePricingData {
  startingAt: string;
  recommendedPrice?: string;
  packages?: ServicePackage[];
  fastPrice?: string;
  expressPrice?: string;
  emergencyPrice?: string;
  monthlyRetainer?: string;
  gstNote?: string;
  thirdPartyNote?: string;
}

interface ServiceTemplateProps {
  title: string;
  description: string;
  delivery?: string;
  targetCustomer?: string;
  benefits: string[];
  features: Array<{ title: string; description: string }>;
  included?: string[];
  excluded?: string[];
  revisions?: string;
  warranty?: string;
  thirdPartyCosts?: string[];
  pricing: ServicePricingData;
  image: string;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  description,
  delivery,
  targetCustomer,
  benefits,
  features,
  included,
  excluded,
  revisions,
  warranty,
  thirdPartyCosts,
  pricing,
  image,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageUrl = `${config.siteUrl}${location.pathname}`;

  // Clean numeric amount for structured schema
  const cleanPrice = pricing.startingAt.replace(/[^0-9]/g, '') || '4999';

  // ✅ Schema: Service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    serviceType: title,
    provider: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
      logo: `${config.siteUrl}/logo.png`,
    },
    areaServed: 'IN',
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'INR',
      price: cleanPrice,
      availability: 'https://schema.org/InStock',
      category: 'Software Development & Technology Engineering',
    },
  };

  // ✅ Schema: Breadcrumb
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${config.siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${config.siteUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAFCFF] text-slate-900 selection:bg-blue-600 selection:text-white font-sans gradient-mesh-light">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{`${title} – ${config.siteName}`}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={`${title.toLowerCase()}, ${title} service, ${config.siteName}, custom software, web development, enterprise engineering, tech solutions, affordable pricing india`}
        />
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={`${title} – Starting ${pricing.startingAt} | ${config.siteName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${config.siteUrl}/assets/og-image.png`} />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} – ${config.siteName}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${config.siteUrl}/assets/og-image.png`} />

        {/* ✅ JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-10 md:py-16 border-b border-slate-200/80"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-5 shadow-2xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Professional Engineering Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed font-normal"
              >
                {description}
              </motion.p>

              {/* Transparent Highlight Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Starting From</p>
                  <p className="text-xl font-extrabold text-blue-600">{pricing.startingAt}</p>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Turnaround</p>
                  <p className="text-sm font-bold text-slate-800">{delivery || '3–7 Days'}</p>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl col-span-2 sm:col-span-1 shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Warranty</p>
                  <p className="text-sm font-bold text-emerald-600">{warranty || '30-Day Bug Warranty'}</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-3.5"
              >
                <button
                  type="button"
                  onClick={() => navigate("/get-started")}
                  className="btn btn-primary px-7 py-3.5 text-sm font-bold rounded-xl shadow-md"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#pricing"
                  className="btn btn-outline px-6 py-3.5 text-sm font-semibold rounded-xl"
                >
                  View Packages &amp; Pricing
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-5 relative group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white aspect-video lg:aspect-4/3">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ✅ Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 border-b border-slate-200/80"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Key Strategic Advantages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Why Indian businesses choose Rahnoxa for {title.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ✅ Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 my-8 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest mb-2 block">
              Technical Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Comprehensive Feature Set
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Engineered with clean architecture, enterprise security, and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ✅ Scope Inclusions & Exclusions Transparency */}
        {(included || excluded || thirdPartyCosts) && (
          <section className="py-14 border-t border-slate-200/80">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest mb-2 block">
                No Surprise Bill Policy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Scope Clarity &amp; Transparency
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                We believe in 100% transparent agreements with zero hidden renewal traps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Inclusions */}
              {included && (
                <div className="p-6 bg-white border border-emerald-200 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold text-sm">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Always Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exclusions */}
              {excluded && (
                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 mb-4 text-slate-600 font-bold text-sm">
                    <AlertCircle className="h-4 w-4 text-slate-400" />
                    <span>Excluded (Optional Add-ons)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Third Party Costs */}
              {thirdPartyCosts && (
                <div className="p-6 bg-white border border-blue-200 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-sm">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                    <span>Direct Third-Party Costs</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {thirdPartyCosts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ✅ Pricing Section */}
        {pricing.packages && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="pricing"
            className="py-16 border-t border-slate-200/80"
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest mb-2 block">
                Transparent Engagement
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                Pricing &amp; Package Options
              </h2>
              <p className="text-slate-600 text-xs sm:text-base">
                Choose the scope and turnaround model that matches your business requirement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
              {pricing.packages.map((pkg, index) => {
                const isFeatured = pkg.recommended || index === 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                      isFeatured
                        ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 lg:-translate-y-2"
                        : "bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Recommended
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                      {pkg.delivery && (
                        <p className="text-xs text-blue-600 font-semibold mb-4 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Turnaround: {pkg.delivery}</span>
                        </p>
                      )}
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{pkg.price}</span>
                        <span className="text-xs text-slate-500">/ project estimate</span>
                      </div>

                      <div className="h-px w-full bg-slate-100 mb-6"></div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/get-started")}
                      className={`w-full py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                        isFeatured
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      <span>Choose Plan</span>
                      <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Speed & Emergency Multiplier Notes */}
            {(pricing.fastPrice || pricing.expressPrice || pricing.emergencyPrice || pricing.monthlyRetainer) && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-xs">
                {pricing.fastPrice && (
                  <div>
                    <span className="text-slate-500 block font-semibold">Priority Delivery:</span>
                    <span className="text-slate-900 font-bold">{pricing.fastPrice}</span>
                  </div>
                )}
                {pricing.expressPrice && (
                  <div>
                    <span className="text-slate-500 block font-semibold">Express 24–48h:</span>
                    <span className="text-blue-600 font-bold">{pricing.expressPrice}</span>
                  </div>
                )}
                {pricing.emergencyPrice && (
                  <div>
                    <span className="text-slate-500 block font-semibold">Emergency Rescue:</span>
                    <span className="text-amber-600 font-bold">{pricing.emergencyPrice}</span>
                  </div>
                )}
                {pricing.monthlyRetainer && (
                  <div>
                    <span className="text-slate-500 block font-semibold">Monthly Care Plan:</span>
                    <span className="text-emerald-600 font-bold">{pricing.monthlyRetainer}</span>
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-6 text-[11px] text-slate-500">
              <p>{pricing.gstNote || 'All prices exclude 18% GST where applicable.'} {pricing.thirdPartyNote || 'Domain & third-party subscriptions are owned directly by the client.'}</p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ServiceTemplate;
