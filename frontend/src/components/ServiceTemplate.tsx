import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";
import config from "../config";

interface ServiceTemplateProps {
  title: string;
  description: string;
  benefits: string[];
  features: Array<{ title: string; description: string }>;
  pricing: {
    startingAt: string;
    packages?: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
  };
  image: string;
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  description,
  benefits,
  features,
  pricing,
  image,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageUrl = `${config.siteUrl}${location.pathname}`;

  // ✅ Schema: Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    serviceType: title,
    provider: {
      "@type": "Organization",
      name: config.siteName,
      url: config.siteUrl,
      logo: `${config.siteUrl}/logo.png`,
    },
    areaServed: "IN",
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "INR",
      price: pricing.startingAt,
      availability: "https://schema.org/InStock",
      category: "Software Development & Technology Engineering",
    },
  };

  // ✅ Schema: Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${config.siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${config.siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{`${title} – ${config.siteName}`}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={`${title.toLowerCase()}, ${title} service, ${config.siteName}, custom software, web development, enterprise engineering, tech solutions`}
        />
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={`${title} – ${config.siteName}`} />
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
          className="py-12 md:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-6"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Professional Engineering Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-normal"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => navigate("/get-started")}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/25 border border-blue-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#pricing"
                  className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl font-semibold border border-slate-700/80 transition-all"
                >
                  View Pricing Packages
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
          className="py-16 border-t border-slate-800/80"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Key Value &amp; Strategic Benefits
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Why leading organizations partner with Rahnoxa for {title.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="text-slate-200 font-medium leading-snug pt-1">{benefit}</p>
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
          className="py-16 my-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 block">
              Deliverables &amp; Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Engineered with clean architecture, enterprise security, and modern maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ✅ Pricing Section */}
        {pricing.packages && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="pricing"
            className="py-16 border-t border-slate-800/80"
          >
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                Transparent Engagement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Pricing &amp; Engagement Plans
              </h2>
              <p className="text-slate-400 text-base sm:text-lg">
                Choose the scope and support model that matches your product milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {pricing.packages.map((pkg, index) => {
                const isFeatured = index === 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                      isFeatured
                        ? "bg-gradient-to-b from-blue-950/80 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2"
                        : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider border border-blue-400/30 shadow-md">
                        Recommended
                      </div>
                    )}

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">{pkg.price}</span>
                        <span className="text-xs text-slate-400">/ project estimate</span>
                      </div>

                      <div className="h-px w-full bg-slate-800 mb-6"></div>

                      <ul className="space-y-3.5 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <Check className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/get-started")}
                      className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
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
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ServiceTemplate;
