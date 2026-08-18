import { db } from '../../database/supabase.js';

/**
 * Retrieve relevant knowledge items based on query keywords and domain category
 */
export async function retrieveRelevantKnowledge(query, category) {
  const allItems = await db.getKnowledgeItems(category);
  const lowerQuery = query.toLowerCase().trim();
  const queryTokens = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = allItems.map((item) => {
    let score = 0;
    const titleLower = (item.title || '').toLowerCase();
    const contentLower = (item.content || '').toLowerCase();
    const tagsLower = (item.tags || '').toLowerCase();

    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 5;
      if (tagsLower.includes(token)) score += 4;
      if (contentLower.includes(token)) score += 2;
    }

    if (category && item.category === category) score += 3;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topItems = scored.filter((s) => s.score > 0).map((s) => s.item);

  return topItems.length > 0 ? topItems.slice(0, 4) : allItems.slice(0, 3);
}
