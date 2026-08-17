import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects, projectCategories } from '../../data/projects';

const ALL_LABEL = 'All';

// Utility to conditionally join classes
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    if (activeCategory === ALL_LABEL) return projects;
    return projects.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <section
      className="section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      id="portfolio"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.05)_0%,transparent_100%)] pointer-events-none"></div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 inline-block mr-2" aria-hidden="true" />
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Success Stories</h2>
          <p className="text-gray-600 text-lg">
            Discover how we&apos;ve helped businesses achieve their digital goals
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[ALL_LABEL, ...projectCategories].map((category, index) => (
            <motion.button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => handleCategoryChange(category)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'px-6 py-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl">
                {/* Image Container */}
                <div className="relative aspect-[16/12] overflow-hidden">
                  <img
                    src={item.images[0] as unknown as string}
                    alt={`${item.isDemo ? 'Demo: ' : ''}${item.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Demo badge */}
                  {item.isDemo && (
                    <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
                      Demo
                    </span>
                  )}
                  {/* Overlay */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-b from-transparent to-primary/90 transition-opacity duration-300 pointer-events-none',
                      hoveredItem === item.id ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                    )}
                    aria-hidden={hoveredItem !== item.id}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <ExternalLink
                          className="h-5 w-5"
                          aria-label={`External link for ${item.title}`}
                          role="img"
                          tabIndex={-1}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/90 text-sm mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/10 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <button onClick={() => navigate('/get-started')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-lg shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          type='button'>
            Start Your Project
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
