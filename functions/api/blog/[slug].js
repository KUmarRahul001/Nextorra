import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

export async function onRequestGet(context) {
  const { slug } = context.params;
  const db = await getDB(context);

  const post = await db.getBlogPostBySlug(slug);
  if (!post) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // If unpublished, require admin authorization
  if (post.status !== 'PUBLISHED') {
    const auth = await requireAuth(context);
    if (!auth.authenticated) {
      return new Response(
        JSON.stringify({ error: 'Post is not published' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response(
    JSON.stringify({ post }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const { slug } = context.params;
  const data = await context.request.json();
  const db = await getDB(context);

  const post = await db.getBlogPostBySlug(slug);
  if (!post) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const updatedData = { ...data };
  if (data.status === 'PUBLISHED' && !post.published_at) {
    updatedData.published_at = new Date().toISOString();
  }

  const updated = await db.updateBlogPost(post.id, updatedData);

  return new Response(
    JSON.stringify({ success: true, post: updated }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestDelete(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const { slug } = context.params;
  const db = await getDB(context);
  const post = await db.getBlogPostBySlug(slug);

  if (!post) {
    return new Response(
      JSON.stringify({ error: 'Blog post not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  await db.deleteBlogPost(post.id);

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
