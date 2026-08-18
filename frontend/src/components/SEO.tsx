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
  // ✅ Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.siteName,
    url: config.siteUrl,
    logo: `${config.siteUrl}/logo.png`,
    description:
      `${config.siteName} is a software development and technology engineering company offering web apps, mobile apps, ERP systems, and custom software globally.`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.contact.phone1,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: "English",
    },
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

      {/* ✅ Default Global Schema */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

      {/* ✅ Page-Specific Schema (Service, Course, etc.) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

export default SEOComponent;
