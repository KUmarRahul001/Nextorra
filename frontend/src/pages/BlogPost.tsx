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
          setError('Article not found');
        }
      } catch (err: any) {
        setError(err.message || 'Article not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center pt-20">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm">Loading technical article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center pt-20 px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Article Not Found</h2>
          <p className="text-sm text-slate-400">
            The article you requested could not be found or has not been published yet.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
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

  // Simple clean markdown-to-html paragraph formatter
  const renderContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, i) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight border-b border-slate-800 pb-2">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((l) => l.replace('- ', ''));
        return (
          <ul key={i} className="space-y-2 my-4 pl-4 list-disc list-inside text-slate-300 text-sm sm:text-base">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }
      if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
        const items = block.split('\n').map((l) => l.replace(/^\d+\.\s+/, ''));
        return (
          <ol key={i} className="space-y-2 my-4 pl-4 list-decimal list-inside text-slate-300 text-sm sm:text-base">
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        );
      }

      // Convert [text](url) to Link
      return (
        <p key={i} className="text-slate-300 text-sm sm:text-base leading-relaxed my-4">
          {block}
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

      <article className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
        {/* Navigation breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all engineering articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="container mx-auto px-4 sm:px-6 max-w-4xl mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 font-semibold border border-blue-500/30">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {post.reading_time || '5 min read'}
            </span>
            {post.is_ai_generated && (
              <span className="flex items-center gap-1 text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                AI Validated
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-4 italic">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                R
              </div>
              <div>
                <span className="font-semibold text-slate-200 block">{post.author || 'Rahnoxa Engineering'}</span>
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
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
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
            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-500 font-medium mr-2">Topics:</span>
              {post.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Call to Action Box */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-blue-500/30 text-center space-y-4 shadow-xl">
            <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-cyan-400 mb-1">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Ready to Engineer Your Software System?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you are building custom enterprise ERP modules, multi-tenant SaaS, or complex API integrations — Rahnoxa provides milestone-driven technical execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                to="/get-started"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
