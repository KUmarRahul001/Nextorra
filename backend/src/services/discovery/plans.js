/**
 * RAHNOXA Authoritative Service Plans & Commercial Rules
 * Commercial Guardrail: Complete websites must NEVER be quoted below ₹5,000.
 */

export const RAHNOXA_PLANS = {
  PLAN_A: {
    id: 'PLAN_A',
    name: 'PLAN A — High-Converting Landing Page',
    category: 'Landing Page',
    basePrice: 2000,
    minPrice: 1500,
    recPrice: 2500,
    deliveryDays: 3,
    suitableFor: ['Coaching', 'Salons', 'Gyms', 'Events', 'Freelancers', 'Campaigns'],
    features: [
      'One-page high-converting modern design',
      'Hero section & Business information',
      'Services & Course/Price list',
      'Visual gallery & reviews showcase',
      'Direct 1-Click WhatsApp consultation button',
      'Direct Click-to-Call integration',
      'Instant Lead Enquiry Form',
      'Interactive Google Maps embed',
      '100% Mobile & Tablet responsive',
      'Fast loading speed & Essential On-Page SEO'
    ]
  },
  PLAN_B: {
    id: 'PLAN_B',
    name: 'PLAN B — Starter Business Website',
    category: 'Business Website',
    basePrice: 5000,
    minPrice: 5000, // HARD FLOOR: Minimum website price ₹5,000
    recPrice: 6000,
    deliveryDays: 5,
    suitableFor: ['Local businesses', 'Shops', 'Coaching centres', 'Salons', 'Gyms', 'Restaurants', 'Clinics', 'Consultants'],
    features: [
      'Complete 3 to 5-page responsive business website',
      'Custom professional design & layout',
      'Dedicated Services / Menu / Course catalog',
      'Client portfolio & photo gallery',
      'Contact section & Instant enquiry form',
      'Direct WhatsApp chat & Call action buttons',
      'Google Maps & Social media integration',
      'Speed optimization & Local SEO metadata setup',
      'Mobile-first responsive architecture'
    ]
  },
  PLAN_C: {
    id: 'PLAN_C',
    name: 'PLAN C — Professional Business Website',
    category: 'Business Website',
    basePrice: 7500,
    minPrice: 7500,
    recPrice: 9000,
    deliveryDays: 7,
    suitableFor: ['Growing enterprises', 'Schools', 'Hospitals', 'Industrial suppliers', 'B2B firms', 'Real Estate'],
    features: [
      'Multi-page premium corporate architecture',
      'Custom UI/UX with modern animations',
      'Dedicated individual service landing pages',
      'Advanced multi-step quotation & booking forms',
      'Automated email notifications & WhatsApp routing',
      'Full Local SEO schema & Google Rich Snippets setup',
      'Google Analytics & Search Console integration',
      'Sub-second page load performance'
    ]
  },
  PLAN_D: {
    id: 'PLAN_D',
    name: 'PLAN D — Business + Local Presence & SEO Suite',
    category: 'Digital Presence',
    basePrice: 8000,
    minPrice: 8000,
    recPrice: 10000,
    deliveryDays: 8,
    suitableFor: ['Competitive local businesses', 'Dental clinics', 'Packers & Movers', 'Legal & Tax firms'],
    features: [
      'Everything in Professional Business Website',
      'Google Business Profile (GBP) audit & optimization guidance',
      'Local citation & geo-targeted keyword strategy',
      'Review generation funnels & trust badges',
      'Conversion tracking & monthly performance visibility'
    ]
  },
  PLAN_E: {
    id: 'PLAN_E',
    name: 'PLAN E — E-Commerce & Online Store',
    category: 'E-Commerce',
    basePrice: 12000,
    minPrice: 12000,
    recPrice: 15000,
    deliveryDays: 12,
    suitableFor: ['Retailers', 'Boutiques', 'Wholesalers', 'Direct-to-Consumer brands'],
    features: [
      'Full product catalog & dynamic inventory management',
      'Payment gateway integration (Razorpay / UPI / Cards)',
      'Shopping cart & secure checkout flow',
      'Customer accounts & order tracking',
      'Admin dashboard for products, orders & discount coupons',
      'Automated order confirmation alerts via WhatsApp/Email'
    ]
  },
  PLAN_F: {
    id: 'PLAN_F',
    name: 'PLAN F — Custom Web Application & Client Portal',
    category: 'Custom Web Application',
    basePrice: 15000,
    minPrice: 15000,
    recPrice: 20000,
    deliveryDays: 15,
    suitableFor: ['Service agencies', 'Logistics', 'Education portals', 'SaaS startups'],
    features: [
      'Custom React/Node.js architecture & Supabase backend',
      'Role-based access control (Admin, Staff, Customer)',
      'Custom workflows, CRM, appointment scheduling & booking systems',
      'Interactive dashboards & real-time analytics',
      'Exportable reporting (Excel/PDF) & 3rd-party API integrations'
    ]
  },
  PLAN_G: {
    id: 'PLAN_G',
    name: 'PLAN G — Custom Enterprise Software / ERP',
    category: 'Enterprise ERP',
    basePrice: null, // Requirement-based custom quotation
    minPrice: 25000,
    recPrice: null,
    deliveryDays: 30,
    suitableFor: ['Manufacturers', 'Steel & Metallurgy units', 'Large distributors', 'Hospital chains'],
    features: [
      'Requirement analysis & technical architecture blueprint',
      'Custom ERP modules: Inventory, Production, Billing, Payroll, Dispatch',
      'High-throughput database architecture & role-based permissions',
      'Audit logging, compliance & dedicated SLA support'
    ]
  },
  PLAN_H: {
    id: 'PLAN_H',
    name: 'PLAN H — Mobile Application (Android / iOS)',
    category: 'Mobile Application',
    basePrice: null, // Requirement-based custom quotation
    minPrice: 20000,
    recPrice: null,
    deliveryDays: 25,
    suitableFor: ['Startups', 'On-demand services', 'Fintech', 'Community apps'],
    features: [
      'Cross-platform React Native / Flutter engine',
      'Push notifications & biometric authentication',
      'Offline caching & native device feature integration'
    ]
  },
  PLAN_I: {
    id: 'PLAN_I',
    name: 'PLAN I — UI/UX & Brand Identity Package',
    category: 'Branding & Design',
    basePrice: 2500,
    minPrice: 1000,
    recPrice: 4000,
    deliveryDays: 4,
    suitableFor: ['New businesses', 'Rebranding campaigns', 'Social media marketing'],
    features: [
      'Vector logo design & typography guidelines',
      'Social media branding banners & profile kits',
      'Business card & stationery templates',
      'High-resolution source files (Figma, PNG, SVG)'
    ]
  }
};

/**
 * Commercial Guardrail Validator
 */
export function validateCommercialQuote({ serviceType, requestedPrice, isWebsite = false }) {
  const price = Number(requestedPrice) || 0;
  
  // Rule: Complete business website must NEVER be quoted below ₹5,000
  if (isWebsite || serviceType?.toLowerCase().includes('website')) {
    if (price < 5000) {
      return {
        allowed: false,
        adjustedPrice: 5000,
        reason: 'Commercial Rule: Complete business websites must not be quoted below ₹5,000.'
      };
    }
  }

  return {
    allowed: true,
    adjustedPrice: price,
    reason: 'Price adheres to commercial plan standards.'
  };
}
