import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
  canonical?: string;
  schema?: object; // ✅ new prop for dynamic JSON-LD
}

const SEO: React.FC<SEOProps> = ({
  title = "Nextorra – Affordable & Scalable Digital Solutions",
  description = "Nextorra provides AI-driven marketing, web development, and business automation solutions to help startups scale efficiently.",
  keywords = "Nextorra, digital marketing, AI automation, web development, branding, business automation, India marketing agency",
  url = "https://nextorra.netlify.app",
  image = "https://nextorra.netlify.app/og-image.png",
  type = "website",
  canonical = "https://nextorra.netlify.app",
  schema,
}) => {
  // ✅ Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nextorra",
    url: "https://nextorra.netlify.app",
    logo: "https://nextorra.netlify.app/logo.png",
    description:
      "Nextorra is a digital marketing and software development company offering web, AI, and automation services globally.",
    sameAs: [
      "https://www.linkedin.com/company/nextorra",
      "https://www.instagram.com/nextorra",
      "https://www.facebook.com/nextorra",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8434237052",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: "English",
    },
  };

  // ✅ Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nextorra",
    url: "https://nextorra.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nextorra.netlify.app/?s={search_term_string}",
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
      <meta property="og:site_name" content="Nextorra" />
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
};

export default SEO;
