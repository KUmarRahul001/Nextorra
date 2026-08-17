import React, { useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import ArchitectureVisual from './ArchitectureVisual';

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
          'Native & Hybrid Mobile Apps',
          'Custom APIs & Integrations',
        ],
        typeSpeed: 45,
        backSpeed: 30,
        backDelay: 2200,
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
        title="Nextorra – Software Development & Technology Engineering"
        description="Nextorra builds custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses."
        keywords="software development, enterprise software, web applications, mobile apps, SaaS development, custom ERP, API integrations, Nextorra"
        url="https://nextorra.netlify.app/"
        type="website"
      />

      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden pt-28 pb-16">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />

        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Value Proposition & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 xl:col-span-7 text-white"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 mb-6 backdrop-blur-md">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="text-xs uppercase tracking-widest font-semibold text-cyan-300">
                  Software Engineering &amp; Architecture
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.12]">
                We Engineer Software for{' '}
                <span
                  ref={el}
                  className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent"
                />
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                From bespoke web platforms and mobile apps to multi-tenant SaaS, enterprise ERP modules, and complex API integrations — we engineer software built around your actual operational workflows.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 group text-base"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200 rounded-lg font-semibold transition-all duration-200 text-base backdrop-blur-sm"
                >
                  Explore Services
                </button>
              </div>

              {/* Factual Credibility Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Full-Stack Scope</p>
                    <p className="text-xs text-slate-400">Web • Mobile • Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Modern Tech</p>
                    <p className="text-xs text-slate-400">React • Node • Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Bespoke Delivery</p>
                    <p className="text-xs text-slate-400">Tailored to Workflow</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Modern Interactive System Architecture & Telemetry Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 xl:col-span-5 relative"
            >
              <ArchitectureVisual />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;