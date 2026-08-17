import React from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="about">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission, Vision & Profile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              About Nextorra
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              Engineering Custom Software For Modern Organizations
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Nextorra is a software development and technology solutions company. We specialize in designing, building, and deploying digital applications — including web platforms, mobile apps, enterprise ERP modules, SaaS products, and custom API integrations.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              We work with startups, growing SMEs, and enterprise teams seeking reliable technical partners who can translate operational needs into robust software systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/70 border border-slate-700/60 p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-2 text-blue-400 font-bold text-base">
                  <Target className="h-5 w-5" />
                  <span>Our Mission</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  To deliver tailored software solutions that solve concrete operational challenges and create sustainable technical advantage for our clients.
                </p>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-2 text-indigo-400 font-bold text-base">
                  <Layers className="h-5 w-5" />
                  <span>Our Philosophy</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Architecture first, clean code throughout, and milestone-based transparency from initial discovery to production deployment.
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
            className="lg:col-span-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">How We Deliver</h3>
                <p className="text-xs text-slate-400">Our engineering commitments on every project</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Requirements-First Scoping',
                  desc: 'We map user journeys, operational dependencies, and integration endpoints before writing production code.',
                },
                {
                  title: 'Modular & Maintainable Codebases',
                  desc: 'We use structured TypeScript, componentized layouts, and clean API contracts to make future upgrades painless.',
                },
                {
                  title: 'Data Security & Role Isolation',
                  desc: 'We design applications with secure authentication, access control, and protected data schemas from day one.',
                },
                {
                  title: 'Responsive & Accessible Across Devices',
                  desc: 'Every web and mobile interface is tested across screen dimensions, browser engines, and touch interfaces.',
                },
                {
                  title: 'Transparent Collaboration',
                  desc: 'Regular milestone check-ins, staging preview environments, and direct technical communication throughout the project.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
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