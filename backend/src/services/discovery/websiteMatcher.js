/**
 * RAHNOXA Candidate Website Matching & Identity Verification
 * Calculates evidence-backed matchScore to verify whether a candidate website is official.
 */
import { normalizeBusinessName, extractCanonicalDomain, normalizeCity } from './normalizer.js';

export function evaluateWebsiteCandidate({
  businessName,
  city,
  candidateUrl,
  candidateHtml = '',
  phone = null
}) {
  if (!candidateUrl) {
    return {
      matchScore: 0,
      confidence: 'UNKNOWN',
      confidenceReasons: ['No candidate URL provided']
    };
  }

  let matchScore = 0;
  const reasons = [];
  const normName = normalizeBusinessName(businessName).toLowerCase();
  const normCity = normalizeCity(city).toLowerCase();
  const domain = extractCanonicalDomain(candidateUrl);
  const htmlLower = candidateHtml.toLowerCase();

  // 1. Domain Name Match (+40 pts)
  const cleanNameSlug = normName.replace(/[^a-z0-9]/g, '');
  if (domain.includes(cleanNameSlug) || cleanNameSlug.includes(domain.split('.')[0])) {
    matchScore += 40;
    reasons.push('+ Domain name matches business brand');
  }

  // 2. HTML Text / Title / Body Name Match (+30 pts)
  if (candidateHtml) {
    if (htmlLower.includes(normName)) {
      matchScore += 30;
      reasons.push('+ Exact business name present in web content');
    }

    // 3. Location / City Reference (+20 pts)
    if (htmlLower.includes(normCity)) {
      matchScore += 20;
      reasons.push(`+ Target city (${city}) verified on web page`);
    }

    // 4. Phone Match (+20 pts)
    if (phone && htmlLower.includes(phone.replace(/\D/g, '').slice(-10))) {
      matchScore += 20;
      reasons.push('+ Matching contact phone number verified on website');
    }
  } else {
    // Basic domain verification when HTML cannot be pre-fetched
    if (matchScore >= 40) {
      matchScore += 10;
      reasons.push('+ Valid reachable domain structure');
    }
  }

  // Confidence Thresholds
  let confidence = 'LOW';
  if (matchScore >= 70) {
    confidence = 'HIGH';
  } else if (matchScore >= 40) {
    confidence = 'MEDIUM';
  } else {
    confidence = 'LOW';
  }

  return {
    candidateUrl,
    canonicalDomain: domain,
    matchScore: Math.min(matchScore, 100),
    confidence,
    confidenceReasons: reasons
  };
}
