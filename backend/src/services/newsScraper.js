/**
 * RAHNOXA Live Web Scraping & High-Ranking SEO Topic Extractor
 * Scrapes real-time trending Indian tech, science, space (ISRO), AI, startup, and engineering developments.
 * Primary sources: Indian Express (Tech & Science), The Hindu (Tech & Science), Gadgets 360, LiveMint,
 * Economic Times Tech, ISRO Press releases, and regional innovation hubs.
 */

export const NEWS_FEEDS = [
  // ── Authoritative National (India) Tech, Science & Space Sources ──
  {
    url: 'https://indianexpress.com/section/technology/feed/',
    name: 'Indian Express Technology',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://indianexpress.com/section/technology/science/feed/',
    name: 'Indian Express Science',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://www.thehindu.com/sci-tech/technology/feeder/default.rss',
    name: 'The Hindu Tech',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://www.thehindu.com/sci-tech/science/feeder/default.rss',
    name: 'The Hindu Science',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://gadgets360.com/rss/news',
    name: 'Gadgets 360 Tech (India)',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://gadgets360.com/rss/science/news',
    name: 'Gadgets 360 Science',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://www.livemint.com/rss/technology',
    name: 'LiveMint Tech (India)',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://www.livemint.com/rss/science',
    name: 'LiveMint Science',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://economictimes.indiatimes.com/tech/rssfeeds/13357270.cms',
    name: 'Economic Times Tech (India)',
    type: 'rss',
    category: 'Startup & Enterprise Tech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://yourstory.com/feed',
    name: 'YourStory Indian Startups & Tech',
    type: 'rss',
    category: 'Startup & Enterprise Tech',
    scope: 'National',
    location: 'India'
  },
  {
    url: 'https://www.isro.gov.in/Press.html',
    name: 'ISRO Official Press Releases',
    type: 'isro_html',
    category: 'Space & Defense Tech',
    scope: 'National',
    location: 'India'
  },

  // ── Regional Tech & Innovation Centers (Jharkhand, Kolkata, Jamshedpur) ──
  {
    url: 'https://timesofindia.indiatimes.com/city/ranchi',
    name: 'Times of India (Jharkhand & Jamshedpur)',
    type: 'html_headlines',
    category: 'Local Commercial Content',
    scope: 'National',
    location: 'Jharkhand'
  },
  {
    url: 'https://timesofindia.indiatimes.com/city/kolkata',
    name: 'Times of India (Kolkata & Bengal)',
    type: 'html_headlines',
    category: 'Local Commercial Content',
    scope: 'National',
    location: 'Kolkata'
  },

  // ── Authoritative International (Global) Tech, Science & Space Sources ──
  {
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    name: 'BBC News Technology',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    name: 'BBC News Science & Environment',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://www.nasa.gov/news-release/feed/',
    name: 'NASA Breaking News & Missions',
    type: 'rss',
    category: 'Space & Defense Tech',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://www.technologyreview.com/feed/',
    name: 'MIT Technology Review',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    name: 'Ars Technica',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://techcrunch.com/feed/',
    name: 'TechCrunch',
    type: 'rss',
    category: 'Startup & Enterprise Tech',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://www.theverge.com/rss/index.xml',
    name: 'The Verge',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://www.wired.com/feed/rss',
    name: 'Wired',
    type: 'rss',
    category: 'Tech & IT Innovation',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://thehackernews.com/feeds/posts/default?alt=rss',
    name: 'The Hacker News',
    type: 'rss',
    category: 'Cybersecurity & Threats',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://phys.org/rss-feed/',
    name: 'Phys.org Science & Research',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'International',
    location: 'Global'
  },
  {
    url: 'https://www.nature.com/nature.rss',
    name: 'Nature Research',
    type: 'rss',
    category: 'Science & DeepTech',
    scope: 'International',
    location: 'Global'
  }
];

/**
 * Decode HTML entities like &#8216;, &#8217;, &amp;, &quot;, &#39;
 */
export function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
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
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strip HTML tags and normalize text
 */
export function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  const withoutCdata = html.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  const withoutTags = withoutCdata.replace(/<[^>]+>/g, ' ');
  return decodeHtmlEntities(withoutTags);
}

/**
 * Categorize news headline into precise domain taxonomy
 */
