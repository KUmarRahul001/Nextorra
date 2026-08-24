/**
 * RAHNOXA 100% Free Live Discovery Engine (No Credit Card / No Billing Required)
 * Queries live open geodata (OpenStreetMap, Nominatim & Overpass Geo-Index).
 * Strict Zero Fabrication: All missing fields remain null.
 */

import { normalizePhone, normalizeEmail, normalizeBusinessName, extractCanonicalDomain, normalizeCity } from './normalizer.js';

const SCRAPER_CACHE = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 Hour

export class LiveWebScraper {
  static async scrapeBusinesses({ location = 'Jamshedpur', category = 'Coaching Center', limit = 30 }) {
    const cacheKey = `${location.toLowerCase().trim()}_${category.toLowerCase().trim()}`;
    const now = Date.now();

    if (SCRAPER_CACHE.has(cacheKey)) {
      const cached = SCRAPER_CACHE.get(cacheKey);
      if (now - cached.timestamp < CACHE_TTL_MS && cached.data.length > 0) {
        return {
          source: 'Live Free Engine (Cached 1h)',
          location,
          category,
          total: cached.data.length,
          businesses: cached.data.slice(0, limit)
        };
      }
    }

    const city = normalizeCity(location);
    const cleanedArea = location.replace(/jamshedpur/gi, '').replace(/,/g, '').trim();
    const businesses = [];
    const seenNames = new Set();

    // ── Multi-Keyword Query Expansion for Maximum Coverage ──
    const searchTerms = [
      `${category} in ${cleanedArea ? cleanedArea + ', ' : ''}${city}`,
      `${category} ${city}`,
      `tuition ${cleanedArea || city}`,
      `classes ${cleanedArea || city}`,
      `school ${cleanedArea || city}`,
      `college ${cleanedArea || city}`,
      `academy ${cleanedArea || city}`
    ];

    for (const q of searchTerms) {
      if (businesses.length >= limit) break;
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&extratags=1&limit=30`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RahnoxaFreeDiscovery/3.0; +https://rahnoxa.antideploy.com)',
            'Accept': 'application/json'
          }
        });

        if (res.ok) {
          const items = await res.json();
          if (Array.isArray(items)) {
            for (const item of items) {
              const extra = item.extratags || {};
              const addr = item.address || {};
              const rawName = item.name || addr.amenity || addr.shop || addr.building || item.display_name.split(',')[0];
              const name = normalizeBusinessName(rawName);

              if (!name || seenNames.has(name.toLowerCase()) || name.length < 3) continue;
              seenNames.add(name.toLowerCase());

              const phone = extra.phone || extra['contact:phone'] || extra['contact:mobile'] || null;
              const email = extra.email || extra['contact:email'] || null;
              const website = extra.website || extra['contact:website'] || extra.url || null;

              businesses.push({
                name,
                category: category || addr.amenity || 'Education Center',
                address: item.display_name,
                phone: normalizePhone(phone),
                email: normalizeEmail(email),
                website: website || null,
                rating: null,       // Strictly null unless genuinely present
                reviewCount: null,  // Strictly null unless genuinely present
                reviewSnippet: null,
                onPageOne: null,
                competitorCount: null,
                source: 'Live Open Geodata (Free)'
              });

              if (businesses.length >= limit) break;
            }
          }
        }
        await new Promise(r => setTimeout(r, 120));
      } catch (err) {
        console.warn('[Free Scraper Warning]', err.message);
      }
    }

    SCRAPER_CACHE.set(cacheKey, {
      timestamp: now,
      data: businesses
    });

    return {
      source: 'Live Free Discovery Engine',
      location,
      category,
      total: businesses.length,
      businesses: businesses.slice(0, limit)
    };
  }
}
