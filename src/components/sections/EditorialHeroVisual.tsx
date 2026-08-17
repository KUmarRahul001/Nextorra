import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  FileText,
  TrendingUp,
  Award,
  BookOpen,
} from 'lucide-react';

const EditorialHeroVisual: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Ambient background glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Editorial Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl border border-white/15 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden p-6 text-white"
      >
        {/* Top Header / Meta Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white tracking-wide">Nextorra Voice Engine</div>
              <div className="text-[10px] text-slate-400">Enterprise Narrative Architecture</div>
            </div>
          </div>

          {/* A/B Switcher */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 text-[11px]">
            <button
              onClick={() => setActiveVariant('A')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeVariant === 'A'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Variant A
            </button>
            <button
              onClick={() => setActiveVariant('B')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeVariant === 'B'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Variant B
            </button>
          </div>
        </div>

        {/* Dynamic Manuscript Snippet */}
        <div className="bg-slate-950/70 rounded-xl border border-white/10 p-5 mb-5 relative">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
              <Sparkles className="h-3.5 w-3.5" />
              High-Conversion Headline
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              98.4 Impact Score
            </span>
          </div>

          <h3 className="text-base font-serif font-bold text-white mb-2 leading-snug">
            {activeVariant === 'A'
              ? '"Turning Complex Technology Into High-Converting Customer Narratives."'
              : '"Engineered Copy & Digital Strategy That Outranks and Outconverts."'}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {activeVariant === 'A'
              ? 'Our editorial and technical teams distill proprietary software logic, SaaS capabilities, and business architectures into clear, compelling messaging.'
              : 'Precision messaging mapped to executive buyer personas across UK, Canada, Australia, and enterprise markets.'}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Tone: Authoritative &amp; Direct</span>
            <span className="text-cyan-400 font-sans font-medium flex items-center gap-1">
              Read Breakdown <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-bold text-white font-mono">+42%</span>
            </div>
            <div className="text-[10px] text-slate-400">Conversion Lift</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-indigo-400 mb-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="font-bold text-white font-mono">100%</span>
            </div>
            <div className="text-[10px] text-slate-400">Custom Voice</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
              <Award className="h-3.5 w-3.5" />
              <span className="font-bold text-white font-mono">Global</span>
            </div>
            <div className="text-[10px] text-slate-400">Enterprise Grade</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Tilted Glassmorphic Card (Competitor inspired floating element) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border border-white/20 transform rotate-2 hover:rotate-0 transition-transform"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <div className="text-xs font-semibold">Live Brand Voice Analysis Ready</div>
      </motion.div>
    </div>
  );
};

export default EditorialHeroVisual;