export function categorizeHeadline(title, defaultCategory = 'Tech & IT Innovation') {
  const lower = (title || '').toLowerCase();

  if (
    lower.includes('isro') ||
    lower.includes('chandrayaan') ||
    lower.includes('gaganyaan') ||
    lower.includes('satellite') ||
    lower.includes('rocket') ||
    /\bspace\b/.test(lower) ||
    lower.includes('spacecraft') ||
    lower.includes('sslv') ||
    lower.includes('pslv') ||
    lower.includes('lvm3') ||
    /\bnasa\b/.test(lower) ||
    lower.includes('orbit') ||
    lower.includes('propulsion') ||
    lower.includes('astronomy')
  ) {
    return 'Space & Defense Tech';
  }

  if (
    /\bai\b/.test(lower) ||
    lower.includes('artificial intelligence') ||
    lower.includes('machine learning') ||
    /\bllm\b/.test(lower) ||
    lower.includes('deep learning') ||
    lower.includes('generative ai') ||
    lower.includes('neural') ||
    lower.includes('deepfake') ||
    /\brobot\b/.test(lower) ||
    lower.includes('robotics')
  ) {
    return 'AI & Machine Learning';
  }

  if (
    lower.includes('science') ||
    lower.includes('quantum') ||
    lower.includes('physics') ||
    lower.includes('biology') ||
    lower.includes('research') ||
    lower.includes('scientist') ||
    lower.includes('genome') ||
    lower.includes('fusion') ||
    lower.includes('laboratory') ||
    lower.includes('climate') ||
    lower.includes('supercomputer')
  ) {
    return 'Science & DeepTech';
  }

  if (
    lower.includes('startup') ||
    lower.includes('funding') ||
    lower.includes('unicorn') ||
    lower.includes('venture') ||
    lower.includes('fintech') ||
    lower.includes('ecommerce') ||
    lower.includes('saas') ||
    lower.includes('founder') ||
    lower.includes('ondc') ||
    lower.includes('ipo')
  ) {
    return 'Startup & Enterprise Tech';
  }

  if (
    lower.includes('hack') ||
    lower.includes('breach') ||
    lower.includes('malware') ||
    lower.includes('ransomware') ||
    lower.includes('vulnerability') ||
    lower.includes('phishing') ||
    lower.includes('zero day') ||
    lower.includes('zero-day') ||
    lower.includes('c-dot') ||
    /\bcyber\b/.test(lower) ||
    lower.includes('cybersecurity') ||
    lower.includes('cyberattack') ||
    lower.includes('cybercrime') ||
    /\bsecurity\b/.test(lower)
  ) {
    return 'Cybersecurity & Threats';
  }

  return defaultCategory;
}

/**
 * Parse RSS / Atom XML string into structured news items without heavy external dependencies.
 */
export function parseRssFeed(xmlText, feed) {
  const items = [];
  const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];

  for (const rawItem of itemMatches.slice(0, 15)) {
    const titleMatch = rawItem.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const linkMatch = rawItem.match(/<link[^>]*>([\s\S]*?)<\/link>/i) ||
                      rawItem.match(/<link[^>]+href="([^"]+)"/i);
    const descMatch = rawItem.match(/<description[^>]*>([\s\S]*?)<\/description>/i) ||
                      rawItem.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i);
    const pubDateMatch = rawItem.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
                          rawItem.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);

    const rawTitle = titleMatch ? stripHtml(titleMatch[1]) : '';
    let rawLink = linkMatch ? stripHtml(linkMatch[1]) : '';
    const rawDesc = descMatch ? stripHtml(descMatch[1]) : '';
    const rawPubDate = pubDateMatch ? stripHtml(pubDateMatch[1]) : '';

    if (rawLink) {
      // Clean fragment / tracking suffixes
      rawLink = rawLink.replace(/#rss-gadgets-news$/, '').trim();
    }

    if (
      rawTitle.length >= 20 &&
      rawTitle.length <= 160 &&
      !rawTitle.toLowerCase().includes('cookie') &&
      !rawTitle.toLowerCase().includes('subscribe') &&
      !rawTitle.toLowerCase().includes('sign in') &&
      !rawTitle.toLowerCase().includes('privacy policy')
    ) {
      const category = categorizeHeadline(rawTitle, feed.category);
      items.push({
        title: rawTitle,
        category,
        scope: feed.scope || (feed.location === 'India' || feed.location === 'Jharkhand' || feed.location === 'Kolkata' ? 'National' : 'International'),
        source: feed.name,
        sourceUrl: rawLink || feed.url,
        summary: rawDesc.slice(0, 300) || `Comprehensive engineering and strategic analysis of ${rawTitle}.`,
        location: feed.location || 'Global',
        publishedAt: rawPubDate || new Date().toISOString(),
        scrapedAt: new Date().toISOString()
      });
    }
  }

  return items;
}

