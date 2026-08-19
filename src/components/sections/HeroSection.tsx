import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiCode, FiLayers, FiZap, FiChevronRight } from 'react-icons/fi';
import { HiSparkles, HiOutlineBolt, HiOutlineCpuChip } from 'react-icons/hi2';
import { TbCube3dSphere, TbBraces, TbTopologyStar3 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

type CapabilityId = 'ownership' | 'typescript' | 'erp' | 'performance';

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
  positionClasses: string;
}

const capabilities: Capability[] = [
  {
    id: 'ownership',
    label: '100% Code Ownership',
    title: 'Custom Engineering',
    description: 'Custom software built around the actual requirements of your business with direct repository handover.',
    details: ['Architecture Scoped', 'Strict Source Control', 'Zero Vendor Lock-in'],
    techTags: ['Git Repos', 'Clean Code', 'Full Transfer'],
    route: '/services/web-development',
    badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    icon: <FiShield className="h-4 w-4 text-emerald-600" />,
    positionClasses: 'top-2 left-2 sm:top-4 sm:left-4',
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
    positionClasses: 'top-2 right-2 sm:top-4 sm:right-4',
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
    positionClasses: 'bottom-2 left-2 sm:bottom-4 sm:left-4',
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
    positionClasses: 'bottom-2 right-2 sm:bottom-4 sm:right-4',
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<CapabilityId | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Click outside to close expanded capability
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveId(null);
      }
    };

    if (activeId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeId]);

  const toggleCapability = (id: CapabilityId) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const handleNext = (e: React.MouseEvent, currentIdx: number) => {
    e.stopPropagation();
    const nextIdx = (currentIdx + 1) % capabilities.length;
    setActiveId(capabilities[nextIdx].id);
  };

  return (
    <>
      <SEO
        title="Rahnoxa – Custom Software Engineering & Cloud Solutions"
        description="Rahnoxa designs, builds, and deploys custom web applications, enterprise ERP platforms, APIs, and scalable mobile systems."
        keywords="software engineering, custom ERP development, web apps, API architecture, mobile apps, SaaS, Rahnoxa Jharkhand"
        url="https://rahnoxa.pages.dev/"
        type="website"
      />

      <section className="relative min-h-[92vh] flex items-center bg-[#FAFCFF] text-slate-900 pt-32 pb-24 overflow-hidden gradient-mesh-light border-b border-slate-200/80">
        {/* Ambient Lighting Background Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-cyan-400/15 rounded-full blur-[130px] pointer-events-none" />

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

            {/* Right Column: 3D Holographic Interactive Capability Artwork Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[520px] sm:min-h-[560px]"
            >
              {/* Dynamic Ambient Aura Layer */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-400/25 rounded-full blur-3xl pointer-events-none" 
              />

              {/* 3D Perspective Canvas with Click-Outside Ref */}
              <div 
                ref={containerRef}
                className="relative w-full max-w-[520px] h-[520px] sm:h-[560px] flex items-center justify-center perspective-[1400px]"
              >
                
                {/* ── Orbital Track 1: Outer Dashed Particle Ring ── */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[440px] h-[440px] rounded-full border border-blue-300/30 border-dashed pointer-events-none"
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </motion.div>

                {/* ── Orbital Track 2: Inner Ring ── */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[330px] h-[330px] rounded-full border border-indigo-400/20 pointer-events-none"
                >
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                </motion.div>

                {/* ── Central 3D Isometric Hologram Core (With Official Rahnoxa Brand Mark) ── */}
                <motion.div
                  animate={{ 
                    rotateY: [-15, 15, -15],
                    rotateX: [10, -6, 10],
                    y: [-8, 8, -8]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className={`relative w-44 h-44 sm:w-52 sm:h-52 transform-style-preserve-3d flex items-center justify-center transition-all duration-300 ${
                    activeId !== null ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_35px_rgba(59,130,246,0.3)]">
                    <div className="w-full h-full rounded-[28px] bg-slate-950/95 backdrop-blur-2xl p-5 flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/10">
                      
                      {/* Isometric Grid Mesh Texture */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      
                      {/* Laser Compilation Scan Animation */}
                      <motion.div 
                        animate={{ top: ['-10%', '110%', '-10%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee] pointer-events-none"
                      />

                      {/* Official Rahnoxa RX Brand Mark in Core */}
                      <div className="relative z-10 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md mb-2 shadow-lg">
                        <img 
                          src="/brand/logo-symbol-transparent.png" 
                          alt="Rahnoxa Core" 
                          className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" 
                        />
                      </div>
                      
                      <div className="relative z-10">
                        <span className="text-[11px] font-mono font-black tracking-[0.2em] text-white uppercase block">
                          RAHNOXA
                        </span>
                        <span className="text-[8.5px] font-mono text-cyan-400 tracking-wider uppercase font-bold mt-0.5 block">
                          ENGINEERING CORE
                        </span>
                      </div>

                    </div>
                  </div>
                </motion.div>

                {/* ── 4 Interactive Expand-in-Place Capability Nodes ── */}
                {capabilities.map((cap, idx) => {
                  const isExpanded = activeId === cap.id;
                  const isOtherExpanded = activeId !== null && !isExpanded;

                  return (
                    <motion.div
                      key={cap.id}
                      layout
                      transition={{ 
                        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25 }
                      }}
                      className={`absolute ${cap.positionClasses} z-30 transition-opacity duration-300 ${
                        isOtherExpanded ? 'opacity-30' : 'opacity-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCapability(cap.id)}
                        aria-expanded={isExpanded}
                        aria-label={`${cap.title} capability node`}
                        className={`text-left rounded-2xl bg-white border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                          isExpanded
                            ? 'w-[280px] sm:w-[310px] p-5 shadow-2xl shadow-blue-500/20 border-blue-400 ring-1 ring-blue-400/40 z-40'
                            : 'p-3 sm:p-3.5 shadow-lg shadow-slate-200/50 border-slate-200/90 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer'
                        }`}
                      >
                        {!isExpanded ? (
                          /* Compact State */
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-xl border ${cap.badgeBg} shadow-2xs`}>
                              {cap.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-900 tracking-tight">
                                  {cap.label}
                                </span>
                              </div>
                              <span className="text-[9.5px] font-mono text-slate-400 block mt-0.5">
                                Click to explore
                              </span>
                            </div>
                          </div>
                        ) : (
                          /* Expanded in Place State */
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-3.5"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg border ${cap.badgeBg}`}>
                                  {cap.icon}
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                                  {cap.title}
                                </h4>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                0{idx + 1} / 04
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                              {cap.description}
                            </p>

                            {/* 2-3 Supporting Details */}
                            <div className="space-y-1.5 pt-1">
                              {cap.details.map((detail, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-700">
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                  <span className="font-medium">{detail}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {cap.techTags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer with Next Action & Route Link */}
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

                              <button
                                type="button"
                                onClick={(e) => handleNext(e, idx)}
                                className="text-[11px] font-mono font-bold text-slate-800 hover:text-blue-600 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
                              >
                                <span>Next</span>
                                <FiChevronRight className="h-3 w-3" />
                              </button>
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