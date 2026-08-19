import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import { HiSparkles, HiOutlineCubeTransparent, HiOutlineBolt } from 'react-icons/hi2';
import { TbCube3dSphere, TbBraces } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

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
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

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

            {/* Right Column: 3D Isometric Software Building Engine & Isometric Hologram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[500px]"
            >
              {/* Outer Radiant Glow Sphere */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-cyan-400/25 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />

              {/* 3D Isometric Stage Container */}
              <div className="relative w-full max-w-[480px] h-[460px] sm:h-[490px] flex items-center justify-center perspective-[1200px]">
                
                {/* ── Central 3D Isometric Hologram Cube ── */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [15, 25, 15],
                    y: [-10, 10, -10]
                  }}
                  transition={{ 
                    rotateY: { duration: 24, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative w-44 h-44 sm:w-52 sm:h-52 transform-style-preserve-3d flex items-center justify-center cursor-pointer"
                >
                  {/* Glowing Hologram Ring System */}
                  <div className="absolute -inset-10 rounded-full border border-blue-400/30 animate-[spin_16s_linear_infinite] border-dashed pointer-events-none" />
                  <div className="absolute -inset-20 rounded-full border border-indigo-400/20 animate-[spin_28s_linear_infinite_reverse] pointer-events-none" />
                  
                  {/* Core 3D Glowing Cube Geometry with Glassmorphic Gradient Faces */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-blue-600/90 via-indigo-600/80 to-cyan-500/90 p-[2px] shadow-2xl shadow-blue-500/40 backdrop-blur-xl border border-white/40 flex items-center justify-center">
                    <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-slate-900/90 via-blue-950/90 to-indigo-950/90 p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      {/* Grid overlay pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      
                      {/* Laser scanning line animation */}
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#38bdf8] pointer-events-none"
                      />

                      {/* Center Tech Symbol */}
                      <TbCube3dSphere className="h-12 w-12 sm:h-14 sm:w-14 text-cyan-400 animate-pulse relative z-10 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
                      
                      <div className="mt-2 relative z-10">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase block">
                          BUILDING ENGINE
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          Live Architecture
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Orbiting Satellite 1: Code & Architecture Block (Top Right) ── */}
                <motion.div
                  animate={{ y: [-8, 8, -8], x: [4, -4, 4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 right-0 sm:right-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-blue-500/10 flex items-center gap-3 z-20 group hover:border-blue-400 transition-all cursor-pointer"
                  onClick={() => navigate('/services/full-stack-web-apps')}
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FiCode className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <p className="text-xs font-bold text-slate-900">Typescript Core</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">React 18 · Node APIs</p>
                  </div>
                </motion.div>

                {/* ── Orbiting Satellite 2: Live Compilation & CI/CD Pipeline (Bottom Left) ── */}
                <motion.div
                  animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute bottom-6 left-0 sm:left-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-indigo-500/10 flex items-center gap-3 z-20 group hover:border-indigo-400 transition-all cursor-pointer"
                  onClick={() => navigate('/services/erp-enterprise-applications')}
                >
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FiLayers className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <p className="text-xs font-bold text-slate-900">Enterprise ERP</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">Role-Based · PostgreSQL</p>
                  </div>
                </motion.div>

                {/* ── Orbiting Satellite 3: Edge Latency & Cloud Specs (Bottom Right) ── */}
                <motion.div
                  animate={{ y: [-6, 6, -6], x: [3, -3, 3] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute bottom-4 right-4 sm:right-6 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-cyan-500/10 flex items-center gap-3 z-20 group hover:border-cyan-400 transition-all"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                    <HiOutlineBolt className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-slate-900">&lt; 85ms Latency</p>
                    <p className="text-[10px] text-slate-500 font-mono">Edge CDN Deployed</p>
                  </div>
                </motion.div>

                {/* ── Floating Badge 4: Production Verified (Top Left) ── */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                  className="absolute top-6 left-2 sm:left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200 shadow-md flex items-center gap-2 z-20"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-slate-800">
                    100% Code Ownership
                  </span>
                </motion.div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;