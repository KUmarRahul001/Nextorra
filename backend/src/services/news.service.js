/**
 * Rahnoxa Live News & High-Ranking SEO Topic Intelligence Engine
 * Covers: Tech, Technology, Hacking, Cybersecurity, Fraud, Scams, and Enterprise Engineering.
 */

import { config } from '../../config/env.js';
import {
  scrapeLiveTrendingTechHeadlines,
  finalizeSeoTitle,
  categorizeHeadline,
  cleanHeadlinePublicationSuffix
} from './newsScraper.js';

const HIGH_RANKING_TOPIC_BANK = [
  // ── Indian Space & ISRO Innovation ──
  {
    title: 'ISRO Next-Gen Launch Vehicles & Cryogenic Propulsion: Engineering India’s Deep Space Missions',
    category: 'Space & Defense Tech',
    scope: 'National',
    location: 'India',
    keyword: 'isro launch vehicles cryogenic propulsion space mission india',
    summary: 'An architectural deep-dive into ISRO’s LVM3, SSLV upgrades, semi-cryogenic rocket stages, and how indigenous telemetry systems power lunar and interplanetary probes.',
    tags: ['Space & Defense Tech', 'ISRO', 'Aerospace Engineering', 'Deep Space', 'India Tech'],
    featured_image: 'https://images.unsplash.com/photo-1517976487502-5c2079237b75?w=1200&auto=format&fit=crop&q=80',
    source: 'ISRO Technical Documentation',
    sourceUrl: 'https://www.isro.gov.in/Press.html',
  },
  {
    title: 'Gaganyaan Human Spaceflight Architecture: Life Support Systems and Re-entry Telemetry',
    category: 'Space & Defense Tech',
    scope: 'National',
    location: 'India',
    keyword: 'gaganyaan human spaceflight mission isro life support re-entry',
    summary: 'Evaluating the environmental control, crew escape modules, and real-time avionics telemetry built for India’s landmark human spaceflight mission.',
    tags: ['Space & Defense Tech', 'ISRO', 'Avionics', 'Gaganyaan', 'Space Tech'],
    featured_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    source: 'ISRO Official Releases',
    sourceUrl: 'https://www.isro.gov.in/Press.html',
  },

  // ── Indian DeepTech, AI & Science Research ──
  {
    title: 'India AI Mission: Building Sovereign Foundative LLMs & Multilingual Computing Stacks',
    category: 'AI & Machine Learning',
    scope: 'National',
    location: 'India',
    keyword: 'india ai mission sovereign llm indic language models compute infrastructure',
    summary: 'How India’s national AI compute cluster and Indic tokenizers are empowering developers to train domain-specific foundational AI models for healthcare and governance.',
    tags: ['AI & Machine Learning', 'India AI Mission', 'Indic LLMs', 'Compute Infrastructure', 'AI Innovation'],
    featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    source: 'Ministry of Electronics & IT (MeitY)',
    sourceUrl: 'https://pib.gov.in/indexd.aspx',
  },
  {
    title: 'National Quantum Mission: Superconducting Qubits & Secure Quantum Key Distribution in India',
    category: 'Science & DeepTech',
    scope: 'National',
    location: 'India',
    keyword: 'national quantum mission india quantum computing secure qkd physics',
    summary: 'Analyzing Indian scientific research in photonics, topological quantum computing, and post-quantum cryptography deployed across defense communication backbones.',
    tags: ['Science & DeepTech', 'Quantum Computing', 'Cryptography', 'National Quantum Mission', 'Scientific Research'],
    featured_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
    source: 'Department of Science and Technology (DST)',
    sourceUrl: 'https://pib.gov.in/indexd.aspx',
  },

  // ── Indian Tech Startups & Digital Public Infrastructure ──
  {
    title: 'The Evolution of India’s Digital Public Infrastructure: UPI, ONDC, and Open Financial Architectures',
    category: 'Startup & Enterprise Tech',
    scope: 'National',
    location: 'India',
    keyword: 'india digital public infrastructure upi ondc fintech open rails',
    summary: 'How open protocols, zero-fee payment rails, and decentralized commerce architectures allow Indian tech startups to scale transaction throughput reliably.',
    tags: ['Startup & Enterprise Tech', 'Fintech', 'Digital Public Infrastructure', 'UPI', 'ONDC', 'Startups'],
    featured_image: 'https://images.unsplash.com/photo-1556742049-0a67e5572290?w=1200&auto=format&fit=crop&q=80',
    source: 'National Payments Corporation of India (NPCI)',
    sourceUrl: 'https://economictimes.indiatimes.com/tech',
  },
  {
    title: 'How Indian SaaS Startups Build Multi-Tenant Cloud Architectures for Global Scale',
    category: 'Startup & Enterprise Tech',
    scope: 'National',
    location: 'India',
    keyword: 'indian saas startups multi-tenant cloud architecture postgresql scale',
    summary: 'Architectural lessons from India’s top B2B SaaS unicorns on tenant isolation, multi-region database sharding, and edge-native latency optimization.',
    tags: ['Startup & Enterprise Tech', 'SaaS', 'Cloud Architecture', 'PostgreSQL', 'Startups India'],
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    source: 'YourStory Tech & Startups',
    sourceUrl: 'https://yourstory.com/feed',
  },

  // ── Cybersecurity, Telecom & Enterprise Infrastructure ──
  {
    title: 'C-DOT & Bharat 6G Vision: Engineering Resilient Telecom & Zero-Trust Networks in India',
    category: 'Cybersecurity & Threats',
    scope: 'National',
    location: 'India',
    keyword: 'c-dot bharat 6g telecom zero trust cybersecurity india',
    summary: 'An investigation into indigenous cell broadcast emergency systems, optical transport architectures, and carrier-grade zero-trust defense mechanisms.',
    tags: ['Cybersecurity & Threats', 'Telecom', 'C-DOT', 'Bharat 6G', 'Network Security'],
    featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    source: 'The Hindu Tech',
    sourceUrl: 'https://www.thehindu.com/sci-tech/technology/',
  },
  {
    title: 'Top Emerging Cybersecurity Threats & How Indian Enterprises Prevent Breaches in 2026',
    category: 'Cybersecurity & Threats',
    scope: 'National',
    location: 'India',
    keyword: 'cybersecurity threats india data breach prevention enterprise cert-in',
    summary: 'A deep breakdown of zero-day exploits, ransomware vectors, and CERT-In compliance guidelines protecting Indian enterprise cloud infrastructure.',
    tags: ['Cybersecurity & Threats', 'Hacking Defense', 'Data Protection', 'Cloud Security'],
    featured_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    source: 'CERT-In Security Advisories',
    sourceUrl: 'https://thehackernews.com/',
  },

  // ── Authoritative International Space, Science & AI Innovations ──
  {
    title: 'NASA Artemis & Deep Space Exploration: Engineering Cryogenic Propulsion for Lunar Landings',
    category: 'Space & Defense Tech',
    scope: 'International',
    location: 'Global',
    keyword: 'nasa artemis deep space exploration cryogenic propulsion lunar lander',
    summary: 'An architectural review of NASA Space Launch System (SLS), Orion crew avionics, and deep-space communication telemetry protocols for lunar exploration.',
    tags: ['Space & Defense Tech', 'NASA', 'Artemis', 'Aerospace Engineering', 'Deep Space'],
    featured_image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80',
    source: 'NASA Breaking News & Missions',
    sourceUrl: 'https://www.nasa.gov/news-release/feed/',
  },
  {
    title: 'Global AI Frontier Models & Sparse Mixture of Experts: Next-Gen Compute Architecture',
    category: 'AI & Machine Learning',
    scope: 'International',
    location: 'Global',
    keyword: 'frontier ai models sparse mixture of experts distributed compute training',
    summary: 'Technical breakdown of sparse mixture-of-experts (MoE) architectures, 8-bit quantized inferencing, and high-bandwidth interconnects powering modern frontier LLMs.',
    tags: ['AI & Machine Learning', 'Frontier AI', 'Mixture of Experts', 'Deep Learning', 'Compute Clusters'],
    featured_image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    source: 'MIT Technology Review',
    sourceUrl: 'https://www.technologyreview.com/feed/',
  },
  {
    title: 'Zero-Day Exploits & Global Software Supply Chain Security: Automated SBOM Defense',
    category: 'Cybersecurity & Threats',
    scope: 'International',
    location: 'Global',
    keyword: 'zero day vulnerability software supply chain security sbom defense',
    summary: 'Evaluating modern supply chain attack vectors, malicious package injection on npm/PyPI, and automated cryptographic SBOM attestation workflows.',
    tags: ['Cybersecurity & Threats', 'Software Supply Chain', 'Zero-Day', 'Application Security', 'DevSecOps'],
    featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    source: 'The Hacker News',
    sourceUrl: 'https://thehackernews.com/feeds/posts/default?alt=rss',
  },
  {
    title: 'Topological Quantum Bits & Room-Temperature Superconductivity: Breakthrough Physics',
    category: 'Science & DeepTech',
    scope: 'International',
    location: 'Global',
    keyword: 'quantum computing topological qubits room temperature superconductivity physics',
    summary: 'Investigating state-of-the-art quantum error correction, neutral atom arrays, and topological coherence benchmarks across international physics laboratories.',
    tags: ['Science & DeepTech', 'Quantum Computing', 'Physics Research', 'Superconductivity', 'DeepTech'],
    featured_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
    source: 'Phys.org Science & Research',
    sourceUrl: 'https://phys.org/rss-feed/',
  }
];

