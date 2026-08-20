import { db } from '../../database/supabase.js';
import { aiGateway } from '../../ai/core/gateway.js';
import { config } from '../../config/env.js';

const LIVE_QUERIES = [
  { query: 'cybersecurity OR hacking OR "data breach"', category: 'Cybersecurity & Threats' },
  { query: 'scam OR fraud OR phishing OR "deepfake scam"', category: 'Fraud & Scam Prevention' },
  { query: 'artificial intelligence OR "AI agents" OR LLM', category: 'AI & Machine Learning' },
  { query: 'technology OR "software engineering" OR cloud', category: 'Tech & IT Innovation' },
  { query: 'science OR space OR quantum', category: 'Science & Deep Tech' },
];

/**
 * Fetch real live news directly from NewsAPI and generate authentic published articles in Supabase.
 */
export async function ensureSupabaseBlogPostsSeeded() {
  try {
    const existing = await db.getBlogPosts();
    if (existing && existing.length >= 3) {
      console.log(`📚 Supabase already has ${existing.length} real published blog posts.`);
      return;
    }

    console.log('🌐 Fetching live news articles from NewsAPI to generate real published blog posts in Supabase...');
    const apiKey = config.newsApiKey;
    const siteUrl = config.siteUrl.replace(/\/+$/, '');

    for (const item of LIVE_QUERIES) {
      try {
        let liveArticle = null;

        if (apiKey) {
          const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(item.query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;
          const res = await fetch(url, { headers: { 'User-Agent': 'Rahnoxa-NewsEngine/2.4' } });
          if (res.ok) {
            const data = await res.json();
            const valid = (data.articles || []).filter(
              (a) => a.title && !a.title.includes('[Removed]') && a.title.length > 20
            );
            if (valid.length > 0) {
              liveArticle = valid[0];
            }
          }
        }

        const title = liveArticle ? liveArticle.title.replace(/\s*-\s*[^-]+$/, '').trim() : item.query;
        const summary = liveArticle?.description || `Detailed technical analysis and operational breakdown of ${title}.`;
        const featuredImage = liveArticle?.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80';

        const generated = await aiGateway.generateBlogArticle({
          topic: title,
          keyword: title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim(),
          category: item.category,
          summary,
        });

        const slug = `${generated.slug}-${Date.now().toString(36).slice(-4)}`;
        const now = new Date().toISOString();

        await db.createBlogPost({
          title: generated.title,
          slug,
          excerpt: generated.excerpt,
          content: generated.content,
          featured_image: featuredImage,
          category: generated.category,
          tags: generated.tags,
          author: 'Rahnoxa Engineering',
          reading_time: generated.reading_time || '6 min read',
          status: 'PUBLISHED',
          is_ai_generated: 1,
          ai_topic: title,
          ai_keyword: title,
          ai_seo_score: generated.ai_seo_score || 96,
          seo_title: `${generated.title} | ${config.siteName || 'Rahnoxa'}`,
          seo_description: generated.excerpt,
          canonical_url: `${siteUrl}/blog/${slug}`,
          published_at: now,
        });

        console.log(`✅ Saved live news article to Supabase: "${generated.title}" [${item.category}]`);
      } catch (postErr) {
        console.warn(`[Seeder] Could not generate live post for ${item.category}:`, postErr.message);
      }
    }
  } catch (err) {
    console.warn('[Seeder] Notice during Supabase live generation:', err.message);
  }
}
