import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageSquare, FiTerminal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-xs"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 shadow-2xs">
            <FiTerminal className="h-4 w-4 text-blue-600" />
            <span>Ready To Build?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Let&apos;s Build Software That Solves Your Real Business Needs.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Tell us what you want to build, the problems you need to solve, or the systems you need connected. We&apos;ll schedule a technical discovery call to review scope, timeline, and architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                navigate('/get-started');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary px-8 py-4 text-base font-bold shadow-md inline-flex items-center gap-2"
            >
              <span>Start a Project Enquiry</span>
              <FiArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
            >
              <FiMessageSquare className="h-5 w-5 text-blue-600" />
              <span>Explore All Services</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