const SEARCH_QUERIES = [
  'ISRO OR "space mission" OR Gaganyaan OR Chandrayaan OR "satellite launch"',
  '"India AI" OR "artificial intelligence India" OR "Indic LLM" OR "deeptech startup"',
  '"digital public infrastructure" OR "UPI" OR "ONDC" OR "fintech India"',
  '"science India" OR "quantum mission India" OR "semiconductor India" OR "CSIR"',
  'cybersecurity India OR CERT-In OR "C-DOT" OR "data protection India"',
  'NASA OR "deep space" OR "quantum computing" OR "artificial intelligence breakthrough"',
  '"frontier AI" OR "cybersecurity zero-day" OR "semiconductor technology"'
];

export class NewsService {
  /**
   * Fetch real-time trending news across National (India) and International (Global)
   * Tech, Science, Space, AI, Engineering, Startups, and Cybersecurity.
   *
   * @param {Object} [options]
   * @param {'National'|'International'|'any'} [options.scope='any'] - Preferred scope filter
   * @param {string} [options.category] - Optional category filter
   */
  static async getTrendingTechNews(options = {}) {
    const targetScope = options.scope || 'any'; // 'National', 'International', or 'any'

    // 1. Direct High-Quality Live Web Scraping (Authoritative National & International Feeds)
    try {
      const liveHeadlines = await scrapeLiveTrendingTechHeadlines();
      if (liveHeadlines && liveHeadlines.length > 0) {
        // Filter out low-value local commercial headlines if other content exists
        const nonLocal = liveHeadlines.filter(item => item.category !== 'Local Commercial Content');
        const candidateBase = nonLocal.length > 0 ? nonLocal : liveHeadlines;

        let pool = candidateBase;
        if (targetScope === 'National') {
          pool = candidateBase.filter(item => item.scope === 'National');
        } else if (targetScope === 'International') {
          pool = candidateBase.filter(item => item.scope === 'International');
        } else {
          // Balanced Rotation / Selection: 50% chance of National vs International when both exist
          const nationalPool = candidateBase.filter(item => item.scope === 'National');
          const internationalPool = candidateBase.filter(item => item.scope === 'International');

          if (nationalPool.length > 0 && internationalPool.length > 0) {
            pool = Math.random() < 0.5 ? nationalPool : internationalPool;
          }
        }

        if (pool.length === 0) {
          pool = candidateBase;
        }

        const picked = pool[Math.floor(Math.random() * pool.length)];
        const itemScope = picked.scope || (picked.location === 'India' || picked.location === 'Jharkhand' || picked.location === 'Kolkata' ? 'National' : 'International');
        const optimizedTitle = finalizeSeoTitle(picked.title, picked.category, itemScope);

        const tags = itemScope === 'National'
          ? [picked.category, 'Indian Tech & Science', 'Software Engineering', 'Innovation & DeepTech']
          : [picked.category, 'Global Tech & Science', 'International Engineering', 'Innovation & DeepTech'];

        return {
          title: optimizedTitle,
          category: picked.category,
          scope: itemScope,
          location: picked.location || (itemScope === 'National' ? 'India' : 'Global'),
          keyword: picked.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
          summary: picked.summary || `Real-time engineering analysis and strategic breakdown of ${picked.title}.`,
          tags,
          featured_image: picked.category === 'Space & Defense Tech'
            ? 'https://images.unsplash.com/photo-1517976487502-5c2079237b75?w=1200&auto=format&fit=crop&q=80'
            : picked.category === 'Science & DeepTech'
            ? 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
          source: picked.source,
          sourceUrl: picked.sourceUrl,
          sourcePublishedAt: picked.publishedAt,
        };
      }
    } catch (err) {
      console.warn('[NewsService] Web scraper error:', err.message);
    }

    // 2. News API Fallback with Tech & Science focused queries
    const apiKey = config.newsApiKey;
    if (apiKey) {
      try {
        const query = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'Rahnoxa-NewsEngine/2.4' } });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const articles = (data.articles || []).filter(
            (a) => a.title && !a.title.includes('[Removed]') && a.title.length > 20
          );

