import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiLayers, FiShield, FiCheckCircle, FiUserCheck } from 'react-icons/fi';

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission, Vision & Profile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-2">
              About Rahnoxa
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Direct Engineering &amp; Software Solutions
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-4">
              Rahnoxa is a specialized software development consultancy founded and run by an independent software engineer. You work directly with the builder who designs your architecture, writes your production code, and configures your cloud deployments.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              No middle management, no junior handoffs, and no bureaucratic communication layers. Direct, transparent developer-to-client collaboration on web applications, enterprise ERPs, APIs, and mobile systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-base">
                  <FiTarget className="h-5 w-5" />
                  <span>My Mission</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To deliver tailored software solutions that solve concrete operational bottlenecks with high reliability and zero technical debt.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-base">
                  <FiLayers className="h-5 w-5" />
                  <span>Engineering Philosophy</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Architecture first, strict TypeScript typing, and milestone-based transparency from initial discovery to deployment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Commitments */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <FiUserCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">How I Deliver</h3>
                <p className="text-xs text-slate-500 font-mono">Independent developer commitments on every project</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: '1-on-1 Direct Engineering Access',
                  desc: 'You communicate directly with the engineer building your system throughout the entire project.',
                },
                {
                  title: 'Requirements-First Scoping',
                  desc: 'User journeys, operational dependencies, and integration endpoints are mapped before writing production code.',
                },
                {
                  title: 'Modular & Maintainable Codebases',
                  desc: 'Clean, typed codebases with componentized layouts and type-safe API contracts for easy future scaling.',
                },
                {
                  title: 'Data Security & Role Isolation',
                  desc: 'Secure authentication, access controls, and protected schemas designed from day one.',
                },
                {
                  title: 'Milestone Review & 100% Code Ownership',
                  desc: 'Weekly staging previews, continuous feedback, and complete client ownership of code repositories.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FiCheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;