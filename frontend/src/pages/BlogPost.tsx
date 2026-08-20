import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import SEO from '../components/SEO';
import config from '../config';
import { api } from '../lib/api';
import { SEED_BLOG_POSTS } from '../data/seedBlogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const res = await api.getBlogPost(slug);
        if (res.post) {
          setPost(res.post);
        } else {
          const fallback = SEED_BLOG_POSTS.find((p) => p.slug === slug);
          if (fallback) {
            setPost(fallback);
          } else {
            setError('Article not found');
          }
        }
      } catch (err: any) {
        const fallback = SEED_BLOG_POSTS.find((p) => p.slug === slug);
        if (fallback) {
          setPost(fallback);
        } else {
          setError(err.message || 'Article not found');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFCFF] text-slate-500 flex items-center justify-center pt-20">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm">Loading technical article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFCFF] text-slate-800 flex items-center justify-center pt-20 px-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-sm text-slate-600">
            The article you requested could not be found or has not been published yet.
          </p>
          <Link
            to="/blog"
            className="btn btn-primary text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? `${config.siteUrl}${post.featured_image}` : undefined,
    author: {
      '@type': 'Organization',
      name: config.siteName,
      url: config.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.siteUrl}/logo.png`,
      },
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: `${config.siteUrl}/blog/${post.slug}`,
  };

  // Enhanced clean markdown-to-html paragraph formatter
  const renderFormattedText = (text: string) => {
    // Parse bold text and markdown links
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, linkText, linkUrl] = match;
          if (linkUrl.startsWith('/')) {
            return (
              <Link key={idx} to={linkUrl} className="text-blue-600 font-semibold hover:underline">
                {linkText}
              </Link>
            );
          }
          return (
            <a key={idx} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
              {linkText}
            </a>
          );
        }
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      if (trimmed === '---') {
        return <hr key={i} className="my-8 border-slate-200" />;
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={i} className="text-lg font-bold text-slate-900 mt-6 mb-2 tracking-tight">
            {renderFormattedText(trimmed.replace('#### ', ''))}
          </h4>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">
            {renderFormattedText(trimmed.replace('### ', ''))}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-10 mb-4 tracking-tight border-b border-slate-200 pb-2">
            {renderFormattedText(trimmed.replace('## ', ''))}
          </h2>
        );
      }
      if (trimmed.startsWith('|')) {
        const rows = trimmed.split('\n').filter((r) => r.trim().length > 0 && !r.includes(':---'));
        if (rows.length > 0) {
          const headerCells = rows[0].split('|').filter((c) => c.trim().length > 0);
          const bodyRows = rows.slice(1);
          return (
            <div key={i} className="overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold">
                  <tr>
                    {headerCells.map((h, idx) => (
                      <th key={idx} className="p-3 border-r last:border-r-0 border-slate-200">{renderFormattedText(h.trim())}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bodyRows.map((row, rIdx) => {
                    const cells = row.split('|').filter((c) => c.trim().length > 0);
                    return (
                      <tr key={rIdx} className="hover:bg-blue-50/30 transition-colors">
                        {cells.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 border-r last:border-r-0 border-slate-100">{renderFormattedText(cell.trim())}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={i} className="border-l-4 border-blue-600 bg-blue-50/50 rounded-r-xl p-4 my-6 italic text-slate-700">
            {renderFormattedText(trimmed.replace(/^>\s*/, ''))}
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((l) => l.replace(/^[-\*]\s*/, ''));
        return (
          <ul key={i} className="space-y-2 my-4 pl-4 list-disc list-inside text-slate-700 text-sm sm:text-base">
            {items.map((item, idx) => (
              <li key={idx}>{renderFormattedText(item)}</li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((l) => l.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={i} className="space-y-2 my-4 pl-4 list-decimal list-inside text-slate-700 text-sm sm:text-base">
            {items.map((item, idx) => (
              <li key={idx}>{renderFormattedText(item)}</li>
            ))}
          </ol>
        );
      }

      return (
        <p key={i} className="text-slate-700 text-sm sm:text-base leading-relaxed my-4">
          {renderFormattedText(block)}
        </p>
      );
    });
  };

  return (
    <>
      <SEO
        title={`${post.seo_title || post.title} – ${config.siteName}`}
        description={post.seo_description || post.excerpt}
        keywords={post.tags?.join(', ') || 'software development, architecture'}
        url={`${config.siteUrl}/blog/${post.slug}`}
        canonical={post.canonical_url || `${config.siteUrl}/blog/${post.slug}`}
        image={post.og_image || post.featured_image || `${config.siteUrl}/og-image.png`}
        type="article"
        schema={blogSchema}
      />

      <article className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-20 gradient-mesh-light">
        {/* Navigation breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all engineering articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 sm:px-6 max-w-4xl mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-mono">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-mono">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              {post.reading_time || '5 min read'}
            </span>
            {post.is_ai_generated && (
              <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                AI Validated
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-2 border-blue-600 pl-4 italic">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                R
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">{post.author || 'Rahnoxa Engineering'}</span>
                <span className="text-[11px] text-slate-500">Technical Advisory Group</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                title="Share Article"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12">
            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
            <div className="prose max-w-none text-slate-800">
              {renderContent(post.content)}
            </div>

            {/* Bottom Tag List */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 mr-2">Tags:</span>
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 text-white shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to architect software systems like this?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Schedule a technical discovery call with the Rahnoxa engineering team to discuss your application roadmap.
            </p>
            <Link
              to="/get-started"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <span>Start Project Enquiry</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
