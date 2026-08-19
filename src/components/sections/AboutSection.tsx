import React from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
              Engineering Custom Software For Modern Organizations
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-4">
              Rahnoxa is a software development and technology solutions company. We specialize in designing, building, and deploying digital applications — including web platforms, mobile apps, enterprise ERP modules, SaaS products, and custom API integrations.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              We work with startups, growing SMEs, and enterprise teams seeking reliable technical partners who can translate operational needs into robust software systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-base">
                  <Target className="h-5 w-5" />
                  <span>Our Mission</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  To deliver tailored software solutions that solve concrete operational challenges and create sustainable technical advantage for our clients.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-base">
                  <Layers className="h-5 w-5" />
                  <span>Our Philosophy</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
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
            className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">How We Deliver</h3>
                <p className="text-xs text-slate-500 font-mono">Our engineering commitments on every project</p>
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
                  <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
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