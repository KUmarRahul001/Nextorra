import { db } from '../../database/supabase.js';
import { SEED_BLOG_POSTS } from './seedBlogPosts.js';

export async function ensureSupabaseBlogPostsSeeded() {
  try {
    const existing = await db.getBlogPosts();
    if (!existing || existing.length === 0) {
      console.log('📦 Supabase blog_posts table is empty. Inserting real published articles directly into Supabase PostgreSQL...');
      for (const post of SEED_BLOG_POSTS) {
        try {
          await db.createBlogPost(post);
        } catch (postErr) {
          console.warn(`[Seeder] Could not insert post ${post.slug}:`, postErr.message);
        }
      }
      console.log(`✅ Successfully seeded real published articles into Supabase PostgreSQL!`);
    } else {
      console.log(`📚 Supabase contains ${existing.length} published blog posts.`);
    }
  } catch (err) {
    console.warn('[Seeder] Notice during Supabase check:', err.message);
  }
}
