/**
 * Rahnoxa Live Tech & Science News Aggregator & Topic Intelligence Service
 * Fetches real-time trending news across IT, Tech, AI, Science, and Software Engineering using NewsAPI.
 */

import { config } from '../../config/env.js';

const FALLBACK_NEWS_TOPICS = [
  {
    title: 'The Rise of Autonomous AI Agents in Enterprise Software Engineering',
    category: 'AI & Machine Learning',
    keyword: 'autonomous ai agents enterprise software',
    summary: 'How multi-agent AI frameworks and LLMs are automating workflow execution, code review, and backend optimization.',
    tags: ['AI', 'Machine Learning', 'Enterprise', 'Automation', 'Software Architecture'],
    featured_image: '/assets/image.png',
  },
  {
    title: 'PostgreSQL vs Vector Databases: Building Scalable Hybrid RAG Architectures',
    category: 'Database & Cloud',
    keyword: 'postgresql pgvector rag architecture',
    summary: 'Evaluating pgvector and native SQL indexes against specialized vector stores for cost-effective AI retrieval.',
    tags: ['Database', 'PostgreSQL', 'AI RAG', 'Cloud Infrastructure'],
    featured_image: '/assets/image.png',
  },
  {
    title: 'Micro-Frontends vs Modular SPAs: Architecture Decisions for 2026',
    category: 'Software Engineering',
    keyword: 'micro frontends vs spa enterprise',
    summary: 'A deep architectural comparison of modular React SPAs vs distributed micro-frontends for scaling engineering teams.',
    tags: ['React', 'TypeScript', 'Frontend Architecture', 'Web Development'],
    featured_image: '/assets/image.png',
  },
  {
    title: 'Zero-Trust Security Protocols for Modern Cloud APIs and Microservices',
    category: 'Cybersecurity & Cloud',
    keyword: 'zero trust api security microservices',
    summary: 'Implementing mTLS, JWT token rotation, and fine-grained RBAC in high-throughput cloud environments.',
    tags: ['Cybersecurity', 'APIs', 'Cloud Security', 'DevOps'],
    featured_image: '/assets/image.png',
  },
  {
    title: 'Why Custom ERP Systems Beat Off-the-Shelf SaaS for High-Growth Enterprises',
    category: 'ERP & Enterprise',
    keyword: 'custom erp development vs standard saas',
    summary: 'Examining total cost of ownership, workflow flexibility, and competitive moats in custom ERP development.',
    tags: ['ERP', 'Enterprise Software', 'SaaS', 'Business Growth'],
    featured_image: '/assets/image.png',
  },
  {
    title: 'Edge Computing and Serverless Architecture: Sub-50ms Global Response Times',
    category: 'Cloud & Infrastructure',
    keyword: 'edge computing serverless low latency',
    summary: 'How modern edge workers and geo-distributed databases eliminate cold starts and geographic latency.',
    tags: ['Cloud', 'Serverless', 'Edge Computing', 'Performance'],
    featured_image: '/assets/image.png',
  },
];

export class NewsService {
  /**
   * Fetch real-time trending tech/science news from NewsAPI with automatic fallback.
   */
  static async getTrendingTechNews() {
    const apiKey = config.newsApiKey;

    if (apiKey) {
      try {
        const categories = ['technology', 'science'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const url = `https://newsapi.org/v2/top-headlines?category=${randomCategory}&language=en&pageSize=15&apiKey=${apiKey}`;

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
            const cleanTitle = selected.title.replace(/\s*-\s*[^-]+$/, '').trim(); // Remove "- TechCrunch" suffix
            const categoryName = randomCategory === 'science' ? 'Science & Deep Tech' : 'Tech & IT Innovation';

            return {
              title: cleanTitle,
              category: categoryName,
              keyword: cleanTitle.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
              summary: selected.description || `Comprehensive engineering analysis of recent industry breakthroughs in ${cleanTitle}.`,
              tags: ['Tech News', randomCategory === 'science' ? 'Science' : 'Software Engineering', 'AI', 'Cloud'],
              featured_image: selected.urlToImage || '/assets/image.png',
              source: selected.source?.name || 'Global News Feed',
              sourceUrl: selected.url,
            };
          }
        }
      } catch (err) {
        console.warn('[NewsService] NewsAPI live fetch error, falling back to curated intelligence topic bank:', err.message);
      }
    }

    // Fallback: Return a high-value curated topic
    const randomIndex = Math.floor(Math.random() * FALLBACK_NEWS_TOPICS.length);
    return FALLBACK_NEWS_TOPICS[randomIndex];
  }

  static getAllTopics() {
    return FALLBACK_NEWS_TOPICS;
  }
}
