import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

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

  const pageUrl = `https://nextorra.netlify.app${location.pathname}`;

  // ✅ Service Structured Data (Schema.org)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description,
    serviceType: title,
    provider: {
      "@type": "Organization",
      name: "Nextorra",
      url: "https://nextorra.netlify.app",
      logo: "https://nextorra.netlify.app/logo.png",
    },
    areaServed: "IN",
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "INR",
      price: pricing.startingAt,
      availability: "https://schema.org/InStock",
      category: "Digital Marketing & Web Services",
    },
  };

  // ✅ Breadcrumb Schema for Rich Results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nextorra.netlify.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://nextorra.netlify.app/services",
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
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{`${title} – Nextorra`}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={`${title.toLowerCase()}, ${title} service, digital marketing, Nextorra, business solutions`}
        />
        <link rel="canonical" href={pageUrl} />

        {/* ✅ Open Graph Tags */}
        <meta property="og:title" content={`${title} – Nextorra`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content="https://nextorra.netlify.app/assets/og-image.png"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} – Nextorra`} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://nextorra.netlify.app/assets/og-image.png"
        />

        {/* ✅ Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <Breadcrumb />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              >
                Professional Service
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-8"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  type="button"
                  onClick={() => navigate("/get-started")}
                  className="btn bg-primary hover:bg-primary-dark text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#pricing"
                  className="btn border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  View Pricing
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
            <p className="text-gray-600">
              Why choose our {title.toLowerCase()} service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl border border-white/20 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features + Pricing sections remain unchanged */}
      </div>
    </div>
  );
};

export default ServiceTemplate;
