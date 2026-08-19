import React from 'react';
import { ArrowRight, Terminal, Globe, Cpu, Layers, Database, Shield, MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Rahnoxa – Software Systems & Enterprise Engineering"
        description="Rahnoxa designs, builds, and deploys mission-critical web applications, enterprise ERP platforms, APIs, and scalable infrastructure."
        keywords="software engineering, custom ERP, enterprise web applications, API architecture, SaaS development, Rahnoxa"
        url="https://rahnoxa.pages.dev/"
        type="website"
      />

      <section className="relative bg-slate-950 text-white pt-32 pb-20 border-b border-slate-850 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Editorial Index & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-850 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold tracking-wider">RAHNOXA</span>
              <span className="text-slate-600">/</span>
              <span>ENGINEERING &amp; SYSTEMS ARCHITECTURE</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden sm:inline-block text-slate-500">OPERATING SINCE 2024</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                ACTIVE FOR COMMERCIAL SCOPING
              </span>
            </div>
          </div>

          {/* Asymmetric Core Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
            
            {/* Primary Headline & Positioning (Span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold text-white tracking-tight leading-[1.05]">
                We build software systems that businesses actually run on.
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                Rahnoxa architects and builds custom full-stack web platforms, enterprise ERP systems, microservices, and mobile applications engineered for high reliability, clean data integrity, and strict operational uptime.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary px-8 py-3.5 text-sm rounded-lg"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline px-8 py-3.5 text-sm rounded-lg"
                >
                  <span>Explore Engineering Services</span>
                </button>
              </div>
            </div>

            {/* Asymmetric Architectural Spec Column (Span 5) - Real Structured Technical Matrix */}
            <div className="lg:col-span-5 border-l border-slate-850 pl-0 lg:pl-10 space-y-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 block mb-3">
                  Core Engineering Scope
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  Full lifecycle software development from architectural discovery, database entity-relationship modeling, and secure API gateways to production CI/CD deployments.
                </p>
              </div>

              {/* Domain Index Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div 
                  onClick={() => navigate('/services/erp-enterprise-applications')}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">01</span>
                    <span className="text-slate-200 group-hover:text-white font-medium">Enterprise ERP &amp; Operations</span>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>

                <div 
                  onClick={() => navigate('/services/full-stack-web-apps')}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">02</span>
                    <span className="text-slate-200 group-hover:text-white font-medium">Full-Stack Web &amp; SaaS Platforms</span>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>

                <div 
                  onClick={() => navigate('/services/custom-software-api-integration')}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">03</span>
                    <span className="text-slate-200 group-hover:text-white font-medium">Custom APIs &amp; Microservices</span>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>

                <div 
                  onClick={() => navigate('/services/app-development')}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">04</span>
                    <span className="text-slate-200 group-hover:text-white font-medium">Cross-Platform Mobile Apps</span>
                  </div>
                  <MoveUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </div>

          </div>

          {/* Integrated Horizontal Engineering Baseline Banner */}
          <div className="pt-8 border-t border-slate-850 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                DELIVERY PROTOCOL
              </span>
              <p className="text-sm font-semibold text-white">
                Milestone-Driven Sprints
              </p>
              <p className="text-xs text-slate-400">
                Transparent weekly staging reviews
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                CODE INTEGRITY
              </span>
              <p className="text-sm font-semibold text-white">
                Strict TypeScript &amp; Tests
              </p>
              <p className="text-xs text-slate-400">
                Type-safe APIs and zero debt
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                DATA ARCHITECTURE
              </span>
              <p className="text-sm font-semibold text-white">
                ACID Compliant Relational
              </p>
              <p className="text-xs text-slate-400">
                PostgreSQL schemas &amp; Redis cache
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                DEPLOYMENT TARGET
              </span>
              <p className="text-sm font-semibold text-white">
                Sub-150ms Global Edge
              </p>
              <p className="text-xs text-slate-400">
                TLS 1.3 automated CI/CD pipelines
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;