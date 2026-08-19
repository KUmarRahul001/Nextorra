import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ExternalLink, ArrowRight, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { projects as fallbackProjects, projectCategories as defaultCategories } from '../../data/projects';

const ALL_LABEL = 'All';

const PortfolioSection: React.FC = () => {
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await api.getProjects('PUBLISHED');
        if (res && res.projects && res.projects.length > 0) {
          const normalized = res.projects.map((p: any) => ({
            id: p.id,
            slug: p.slug || p.id,
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
              : [p.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'],
            demoUrl: p.demo_url,
            githubUrl: p.github_url,
            featured: Boolean(p.featured),
          }));
          setDbProjects(normalized);
        } else {
          setDbProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn('Using fallback projects:', err);
        setDbProjects(fallbackProjects);
      }
    };

    fetchLiveProjects();
  }, []);

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

  return (
    <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-2">
              Engineering Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Production Work &amp; Systems
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Real architecture specifications, multi-branch deployments, and bespoke web platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[ALL_LABEL, ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric / Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-350 hover:shadow-lg transition-all group"
            >
              {/* Media Preview (Click to Zoom) */}
              <div
                onClick={() => setSelectedImage(item.images[0])}
                className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                title="Click image to zoom full screen"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/95 border border-slate-200 text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider shadow-sm">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded bg-white/95 text-slate-900 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Eye className="h-3.5 w-3.5 text-blue-600" />
                    <span>Zoom Preview</span>
                  </span>
                </div>
              </div>

              {/* Information Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3
                    onClick={() => navigate(`/projects/${item.slug || item.id}`)}
                    className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/projects/${item.slug || item.id}`)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/get-started')}
            className="btn btn-primary"
          >
            <span>Request Custom Architecture Quote</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Lightbox Zoom */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-md"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Full size project preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
