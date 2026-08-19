import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, LifeBuoy, Wrench, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const supportPillars = [
  {
    icon: <Wrench className="h-5 w-5 text-blue-600" />,
    title: 'Proactive Bug Fixing & Patches',
    desc: 'Rapid diagnosis and resolution of runtime errors, dependency bugs, and UI anomalies.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-indigo-600" />,
    title: 'Security & Dependency Upgrades',
    desc: 'Regular updates to package dependencies, framework versions, and security patches.',
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-blue-600" />,
    title: 'Feature Extensions & Refactoring',
    desc: 'Iterative feature additions and component refactoring as your operational needs grow.',
  },
  {
    icon: <LifeBuoy className="h-5 w-5 text-emerald-600" />,
    title: 'Direct Technical Support',
    desc: 'Direct communication with software developers who understand your codebase and architecture.',
  },
];

const SupportMaintenanceSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-2">
                Long-Term Reliability
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                We Maintain and Support What We Build
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Software is never finished on launch day. Rahnoxa provides reliable maintenance agreements and technical support so your applications stay secure, fast, and compatible with evolving operating environments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {supportPillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <div className="p-1.5 rounded-lg bg-blue-50 mt-0.5">{pillar.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">{pillar.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">{pillar.desc}</p>
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
                className="btn btn-primary"
              >
                <span>Discuss a Support Agreement</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 font-mono text-xs text-slate-700 shadow-sm"
            >
              <div className="text-slate-500 mb-3 font-semibold">// Rahnoxa SLA &amp; Maintenance Policy</div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Response Window:</span>
                  <span className="text-emerald-700 font-bold">&lt; 24 Business Hours</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Dependency Audits:</span>
                  <span className="text-blue-700 font-bold">Monthly Cadence</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Security Patching:</span>
                  <span className="text-indigo-700 font-bold">Continuous</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Code Handover:</span>
                  <span className="text-slate-900 font-bold">Full Client Ownership</span>
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
