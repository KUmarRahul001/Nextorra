import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiShield, FiCode, FiLayers } from 'react-icons/fi';
import { HiSparkles, HiOutlineBolt, HiOutlineCpuChip } from 'react-icons/hi2';
import { TbCube3dSphere, TbBraces, TbTopologyStar3 } from 'react-icons/tb';
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

            {/* Right Column: 3D Holographic Software Architecture Engine with Rich Orbiting Motion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative flex items-center justify-center min-h-[500px] sm:min-h-[540px]"
            >
              {/* Dynamic Aura Ripple Layer */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-400/30 rounded-full blur-3xl pointer-events-none" 
              />

              {/* 3D Perspective Canvas */}
              <div className="relative w-full max-w-[500px] h-[500px] sm:h-[520px] flex items-center justify-center perspective-[1400px]">
                
                {/* ── Orbital Track 1: Outer Dashed Particle Ring ── */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[440px] h-[440px] rounded-full border border-blue-300/30 border-dashed pointer-events-none"
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                </motion.div>

                {/* ── Orbital Track 2: Inner Counter-Rotating Ring ── */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[330px] h-[330px] rounded-full border border-indigo-400/25 pointer-events-none"
                >
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
                </motion.div>

                {/* ── Central 3D Isometric Hologram Block with HDR Glow ── */}
                <motion.div
                  animate={{ 
                    rotateY: [-18, 18, -18],
                    rotateX: [12, -8, 12],
                    rotateZ: [-2, 2, -2],
                    y: [-14, 14, -14]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 transform-style-preserve-3d flex items-center justify-center cursor-pointer group"
                >
                  {/* Neon Outer Frame */}
                  <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-[2.5px] shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.55)]">
                    <div className="w-full h-full rounded-[30px] bg-slate-950/95 backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/10">
                      
                      {/* Isometric Grid Mesh Texture */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
                      
                      {/* Laser Compilation Scan Animation */}
                      <motion.div 
                        animate={{ top: ['-10%', '110%', '-10%'] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] pointer-events-none"
                      />

                      {/* Floating Tech Cube Symbol */}
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-cyan-400/30 mb-2"
                      >
                        <TbCube3dSphere className="h-12 w-12 sm:h-14 sm:w-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                      </motion.div>
                      
                      <div className="relative z-10">
                        <span className="text-[11px] font-mono font-black tracking-[0.2em] text-cyan-300 uppercase block">
                          BUILDING ENGINE
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-400 mt-0.5 block">
                          Live Architecture v2.4
                        </span>
                      </div>

                    </div>
                  </div>
                </motion.div>

                {/* ── Satellite Card 1: TypeScript Core (Top Right) ── */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [0, -6, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  onClick={() => navigate('/services/full-stack-web-apps')}
                  className="absolute top-2 right-2 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-blue-500/10 flex items-center gap-3 z-30 cursor-pointer transition-all hover:border-blue-400 hover:shadow-blue-500/20 group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <FiCode className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">TypeScript Core</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">React 18 · Node APIs</p>
                  </div>
                </motion.div>

                {/* ── Satellite Card 2: Enterprise ERP (Bottom Left) ── */}
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    x: [0, 6, 0]
                  }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  onClick={() => navigate('/services/erp-enterprise-applications')}
                  className="absolute bottom-4 left-0 sm:left-2 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-indigo-500/10 flex items-center gap-3 z-30 cursor-pointer transition-all hover:border-indigo-400 hover:shadow-indigo-500/20 group"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                    <FiLayers className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Enterprise ERP</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">Role-Based · PostgreSQL</p>
                  </div>
                </motion.div>

                {/* ── Satellite Card 3: Edge Latency Metric (Bottom Right) ── */}
                <motion.div
                  animate={{ 
                    y: [-8, 8, -8],
                    x: [-4, 4, -4]
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-8 right-2 sm:right-6 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-cyan-200 shadow-xl shadow-cyan-500/10 flex items-center gap-3 z-30"
                >
                  <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                    <HiOutlineBolt className="h-4 w-4" />
                  </div>
                  <div className="text-left pr-1">
                    <p className="text-xs font-black text-slate-900 font-mono">&lt; 85ms Latency</p>
                    <p className="text-[10px] text-slate-500 font-mono">Edge CDN Deployed</p>
                  </div>
                </motion.div>

                {/* ── Floating Badge 4: Code Ownership (Top Left) ── */}
                <motion.div
                  animate={{ 
                    y: [8, -8, 8],
                    x: [3, -3, 3]
                  }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  className="absolute top-4 left-2 sm:left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200 shadow-md flex items-center gap-2 z-30"
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