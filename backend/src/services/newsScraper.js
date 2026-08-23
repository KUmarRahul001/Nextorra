/**
 * RAHNOXA Live Web Scraping & High-Ranking SEO Topic Extractor
 * Scrapes real-time trending tech, Indian tech, regional (Jamshedpur/Jharkhand/Kolkata), ISRO, and Gov innovation feeds.
 */

const NEWS_FEEDS = [
  // ── Regional & Indian Tech / Innovation / ISRO / Gov ──
  { url: 'https://timesofindia.indiatimes.com/city/ranchi', name: 'Times of India (Jharkhand & Jamshedpur)', category: 'Local Commercial Content', location: 'Jharkhand' },
  { url: 'https://timesofindia.indiatimes.com/city/kolkata', name: 'Times of India (Kolkata & Bengal)', category: 'Local Commercial Content', location: 'Kolkata' },
  { url: 'https://economictimes.indiatimes.com/tech', name: 'Economic Times Tech (India)', category: 'Business Technology', location: 'India' },
  { url: 'https://www.isro.gov.in/Press.html', name: 'ISRO Press Updates (India)', category: 'Tech & IT Innovation', location: 'India' },
  { url: 'https://pib.gov.in/indexd.aspx', name: 'PIB Tech & Science Releases (Gov)', category: 'Tech & IT Innovation', location: 'India' },
  
  // ── Global Tech & Cybersecurity ──
  { url: 'https://thehackernews.com/', name: 'The Hacker News', category: 'Cybersecurity & Threats', location: 'Global' },
  { url: 'https://news.ycombinator.com/', name: 'Hacker News', category: 'Tech & IT Innovation', location: 'Global' },
  { url: 'https://techcrunch.com/', name: 'TechCrunch', category: 'AI & Machine Learning', location: 'Global' }
];

/**
 * Decode HTML entities like &#8216;, &#8217;, &amp;, &quot;, &#39;
 */
export function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export async function scrapeLiveTrendingTechHeadlines() {
  const scrapedCandidates = [];

  for (const feed of NEWS_FEEDS) {
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
        
        // Extract headlines using regular expressions on <h2>, <h3>, <h4>, or <a> title tags
        const titleMatches = html.match(/<(h2|h3|h4)[^>]*>(.*?)<\/(h2|h3|h4)>/gi) || [];

        for (const rawTag of titleMatches.slice(0, 12)) {
          // Strip HTML tags and clean whitespace
          const rawText = rawTag.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
          const cleanTitle = decodeHtmlEntities(rawText);
          
          if (
            cleanTitle.length > 25 && 
            cleanTitle.length < 130 && 
            !cleanTitle.toLowerCase().includes('cookie') && 
            !cleanTitle.toLowerCase().includes('subscribe') &&
            !cleanTitle.toLowerCase().includes('sign in') &&
            !cleanTitle.toLowerCase().includes('privacy policy')
          ) {
            scrapedCandidates.push({
              title: cleanTitle,
              category: feed.category,
              source: feed.name,
              sourceUrl: feed.url,
              location: feed.location || 'India',
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
 * SEO Title Optimizer: Transforms a raw scraped headline into a clean, human-readable SEO title
 */
export function finalizeSeoTitle(rawTitle, category) {
  let title = decodeHtmlEntities(rawTitle.replace(/\s*-\s*[^-]+$/, '').trim());

  // Keyword enrichment based on category
  if (category === 'Cybersecurity & Threats' && !title.toLowerCase().includes('guide') && !title.toLowerCase().includes('security')) {
    title = `${title}: Security Protocols & Architecture Analysis`;
  } else if (category === 'AI & Machine Learning' && !title.toLowerCase().includes('insights') && !title.toLowerCase().includes('engineering')) {
    title = `${title}: Architecture & Engineering Insights`;
  } else if (category === 'Local Commercial Content' && !title.toLowerCase().includes('transformation')) {
    title = `${title}: Technology & Digital Solutions Overview`;
  }

  // Clean trailing punctuation or ellipses
  if (title.length > 90) {
    title = title.slice(0, 87).trim() + '...';
  }

  return decodeHtmlEntities(title);
}
