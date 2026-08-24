/**
 * RAHNOXA Local Directory Service Interface
 * Replaced static array with live web scraping delegation.
 */
import { LiveWebScraper } from './scraper.js';

export async function queryLocalBusinessDirectory({ location = 'Jamshedpur', category = 'Coaching Center', limit = 50 }) {
  const result = await LiveWebScraper.scrapeBusinesses({ location, category, limit });
  return result.businesses || [];
}
