import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Layout, Code2, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Scope',
    description:
      'We discuss your business requirements, user expectations, existing infrastructure, and operational goals to establish a clear project scope.',
    icon: <Search className="h-5 w-5 text-blue-500" />,
  },
  {
    number: '02',
    title: 'Architecture & Spec',
    description:
      'We define data schemas, technology choices, API specifications, and infrastructure blueprints before writing production code.',
    icon: <Compass className="h-5 w-5 text-indigo-500" />,
  },
  {
    number: '03',
    title: 'UI/UX & Prototyping',
    description:
      'We design user interfaces and interaction flows focused on clarity, responsiveness, and efficiency for end users.',
    icon: <Layout className="h-5 w-5 text-purple-500" />,
  },
  {
    number: '04',
    title: 'Iterative Engineering',
    description:
      'We build frontend components, backend services, integrations, and automated tests in milestone-based development sprints.',
    icon: <Code2 className="h-5 w-5 text-cyan-500" />,
  },
  {
    number: '05',
    title: 'Deployment & Launch',
    description:
      'We configure production environments, run security and performance validations, and deploy your software seamlessly.',
    icon: <Rocket className="h-5 w-5 text-emerald-500" />,
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description:
      'We provide bug fixes, performance monitoring, feature enhancements, and maintenance to ensure software longevity.',
    icon: <LifeBuoy className="h-5 w-5 text-amber-500" />,
  },
];

const DeliveryProcess: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-cyan-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            A Structured, Dependable Delivery Model
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every project follows a transparent roadmap with clear milestones, regular progress reviews, and rigorous testing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-700 group-hover:text-blue-500/40 transition-colors font-mono">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