/**
 * Scrapes ISRO official press updates table
 */
export function parseIsroPressHtml(html, feed) {
  const items = [];
  const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];

  for (const row of rows) {
    const linkMatch = row.match(/<a[^>]+href="([^"]+)"[^>]*title="([^"]+)"/i) ||
                      row.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    const dateMatch = row.match(/<td[^>]*class="date[^"]*"[^>]*>([\s\S]*?)<\/td>/i);

    if (linkMatch) {
      let rawHref = linkMatch[1].trim();
      if (!rawHref.startsWith('http')) {
        rawHref = `https://www.isro.gov.in/${rawHref.replace(/^\/+/, '')}`;
      }
      const rawTitle = stripHtml(linkMatch[2]);
      const rawDate = dateMatch ? stripHtml(dateMatch[1]) : '';

      if (rawTitle.length >= 20 && rawTitle.length <= 160) {
        items.push({
          title: rawTitle,
          category: 'Space & Defense Tech',
          scope: feed.scope || 'National',
          source: feed.name,
          sourceUrl: rawHref,
          summary: `Official ISRO development and mission milestone: ${rawTitle} (${rawDate || 'India Space Sector'}).`,
          location: feed.location || 'India',
          publishedAt: rawDate || new Date().toISOString(),
          scrapedAt: new Date().toISOString()
        });
      }
    }
  }

  return items.slice(0, 10);
}

/**
 * Scrapes standard HTML headlines using article links, <h2>, <h3>, or <h4> tags
 */
