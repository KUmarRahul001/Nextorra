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
 * OpenStreetMap & Public Business Registry Discovery Provider
 * 100% Free - Requires NO Credit Card, NO Billing, NO API Key
 */
export class OpenStreetMapDiscoveryProvider extends BusinessDiscoveryProvider {
  constructor() {
    super('osm_places', 'OpenStreetMap Business Registry (Free / No Card)', false);
  }

  isConfigured() {
    return true;
  }

  async discover({ location, category, limit = 50 }) {
    const city = normalizeCity(location);
    
    // Map common business categories to OpenStreetMap tags
    const catLower = (category || '').toLowerCase();
    let amenityFilter = '["shop"]';
    if (catLower.includes('hospital') || catLower.includes('clinic') || catLower.includes('doctor')) {
      amenityFilter = '["amenity"~"hospital|clinic|doctors|pharmacy"]';
    } else if (catLower.includes('school') || catLower.includes('college') || catLower.includes('education')) {
      amenityFilter = '["amenity"~"school|college|kindergarten|university"]';
    } else if (catLower.includes('hotel') || catLower.includes('restaurant') || catLower.includes('cafe')) {
      amenityFilter = '["amenity"~"restaurant|cafe|fast_food|hotel"]';
    } else if (catLower.includes('gym') || catLower.includes('fitness')) {
      amenityFilter = '["leisure"~"fitness_centre|sports_centre"]';
    } else if (catLower.includes('bank') || catLower.includes('finance')) {
      amenityFilter = '["amenity"~"bank|atm"]';
    } else if (catLower.includes('store') || catLower.includes('retail') || catLower.includes('market')) {
      amenityFilter = '["shop"]';
    } else {
      amenityFilter = '["office"]';
    }

    // Overpass QL query for live businesses within the selected city/area in India
    const overpassQuery = `
      [out:json][timeout:25];
      area["name"="${city}"]->.searchArea;
      (
        node${amenityFilter}(area.searchArea);
        way${amenityFilter}(area.searchArea);
      );
      out body ${limit};
      >;
      out skel qt;
    `;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Rahnoxa-DiscoveryEngine/1.0',
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });

      if (!res.ok) {
        throw new Error(`Overpass API responded with HTTP ${res.status}`);
      }

      const data = await res.json();
      const elements = data.elements || [];
      const businesses = [];

      for (const el of elements) {
        const tags = el.tags || {};
        const name = tags.name || tags['name:en'];
        if (!name) continue;

        const phone = tags.phone || tags['contact:phone'] || tags['contact:mobile'] || null;
        const normPhone = normalizePhone(phone);
        const website = tags.website || tags['contact:website'] || tags.url || null;
        const domain = extractCanonicalDomain(website);

        const opp = evaluateOpportunity({
          category,
          city,
          websiteUrl: website,
          auditFindings: { hasHttps: !!website?.startsWith('https') },
          hasPhone: !!normPhone,
          hasWhatsApp: false,
        });

        businesses.push({
          id: `disc-osm-${el.id}`,
          externalId: `osm-${el.id}`,
          businessName: normalizeBusinessName(name),
          category,
          address: tags['addr:full'] || tags['addr:street'] || `${city}, Jharkhand`,
          city,
          state: 'Jharkhand',
          phone: normPhone,
          whatsapp: null,
          email: tags.email || tags['contact:email'] || null,
          websiteUrl: website,
          canonicalDomain: domain,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + city)}`,
          source: 'OpenStreetMap Registry (No-Card)',
          sourceUrl: `https://www.openstreetmap.org/${el.type || 'node'}/${el.id}`,
          opportunityClass: opp.opportunityClass,
          opportunityScore: opp.score,
          scoreReasons: JSON.stringify(opp.scoreReasons),
          recommendedOffer: opp.recommendedOffer,
          recommendedPrice: opp.recommendedPrice,
          rawData: el,
        });
      }

      return {
        discoveredCount: businesses.length,
        validCount: businesses.length,
        duplicateCount: 0,
        rejectedCount: 0,
        businesses,
      };
    } catch (err) {
      throw new Error(`Public Discovery Error: ${err.message}`);
    }
  }
}

/**
 * Discovery Provider Registry
 */
export class DiscoveryManager {
  constructor() {
    this.providers = [
      new OpenStreetMapDiscoveryProvider(),
      new GooglePlacesDiscoveryProvider(),
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

