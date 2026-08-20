/**
 * Rahnoxa Free Tech & Science News Aggregator & Topic Intelligence Service
 * Fetches real-time trending news across IT, Tech, AI, Science, and Software Engineering.
 * Uses 100% free open feeds with zero API keys required.
 */

const FALLBACK_NEWS_TOPICS = [
  {
    title: 'The Rise of Autonomous AI Agents in Enterprise Software Engineering',
    category: 'AI & Machine Learning',
    keyword: 'autonomous ai agents enterprise software',
    summary: 'How multi-agent AI frameworks and LLMs are automating workflow execution, code review, and backend optimization.',
    tags: ['AI', 'Machine Learning', 'Enterprise', 'Automation', 'Software Architecture'],
    impact: 'Accelerates business cycle velocity by 40% while demanding resilient observability.',
  },
  {
    title: 'PostgreSQL vs Vector Databases: Building Scalable Hybrid RAG Architectures',
    category: 'Database & Cloud',
    keyword: 'postgresql pgvector rag architecture',
    summary: 'Evaluating pgvector and native SQL indexes against specialized vector stores for cost-effective AI retrieval.',
    tags: ['Database', 'PostgreSQL', 'AI RAG', 'Cloud Infrastructure'],
    impact: 'Drastically cuts infrastructure costs without sacrificing query latency.',
  },
  {
    title: 'Micro-Frontends vs Modular SPAs: Architecture Decisions for 2026',
    category: 'Software Engineering',
    keyword: 'micro frontends vs spa enterprise',
    summary: 'A deep architectural comparison of modular React SPAs vs distributed micro-frontends for scaling engineering teams.',
    tags: ['React', 'TypeScript', 'Frontend Architecture', 'Web Development'],
    impact: 'Prevents organizational sprawl while keeping page loads under 1 second.',
  },
  {
    title: 'Zero-Trust Security Protocols for Modern Cloud APIs and Microservices',
    category: 'Cybersecurity & Cloud',
    keyword: 'zero trust api security microservices',
    summary: 'Implementing mTLS, JWT token rotation, and fine-grained RBAC in high-throughput cloud environments.',
    tags: ['Cybersecurity', 'APIs', 'Cloud Security', 'DevOps'],
    impact: 'Protects mission-critical business data across multi-tenant environments.',
  },
  {
    title: 'Why Custom ERP Systems Beat Off-the-Shelf SaaS for High-Growth Enterprises',
    category: 'ERP & Enterprise',
    keyword: 'custom erp development vs standard saas',
    summary: 'Examining total cost of ownership, workflow flexibility, and competitive moats in custom ERP development.',
    tags: ['ERP', 'Enterprise Software', 'SaaS', 'Business Growth'],
    impact: 'Unlocks 100% proprietary workflow control and removes recurring per-seat fees.',
  },
  {
    title: 'Edge Computing and Serverless Architecture: Sub-50ms Global Response Times',
    category: 'Cloud & Infrastructure',
    keyword: 'edge computing serverless low latency',
    summary: 'How modern edge workers and geo-distributed databases eliminate cold starts and geographic latency.',
    tags: ['Cloud', 'Serverless', 'Edge Computing', 'Performance'],
    impact: 'Enhances global user retention and Google Core Web Vitals rankings.',
  },
  {
    title: 'Breakthroughs in Quantum Computing & Cryptographic Resilience for IT Infrastructure',
    category: 'Science & Technology',
    keyword: 'quantum computing post-quantum cryptography enterprise',
    summary: 'How upcoming post-quantum encryption standards are reshaping banking, enterprise data security, and cloud storage.',
    tags: ['Quantum Computing', 'Science', 'Cybersecurity', 'Future Tech'],
    impact: 'Ensures long-term data durability against next-generation compute advances.',
  },
  {
    title: 'Building Real-Time Collaborative Web Applications with WebSockets and CRDTs',
    category: 'Software Architecture',
    keyword: 'real time websockets crdt web apps',
    summary: 'Architecting multi-user state synchronization, conflict resolution, and sub-100ms real-time event pipelines.',
    tags: ['WebSockets', 'Real-Time', 'Full-Stack', 'Node.js'],
    impact: 'Enables Google Docs-style live collaboration across complex business dashboards.',
  },
];

export class NewsService {
  /**
   * Fetch trending tech news from free open APIs with fallback to curated intelligence topic bank.
   */
  static async getTrendingTechNews() {
    try {
      // 1. Attempt to fetch top stories from Hacker News (Free public API)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && res.ok) {
        const storyIds = (await res.json()).slice(0, 10);
        const storyPromises = storyIds.slice(0, 3).map(async (id) => {
          try {
            const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            if (itemRes.ok) return await itemRes.json();
          } catch {
            return null;
          }
        });

        const stories = (await Promise.all(storyPromises)).filter(Boolean);
        const filteredStories = stories.filter((s) => s.title && s.title.length > 15);

        if (filteredStories.length > 0) {
          const selected = filteredStories[Math.floor(Math.random() * filteredStories.length)];
          return {
            title: selected.title,
            category: 'Tech & IT Innovation',
            keyword: selected.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
            summary: `Analysis of latest industry developments regarding ${selected.title}, exploring architectural implications and technical advantages.`,
            tags: ['Tech News', 'Software Engineering', 'Innovation', 'Cloud'],
            source: 'Hacker News / Global Tech Feed',
            url: selected.url || 'https://news.ycombinator.com',
          };
        }
      }
    } catch (err) {
      console.warn('[NewsService] Free news feed fetch skipped, using rotating intelligence repository:', err.message);
    }

    // 2. Return rotating topic from intelligent curated repository
    const randomIndex = Math.floor(Math.random() * FALLBACK_NEWS_TOPICS.length);
    return FALLBACK_NEWS_TOPICS[randomIndex];
  }

  /**
   * Get complete pool of high-reach topics across IT, AI, Science, and Cloud
   */
  static getAllTopics() {
    return FALLBACK_NEWS_TOPICS;
  }
}
