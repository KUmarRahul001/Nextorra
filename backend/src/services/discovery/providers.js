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
    const query = `${category} in ${city}, India`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&extratags=1&limit=${Math.min(limit, 50)}`;

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'RahnoxaDiscoveryEngine/2.0 (admin@rahnoxa.com)',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`OpenStreetMap service error (HTTP ${res.status})`);
      }

      const places = await res.json();
      if (!Array.isArray(places)) {
        return { discoveredCount: 0, validCount: 0, duplicateCount: 0, rejectedCount: 0, businesses: [] };
      }

      const businesses = [];

      for (const place of places) {
        const extra = place.extratags || {};
        const address = place.address || {};
        
        const rawName = place.name || address.amenity || address.shop || address.building || place.display_name.split(',')[0];
        const name = normalizeBusinessName(rawName);
        if (!name) continue;

        let phone = extra.phone || extra['contact:phone'] || extra['contact:mobile'] || null;
        let email = extra.email || extra['contact:email'] || null;
        let website = extra.website || extra['contact:website'] || extra.url || null;
        let displayAddr = place.display_name || `${city}, Jharkhand`;

        // If phone or email not in OSM tags, run public contact enrichment
        if (!phone || !email) {
          const { enrichBusinessPublicContact } = await import('./contactEnricher.js');
          const enriched = await enrichBusinessPublicContact(name, city, category);
          if (!phone && enriched.phone) phone = enriched.phone;
          if (!email && enriched.email) email = enriched.email;
          if (!website && enriched.website) website = enriched.website;
          if (enriched.address) displayAddr = enriched.address;
        }

        const normPhone = normalizePhone(phone);
        const normEmail = normalizeEmail(email);
        const domain = extractCanonicalDomain(website);

        const opp = evaluateOpportunity({
          category,
          city,
          websiteUrl: website,
          auditFindings: { hasHttps: !!website?.startsWith('https') },
          hasPhone: !!normPhone,
          hasWhatsApp: !!normPhone,
        });

        businesses.push({
          id: `disc-osm-${place.osm_id || place.place_id}`,
          externalId: `osm-${place.osm_id || place.place_id}`,
          businessName: name,
          category,
          address: displayAddr,
          city,
          state: address.state || 'Jharkhand',
          phone: normPhone,
          whatsapp: normPhone,
          email: normEmail,
          websiteUrl: website,
          canonicalDomain: domain,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + city)}`,
          source: 'OpenStreetMap & Public Web Directory',
          sourceUrl: `https://www.openstreetmap.org/${place.osm_type || 'node'}/${place.osm_id}`,
          opportunityClass: opp.opportunityClass,
          opportunityScore: opp.score,
          scoreReasons: JSON.stringify(opp.scoreReasons),
          recommendedOffer: opp.recommendedOffer,
          recommendedPrice: opp.recommendedPrice,
          rawData: place,
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
      throw new Error(`OpenStreetMap Discovery Error: ${err.message}`);
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