export function parseHtmlHeadlines(html, feed) {
  const items = [];
  const seen = new Set();

  // 1. Check for news article links
  const linkMatches = [...html.matchAll(/<a[^>]+href="([^"]*(?:article|story|news|articleshow)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
  for (const match of linkMatches) {
    let rawHref = match[1].trim();
    if (rawHref.startsWith('/')) {
      try {
        const origin = new URL(feed.url).origin;
        rawHref = `${origin}${rawHref}`;
      } catch {
        // Fallback to feed.url
      }
    }
    const cleanTitle = stripHtml(match[2]);
    if (
      cleanTitle.length >= 25 &&
      cleanTitle.length <= 140 &&
      !seen.has(cleanTitle) &&
      !cleanTitle.toLowerCase().includes('cookie') &&
      !cleanTitle.toLowerCase().includes('subscribe') &&
      !cleanTitle.toLowerCase().includes('sign in') &&
      !cleanTitle.toLowerCase().includes('privacy policy')
    ) {
      seen.add(cleanTitle);
      const category = categorizeHeadline(cleanTitle, feed.category);
      items.push({
        title: cleanTitle,
        category,
        scope: feed.scope || (feed.location === 'India' || feed.location === 'Jharkhand' || feed.location === 'Kolkata' ? 'National' : 'International'),
        source: feed.name,
        sourceUrl: rawHref,
        summary: `Strategic engineering analysis and local technology breakdown of ${cleanTitle}.`,
        location: feed.location || 'India',
        publishedAt: new Date().toISOString(),
        scrapedAt: new Date().toISOString()
      });
      if (items.length >= 12) return items;
    }
  }

  // 2. Fallback to standard heading tags
  const titleMatches = html.match(/<(h2|h3|h4)[^>]*>(.*?)<\/(h2|h3|h4)>/gi) || [];
  for (const rawTag of titleMatches.slice(0, 12)) {
    const cleanTitle = stripHtml(rawTag);

    if (
      cleanTitle.length > 25 &&
      cleanTitle.length < 130 &&
      !seen.has(cleanTitle) &&
      !cleanTitle.toLowerCase().includes('cookie') &&
      !cleanTitle.toLowerCase().includes('subscribe') &&
      !cleanTitle.toLowerCase().includes('sign in') &&
      !cleanTitle.toLowerCase().includes('privacy policy')
    ) {
      seen.add(cleanTitle);
      const category = categorizeHeadline(cleanTitle, feed.category);
      items.push({
        title: cleanTitle,
        category,
        scope: feed.scope || (feed.location === 'India' || feed.location === 'Jharkhand' || feed.location === 'Kolkata' ? 'National' : 'International'),
        source: feed.name,
        sourceUrl: feed.url,
        summary: `Strategic engineering analysis and local technology breakdown of ${cleanTitle}.`,
        location: feed.location || 'India',
        publishedAt: new Date().toISOString(),
        scrapedAt: new Date().toISOString()
      });
    }
  }

  return items;
}

/**
 * Main Web Scraper & Live Headline Aggregator
 * Gathers authoritative National (India) and International (Global) tech/science feeds in parallel.
 */
export async function scrapeLiveTrendingTechHeadlines() {
  const feedPromises = NEWS_FEEDS.map(async (feed) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout per feed

      const res = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, text/html, */*'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const bodyText = await res.text();
        if (feed.type === 'rss') {
          return parseRssFeed(bodyText, feed);
        } else if (feed.type === 'isro_html') {
          return parseIsroPressHtml(bodyText, feed);
        } else {
          return parseHtmlHeadlines(bodyText, feed);
        }
      }
    } catch (err) {
      console.warn(`[NewsScraper] Feed '${feed.name}' unavailable: ${err.message}`);
    }
    return [];
  });

  const results = await Promise.allSettled(feedPromises);
  return results.flatMap(r => r.status === 'fulfilled' && Array.isArray(r.value) ? r.value : []);
}

/**
 * Helper to strip publication branding suffixes without destroying hyphenated names like Chandrayaan-4, SSLV-D2
 */
export function cleanHeadlinePublicationSuffix(title) {
  if (!title || typeof title !== 'string') return '';
  return title
    .replace(/\s+(?:-|\|)\s+(?:The Hindu|Indian Express|Gadgets 360|LiveMint|Economic Times|ET Tech|NDTV|YourStory|TechCrunch|The Verge|Wired|Ars Technica|MIT Technology Review|BBC News|BBC|NASA|Phys\.org|Nature|Reuters|PTI|ANI|The Hacker News|Times of India)$/i, '')
    .trim();
}

/**
 * SEO Title Optimizer: Transforms a raw scraped headline into a clean, human-readable SEO title
 */
export function finalizeSeoTitle(rawTitle, category, scope = 'National') {
  let title = decodeHtmlEntities(cleanHeadlinePublicationSuffix(rawTitle));

  const isNational = scope === 'National';

  // Keyword enrichment based on category and national/international context
  if (category === 'Space & Defense Tech' && !title.toLowerCase().includes('mission') && !title.toLowerCase().includes('space') && !title.toLowerCase().includes('isro') && !title.toLowerCase().includes('nasa')) {
    title = isNational ? `${title}: ISRO & Space Exploration Analysis` : `${title}: Deep Space Mission & Aerospace Analysis`;
  } else if (category === 'Science & DeepTech' && !title.toLowerCase().includes('breakthrough') && !title.toLowerCase().includes('science') && !title.toLowerCase().includes('research')) {
    title = `${title}: Scientific Breakthrough & Research Insights`;
  } else if (category === 'Startup & Enterprise Tech' && !title.toLowerCase().includes('growth') && !title.toLowerCase().includes('startup') && !title.toLowerCase().includes('tech')) {
    title = isNational ? `${title}: Indian Startup & Tech Ecosystem` : `${title}: Global Tech & Enterprise Ecosystem`;
  } else if (category === 'Cybersecurity & Threats' && !title.toLowerCase().includes('guide') && !title.toLowerCase().includes('security') && !title.toLowerCase().includes('threat')) {
    title = `${title}: Security Protocols & Architecture Analysis`;
  } else if (category === 'AI & Machine Learning' && !title.toLowerCase().includes('insights') && !title.toLowerCase().includes('engineering') && !title.toLowerCase().includes('model')) {
    title = `${title}: AI Architecture & Engineering Insights`;
  } else if (category === 'Local Commercial Content' && !title.toLowerCase().includes('transformation')) {
    title = `${title}: Technology & Digital Solutions Overview`;
  }

  // Clean trailing punctuation or ellipses
  if (title.length > 95) {
    title = title.slice(0, 92).trim() + '...';
  }

  return decodeHtmlEntities(title);
}
