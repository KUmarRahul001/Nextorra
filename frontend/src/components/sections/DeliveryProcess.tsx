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
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
            Structured Software Delivery Lifecycle
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From initial requirements to post-launch maintenance, our structured process keeps projects on schedule and scope transparent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-white shadow-sm border border-slate-200">
                  {step.icon}
                </div>
                <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-blue-500 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
