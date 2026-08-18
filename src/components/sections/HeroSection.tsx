import React, { useEffect, useRef } from 'react';
import { ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

/* ─── Floating Abstract Visual ─── */
const AbstractConstellation: React.FC = () => {
  const shapes = [
    {
      size: 'w-44 h-44',
      gradient: 'from-blue-500/20 to-cyan-400/10',
      border: 'border-blue-400/15',
      position: 'top-4 right-8',
      delay: 0,
      duration: 7,
      y: [-8, 8, -8],
      rotate: [0, 6, 0],
      radius: 'rounded-[2rem]',
    },
    {
      size: 'w-32 h-32',
      gradient: 'from-indigo-500/20 to-violet-400/10',
      border: 'border-indigo-400/15',
      position: 'top-32 right-48',
      delay: 1.2,
      duration: 6,
      y: [6, -10, 6],
      rotate: [0, -8, 0],
      radius: 'rounded-full',
    },
    {
      size: 'w-56 h-56',
      gradient: 'from-cyan-500/15 to-blue-400/8',
      border: 'border-cyan-400/10',
      position: 'bottom-8 right-16',
      delay: 0.6,
      duration: 8,
      y: [-6, 12, -6],
      rotate: [0, 4, 0],
      radius: 'rounded-[2.5rem]',
    },
    {
      size: 'w-20 h-20',
      gradient: 'from-violet-500/25 to-indigo-400/15',
      border: 'border-violet-400/20',
      position: 'top-16 right-[45%]',
      delay: 2,
      duration: 5,
      y: [4, -8, 4],
      rotate: [0, 12, 0],
      radius: 'rounded-2xl',
    },
    {
      size: 'w-16 h-16',
      gradient: 'from-emerald-500/20 to-cyan-400/10',
      border: 'border-emerald-400/15',
      position: 'bottom-28 right-[55%]',
      delay: 1.8,
      duration: 6.5,
      y: [-5, 7, -5],
      rotate: [0, -6, 0],
      radius: 'rounded-full',
    },
  ];

  return (
    <div className="relative w-full h-[420px] lg:h-[480px]">
      {/* Soft ambient glow behind the constellation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-500/8 rounded-full blur-[80px]" />

      {/* Connecting lines (subtle SVG paths) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="320" y1="80" x2="220" y2="200"
          stroke="url(#line1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.line
          x1="220" y1="200" x2="340" y2="340"
          stroke="url(#line2)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <motion.line
          x1="340" y1="340" x2="320" y2="80"
          stroke="url(#line3)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
        <motion.circle
          cx="320" cy="80" r="3"
          fill="#60a5fa"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="220" cy="200" r="3"
          fill="#818cf8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="340" cy="340" r="3"
          fill="#22d3ee"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        />
        <defs>
          <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="line3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating glassmorphic shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.position} ${shape.size} ${shape.radius} bg-gradient-to-br ${shape.gradient} border ${shape.border} backdrop-blur-sm`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: shape.y,
            rotate: shape.rotate,
          }}
          transition={{
            opacity: { duration: 0.8, delay: shape.delay },
            scale: { duration: 0.8, delay: shape.delay },
            y: { duration: shape.duration, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: shape.duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Small accent dots scattered around */}
      <motion.div
        className="absolute top-12 right-[38%] w-2 h-2 rounded-full bg-blue-400/40"
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-[65%] w-1.5 h-1.5 rounded-full bg-cyan-400/40"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
      />
      <motion.div
        className="absolute top-[55%] right-4 w-2.5 h-2.5 rounded-full bg-indigo-400/30"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
      />
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
        url="https://nextorra.pages.dev/"
        type="website"
      />

      <section className="relative min-h-[92vh] flex items-center bg-slate-950 overflow-hidden pt-28 pb-16">
        {/* Ambient atmospheric glows — subtle, no patterns */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-500/[0.05] rounded-full blur-[120px]" />
          <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

            {/* Left Column: Heading, Value Proposition & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 text-white"
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm uppercase tracking-[0.2em] font-medium text-slate-400 mb-5"
              >
                Software Engineering & Architecture
              </motion.p>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight mb-6 leading-[1.1]">
                We Engineer Software
                <br />
                for{' '}
                <span
                  ref={el}
                  className="text-blue-400"
                />
              </h1>

              <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                From bespoke web platforms and mobile apps to multi-tenant SaaS,
                enterprise ERP modules, and complex API integrations — we
                engineer software built around your actual operational workflows.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-600/20 group text-[0.95rem]"
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
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 rounded-lg font-semibold transition-all duration-200 text-[0.95rem]"
                >
                  Explore Services
                </button>
              </div>

              {/* Credibility Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/60">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-blue-400/70 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">Full-Stack Scope</p>
                    <p className="text-xs text-slate-500">Web · Mobile · Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-indigo-400/70 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">Modern Tech</p>
                    <p className="text-xs text-slate-500">React · Node · Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-400/70 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">Bespoke Delivery</p>
                    <p className="text-xs text-slate-500">Tailored to Workflow</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Abstract Constellation Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative hidden lg:block"
            >
              <AbstractConstellation />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;