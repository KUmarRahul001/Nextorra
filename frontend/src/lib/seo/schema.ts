/**
 * src/lib/seo/schema.ts
 * Production-grade Schema.org JSON-LD generators for Google Knowledge Graph,
 * Google Maps, LocalBusiness, Organization, and Rich Snippets.
 * Modeled after the high-ranking Nobi Kumar Author/Entity SEO framework.
 */

export const RAHNOXA_ENTITY = {
  name: 'Rahnoxa',
  legalName: 'Rahnoxa Technologies',
  alternateName: ['Rahnoxa Tech', 'Rahnoxa Software', 'Rahnoxa Solutions'],
  foundingDate: '2025-01-01',
  founder: {
    '@type': 'Person',
    name: 'Rahul Kumar',
    alternateName: 'Nobi Kumar',
    jobTitle: 'Founder & Chief Technology Officer',
    url: 'https://nobikumar.netlify.app',
    sameAs: [
      'https://instagram.com/itzz.me.nobi',
      'https://github.com/KUmarRahul001',
    ],
  },
  url: 'https://rahnoxa.rahnoxa-tech.workers.dev',
  logo: 'https://rahnoxa.rahnoxa-tech.workers.dev/brand/logo-symbol-transparent.png',
  image: 'https://rahnoxa.rahnoxa-tech.workers.dev/og-image.png',
  description:
    'Rahnoxa is a premier software engineering, enterprise ERP architecture, custom web application, mobile app development, and AI technology solutions company.',
  email: 'contact.rahnoxa@protonmail.com',
  telephone: '+918434237052',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jamshedpur',
    addressRegion: 'Jharkhand',
    addressCountry: 'IN',
    postalCode: '831001',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.8046,
    longitude: 86.2029,
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'AdministrativeArea', name: 'Jharkhand' },
    { '@type': 'AdministrativeArea', name: 'Bihar' },
    { '@type': 'AdministrativeArea', name: 'West Bengal' },
    { '@type': 'AdministrativeArea', name: 'Pan-India' },
    { '@type': 'AdministrativeArea', name: 'Worldwide' },
  ],
  sameAs: [
    'https://github.com/KUmarRahul001/Nextorra',
    'https://rahnoxa.antideploy.com',
    'https://rahnoxa.rahnoxa-tech.workers.dev',
    'https://rahnoxa.pages.dev',
  ],
  knowsAbout: [
    'Software Development',
    'Enterprise ERP Systems',
    'Full Stack Web Applications',
    'Mobile Application Development',
    'Custom Software & API Integration',
    'SaaS Engineering',
    'AI & Automation Systems',
    'Digital Growth & Tech Consulting',
  ],
};

export function getOrganizationSchema(baseUrl: string = RAHNOXA_ENTITY.url) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${baseUrl}/#organization`,
    name: RAHNOXA_ENTITY.name,
    legalName: RAHNOXA_ENTITY.legalName,
    alternateName: RAHNOXA_ENTITY.alternateName,
    url: baseUrl,
    logo: `${baseUrl}/brand/logo-symbol-transparent.png`,
    image: `${baseUrl}/og-image.png`,
    description: RAHNOXA_ENTITY.description,
    founder: RAHNOXA_ENTITY.founder,
    foundingDate: RAHNOXA_ENTITY.foundingDate,
    email: RAHNOXA_ENTITY.email,
    telephone: RAHNOXA_ENTITY.telephone,
    priceRange: RAHNOXA_ENTITY.priceRange,
    address: RAHNOXA_ENTITY.address,
    geo: RAHNOXA_ENTITY.geo,
    areaServed: RAHNOXA_ENTITY.areaServed,
    sameAs: RAHNOXA_ENTITY.sameAs,
    knowsAbout: RAHNOXA_ENTITY.knowsAbout,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: RAHNOXA_ENTITY.telephone,
      contactType: 'customer service',
      email: RAHNOXA_ENTITY.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function getWebSiteSchema(baseUrl: string = RAHNOXA_ENTITY.url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Rahnoxa – Software Development & Technology Engineering',
    alternateName: 'Rahnoxa Tech',
    url: baseUrl,
    description: RAHNOXA_ENTITY.description,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function getServiceSchema(service: {
  name: string;
  slug: string;
  description: string;
  category?: string;
  baseUrl?: string;
}) {
  const base = service.baseUrl || RAHNOXA_ENTITY.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${base}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.category || 'Software Engineering',
    provider: {
      '@id': `${base}/#organization`,
    },
    url: `${base}/services/${service.slug}`,
    description: service.description,
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  updatedAt?: string;
  baseUrl?: string;
}) {
  const base = article.baseUrl || RAHNOXA_ENTITY.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${base}/blog/${article.slug}#article`,
    headline: article.title,
    url: `${base}/blog/${article.slug}`,
    image: article.coverImage ? [article.coverImage] : [`${base}/og-image.png`],
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Rahul Kumar',
      url: 'https://nobikumar.netlify.app',
    },
    publisher: {
      '@type': 'Organization',
      name: RAHNOXA_ENTITY.name,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/brand/logo-symbol-transparent.png`,
      },
    },
  };
}
