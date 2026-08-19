import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, TrendingUp, Cpu, Server, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

/* ─── Premium Human-Crafted Live Production Telemetry Panel ─── */
const ProductionSystemOverview: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Enterprise Delivery Engine</h4>
            <p className="text-[11px] text-slate-400 font-mono">System Integrity: 100%</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active Operations
        </span>
      </div>

      {/* Key Real-World Operational Metrics */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Average Delivery SLA</span>
          <p className="text-xl font-bold text-white">3–7 Business Days</p>
          <p className="text-[10px] text-blue-400">Milestone Sprint Deployments</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">System Uptime Target</span>
          <p className="text-xl font-bold text-emerald-400">99.9% Uptime</p>
          <p className="text-[10px] text-slate-400">Automated Failover &amp; Backups</p>
        </div>
      </div>

      {/* Capabilities Overview List */}
      <div className="space-y-2.5 text-xs text-slate-300">
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <Server className="h-4 w-4 text-indigo-400" />
            <span className="font-semibold text-white">Full-Stack Cloud &amp; ERP Architecture</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Production Ready</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <Code className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-white">Strict TypeScript &amp; Automated CI/CD</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Zero Technical Debt</span>
        </div>
      </div>

      {/* Trust & Guarantee Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Transparent Commercial Pricing</span>
        </div>
        <span className="font-mono text-slate-500">Fixed Milestone Scope</span>
      </div>
    </div>
  );
};

/* ─── Main Hero Section ─── */
const HeroSection: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          'Enterprise ERP Systems',
          'Scalable SaaS Platforms',
          'Full-Stack Web Applications',
          'High-Performance Mobile Apps',
          'Custom API Architectures',
        ],
        typeSpeed: 45,
        backSpeed: 30,
        backDelay: 2400,
        loop: true,
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <>
      <SEO
        title="Rahnoxa – Engineering Custom Software, ERPs & Scalable Digital Systems"
        description="Rahnoxa is a software engineering company building custom web applications, mobile apps, enterprise ERP modules, and scalable cloud systems."
        keywords="software development company, custom ERP development, web app engineering, mobile apps, SaaS development, enterprise software Jharkhand, Rahnoxa"
        url="https://rahnoxa.pages.dev/"
        type="website"
      />

      <section className="relative min-h-[88vh] flex items-center bg-slate-950 overflow-hidden pt-28 pb-20 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Human, Confident Value Proposition */}
            <div className="lg:col-span-7 text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Enterprise Technology Partner</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]">
                We build dependable software systems for{' '}
                <span
                  ref={el}
                  className="text-blue-400 block sm:inline mt-1 sm:mt-0"
                />
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                From multi-branch ERP solutions and high-throughput SaaS backends to cross-platform mobile apps — Rahnoxa architects custom systems built strictly for operational reliability and business scale.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline"
                >
                  <span>Explore Engineering Services</span>
                </button>
              </div>

              {/* Verified Engineering Standards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>Production-Grade Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                  <span>Milestone-Based Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Direct Technical Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Production System Overview */}
            <div className="lg:col-span-5 w-full">
              <ProductionSystemOverview />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;