/**
 * RAHNOXA Blog → SEO + Lead Generation Intelligence Engine
 * Maps technology analysis and local business questions to commercial services,
 * context-specific CTAs, and internal authority links.
 */

export const COMMERCIAL_SERVICE_MAP = {
  // Category / Theme to Service & Location CTA Mapping
  EDUCATION: {
    targetService: 'Website Development',
    serviceSlug: '/services/website-design',
    serviceTitle: 'Business Website Development',
    ctaTitle: 'Build Your Admission & Course Website',
    ctaSubtitle: 'Get a lightweight, mobile-friendly admission website with 1-click WhatsApp enquiry starting from ₹2,999.',
    ctaActionText: 'Get Admission Website Quote',
    startingPrice: '₹2,999'
  },
  MANUFACTURING: {
    targetService: 'B2B Industrial Catalogues & ERP',
    serviceSlug: '/services/erp-enterprise-applications',
    serviceTitle: 'Custom B2B Industrial Catalogues',
    ctaTitle: 'Build Your B2B Product Catalogue & RFQ Portal',
    ctaSubtitle: 'Engineered for Adityapur & Gamharia manufacturers to showcase specs, certifications, and RFQ workflows.',
    ctaActionText: 'Request Industrial Portal Scope',
    startingPrice: '₹4,999'
  },
  BUSINESS_TECH: {
    targetService: 'Website Development',
    serviceSlug: '/services/web-app-development',
    serviceTitle: 'High-Converting Business Website',
    ctaTitle: 'Transform Your Business Online',
    ctaSubtitle: 'Fast, modern web solutions with verified local SEO and direct enquiry funnels starting from ₹2,999.',
    ctaActionText: 'Calculate Project Quote',
    startingPrice: '₹2,999'
  },
  SECURITY_AI: {
    targetService: 'Custom Software & Security Architecture',
    serviceSlug: '/services/custom-software-api-integration',
    serviceTitle: 'Custom Software & API Integration',
    ctaTitle: 'Build Secure, High-Performance Software',
    ctaSubtitle: 'Custom backend architectures, secure APIs, and automated enterprise workflows engineered by Rahnoxa.',
    ctaActionText: 'Schedule Engineering Consultation',
    startingPrice: '₹7,500'
  }
};

/**
 * 1. Contextual Commercial CTA Generator
 */
export function generateCommercialCTA({ category, title = '', targetLocation = 'Jamshedpur' }) {
  const textLower = (title + ' ' + category).toLowerCase();

  let mapping = COMMERCIAL_SERVICE_MAP.BUSINESS_TECH;

  if (textLower.includes('coaching') || textLower.includes('school') || textLower.includes('admission') || textLower.includes('education')) {
    mapping = COMMERCIAL_SERVICE_MAP.EDUCATION;
  } else if (textLower.includes('manufactur') || textLower.includes('industry') || textLower.includes('adityapur') || textLower.includes('supplier')) {
    mapping = COMMERCIAL_SERVICE_MAP.MANUFACTURING;
  } else if (
    textLower.includes('security') ||
    textLower.includes('ai') ||
    textLower.includes('erp') ||
    textLower.includes('software') ||
    textLower.includes('cloud') ||
    textLower.includes('isro') ||
    textLower.includes('space') ||
    textLower.includes('science') ||
    textLower.includes('quantum') ||
    textLower.includes('startup') ||
    textLower.includes('deeptech')
  ) {
    mapping = COMMERCIAL_SERVICE_MAP.SECURITY_AI;
  }

  return {
    ...mapping,
    targetLocation,
    htmlCTA: `
<div class="rahnoxa-commercial-cta my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/20 shadow-xl">
  <div class="max-w-2xl">
    <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/20">
      RAHNOXA Commercial Solutions
    </span>
    <h3 class="text-xl sm:text-2xl font-black text-white mt-3">${mapping.ctaTitle}</h3>
    <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">${mapping.ctaSubtitle}</p>
    <div class="mt-5 flex flex-wrap items-center gap-3">
      <a href="${mapping.serviceSlug}?source=blog_cta&location=${encodeURIComponent(targetLocation)}" class="btn btn-primary text-xs font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-md">
        <span>${mapping.ctaActionText} (${mapping.startingPrice})</span>
      </a>
      <a href="https://wa.me/918434237052?text=${encodeURIComponent('Hi Rahul, I was reading your article on ' + title + ' and would like to discuss ' + mapping.serviceTitle + '.')}" target="_blank" rel="noopener noreferrer" class="btn btn-outline text-xs font-bold px-4 py-2.5 rounded-xl text-slate-200 border-slate-700 hover:bg-slate-800 inline-flex items-center gap-2">
        <span>Discuss on WhatsApp</span>
      </a>
    </div>
  </div>
</div>`
  };
}

/**
 * 2. Internal Linking Matrix
 */
export function generateInternalLinks({ category, slug }) {
  const allLinks = [
    { label: 'Website Design & Development', url: '/services/website-design', type: 'service' },
    { label: 'Web Application Development', url: '/services/web-app-development', type: 'service' },
    { label: 'Custom Software & API Integration', url: '/services/custom-software-api-integration', type: 'service' },
    { label: 'ERP & Enterprise Applications', url: '/services/erp-enterprise-applications', type: 'service' },
    { label: 'Portfolio Showcases & Case Studies', url: '/projects', type: 'portfolio' },
    { label: 'Local Development in Jamshedpur & Jharkhand', url: '/services', type: 'location' }
  ];

  // Return contextual top 3 internal links
  return allLinks.filter(l => !l.url.includes(slug)).slice(0, 3);
}
