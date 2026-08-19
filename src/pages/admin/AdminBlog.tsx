import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Sparkles,
  Eye,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  Save,
  Send,
  X,
} from 'lucide-react';
import { api } from '../../lib/api';

const CATEGORIES = [
  'Software Architecture',
  'ERP & Enterprise',
  'SaaS & Cloud',
  'Software Engineering',
  'Database & Cloud',
  'Mobile Engineering',
];

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const [currentPost, setCurrentPost] = useState<any>({
    title: '',
    slug: '',
    category: 'Software Architecture',
    excerpt: '',
    content: '',
    featured_image: '/assets/image.png',
    tags: 'ERP, Architecture, Cloud',
    author: 'Rahnoxa Engineering',
    status: 'DRAFT',
    seo_title: '',
    seo_description: '',
  });

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const res = await api.getBlogPosts({ all: true });
      setPosts(res.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleOpenNew = () => {
    setCurrentPost({
      title: '',
      slug: '',
      category: 'Software Architecture',
      excerpt: '',
      content: `## Introduction\n\nEnter article overview...\n\n### Architectural Key Points\n\n1. Point one\n2. Point two\n\n### Conclusion\n\nSummary and call to action.`,
      featured_image: '/assets/image.png',
      tags: 'Software, Architecture',
      author: 'Rahnoxa Engineering',
      status: 'DRAFT',
      seo_title: '',
      seo_description: '',
    });
    setIsEditing(true);
    setActiveTab('write');
  };

  const handleOpenEdit = (post: any) => {
    setCurrentPost({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
    });
    setIsEditing(true);
    setActiveTab('write');
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.deleteBlogPost(slug);
      loadPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete post');
    }
  };

  const handleSave = async (statusOverride?: string) => {
    if (!currentPost.title || !currentPost.content) {
      alert('Please fill in title and content');
      return;
    }

    const payload = {
      ...currentPost,
      tags: currentPost.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      status: statusOverride || currentPost.status,
    };

    try {
      if (currentPost.id && currentPost.slug) {
        await api.updateBlogPost(currentPost.slug, payload);
      } else {
        await api.createBlogPost(payload);
      }
      setIsEditing(false);
      loadPosts();
    } catch (err: any) {
      alert(err.message || 'Failed to save blog post');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {!isEditing ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="h-6 w-6 text-indigo-400" />
                Blog &amp; Content Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Create, review, edit, and publish technical SEO articles. Review automated AI drafts before releasing publicly.
              </p>
            </div>

            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Write New Article
            </button>
          </div>

          {/* Posts Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#F8FAFC]/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Origin</th>
                    <th className="py-3.5 px-4">SEO Score</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        Loading articles...
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        No articles found. Click "Write New Article" or trigger Daily SEO Automation.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{post.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">
                              {post.excerpt}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-700 font-medium">
                            {post.category}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          {post.is_ai_generated ? (
                            <span className="inline-flex items-center gap-1 text-cyan-400 text-[11px]">
                              <Sparkles className="h-3 w-3" />
                              AI Generated
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Manual</span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-mono font-bold text-emerald-400">
                            {post.ai_seo_score || 90}/100
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                              post.status === 'PUBLISHED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : post.status === 'SCHEDULED'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 rounded-lg bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-blue-600 transition-colors"
                            title="Edit / Review Article"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.slug)}
                            className="p-1.5 rounded-lg bg-slate-50 text-slate-700 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* ── Full Article Editor ── */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles List
            </button>

            <div className="flex items-center gap-2">
              <div className="bg-white border border-slate-200 rounded-lg p-1 flex gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'write' ? 'bg-blue-600 text-slate-900 font-semibold' : 'text-slate-500'
                  }`}
                >
                  Markdown Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'preview' ? 'bg-blue-600 text-slate-900 font-semibold' : 'text-slate-500'
                  }`}
                >
                  Live Preview
                </button>
              </div>

              <button
                onClick={() => handleSave('DRAFT')}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-700 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                Save Draft
              </button>
              <button
                onClick={() => handleSave('PUBLISHED')}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-slate-900 text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 transition-colors flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Publish Live
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Editor / Preview Column */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                  placeholder="e.g. Architecting Scalable Custom ERP Systems..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Summary / Meta Excerpt *
                </label>
                <textarea
                  rows={2}
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  placeholder="Brief synopsis for SEO description and card previews..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {activeTab === 'write' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    Markdown Article Content *
                  </label>
                  <textarea
                    rows={18}
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed"
                  />
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 min-h-[400px]">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">{currentPost.title}</h2>
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-700 whitespace-pre-line">
                    {currentPost.content}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Meta Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3.5 text-xs">
                <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-200">
                  Publishing &amp; Taxonomy
                </h3>

                <div>
                  <label className="block text-slate-500 mb-1">Category</label>
                  <select
                    value={currentPost.category}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={currentPost.tags}
                    onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value })}
                    placeholder="ERP, React, Cloud"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={currentPost.featured_image}
                    onChange={(e) => setCurrentPost({ ...currentPost, featured_image: e.target.value })}
                    placeholder="/assets/image.png"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Author</label>
                  <input
                    type="text"
                    value={currentPost.author}
                    onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">Status</label>
                  <select
                    value={currentPost.status}
                    onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published Live</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
