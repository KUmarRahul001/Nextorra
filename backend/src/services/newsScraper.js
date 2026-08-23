/**
 * RAHNOXA Live Web Scraping & High-Ranking SEO Topic Extractor
 * Scrapes real-time trending tech headlines & security feeds directly without API keys.
 */

const TECH_FEEDS = [
  { url: 'https://thehackernews.com/', name: 'The Hacker News', category: 'Cybersecurity & Threats' },
  { url: 'https://news.ycombinator.com/', name: 'Hacker News', category: 'Tech & IT Innovation' },
  { url: 'https://techcrunch.com/', name: 'TechCrunch', category: 'AI & Machine Learning' }
];

export async function scrapeLiveTrendingTechHeadlines() {
  const scrapedCandidates = [];

  for (const feed of TECH_FEEDS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const html = await res.text();
        
        // Extract headlines using regular expression on <h2>, <h3>, or <a> title tags
        const titleMatches = html.match(/<(h2|h3)[^>]*>(.*?)<\/(h2|h3)>/gi) || [];

        for (const rawTag of titleMatches.slice(0, 15)) {
          // Strip HTML tags and clean whitespace
          const cleanTitle = rawTag.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
          
          if (cleanTitle.length > 25 && cleanTitle.length < 120 && !cleanTitle.toLowerCase().includes('cookie') && !cleanTitle.toLowerCase().includes('subscribe')) {
            scrapedCandidates.push({
              title: cleanTitle,
              category: feed.category,
              source: feed.name,
              sourceUrl: feed.url,
              scrapedAt: new Date().toISOString()
            });
          }
        }
      }
    } catch {
      // Continue to next feed if one times out
    }
  }

  return scrapedCandidates;
}

/**
 * SEO Title Optimizer: Transforms a raw scraped headline into a high-CTR, high-ranking SEO title
 */
export function finalizeSeoTitle(rawTitle, category) {
  let title = rawTitle.replace(/\s*-\s*[^-]+$/, '').trim();

  // Keyword enrichment based on category
  if (category === 'Cybersecurity & Threats' && !title.toLowerCase().includes('guide') && !title.toLowerCase().includes('how')) {
    title = `${title}: Threat Breakdown & Security Protocols in 2026`;
  } else if (category === 'AI & Machine Learning' && !title.toLowerCase().includes('future') && !title.toLowerCase().includes('2026')) {
    title = `${title}: Architecture & Engineering Insights`;
  }

  // Cap length between 50 and 80 characters for optimal Google SERP display
  if (title.length > 90) {
    title = title.slice(0, 87) + '...';
  }

  return title;
}
