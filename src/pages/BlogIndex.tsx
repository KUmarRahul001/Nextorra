import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import config from '../config';
import { api } from '../lib/api';

const CATEGORIES = [
  'All',
  'Software Architecture',
  'ERP & Enterprise',
  'SaaS & Cloud',
  'Software Engineering',
  'Database & Cloud',
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

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Technical Blog &amp; Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Software Architecture &amp; Engineering Articles
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              In-depth engineering analyses, architectural patterns, and practical guides on building custom ERPs, SaaS platforms, and enterprise software systems.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pt-6 border-t border-slate-800/80">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tags..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="py-20 text-center text-slate-500">Loading articles...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800 p-8 max-w-lg mx-auto">
              <h3 className="text-lg font-bold text-white mb-2">No articles found</h3>
              <p className="text-sm text-slate-400 mb-6">
                Try selecting a different category or search term.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
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
                  className="group relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-cyan-300 font-semibold border border-blue-500/30">
                          {featuredPost.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredPost.reading_time || '5 min read'}
                        </span>
                        {featuredPost.is_ai_generated && (
                          <span className="flex items-center gap-1 text-indigo-400">
                            <Sparkles className="h-3 w-3" />
                            AI Validated
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-blue-400 transition-colors leading-tight">
                        <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {featuredPost.tags?.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-cyan-300 transition-colors"
                        >
                          Read Full Engineering Article
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-5 h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60">
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
                      className="group flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300"
                    >
                      <div className="h-44 overflow-hidden bg-slate-800 relative">
                        <img
                          src={post.featured_image || '/assets/image.png'}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-cyan-300 border border-slate-700">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time || '5 min'}
                            </span>
                          </div>

                          <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-500">{post.author || 'Rahnoxa'}</span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-cyan-300 transition-colors"
                          >
                            Read Article
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
