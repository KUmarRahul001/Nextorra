import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get('status') || 'PUBLISHED';
  const category = url.searchParams.get('category');
  const all = url.searchParams.get('all') === 'true';

  const db = await getDB(context);
  let posts;

  if (all) {
    // Admin request for all posts regardless of status
    const auth = await requireAuth(context);
    if (!auth.authenticated) {
      return auth.response;
    }
    posts = await db.getBlogPosts({ category });
  } else {
    // Public request — only published posts
    posts = await db.getBlogPosts({ status: 'PUBLISHED', category });
  }

  return new Response(
    JSON.stringify({ posts }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const data = await context.request.json();
    if (!data.title || !data.content) {
      return new Response(
        JSON.stringify({ error: 'Title and Content are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = data.excerpt || data.content.substring(0, 160).replace(/[#*`]/g, '') + '...';
    const words = data.content.split(/\s+/).length;
    const reading_time = `${Math.ceil(words / 200)} min read`;

    const db = await getDB(context);
    const post = await db.createBlogPost({
      ...data,
      slug,
      excerpt,
      reading_time,
      status: data.status || 'DRAFT',
      category: data.category || 'Software Engineering',
      tags: Array.isArray(data.tags) ? data.tags : ['Software', 'Architecture'],
      author: data.author || 'Rahnoxa Engineering',
      published_at: data.status === 'PUBLISHED' ? new Date().toISOString() : null,
    });

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
