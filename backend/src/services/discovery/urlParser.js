/**
 * RAHNOXA Direct Maps URL Enrichment & Business Analyzer
 * Authoritative parser for Google Maps URLs, coordinates extraction,
 * and public-source evidence resolution with truthful website states.
 */
import { normalizeBusinessName, normalizePhone, extractCanonicalDomain, normalizeCity } from './normalizer.js';
import { evaluateOpportunity, generateDraftOutreach } from './opportunityEngine.js';
import { evaluateWebsiteCandidate } from './websiteMatcher.js';

/**
 * 1. Extract Identity & Spatial Coordinates directly from Maps URL
 */
export function parseGoogleMapsUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { isValid: false, error: 'Empty or invalid URL supplied' };
  }

  try {
    // Pattern 1: Business name in /maps/place/<Business+Name>/
    const placeMatch = rawUrl.match(/\/maps\/place\/([^/@?]+)/);
    let businessName = '';
    
    if (placeMatch && placeMatch[1]) {
      businessName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
    }

    // Pattern 2: Coordinates extraction (@lat,lng)
    const coordMatch = rawUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const latitude = coordMatch ? parseFloat(coordMatch[1]) : null;
    const longitude = coordMatch ? parseFloat(coordMatch[2]) : null;

    // Pattern 3: Maps Feature Identifier (Hex CID or 16s entity ID)
    const cidMatch = rawUrl.match(/!1s(0x[0-9a-fA-F]+:[0-9a-fA-F]+)/) || rawUrl.match(/16s%2Fg%2F([a-zA-Z0-9]+)/);
    const mapsIdentifier = cidMatch ? cidMatch[1] : null;

    return {
      isValid: !!businessName,
      businessName: normalizeBusinessName(businessName),
      latitude,
      longitude,
      mapsIdentifier,
      mapsUrl: rawUrl,
    };
  } catch (err) {
    return { isValid: false, error: err.message };
  }
}

/**
 * 2. Multi-Layer Public Audit & Opportunity Evaluation
 */
export async function analyzePublicBusinessUrl(targetUrl, fallbackName = '', location = 'Jamshedpur', category = 'Coaching Institute') {
  const isMaps = targetUrl.includes('google.com/maps') || targetUrl.includes('maps.app.goo.gl');
  const parsedMaps = isMaps ? parseGoogleMapsUrl(targetUrl) : null;
  const businessName = parsedMaps?.businessName || fallbackName || 'Target Business';

  let websiteUrl = null;
  let websiteStatus = 'WEBSITE_UNKNOWN'; // 'WEBSITE_FOUND', 'NO_WEBSITE_CONFIRMED', 'WEBSITE_UNKNOWN', 'WEBSITE_UNVERIFIED', 'WEBSITE_INACCESSIBLE'
  let websiteConfidence = 'UNKNOWN';
  let websiteConfidenceReason = 'Maps URL alone does not confirm website absence. Public source search required.';
  let phone = null;
  let contactConfidence = 'LOW';
  let auditFindings = { hasHttps: false, hasWhatsAppCta: false, hasBrokenLinks: false, hasContactForm: false };

  // If directly given a website URL, verify candidate match and perform audit
  if (!isMaps && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
    websiteUrl = targetUrl;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const res = await fetch(targetUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const html = await res.text();
        const candidateMatch = evaluateWebsiteCandidate({
          businessName,
          city: location,
          candidateUrl: targetUrl,
          candidateHtml: html,
          phone
        });

        websiteStatus = 'WEBSITE_FOUND';
        websiteConfidence = candidateMatch.confidence;
        websiteConfidenceReason = candidateMatch.confidenceReasons.join(', ') || 'Directly provided reachable website';

        const hasHttps = targetUrl.startsWith('https://');
        const hasWhatsAppCta = html.includes('wa.me') || html.includes('api.whatsapp.com') || html.toLowerCase().includes('whatsapp');
        const hasContactForm = html.includes('<form') && (html.includes('email') || html.includes('phone') || html.includes('contact'));
        const hasViewport = html.includes('name="viewport"') || html.includes("name='viewport'");

        const telMatch = html.match(/href=["']tel:([^"']+)["']/i);
        if (telMatch && telMatch[1]) {
          phone = normalizePhone(telMatch[1]);
          contactConfidence = 'HIGH';
        }

        auditFindings = {
          hasHttps,
          hasWhatsAppCta,
          hasContactForm,
          hasViewport,
          hasBrokenLinks: false
        };
      } else {
        websiteStatus = 'WEBSITE_INACCESSIBLE';
        websiteConfidence = 'MEDIUM';
        websiteConfidenceReason = `Website returned HTTP ${res.status}`;
      }
    } catch {
      websiteStatus = 'WEBSITE_INACCESSIBLE';
      websiteConfidence = 'LOW';
      websiteConfidenceReason = 'Connection timeout or network failure';
      auditFindings = { hasHttps: false, hasWhatsAppCta: false, hasBrokenLinks: true };
    }
  } else if (isMaps) {
    // Explicit Truth: A Maps URL without website metadata is WEBSITE_UNKNOWN, NOT NO_WEBSITE_CONFIRMED
    websiteUrl = null;
    websiteStatus = 'WEBSITE_UNKNOWN';
    websiteConfidence = 'LOW';
    websiteConfidenceReason = 'No official website linked inside Maps URL structure. Public registry check required.';
  }

  // Opportunity Evaluation with explicit website status
  const opp = evaluateOpportunity({
    category,
    city: location,
    websiteUrl,
    websiteStatus,
    auditFindings,
    hasPhone: !!phone,
    hasWhatsApp: false
  });

  const draftMessage = generateDraftOutreach({
    businessName: normalizeBusinessName(businessName),
    city: normalizeCity(location),
    category,
    opportunityClass: opp.opportunityClass,
    websiteStatus,
    recommendedOffer: opp.recommendedOffer,
    recommendedPrice: opp.recommendedPrice
  });

  return {
    id: `disc-enrich-${Date.now()}`,
    businessName: normalizeBusinessName(businessName),
    category,
    city: normalizeCity(location),
    state: 'Jharkhand',
    latitude: parsedMaps?.latitude || null,
    longitude: parsedMaps?.longitude || null,
    mapsIdentifier: parsedMaps?.mapsIdentifier || null,
    phone: normalizePhone(phone),
    whatsapp: null, // Left NULL unless verified
    email: null,    // Left NULL - never fabricated
    websiteUrl,
    canonicalDomain: extractCanonicalDomain(websiteUrl),
    websiteStatus,
    websiteConfidence,
    websiteConfidenceReason,
    contactConfidence,
    googleMapsUrl: isMaps ? targetUrl : null,
    source: isMaps ? 'Direct Maps URL Enrichment' : 'Public Web Profile',
    sourceUrl: targetUrl,
    opportunityClass: opp.opportunityClass,
    opportunityScore: opp.score,
    scoreConfidence: opp.scoreConfidence,
    scoreReasons: JSON.stringify(opp.scoreReasons),
    recommendedOffer: opp.recommendedOffer,
    recommendedPrice: opp.recommendedPrice,
    auditFindings,
    draftMessage,
    enrichmentEvidence: {
      identitySource: isMaps ? 'Google Maps URL Pattern' : 'Provided Web Domain',
      coordinatesExtracted: !!parsedMaps?.latitude,
      websiteExamined: !!websiteUrl,
      websiteStatusVerdict: websiteStatus,
      scoreBasis: opp.scoreReasons
    }
  };
}
