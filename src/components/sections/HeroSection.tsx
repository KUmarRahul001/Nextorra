import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShield, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

type TabKey = 'architecture' | 'erp' | 'cloud';

interface TabData {
  id: TabKey;
  label: string;
  badge: string;
  title: string;
  description: string;
  link: string;
  metrics: { label: string; value: string; trend?: string }[];
  pipeline: { step: string; detail: string; status: string; color: string }[];
  tags: string[];
}

const TABS: TabData[] = [
  {
    id: 'architecture',
    label: 'Full-Stack Apps',
    badge: 'High Performance',
    title: 'Modern Web & API Infrastructure',
    description: 'High-speed React/Vite frontends with resilient Node/Go REST backends and sub-100ms response targets.',
    link: '/services/full-stack-web-apps',
    metrics: [
      { label: 'P99 Latency', value: '< 85ms', trend: 'Ultra Fast' },
      { label: 'Type Safety', value: '100%', trend: 'Strict TS' },
      { label: 'Lighthouse', value: '99/100', trend: 'Optimal' },
    ],
    pipeline: [
      { step: 'Edge UI Layer', detail: 'React 18 + Tailwind + SSR', status: 'Operational', color: 'bg-emerald-500' },
      { step: 'API Gateway', detail: 'Type-Safe Express / NestJS', status: 'Active', color: 'bg-blue-500' },
      { step: 'Database Tier', detail: 'PostgreSQL + Redis Cache', status: 'Synchronized', color: 'bg-indigo-500' },
    ],
    tags: ['React / Vite', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
  },
  {
    id: 'erp',
    label: 'Custom ERP',
    badge: 'Enterprise Grade',
    title: 'Modular ERP & Business Engines',
    description: 'Bespoke operational software with granular RBAC, multi-tenant databases, inventory engines, and automated billing.',
    link: '/services/erp-enterprise-applications',
    metrics: [
      { label: 'Availability', value: '99.99%', trend: 'SLA Backed' },
      { label: 'Security', value: 'RBAC', trend: 'Granular' },
      { label: 'Data Model', value: 'ACID', trend: 'Zero Loss' },
    ],
    pipeline: [
      { step: 'Auth & Roles', detail: 'JWT + Session Multi-Tenant Guard', status: 'Protected', color: 'bg-indigo-500' },
      { step: 'Core Engine', detail: 'Order, Inventory & Billing Sync', status: 'Real-time', color: 'bg-emerald-500' },
      { step: 'Audit Ledger', detail: 'Immutable Event Logs & Backups', status: 'Secured', color: 'bg-sky-500' },
    ],
    tags: ['Multi-Tenant', 'Role-Based Access', 'Automated Billing', 'Live Analytics'],
  },
  {
    id: 'cloud',
    label: 'Cloud & Scale',
    badge: 'Zero Downtime',
    title: 'Automated CI/CD & Cloud Systems',
    description: 'Production containerization, GitOps deployment workflows, automated backups, and 100% repository handover.',
    link: '/services/cloud-devops',
    metrics: [
      { label: 'Deployment', value: 'GitOps', trend: 'Auto CI/CD' },
      { label: 'Ownership', value: '100%', trend: 'No Lock-in' },
      { label: 'Uptime SLA', value: '99.9%', trend: 'Guaranteed' },
    ],
    pipeline: [
      { step: 'Git Trigger', detail: 'Automated Lint & Test Suite', status: 'Passing', color: 'bg-blue-500' },
      { step: 'Container Build', detail: 'Dockerized Microservices', status: 'Optimized', color: 'bg-purple-500' },
      { step: 'Global Edge', detail: 'Cloudflare / AWS CDN Distribution', status: 'Live', color: 'bg-emerald-500' },
    ],
    tags: ['Docker', 'GitHub Actions', 'Cloudflare', 'AWS / DigitalOcean'],
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('architecture');

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

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
            <span className="text-slate-500 font-mono text-[11px]">Production-Grade Engineering</span>
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

            {/* Right Column: High-End Interactive Engineering Matrix */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Glow Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-sky-400/20 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Main Showcase Card Container */}
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-blue-500/10 overflow-hidden text-left">
                
                {/* Visual Window Header */}
                <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2 font-medium tracking-wide">
                      engine::v2.4 / production
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>HEALTHY (99.9%)</span>
                  </div>
                </div>

                {/* Tab Navigation Controls */}
                <div className="p-2.5 bg-slate-50/80 border-b border-slate-200/80">
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                    {TABS.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          type="button"
                          className={`relative py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Tab Showcase View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-6 space-y-5"
                  >
                    {/* Header + Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                          <HiSparkles className="h-3 w-3 text-blue-600" />
                          {currentTab.badge}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Clean Architecture</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {currentTab.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {currentTab.description}
                      </p>
                    </div>

                    {/* Architecture Pipeline Stack */}
                    <div className="space-y-2 rounded-2xl bg-slate-50/70 p-3 border border-slate-200/80">
                      <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-1">
                        <span>Architecture Pipeline</span>
                        <span>Telemetry</span>
                      </div>
                      <div className="space-y-1.5">
                        {currentTab.pipeline.map((node, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs group hover:border-blue-400 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-2 h-2 rounded-full ${node.color}`} />
                              <div>
                                <p className="text-xs font-bold text-slate-800 leading-tight">
                                  {node.step}
                                </p>
                                <p className="text-[10px] font-mono text-slate-400">
                                  {node.detail}
                                </p>
                              </div>
                            </div>
                            <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/60">
                              {node.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics 3-Column Strip */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {currentTab.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-center shadow-2xs"
                        >
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                            {metric.label}
                          </span>
                          <span className="text-sm sm:text-base font-black font-mono text-slate-900 block my-0.5">
                            {metric.value}
                          </span>
                          <span className="text-[10px] font-medium text-emerald-600 block">
                            {metric.trend}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges & Exploration Link */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {currentTab.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigate(currentTab.link);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group whitespace-nowrap"
                      >
                        <span>Explore Specs</span>
                        <FiArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Card Footer Strip */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Zero Vendor Lock-in</span>
                  </div>
                  <span className="text-blue-600 font-bold">100% Repository Transfer</span>
                </div>

              </div>

              {/* High-End Floating Accents */}
              <motion.div
                animate={{ y: [-4, 5, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-white shadow-lg shadow-blue-500/10 border border-blue-100 flex items-center gap-1.5 z-20"
              >
                <HiSparkles className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Production-Ready Code</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -4, 5] }}
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