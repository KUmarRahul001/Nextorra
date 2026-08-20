import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import config from '../config';
import { api } from '../lib/api';

const CATEGORIES = [
  'All',
  'Cybersecurity & Threats',
  'Fraud & Scam Prevention',
  'AI & Machine Learning',
  'Software Architecture',
  'ERP & Enterprise',
  'SaaS & Cloud',
  'Software Engineering',
];

const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.getBlogPosts({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
        });
        setPosts(res.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title={`Engineering Blog & Insights – ${config.siteName}`}
        description={`Technical articles, software architecture guides, ERP strategies, and SaaS engineering insights from the ${config.siteName} team.`}
        keywords={`${config.siteName} blog, software engineering blog, custom erp architecture, saas product development, api integration guides`}
        url={`${config.siteUrl}/blog`}
        canonical={`${config.siteUrl}/blog`}
      />

      <div className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-20 gradient-mesh-light">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-4 shadow-2xs">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              Technical Blog &amp; Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Software Architecture &amp; Engineering Articles
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              In-depth engineering analyses, architectural patterns, and practical guides on building custom ERPs, SaaS platforms, and enterprise software systems.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pt-6 border-t border-slate-200">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tags..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-2xs"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="py-20 text-center text-slate-500">Loading articles...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-sm text-slate-600 mb-6">
                Try selecting a different category or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn btn-primary text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Top Article */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 font-mono">
                          <Clock className="h-3.5 w-3.5 text-blue-600" />
                          {featuredPost.reading_time || '5 min read'}
                        </span>
                        {featuredPost.is_ai_generated && (
                          <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                            <Sparkles className="h-3 w-3" />
                            AI Validated
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {featuredPost.tags?.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                        >
                          <span>Read Full Engineering Article</span>
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                      <img
                        src={featuredPost.featured_image || '/assets/image.png'}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid of Remaining Articles */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-300 shadow-xs"
                    >
                      <div className="h-44 overflow-hidden bg-slate-100 relative">
                        <img
                          src={post.featured_image || '/assets/image.png'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-white/95 text-[11px] font-semibold text-blue-700 border border-slate-200 shadow-xs">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mb-2.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time || '5 min'}
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">{post.author || 'Rahnoxa'}</span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
