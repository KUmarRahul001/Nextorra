import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { HiOutlineGlobeAlt, HiOutlineCommandLine, HiOutlineServerStack, HiSparkles } from 'react-icons/hi2';
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
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

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
            <span className="text-slate-500 font-mono text-[11px]">Independent Senior Engineer</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Direct Commercial & Engineering Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Bespoke Software Engineering for{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
                  <span className="text-xs font-semibold text-slate-700">Milestone-Based Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Strict TypeScript Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">30-Day Bug Warranty</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Popular Engineering Solutions / Best Sellers Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Glow Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-sky-400/20 rounded-3xl blur-xl opacity-70 pointer-events-none" />

              {/* Main Showcase Card Container */}
              <div className="relative p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-blue-500/5 space-y-4">
                
                {/* Showcase Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700">
                      <HiSparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider font-mono">Popular Solutions</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80">
                    <span>🔥</span> Most Requested
                  </span>
                </div>

                {/* Best Seller Items List */}
                <div className="space-y-3">
                  
                  {/* Item 1: Growth Business Website */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      navigate('/services/web-development');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-white to-blue-50/30 border border-slate-200/90 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 transition-all cursor-pointer group flex flex-col gap-2.5 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-100/70 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                          <HiOutlineGlobeAlt className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              Growth Business Website
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            High-Conversion UI · WhatsApp &amp; SEO
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-black font-mono text-slate-900 block group-hover:text-blue-600 transition-colors">
                          ₹11,999
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Fixed Scope</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-[10.5px]">
                      <div className="flex items-center gap-2 font-mono text-slate-500">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">⏱️ 2–3 Weeks</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-emerald-700 font-medium">30-Day Warranty</span>
                      </div>
                      <span className="text-blue-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore <FiArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>

                  {/* Item 2: Full Stack Web Application */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      navigate('/services/full-stack-web-apps');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-white to-indigo-50/30 border border-slate-200/90 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col gap-2.5 relative overflow-hidden ring-1 ring-indigo-500/20"
                  >
                    {/* Top Highlight Badge */}
                    <div className="absolute top-0 right-0">
                      <span className="bg-indigo-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                        Best Value
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-100/70 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                          <HiOutlineCommandLine className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              Full Stack Web Application
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            Auth, PostgreSQL DB, REST APIs &amp; Admin
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 pt-2 sm:pt-0">
                        <span className="text-xs sm:text-sm font-black font-mono text-slate-900 block group-hover:text-indigo-600 transition-colors">
                          ₹34,999
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Starting</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-[10.5px]">
                      <div className="flex items-center gap-2 font-mono text-slate-500">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 font-semibold text-indigo-700">⏱️ 3–5 Weeks</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-indigo-700 font-medium">Modular Sprints</span>
                      </div>
                      <span className="text-indigo-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore <FiArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>

                  {/* Item 3: Custom ERP & Business Logic */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      navigate('/services/erp-enterprise-applications');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-white to-emerald-50/30 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/10 transition-all cursor-pointer group flex flex-col gap-2.5 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                          <HiOutlineServerStack className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              Custom ERP &amp; Business Logic
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            Multi-Tenant · RBAC · Inventory &amp; Billing
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-black font-mono text-slate-900 block group-hover:text-emerald-600 transition-colors">
                          ₹74,999
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Modular ERP</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-[10.5px]">
                      <div className="flex items-center gap-2 font-mono text-slate-500">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 font-semibold text-emerald-700">⏱️ 4–6 Weeks</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-emerald-700 font-medium">Full Ownership</span>
                      </div>
                      <span className="text-emerald-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore <FiArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>

                </div>

                {/* Footer Trust Markers Strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>50% Start / 50% Handover</span>
                  </div>
                  <span className="text-blue-600 font-bold">100% Code Ownership</span>
                </div>
              </div>

              {/* Floating Animated Badges */}
              <motion.div
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-white shadow-lg shadow-blue-500/10 border border-blue-100 flex items-center gap-1.5 z-20"
              >
                <span className="text-xs">⚡</span>
                <span className="text-xs font-bold text-slate-800">18h/wk Dedicated Dev</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -4, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-white shadow-lg shadow-emerald-500/10 border border-emerald-100 flex items-center gap-1.5 z-20"
              >
                <FiShield className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">30-Day Bug Warranty</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;