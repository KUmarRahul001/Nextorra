import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Terminal, Database, Server, Cpu } from 'lucide-react';
import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiFramer, SiDocker, SiRedis, SiTailwindcss } from 'react-icons/si';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

/* ─── Isometric 3D Technology Cube / Floating Badge ─── */
const Isometric3DCanvas: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center select-none">
      {/* Subtle depth lighting */}
      <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute w-56 h-56 bg-indigo-600/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Central Interactive 3D Perspective Architecture Hub */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(4deg) rotateY(-4deg)',
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-blue-400" />
              rahnoxa-stack.config.ts
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Cluster
          </span>
        </div>

        {/* 3D Tech Grid of Verified Enterprise Icons */}
        <div className="grid grid-cols-2 gap-3.5 mb-5 font-mono text-xs">
          {/* React + Framer Motion */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <SiReact className="h-4 w-4 animate-[spin_10s_linear_infinite]" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs">React &amp; Vite</p>
                <p className="text-[10px] text-slate-500">Frontend SPA</p>
              </div>
            </div>
            <SiFramer className="h-3.5 w-3.5 text-pink-400" title="Framer Motion" />
          </div>

          {/* TypeScript & Tailwind */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <SiTypescript className="h-4 w-4" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs">TypeScript</p>
                <p className="text-[10px] text-slate-500">Strict Typing</p>
              </div>
            </div>
            <SiTailwindcss className="h-3.5 w-3.5 text-cyan-400" title="Tailwind CSS" />
          </div>

          {/* Node.js & Docker */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <SiNodedotjs className="h-4 w-4" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs">Node.js Engine</p>
                <p className="text-[10px] text-slate-500">REST / Microservices</p>
              </div>
            </div>
            <SiDocker className="h-3.5 w-3.5 text-blue-400" title="Docker Containerization" />
          </div>

          {/* PostgreSQL & Redis */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <SiPostgresql className="h-4 w-4" />
              </div>
              <div>
                <p className="text-white font-semibold text-xs">PostgreSQL</p>
                <p className="text-[10px] text-slate-500">ACID Relational</p>
              </div>
            </div>
            <SiRedis className="h-3.5 w-3.5 text-rose-500" title="Redis In-Memory Cache" />
          </div>
        </div>

        {/* Real-time Telemetry SLA Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Engineered with Precision</span>
          </div>
          <span className="text-blue-400">v2.4.0 Live</span>
        </div>
      </motion.div>

      {/* Floating 3D Micro-Chips */}
      <motion.div
        animate={{ y: [6, -10, 6], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-3 -right-2 p-2.5 rounded-xl bg-slate-900/95 border border-slate-700 shadow-xl flex items-center gap-2 z-20"
      >
        <SiReact className="h-4 w-4 text-cyan-400 animate-spin" />
        <span className="text-[11px] font-mono text-white font-bold">React 18</span>
      </motion.div>

      <motion.div
        animate={{ y: [-6, 8, -6], rotate: [0, -4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-3 -left-2 p-2.5 rounded-xl bg-slate-900/95 border border-slate-700 shadow-xl flex items-center gap-2 z-20"
      >
        <SiFramer className="h-4 w-4 text-pink-400" />
        <span className="text-[11px] font-mono text-white font-bold">Framer Motion</span>
      </motion.div>
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

            {/* Right Column: 3D Isometric Architecture Canvas with React & Framer Icons */}
            <div className="lg:col-span-5 w-full">
              <Isometric3DCanvas />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;