import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers, Sparkles, ExternalLink, Globe, Smartphone, Database, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

/* ─── Modern Live Project Showcase Deck (Real Deliverables) ─── */
const LiveShowcaseDeck: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-lg mx-auto space-y-4">
      {/* Top Main Interactive Project Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20">
            Featured Platform
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Deployment
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Enterprise Cloud ERP &amp; Operations Suite
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Multi-tenant inventory, automated billing, and role-based access control engine built on React 18, Node.js, and PostgreSQL.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block">Architecture</span>
            <span className="text-xs font-bold text-slate-200">Full-Stack</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block">SLA Delivery</span>
            <span className="text-xs font-bold text-blue-400">7 Days</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 font-mono block">Database</span>
            <span className="text-xs font-bold text-emerald-400">PostgreSQL</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/projects/enterprise-cloud-erp-platform')}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
        >
          <span>View Architecture &amp; Case Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Secondary Quick-Access Stack Bar */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigate('/services/app-development')}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
            <Smartphone className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Mobile Engineering</h4>
            <p className="text-[10px] text-slate-400">React Native &amp; iOS/Android</p>
          </div>
        </div>

        <div
          onClick={() => navigate('/services/full-stack-web-apps')}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">Custom Web Apps</h4>
            <p className="text-[10px] text-slate-400">Microservices &amp; REST APIs</p>
          </div>
        </div>
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

            {/* Right Column: Live Project Showcase Deck */}
            <div className="lg:col-span-5 w-full">
              <LiveShowcaseDeck />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;