/**
 * Rahnoxa Live News & High-Ranking SEO Topic Intelligence Engine
 * Covers: Tech, Technology, Hacking, Cybersecurity, Fraud, Scams, and Enterprise Engineering.
 */

import { config } from '../../config/env.js';

const HIGH_RANKING_TOPIC_BANK = [
  // ── Cybersecurity & Hacking ──
  {
    title: 'Top Emerging Cybersecurity Threats & How Enterprise Networks Prevent Breaches in 2026',
    category: 'Cybersecurity & Threats',
    keyword: 'cybersecurity threats data breach prevention',
    summary: 'A deep breakdown of zero-day exploits, ransomware vectors, and how multi-layer zero-trust architectures protect critical infrastructure.',
    tags: ['Cybersecurity', 'Hacking Defense', 'Data Protection', 'Cloud Security'],
    featured_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Anatomy of a Supply Chain Attack: How Hackers Infiltrate Cloud Dependencies',
    category: 'Cybersecurity & Threats',
    keyword: 'software supply chain attack open source security',
    summary: 'Analyzing recent open-source package compromises, malicious typosquatting, and how automated SBOM checks prevent vulnerability injection.',
    tags: ['Cybersecurity', 'DevSecOps', 'AppSec', 'Hacking'],
    featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
  },

  // ── Fraud & Scam Prevention ──
  {
    title: 'AI Deepfake Fraud & Modern Social Engineering Scams: Detection & Defense Protocols',
    category: 'Fraud & Scam Prevention',
    keyword: 'ai deepfake scam fraud detection prevention',
    summary: 'How synthetic voice cloning and real-time video deepfakes are used in financial wire fraud, and the biometric verification methods that stop them.',
    tags: ['Fraud Prevention', 'Scam Alerts', 'AI Security', 'Identity Verification'],
    featured_image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Preventing Payment Gateway Fraud & Chargeback Abuse in High-Volume Web Apps',
    category: 'Fraud & Scam Prevention',
    keyword: 'payment fraud prevention chargebacks ecommerce',
    summary: 'Implementing 3D Secure 2.0, device fingerprinting, and ML-based transaction velocity checks to eliminate online payment scams.',
    tags: ['Fraud Prevention', 'Fintech', 'Ecommerce Security', 'Payment Systems'],
    featured_image: 'https://images.unsplash.com/photo-1556742049-0a67e5572290?w=1200&auto=format&fit=crop&q=80',
  },

  // ── Tech & AI Innovations ──
  {
    title: 'The Rise of Autonomous AI Agents in Enterprise Software Engineering',
    category: 'AI & Machine Learning',
    keyword: 'autonomous ai agents enterprise software',
    summary: 'How multi-agent AI frameworks and LLMs are automating workflow execution, code review, and backend optimization.',
    tags: ['AI', 'Machine Learning', 'Enterprise', 'Automation'],
    featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'Why Custom ERP Systems Beat Off-the-Shelf SaaS for High-Growth Enterprises',
    category: 'ERP & Enterprise',
    keyword: 'custom erp development vs standard saas',
    summary: 'Examining total cost of ownership, workflow flexibility, and proprietary moats in custom enterprise software.',
    tags: ['ERP', 'Enterprise Software', 'SaaS', 'Business Tech'],
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
  },
  {
    title: 'PostgreSQL vs Vector Databases: Building Scalable Hybrid RAG Architectures',
    category: 'Tech & IT Innovation',
    keyword: 'postgresql pgvector rag architecture',
    summary: 'Evaluating pgvector and native SQL indexes against specialized vector stores for cost-effective AI retrieval.',
    tags: ['PostgreSQL', 'Database', 'Cloud Infrastructure', 'Tech Trends'],
    featured_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
  },
];

const SEARCH_QUERIES = [
  'cybersecurity OR "data breach" OR hacking OR malware OR ransomware',
  'scam OR fraud OR phishing OR "identity theft" OR "deepfake scam"',
  'artificial intelligence OR "machine learning" OR "cloud computing"',
  'software engineering OR "web development" OR "zero day"',
];

export class NewsService {
  /**
   * Fetch real-time trending news across Tech, Hacking, Fraud, Scams, and IT.
   */
  static async getTrendingTechNews() {
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
            const cleanTitle = selected.title.replace(/\s*-\s*[^-]+$/, '').trim();

            let category = 'Tech & IT Innovation';
            const lowerTitle = cleanTitle.toLowerCase();
            if (lowerTitle.includes('hack') || lowerTitle.includes('breach') || lowerTitle.includes('security') || lowerTitle.includes('malware') || lowerTitle.includes('ransomware') || lowerTitle.includes('vulnerability')) {
              category = 'Cybersecurity & Threats';
            } else if (lowerTitle.includes('scam') || lowerTitle.includes('fraud') || lowerTitle.includes('phishing') || lowerTitle.includes('fake') || lowerTitle.includes('theft')) {
              category = 'Fraud & Scam Prevention';
            } else if (lowerTitle.includes('ai') || lowerTitle.includes('model') || lowerTitle.includes('gpt') || lowerTitle.includes('intelligence')) {
              category = 'AI & Machine Learning';
            }

            return {
              title: cleanTitle,
              category,
              keyword: cleanTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
              summary: selected.description || `Comprehensive investigation and engineering breakdown of ${cleanTitle}.`,
              tags: [category, 'Cybersecurity', 'Tech News', 'Software Engineering', 'Security & Fraud Prevention'],
              featured_image: selected.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
              source: selected.source?.name || 'Global News Wire',
              sourceUrl: selected.url,
            };
          }
        }
      } catch (err) {
        console.warn('[NewsService] Live fetch error, falling back to curated high-ranking topics:', err.message);
      }
    }

    const randomIndex = Math.floor(Math.random() * HIGH_RANKING_TOPIC_BANK.length);
    return HIGH_RANKING_TOPIC_BANK[randomIndex];
  }

  static getAllTopics() {
    return HIGH_RANKING_TOPIC_BANK;
  }
}
