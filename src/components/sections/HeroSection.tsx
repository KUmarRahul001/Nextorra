import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiCode, FiLayers, FiChevronRight, FiChevronLeft, FiRotateCcw } from 'react-icons/fi';
import { HiOutlineBolt } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

type CapabilityId = 'ownership' | 'typescript' | 'erp' | 'performance';
type InteractionPhase = 'idle' | 'swapping' | 'settled' | 'expanded';

interface Capability {
  id: CapabilityId;
  label: string;
  title: string;
  description: string;
  details: string[];
  techTags: string[];
  route: string;
  badgeBg: string;
  icon: React.ReactNode;
  homeOffset: { x: number; y: number }; // Coordinate offset relative to center (0, 0)
}

// 4 distinct coordinate positions in authoritative order (1 -> 2 -> 3 -> 4)
const capabilities: Capability[] = [
  {
    id: 'ownership',
    label: 'Custom Engineering',
    title: 'Custom Engineering',
    description: 'Custom software built around the actual requirements of your business with direct repository handover.',
    details: ['Architecture Scoped', 'Strict Source Control', 'Zero Vendor Lock-in'],
    techTags: ['Git Repos', 'Clean Code', 'Full Transfer'],
    route: '/services/web-development',
    badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    icon: <FiShield className="h-4 w-4 text-emerald-600" />,
    homeOffset: { x: 0, y: -160 }, // 01 Top
  },
  {
    id: 'typescript',
    label: 'TypeScript Core',
    title: 'Type-Safe Architecture',
    description: 'Maintainable frontend and backend architectures with end-to-end type safety and automated testing.',
    details: ['React 18 & Vite', 'Typed REST / Node APIs', 'Component-Driven UI'],
    techTags: ['React', 'TypeScript', 'Node.js'],
    route: '/services/full-stack-web-apps',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: <FiCode className="h-4 w-4 text-blue-600" />,
    homeOffset: { x: 165, y: 0 }, // 02 Right
  },
  {
    id: 'erp',
    label: 'Enterprise ERP',
    title: 'Operational Systems',
    description: 'Custom ERP and business logic modules built around real operational workflows and audit trails.',
    details: ['Role-Based RBAC', 'PostgreSQL Models', 'Multi-Branch Workflows'],
    techTags: ['ERP', 'RBAC', 'PostgreSQL'],
    route: '/services/erp-enterprise-applications',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    icon: <FiLayers className="h-4 w-4 text-indigo-600" />,
    homeOffset: { x: -165, y: 0 }, // 03 Left
  },
  {
    id: 'performance',
    label: 'Optimized Systems',
    title: 'Performance Focus',
    description: 'High-throughput system architecture with fast CDN rendering and efficient query caching.',
    details: ['Global CDN Edge', 'Optimized Assets', 'ACID Reliability'],
    techTags: ['Vite', 'Cloudflare', 'Redis Cache'],
    route: '/services/custom-software-api-integration',
    badgeBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    icon: <HiOutlineBolt className="h-4 w-4 text-cyan-600" />,
    homeOffset: { x: 0, y: 160 }, // 04 Bottom
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<CapabilityId | null>(null);
  const [phase, setPhase] = useState<InteractionPhase>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRef.current.forEach(t => clearTimeout(t));
    timerRef.current = [];
  };

  // Close / Final Reset back to IDLE
  const closeActive = () => {
    if (activeId === null) return;
    clearAllTimers();
    setPhase('swapping');
    const t1 = setTimeout(() => {
      setActiveId(null);
      setPhase('idle');
    }, 550);
    timerRef.current.push(t1);
  };

  // Click outside to collapse back to IDLE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (activeId !== null && (phase === 'settled' || phase === 'expanded')) {
          closeActive();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      clearAllTimers();
    };
  }, [activeId, phase]);

  // Click handler on capability node
  const handleNodeClick = (targetId: CapabilityId) => {
    if (phase === 'swapping') return;
    clearAllTimers();

    // 1. If this capability is currently settled at center -> Second click expands details!
    if (activeId === targetId && phase === 'settled') {
      setPhase('expanded');
      return;
    }

    // 2. If it's already expanded and clicked -> Collapse back home to IDLE
    if (activeId === targetId && phase === 'expanded') {
      closeActive();
      return;
    }

    // 3. If another capability is active -> Return previous home, then swap new one to center & SETTLE
    if (activeId !== null && activeId !== targetId) {
      setPhase('swapping');
      const t1 = setTimeout(() => {
        setActiveId(targetId);
        setPhase('swapping');
        // Travel duration (550ms) -> Arrive and settle in center (waiting for second click to expand!)
        const t2 = setTimeout(() => {
          setPhase('settled');
        }, 550);
        timerRef.current.push(t2);
      }, 400);
      timerRef.current.push(t1);
      return;
    }

    // 4. Fresh swap from idle: Node travels to center, RX travels to node's home -> SETTLED
    setActiveId(targetId);
    setPhase('swapping');

    const t1 = setTimeout(() => {
      setPhase('settled');
    }, 550);
    timerRef.current.push(t1);
  };

  // NEXT BUTTON / BACK TO OVERVIEW HANDLER
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeId === null || phase === 'swapping') return;

    const currentIdx = capabilities.findIndex(c => c.id === activeId);

    // Requirement B: If on the 4th (final) capability, "Back to Overview" performs Final Reset to IDLE!
    if (currentIdx === capabilities.length - 1) {
      closeActive();
      return;
    }

    // Next capability (1 -> 2, 2 -> 3, 3 -> 4) -> Swap to center and SETTLE (waiting for user click!)
    const nextIdx = currentIdx + 1;
    clearAllTimers();
    setPhase('swapping');
    const t1 = setTimeout(() => {
      setActiveId(capabilities[nextIdx].id);
      setPhase('swapping');
      const t2 = setTimeout(() => {
        setPhase('settled');
      }, 550);
      timerRef.current.push(t2);
    }, 400);
    timerRef.current.push(t1);
  };

  // PREV BUTTON HANDLER
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeId === null || phase === 'swapping') return;

    const currentIdx = capabilities.findIndex(c => c.id === activeId);
    if (currentIdx === 0) {
      closeActive();
      return;
    }

    const prevIdx = currentIdx - 1;
    clearAllTimers();
    setPhase('swapping');
    const t1 = setTimeout(() => {
      setActiveId(capabilities[prevIdx].id);
      setPhase('swapping');
      const t2 = setTimeout(() => {
        setPhase('settled');
      }, 550);
      timerRef.current.push(t2);
    }, 400);
    timerRef.current.push(t1);
  };

  // Find active capability object
  const activeCapability = capabilities.find(c => c.id === activeId);
  const activeIdx = capabilities.findIndex(c => c.id === activeId);
  const isFinalCapability = activeIdx === capabilities.length - 1;

  // Where does RX logo travel? When active, RX translates to the active capability's homeOffset
  const rxTargetPos = activeCapability ? activeCapability.homeOffset : { x: 0, y: 0 };

  return (
    <>
      <SEO
        title="Rahnoxa – Custom Software Engineering & Cloud Solutions"
        description="Rahnoxa designs, builds, and deploys custom web applications, enterprise ERP platforms, APIs, and scalable mobile systems."
        keywords="software engineering, custom ERP development, web apps, API architecture, mobile apps, SaaS, Rahnoxa Jharkhand"
        url="https://rahnoxa.pages.dev/"
        type="website"
      />

      <section className="relative min-h-[90vh] flex items-center bg-[#FAFCFF] text-slate-900 pt-32 pb-24 overflow-hidden gradient-mesh-light border-b border-slate-200/80">
        {/* Soft Ambient Background Highlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill / Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 max-w-fit mb-8 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="font-mono text-blue-700">Next-Gen Software &amp; Cloud Systems</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono text-[11px]">Production Engineering</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Direct Commercial & Engineering Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Bespoke Software Engineering for{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  High-Growth Businesses
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
                We design and engineer scalable web applications, enterprise ERP systems, and custom API backends with robust TypeScript codebases, clean databases, and zero vendor lock-in.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all inline-flex items-center gap-2 group"
                >
                  <span>Start a Project</span>
                  <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline px-6 py-3.5 text-sm sm:text-base font-semibold bg-white/80 hover:bg-white text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs transition-all inline-flex items-center gap-2"
                >
                  <span>Explore 14 Services</span>
                </button>
              </div>

              {/* Truthful Commitments */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl text-left">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Milestone Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Strict TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">30-Day Warranty</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Click-to-Expand Spatial Position-Swap Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[520px]"
            >
              {/* Engineering Blueprint Coordinate Canvas */}
              <div 
                ref={containerRef}
                className="relative w-full max-w-[500px] h-[480px] sm:h-[520px] flex items-center justify-center select-none"
              >
                {/* ── Subtle Static Engineering Coordinate Guides ── */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" fill="none">
                  <circle cx="250" cy="250" r="160" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
                  <line x1="250" y1="90" x2="250" y2="410" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 3" />
                  <line x1="90" y1="250" x2="410" y2="250" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 3" />
                </svg>

                {/* ── CENTRAL RX BRAND MARK (Visibly Translates to Active Capability's Home Position) ── */}
                <motion.div
                  animate={{ 
                    x: rxTargetPos.x, 
                    y: rxTargetPos.y,
                    scale: activeId !== null ? 0.85 : 1,
                  }}
                  transition={{ 
                    duration: 0.55, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  onClick={() => {
                    if (activeId !== null && (phase === 'settled' || phase === 'expanded')) {
                      closeActive();
                    }
                  }}
                  className="absolute z-10 flex items-center justify-center cursor-pointer select-none"
                  title="Rahnoxa Core Brand Anchor"
                  aria-label="Rahnoxa Core Brand Anchor"
                >
                  <img 
                    src="/brand/logo-symbol-transparent.png" 
                    alt="Rahnoxa" 
                    className="h-20 sm:h-24 w-auto object-contain drop-shadow-xs" 
                    loading="eager"
                  />
                </motion.div>

                {/* ── 4 CAPABILITY NODES (Move to Center -> Settle -> Second Click Expands Details) ── */}
                {capabilities.map((cap, idx) => {
                  const isActive = activeId === cap.id;
                  const isOther = activeId !== null && !isActive;
                  const isSettledAtCenter = isActive && phase === 'settled';
                  const isFullyExpanded = isActive && phase === 'expanded';

                  // Target coordinates: Active node translates to (0, 0) [Exact Center], inactive stays at homeOffset
                  const targetPosition = isActive ? { x: 0, y: 0 } : cap.homeOffset;

                  return (
                    <motion.div
                      key={cap.id}
                      animate={{
                        x: targetPosition.x,
                        y: targetPosition.y,
                        opacity: isOther ? 0.35 : 1,
                        zIndex: isActive ? 40 : 20,
                      }}
                      transition={{
                        x: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                        y: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.3 },
                      }}
                      className="absolute"
                    >
                      <button
                        type="button"
                        onClick={() => handleNodeClick(cap.id)}
                        aria-expanded={isFullyExpanded}
                        aria-label={
                          isSettledAtCenter 
                            ? `Click to open ${cap.title} details` 
                            : `${cap.title} capability node`
                        }
                        disabled={phase === 'swapping'}
                        className={`text-left rounded-xl bg-white border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                          isFullyExpanded
                            ? 'w-[290px] sm:w-[340px] p-5 shadow-2xl shadow-blue-500/15 border-blue-400 ring-1 ring-blue-400/20'
                            : isSettledAtCenter
                            ? 'w-[210px] sm:w-[230px] px-4 py-3 shadow-lg border-blue-500 ring-2 ring-blue-500/20 cursor-pointer animate-pulse'
                            : 'w-[175px] sm:w-[190px] px-3.5 py-2.5 shadow-xs border-slate-200 hover:border-blue-300 hover:shadow-sm cursor-pointer'
                        }`}
                      >
                        {!isFullyExpanded ? (
                          /* Compact State (During Transit & While Settled at Center) */
                          <div className="flex items-center gap-2.5">
                            <span className={`p-1.5 rounded-lg border ${cap.badgeBg} flex-shrink-0`}>
                              {cap.icon}
                            </span>
                            <div className="truncate">
                              <span className="text-xs font-bold text-slate-800 tracking-tight block truncate">
                                {cap.label}
                              </span>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className={`text-[9.5px] font-mono font-semibold block ${isSettledAtCenter ? 'text-blue-600' : 'text-slate-400'}`}>
                                  {isSettledAtCenter ? 'Click to open details ↵' : 'Click to explore'}
                                </span>
                                {isSettledAtCenter && (
                                  <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1 rounded ml-1">
                                    0{idx + 1}/04
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Expanded State (Triggered strictly on second click of centered node!) */
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-3.5"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-blue-50 text-blue-600">{cap.icon}</span>
                                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                                  {cap.title}
                                </h4>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                0{idx + 1} / 04
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                              {cap.description}
                            </p>

                            {/* 3-4 Supporting Details */}
                            <div className="space-y-1.5 pt-0.5">
                              {cap.details.map((detail, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                  <span className="font-medium">{detail}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {cap.techTags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer Navigation & Service Specs Link */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(cap.route);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>Service Specs</span>
                                <FiArrowRight className="h-3 w-3" />
                              </span>

                              <div className="flex items-center gap-1.5">
                                {idx > 0 && (
                                  <button
                                    type="button"
                                    onClick={handlePrev}
                                    aria-label="Previous capability"
                                    className="text-[11px] font-mono font-bold text-slate-700 hover:text-blue-600 p-1.5 rounded bg-slate-100 hover:bg-blue-50 transition-colors inline-flex items-center"
                                  >
                                    <FiChevronLeft className="h-3.5 w-3.5" />
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={handleNext}
                                  aria-label={isFinalCapability ? 'Back to Overview' : 'Next capability'}
                                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 ${
                                    isFinalCapability 
                                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs' 
                                      : 'bg-slate-100 text-slate-800 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                >
                                  <span>{isFinalCapability ? 'Back to Overview' : 'Next'}</span>
                                  {isFinalCapability ? (
                                    <FiRotateCcw className="h-3 w-3" />
                                  ) : (
                                    <FiChevronRight className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}

              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;