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
    recommendedOffer = 'Admission & Course Catalog Website';
    recommendedPrice = 2999.00;
  } else if (catLower.includes('manufactur') || catLower.includes('industry') || catLower.includes('fabricat') || catLower.includes('engineering')) {
    score += 15;
    reasons.push('+ B2B Industrial / ASIA supplier sector');
    recommendedOffer = 'B2B Product Catalogue & RFQ Profile';
    recommendedPrice = 4999.00;
  } else if (catLower.includes('gym') || catLower.includes('salon') || catLower.includes('clinic') || catLower.includes('restaurant')) {
    score += 10;
    reasons.push('+ Local service business with direct booking need');
    recommendedOffer = 'Local Business Responsive Website';
    recommendedPrice = 2999.00;
  } else {
    recommendedOffer = 'Custom Business Web Solution';
    recommendedPrice = 2999.00;
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
  else if (score < 45) temperature = 'COLD';

  return {
    score,
    scoreConfidence,
    temperature,
    opportunityClass,
    recommendedOffer,
    recommendedPrice,
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
  if (websiteStatus === 'NO_WEBSITE_CONFIRMED') {
    return `Namaste! I noticed that ${businessName} is active in ${city}, but customers cannot find a dedicated official website to view your courses/services and direct WhatsApp contact. I build modern, lightweight business websites starting at ₹${recommendedPrice} with direct WhatsApp integration. Would you like me to share a 2-minute live preview tonight? - Rahul (Rahnoxa Engineering)`;
  }
  
  if (websiteStatus === 'WEBSITE_FOUND' && opportunityClass === 'WEAK_WEBSITE') {
    return `Namaste! I came across ${businessName}'s website and noticed a few key mobile and WhatsApp conversion improvements that could help increase customer inquiries in ${city}. I build lightweight responsive web solutions starting at ₹${recommendedPrice}. Would you be open to a quick 2-minute preview? - Rahul (Rahnoxa)`;
  }

  // Fallback for WEBSITE_UNKNOWN / UNVERIFIED: Neutral digital introduction
  return `Namaste! I specialize in modernizing business websites and building high-conversion digital catalogues for ${category || 'local businesses'} in ${city}. I would love to share a quick preview of how we can enhance online inquiries for ${businessName} starting from ₹${recommendedPrice}. - Rahul (Rahnoxa)`;
}
