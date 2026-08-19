import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowRight, Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { projects as fallbackProjects, projectCategories as defaultCategories } from '../../data/projects';

const ALL_LABEL = 'All';

// Utility to conditionally join classes
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const PortfolioSection: React.FC = () => {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await api.getProjects('PUBLISHED');
        if (res && res.projects && res.projects.length > 0) {
          // Normalize projects data from DB
          const normalized = res.projects.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            tags: Array.isArray(p.technologies)
              ? p.technologies
              : typeof p.technologies === 'string'
              ? p.technologies.split(',').map((t: string) => t.trim())
              : ['Engineering'],
            description: p.short_description || p.full_description || '',
            images: Array.isArray(p.images) && p.images.length > 0
              ? p.images
              : [p.thumbnail || '/assets/image.png'],
            demoUrl: p.demo_url,
            githubUrl: p.github_url,
            featured: Boolean(p.featured),
          }));
          setDbProjects(normalized);
        } else {
          setDbProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn('Could not fetch remote projects from API, using catalog items:', err);
        setDbProjects(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveProjects();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeProjects = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  const categories = useMemo(() => {
    const cats = new Set<string>();
    activeProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).length > 0 ? Array.from(cats) : defaultCategories;
  }, [activeProjects]);

  const filteredItems = useMemo(() => {
    if (activeCategory === ALL_LABEL) return activeProjects;
    return activeProjects.filter((item) => item.category === activeCategory);
  }, [activeCategory, activeProjects]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <section
      className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80"
      id="portfolio"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 text-cyan-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Engineering Showcases
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Our Success Stories
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore scalable platforms, custom systems, and high-performance digital products engineered by Rahnoxa.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {[ALL_LABEL, ...categories].map((category, index) => (
            <motion.button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => handleCategoryChange(category)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800'
              )}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-2xl transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-1.5 flex flex-col h-full">
                {/* Image Container (Click to Zoom Preview) */}
                <div
                  onClick={() => setSelectedImage(item.images[0])}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer group/img"
                  title="Click to zoom image"
                >
                  <img
                    src={item.images[0] as unknown as string}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                    {item.category}
                  </span>

                  {/* Zoom indicator on hover */}
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-white text-[11px] font-medium shadow-xl flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-cyan-400" />
                      Click to Zoom Image
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      onClick={() => navigate(`/projects/${item.slug || item.id}`)}
                      className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer flex items-center justify-between group-hover:text-blue-400"
                    >
                      <span>{item.title}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 flex-shrink-0 ml-2" />
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => navigate(`/projects/${item.slug || item.id}`)}
                      className="w-full mt-1 py-2 rounded-xl bg-slate-800/60 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700/80 hover:border-blue-500 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>View Full Case Study &amp; Specs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/get-started')}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="button"
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      {/* ── Image Lightbox Modal for Zooming ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in duration-200"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white shadow-2xl transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full size showcase preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;

