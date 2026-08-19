import React from "react";
import { Helmet } from "react-helmet-async";
import config from "../config";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  canonical?: string;
  schema?: object; // ✅ dynamic JSON-LD
}

function SEOComponent({
  title = `${config.siteName} – Software Development & Technology Engineering`,
  description = `${config.siteName} builds custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses.`,
  keywords = `${config.siteName}, software development, web applications, mobile apps, custom ERP, SaaS engineering, enterprise software, API integration, software company`,
  url = config.siteUrl,
  image = `${config.siteUrl}/og-image.png`,
  type = "website",
  canonical = config.siteUrl,
  schema,
}: SEOProps) {
  // ✅ Base Organization & LocalBusiness Schema for Jharkhand Ranking
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: config.siteName,
    alternateName: "Rahnoxa Software & Digital Solutions",
    url: config.siteUrl,
    logo: `${config.siteUrl}/logo.png`,
    image: `${config.siteUrl}/og-image.png`,
    description:
      "Top-rated Software Development, Custom Web & Mobile Apps, Enterprise ERP, and Digital Solutions Company serving Jamshedpur, Ranchi, and across Jharkhand, India.",
    priceRange: "₹₹",
    telephone: config.contact.phone1,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jamshedpur",
      addressRegion: "Jharkhand",
      addressCountry: "IN",
      postalCode: "831001",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.8046,
      longitude: 86.2029,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Jamshedpur",
      },
      {
        "@type": "City",
        name: "Ranchi",
      },
      {
        "@type": "City",
        name: "Dhanbad",
      },
      {
        "@type": "City",
        name: "Bokaro Steel City",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jharkhand",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://github.com/KUmarRahul001/Nextorra",
      "https://rahnoxa.pages.dev",
      "https://rahnoxa.netlify.app",
    ],
  };

  // ✅ Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    url: config.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${config.siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph & Twitter */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={config.siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ✅ Default Global LocalBusiness Schema */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

      {/* ✅ Page-Specific Schema (Service, Course, etc.) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

export default SEOComponent;
