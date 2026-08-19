import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Database, 
  MoveUpRight,
  Workflow,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-xs font-semibold text-slate-800">
              Software Development &amp; Systems Architecture
            </span>
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
              Available for Projects
            </span>
          </motion.div>

          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Bold Typography & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-7"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[4.1rem] font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                We Engineer{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  High-Impact Digital Systems
                </span>{' '}
                That Scale.
              </h1>

              <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                From multi-tenant enterprise ERPs and bespoke full-stack SaaS platforms to REST APIs and cross-platform mobile apps — we build mission-critical technology engineered for operational stability and business growth.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary px-8 py-4 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline px-8 py-4 text-sm font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Explore Engineering Services</span>
                </button>
              </div>

              {/* Truthful Commitments */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Milestone-Based Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Strict TypeScript Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Direct Technical Support</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Animated Interactive System Architecture Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Main Interactive Glassmorphism Architecture Canvas */}
              <div className="relative p-6 sm:p-7 rounded-2xl glass-card-light shadow-xl border border-slate-200/80 space-y-4">
                
                {/* Header with real system status */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-700 ml-2">
                      Rahnoxa System Matrix
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    Live Platform
                  </span>
                </div>

                {/* Layer 1: Frontend & Edge Gateway */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/services/full-stack-web-apps')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Edge Frontend &amp; SPA Layer
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">React 18 · TypeScript · Fast Rendering</p>
                    </div>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </motion.div>

                {/* Layer 2: Modular ERP & Microservices */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/services/erp-enterprise-applications')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Workflow className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        Modular ERP &amp; Business Logic
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">Role-Based Multi-Tenant Architecture</p>
                    </div>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </motion.div>

                {/* Layer 3: Scalable Cloud Persistence */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate('/services/custom-software-api-integration')}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        PostgreSQL Cluster &amp; Redis Cache
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">ACID Transactions · Automated Backups</p>
                    </div>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </motion.div>

                {/* Footer specs */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Engineered with Precision</span>
                  <span className="text-blue-600 font-bold">Fixed Milestone Scope</span>
                </div>
              </div>

              {/* Floating Animated Accent Badges */}
              <motion.div
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-white shadow-lg border border-blue-100 flex items-center gap-1.5 z-20"
              >
                <Zap className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Clean Architecture</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -4, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-white shadow-lg border border-indigo-100 flex items-center gap-1.5 z-20"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Full Code Ownership</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;