import { db } from '../../database/supabase.js';
import { RAHNOXA_SERVICES_KNOWLEDGE } from '../knowledge/servicesKnowledge.js';

export const STATIC_KNOWLEDGE_BASE = RAHNOXA_SERVICES_KNOWLEDGE.map((s) => ({
  title: s.name,
  category: s.category,
  tags: `${s.slug} ${s.technologies.join(' ')} ${s.benefits.join(' ')} ${s.features.join(' ')}`.toLowerCase(),
  content: `${s.summary} Benefits: ${s.benefits.slice(0, 3).join('. ')}. Features: ${s.features.slice(0, 3).join('. ')}. Technologies: ${s.technologies.join(', ')}. Pricing: ${s.pricing}`,
  url: s.route,
}));

/**
 * Retrieve relevant knowledge items based on query keywords and domain category
 */
export async function retrieveRelevantKnowledge(query, category) {
  let allItems = STATIC_KNOWLEDGE_BASE;

  try {
    const dbItems = await db.getKnowledgeItems(category);
    if (Array.isArray(dbItems) && dbItems.length > 0) {
      allItems = [...STATIC_KNOWLEDGE_BASE, ...dbItems];
    }
  } catch {
    // Fallback gracefully to static knowledge base if DB is offline
  }

  const lowerQuery = query.toLowerCase().trim();
  const queryTokens = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = allItems.map((item) => {
    let score = 0;
    const titleLower = (item.title || '').toLowerCase();
    const contentLower = (item.content || '').toLowerCase();
    const tagsLower = (item.tags || '').toLowerCase();

    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 8;
      if (tagsLower.includes(token)) score += 5;
      if (contentLower.includes(token)) score += 3;
    }

    if (category && item.category === category) score += 4;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topItems = scored.filter((s) => s.score > 0).map((s) => s.item);

  return topItems.length > 0 ? topItems.slice(0, 4) : allItems.slice(0, 3);
}