          if (articles.length > 0) {
            const selected = articles[Math.floor(Math.random() * articles.length)];
            const cleanTitle = cleanHeadlinePublicationSuffix(selected.title);
            const category = categorizeHeadline(cleanTitle, 'Tech & IT Innovation');
            const isIndianQuery = query.toLowerCase().includes('india') || query.toLowerCase().includes('isro');
            const detectedScope = isIndianQuery ? 'National' : 'International';

            return {
              title: cleanTitle,
              category,
              scope: detectedScope,
              location: detectedScope === 'National' ? 'India' : 'Global',
              keyword: cleanTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
              summary: selected.description || `Comprehensive investigation and engineering breakdown of ${cleanTitle}.`,
              tags: [category, detectedScope === 'National' ? 'Indian Tech & Science' : 'Global Tech & Science', 'Software Engineering', 'Innovation'],
              featured_image: selected.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
              source: selected.source?.name || (detectedScope === 'National' ? 'Indian Tech Wire' : 'Global Tech Wire'),
              sourceUrl: selected.url,
              sourcePublishedAt: selected.publishedAt,
            };
          }
        }
      } catch (err) {
        console.warn('[NewsService] Live fetch error, falling back to curated high-ranking topics:', err.message);
      }
    }

    // 3. Fallback to Curated High-Ranking National and International Topic Bank
    let fallbackPool = HIGH_RANKING_TOPIC_BANK;
    if (targetScope === 'National') {
      fallbackPool = HIGH_RANKING_TOPIC_BANK.filter(t => t.scope === 'National');
    } else if (targetScope === 'International') {
      fallbackPool = HIGH_RANKING_TOPIC_BANK.filter(t => t.scope === 'International');
    }

    if (!fallbackPool || fallbackPool.length === 0) {
      fallbackPool = HIGH_RANKING_TOPIC_BANK;
    }

    const randomIndex = Math.floor(Math.random() * fallbackPool.length);
    return fallbackPool[randomIndex];
  }

  static getAllTopics() {
    return HIGH_RANKING_TOPIC_BANK;
  }
}
