import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Terminal, Shield, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

/* ─── Architectural Technical Preview (Real Engineering Artifacts) ─── */
const ArchitectureBlueprint: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Console Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">rahnoxa-core-architecture.ts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Production Ready</span>
        </div>
      </div>

      {/* Structured Technical Diagram & Code */}
      <div className="p-5 font-mono text-xs text-slate-300 space-y-4">
        {/* Layer 1: Client Gateway */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Zap className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-white font-semibold text-xs">Edge API &amp; React Gateway</p>
              <p className="text-[10px] text-slate-500">Global CDN · TLS 1.3 · Sub-150ms</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            HTTP/3
          </span>
        </div>

        {/* Connector Line */}
        <div className="w-0.5 h-4 bg-slate-700 mx-auto" />

        {/* Layer 2: Core Domain Services */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <div>
              <p className="text-white font-semibold text-xs">Modular ERP &amp; Microservices</p>
              <p className="text-[10px] text-slate-500">Node.js · Go · RBAC Multi-Tenant Engine</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            REST / gRPC
          </span>
        </div>

        {/* Connector Line */}
        <div className="w-0.5 h-4 bg-slate-700 mx-auto" />

        {/* Layer 3: Persistence & Caching */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="h-4 w-4 text-emerald-400" />
            <div>
              <p className="text-white font-semibold text-xs">PostgreSQL Cluster &amp; Redis Cache</p>
              <p className="text-[10px] text-slate-500">ACID Compliant · Read Replicas · Automated Backups</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Encrypted
          </span>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Delivery SLA: <strong className="text-white">Strict Milestones</strong></span>
        <span>Availability: <strong className="text-emerald-400">99.9% Uptime</strong></span>
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

            {/* Right Column: Architectural Blueprint Card */}
            <div className="lg:col-span-5 w-full">
              <ArchitectureBlueprint />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;