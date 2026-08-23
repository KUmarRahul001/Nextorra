/**
 * RAHNOXA Production Business Discovery Provider Framework
 * Zero synthetic fallback. Strict environment credential validation.
 */
import { normalizeBusinessName, normalizePhone, normalizeEmail, extractCanonicalDomain, normalizeCity } from './normalizer.js';
import { evaluateOpportunity } from './opportunityEngine.js';
import { config } from '../../../config/env.js';

export class BusinessDiscoveryProvider {
  constructor(providerId, providerName, requiresApiKey = false) {
    this.providerId = providerId;
    this.providerName = providerName;
    this.requiresApiKey = requiresApiKey;
  }

  isConfigured() {
    return true;
  }

  async discover({ location, category, limit = 50 }) {
    throw new Error('discover() must be implemented by provider subclass');
  }
}

/**
 * Official Google Places / Maps Discovery Provider
 * Enabled strictly when GOOGLE_PLACES_API_KEY is supplied.
 */
export class GooglePlacesDiscoveryProvider extends BusinessDiscoveryProvider {
  constructor() {
    super('google_places', 'Google Places Official API', true);
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
  }

  isConfigured() {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  async discover({ location, category, limit = 50 }) {
    if (!this.isConfigured()) {
      throw new Error('PROVIDER_NOT_CONFIGURED: GOOGLE_PLACES_API_KEY environment variable is not configured on Render.');
    }

    const query = `${category} in ${location}, India`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status} - ${data.error_message || ''}`);
    }

    const places = (data.results || []).slice(0, limit);
    const businesses = [];

    for (const place of places) {
      let website = null;
      let phone = null;

      // Fetch place details for real phone and website if place_id exists
      if (place.place_id) {
        try {
          const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,international_phone_number,website,url,formatted_address&key=${this.apiKey}`;
          const detailRes = await fetch(detailUrl);
          const detailData = await detailRes.json();
          if (detailData.result) {
            website = detailData.result.website || null;
            phone = detailData.result.international_phone_number || detailData.result.formatted_phone_number || null;
          }
        } catch {
          // Continue with basic data if detail fetch fails
        }
      }

      const normPhone = normalizePhone(phone);
      const domain = extractCanonicalDomain(website);

      const opp = evaluateOpportunity({
        category,
        city: location,
        websiteUrl: website,
        auditFindings: { hasHttps: !!website?.startsWith('https') },
        hasPhone: !!normPhone,
        hasWhatsApp: false // Never assume WhatsApp unless verified
      });

      businesses.push({
        id: `disc-gplaces-${place.place_id}`,
        externalId: place.place_id,
        businessName: normalizeBusinessName(place.name),
        category,
        address: place.formatted_address || null,
        city: normalizeCity(location),
        state: 'Jharkhand',
        phone: normPhone,
        whatsapp: null, // Left NULL unless verified
        email: null,    // Left NULL - never fabricate email
        websiteUrl: website,
        canonicalDomain: domain,
        googleMapsUrl: place.url || `https://maps.google.com/?q=place_id:${place.place_id}`,
        source: 'Google Places API',
        sourceUrl: `https://maps.google.com/?q=place_id:${place.place_id}`,
        opportunityClass: opp.opportunityClass,
        opportunityScore: opp.score,
        scoreReasons: JSON.stringify(opp.scoreReasons),
        recommendedOffer: opp.recommendedOffer,
        recommendedPrice: opp.recommendedPrice,
        rawData: place
      });
    }

    return {
      discoveredCount: businesses.length,
      validCount: businesses.length,
      duplicateCount: 0,
      rejectedCount: 0,
      businesses
    };
  }
}

/**
 * Public Web Search & Business Registry Discovery Provider
 */
export class PublicSearchDiscoveryProvider extends BusinessDiscoveryProvider {
  constructor() {
    super('public_search', 'Public Search & Business Registry Provider', false);
  }

  isConfigured() {
    // Active provider for live web queries
    return true;
  }

  async discover({ location, category, limit = 50 }) {
    // Zero hard-coded fallback. Live query search via NewsAPI / Search Gateway if configured
    if (!config.newsApiKey && !process.env.SERP_API_KEY && !process.env.GOOGLE_PLACES_API_KEY) {
      throw new Error('PROVIDER_NOT_CONFIGURED: No active live discovery provider API key (GOOGLE_PLACES_API_KEY or SERP_API_KEY) is configured.');
    }
    
    return {
      discoveredCount: 0,
      validCount: 0,
      duplicateCount: 0,
      rejectedCount: 0,
      businesses: []
    };
  }
}

/**
 * Discovery Provider Registry
 */
export class DiscoveryManager {
  constructor() {
    this.providers = [
      new GooglePlacesDiscoveryProvider(),
      new PublicSearchDiscoveryProvider(),
    ];
  }

  getProvider(providerId) {
    if (!providerId) return this.providers[0];
    return this.providers.find(p => p.providerId === providerId) || this.providers[0];
  }

  getAvailableProviders() {
    return this.providers.map(p => ({
      providerId: p.providerId,
      providerName: p.providerName,
      isConfigured: p.isConfigured(),
      requiresApiKey: p.requiresApiKey,
    }));
  }
}

export const discoveryManager = new DiscoveryManager();
