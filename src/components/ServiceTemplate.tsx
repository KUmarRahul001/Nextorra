import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Star,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
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
    <div className="min-h-screen pt-28 pb-20 bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans">
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
          className="py-10 md:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-5"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Professional Engineering Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed font-normal"
              >
                {description}
              </motion.p>

              {/* Transparent Highlight Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Starting From</p>
                  <p className="text-lg font-black text-cyan-300">{pricing.startingAt}</p>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Turnaround</p>
                  <p className="text-sm font-bold text-slate-200">{delivery || '3–7 Days'}</p>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Warranty</p>
                  <p className="text-sm font-bold text-emerald-400">{warranty || '30-Day Bug Warranty'}</p>
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
                  className="px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 group text-sm sm:text-base"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#pricing"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl font-semibold border border-slate-700/80 transition-all text-sm sm:text-base"
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
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 shadow-2xl bg-slate-900 aspect-video lg:aspect-4/3">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
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
          className="py-14 border-t border-slate-800/80"
        >
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Key Strategic Advantages
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
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
                className="bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <p className="text-slate-200 font-medium text-xs sm:text-sm leading-relaxed">{benefit}</p>
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
          className="py-12 sm:py-16 my-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 sm:p-10 backdrop-blur-xl"
        >
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 block">
              Technical Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Comprehensive Feature Set
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
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
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-md"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
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
          <section className="py-12 border-t border-slate-800/80">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                No Surprise Bill Policy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Scope Clarity &amp; Transparency
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                We believe in 100% transparent agreements with zero hidden renewal traps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Inclusions */}
              {included && (
                <div className="p-6 bg-slate-900/60 border border-emerald-500/30 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm">
                    <Check className="h-4 w-4" />
                    <span>Always Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exclusions */}
              {excluded && (
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Excluded (Optional Add-ons)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-400">
                    {excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-500">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Third Party Costs */}
              {thirdPartyCosts && (
                <div className="p-6 bg-slate-900/60 border border-cyan-500/30 rounded-2xl">
                  <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold text-sm">
                    <HelpCircle className="h-4 w-4" />
                    <span>Direct Third-Party Costs</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {thirdPartyCosts.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">→</span>
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
            className="py-14 sm:py-16 border-t border-slate-800/80"
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                Transparent Engagement
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Pricing &amp; Package Options
              </h2>
              <p className="text-slate-400 text-xs sm:text-base">
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
                        ? "bg-gradient-to-b from-blue-950/90 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2"
                        : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider border border-blue-400/30 shadow-md">
                        Recommended
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{pkg.name}</h3>
                      {pkg.delivery && (
                        <p className="text-xs text-cyan-400 font-semibold mb-4 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Turnaround: {pkg.delivery}</span>
                        </p>
                      )}
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">{pkg.price}</span>
                        <span className="text-xs text-slate-400">/ project estimate</span>
                      </div>

                      <div className="h-px w-full bg-slate-800 mb-6"></div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <Check className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
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
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700"
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
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {pricing.fastPrice && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Priority Delivery:</span>
                    <span className="text-white font-bold">{pricing.fastPrice}</span>
                  </div>
                )}
                {pricing.expressPrice && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Express 24–48h:</span>
                    <span className="text-cyan-300 font-bold">{pricing.expressPrice}</span>
                  </div>
                )}
                {pricing.emergencyPrice && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Emergency Rescue:</span>
                    <span className="text-yellow-400 font-bold">{pricing.emergencyPrice}</span>
                  </div>
                )}
                {pricing.monthlyRetainer && (
                  <div>
                    <span className="text-slate-400 block font-semibold">Monthly Care Plan:</span>
                    <span className="text-emerald-400 font-bold">{pricing.monthlyRetainer}</span>
                  </div>
                )}
              </div>
            )}

            <div className="text-center mt-6 text-[11px] text-slate-400">
              <p>{pricing.gstNote || 'All prices exclude 18% GST where applicable.'} {pricing.thirdPartyNote || 'Domain & third-party subscriptions are owned directly by the client.'}</p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ServiceTemplate;
