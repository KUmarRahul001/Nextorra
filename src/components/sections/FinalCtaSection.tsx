import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalCtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Terminal className="h-4 w-4 text-cyan-300" />
            <span>Ready To Build?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Let&apos;s Build Software That Solves Your Real Business Needs.
          </h2>

          <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed">
            Tell us what you want to build, the problems you need to solve, or the systems you need connected. We&apos;ll schedule a technical discovery call to review scope, timeline, and architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                navigate('/get-started');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 rounded-lg font-bold text-base transition-all duration-200 shadow-xl shadow-blue-900/30 group"
            >
              Start a Project Enquiry
              <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-lg font-semibold text-base transition-all duration-200"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Explore All Services
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
