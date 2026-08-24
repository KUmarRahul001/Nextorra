/**
 * RAHNOXA Opportunity & Scoring Engine
 */

export function evaluateOpportunity({
  category,
  city,
  websiteUrl,
  websiteStatus = 'WEBSITE_UNKNOWN', // 'WEBSITE_FOUND', 'NO_WEBSITE_CONFIRMED', 'WEBSITE_UNKNOWN', 'WEBSITE_UNVERIFIED', 'WEBSITE_INACCESSIBLE'
  auditFindings = {},
  hasPhone = false,
  hasWhatsApp = false
}) {
  let score = 30; // Baseline
  const reasons = [];
  let opportunityClass = 'UNVERIFIED';
  let scoreConfidence = 'MEDIUM';
  let recommendedOffer = 'Business Website';
  let recommendedPrice = 2999.00;

  // 1. Geographic Fit (+15)
  const targetGeos = ['Jamshedpur', 'Adityapur', 'Gamharia', 'Ranchi', 'Bokaro', 'Dhanbad', 'Kolkata'];
  if (targetGeos.some(g => city.toLowerCase().includes(g.toLowerCase()))) {
    score += 15;
    reasons.push(`+ Priority market: ${city}`);
  }

  // 2. Website Opportunity Evaluation (Honest States)
  if (websiteStatus === 'NO_WEBSITE_CONFIRMED') {
    score += 25;
    opportunityClass = 'NO_WEBSITE';
    scoreConfidence = 'HIGH';
    reasons.push('+ Publicly confirmed absence of official website');
  } else if (websiteStatus === 'WEBSITE_FOUND') {
    if (auditFindings.hasBrokenLinks || !auditFindings.hasHttps || !auditFindings.hasWhatsAppCta) {
      score += 15;
      opportunityClass = 'WEAK_WEBSITE';
      scoreConfidence = 'HIGH';
      reasons.push('+ Observable website weaknesses detected');
    } else {
      opportunityClass = 'GOOD_WEBSITE';
      scoreConfidence = 'HIGH';
      reasons.push('+ Verified modern website with active CTAs');
    }
  } else if (websiteStatus === 'WEBSITE_INACCESSIBLE') {
    score += 15;
    opportunityClass = 'REDESIGN_OPPORTUNITY';
    scoreConfidence = 'MEDIUM';
    reasons.push('+ Identified website is currently inaccessible or broken');
  } else {
    // WEBSITE_UNKNOWN or WEBSITE_UNVERIFIED: Zero speculative bonus
    opportunityClass = 'UNVERIFIED';
    scoreConfidence = 'LOW';
    reasons.push('⚠️ Website status unknown / insufficient public evidence');
  }

  // 3. Category to Offer Mapping
  const catLower = (category || '').toLowerCase();
  if (catLower.includes('coaching') || catLower.includes('institute') || catLower.includes('school')) {
    score += 15;
    reasons.push('+ High-conversion Education / Admission niche');
    recommendedOffer = 'Admission & Course Catalog Website (Plan B)';
    recommendedPrice = 5000.00; // Enforced ₹5,000 floor
  } else if (catLower.includes('manufactur') || catLower.includes('industry') || catLower.includes('fabricat') || catLower.includes('engineering')) {
    score += 15;
    reasons.push('+ B2B Industrial / ASIA supplier sector');
    recommendedOffer = 'B2B Product Catalogue & Corporate Website (Plan C)';
    recommendedPrice = 7500.00;
  } else if (catLower.includes('gym') || catLower.includes('salon') || catLower.includes('clinic') || catLower.includes('restaurant')) {
    score += 10;
    reasons.push('+ Local service business with direct booking need');
    recommendedOffer = 'Local Business Responsive Website (Plan B)';
    recommendedPrice = 5000.00; // Enforced ₹5,000 floor
  } else {
    recommendedOffer = 'Starter Business Website (Plan B)';
    recommendedPrice = 5000.00; // Enforced ₹5,000 floor
  }

  // 4. Contact Channel Bonus (+10)
  if (hasPhone || hasWhatsApp) {
    score += 10;
    reasons.push('+ Direct contact route available');
  }

  // Cap Score
  score = Math.min(Math.max(score, 10), 100);

  // Temperature Classification
  let temperature = 'WARM';
  if (score >= 75) temperature = 'HOT';
  else if (score < 45) temperature = 'LOW';

  return {
    score,
    scoreConfidence,
    temperature,
    opportunityClass,
    recommendedOffer,
    recommendedPrice: Math.max(recommendedPrice, 5000.00),
    scoreReasons: reasons
  };
}

export function generateDraftOutreach({
  businessName,
  city,
  category,
  opportunityClass,
  websiteStatus = 'WEBSITE_UNKNOWN',
  recommendedOffer,
  recommendedPrice,
  templateType = 'PROBLEM_FIRST'
}) {
  const price = Math.max(Number(recommendedPrice) || 5000, 5000);

  if (websiteStatus === 'NO_WEBSITE_CONFIRMED' || websiteStatus === 'WEBSITE_UNKNOWN') {
    return `Hello ${businessName},

We came across your business while researching ${category || 'local'} services in ${city}.

Your business has an active profile, but we could not find an official website for customers to explore your services, photos, and connect via WhatsApp.

A modern, fast website helps you:
• Explain your services clearly
• Receive instant 1-click WhatsApp enquiries
• Build customer trust & show location on Google Maps

RAHNOXA can create a mobile-friendly business website for you starting from ₹${price} (Starter Business Plan).

Price is negotiable depending on requirements and scope. We can also show you a free sample/mockup before you decide.

Would you like to see a quick sample?

Rahul Kumar | RAHNOXA
Software & Digital Solutions`;
  }
  
  if (websiteStatus === 'WEBSITE_FOUND') {
    return `Hello ${businessName},

We reviewed your official website while researching ${category || 'businesses'} in ${city}.

We noticed positive points in your business profile, along with opportunities to improve mobile loading speed and 1-click WhatsApp contact buttons for nearby clients.

RAHNOXA builds fast, high-converting business websites starting from ₹${price} (negotiable depending on scope).

Would you be open to seeing a free 2-minute visual mockup of the proposed improvements?

Rahul Kumar | RAHNOXA`;
  }

  return `Hello ${businessName}, we specialize in building modern, high-converting business websites and WhatsApp lead funnels for ${category || 'enterprises'} in ${city} starting from ₹${price} (negotiable based on scope). Would you like to see a free sample? - Rahul (RAHNOXA)`;
}
