import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, LifeBuoy, Wrench, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const supportPillars = [
  {
    icon: <Wrench className="h-6 w-6 text-blue-400" />,
    title: 'Proactive Bug Fixing & Patches',
    desc: 'Rapid diagnosis and resolution of runtime errors, dependency bugs, and UI anomalies.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
    title: 'Security & Dependency Upgrades',
    desc: 'Regular updates to package dependencies, framework versions, and security patches.',
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-cyan-400" />,
    title: 'Feature Extensions & Refactoring',
    desc: 'Iterative feature additions and component refactoring as your operational needs grow.',
  },
  {
    icon: <LifeBuoy className="h-6 w-6 text-emerald-400" />,
    title: 'Direct Technical Support',
    desc: 'Direct communication with software developers who understand your codebase and architecture.',
  },
];

const SupportMaintenanceSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Long-Term Reliability
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                We Maintain and Support What We Build
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Software is never finished on launch day. Nextorra provides reliable maintenance agreements and technical support so your applications stay secure, fast, and compatible with evolving operating environments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {supportPillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/40">
                    <div className="mt-0.5">{pillar.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{pillar.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  navigate('/get-started');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/20"
              >
                Discuss a Support Agreement
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 bg-slate-950/60 border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-300"
            >
              <div className="text-slate-500 mb-3">// Nextorra SLA &amp; Maintenance Policy</div>
              <div className="space-y-2">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Response Window:</span>
                  <span className="text-emerald-400 font-semibold">&lt; 24 Business Hours</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Dependency Audits:</span>
                  <span className="text-blue-400 font-semibold">Monthly Cadence</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Security Patching:</span>
                  <span className="text-indigo-400 font-semibold">Continuous</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Code Handover:</span>
                  <span className="text-yellow-400 font-semibold">Full Client Ownership</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportMaintenanceSection;
