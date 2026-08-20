import { db } from '../../database/supabase.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errors.js';
import { SEED_BLOG_POSTS } from '../data/seedBlogPosts.js';

export class BlogService {
  static async list({ category, all, isAuth }) {
    if (all === 'true' && !isAuth) {
      throw new ForbiddenError('Authentication required to access draft articles');
    }

    const filters = all === 'true' ? { category } : { status: 'PUBLISHED', category };
    try {
      const posts = await db.getBlogPosts(filters);
      if (posts && posts.length > 0) {
        return posts;
      }
    } catch (err) {
      console.warn('[BlogService] Database query error, returning seed catalog:', err.message);
    }

    // Fallback: Filter seed articles
    let seeded = SEED_BLOG_POSTS;
    if (category && category !== 'All') {
      seeded = seeded.filter((p) => p.category === category);
    }
    return seeded;
  }

  static async getBySlug(slug, isAuth) {
    try {
      const post = await db.getBlogPostBySlug(slug);
      if (post) {
        if (post.status !== 'PUBLISHED' && !isAuth) {
          throw new ForbiddenError('Article is in draft review');
        }
        return post;
      }
    } catch (err) {
      if (err instanceof ForbiddenError) throw err;
      console.warn('[BlogService] Database slug query error:', err.message);
    }

    // Fallback to seed catalog
    const seedPost = SEED_BLOG_POSTS.find((p) => p.slug === slug);
    if (seedPost) return seedPost;

    throw new NotFoundError('Article not found');
  }

  static async create(data) {
    if (!data.title || !data.content) {
      throw new BadRequestError('Title and content are required');
    }
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.excerpt || data.content.substring(0, 160).replace(/[#*`]/g, '') + '...';
    const words = data.content.split(/\s+/).length;
    const reading_time = `${Math.ceil(words / 200)} min read`;

    return db.createBlogPost({
      ...data,
      slug,
      excerpt,
      reading_time,
      status: data.status || 'DRAFT',
    });
  }

  static async update(slugOrId, data) {
    const updated = await db.updateBlogPost(slugOrId, data);
    if (!updated) throw new NotFoundError('Article not found');
    return updated;
  }

  static async delete(slugOrId) {
    const deleted = await db.deleteBlogPost(slugOrId);
    if (!deleted) throw new NotFoundError('Article not found');
    return { slugOrId, deleted: true };
  }
}
