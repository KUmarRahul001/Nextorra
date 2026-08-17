import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Layers, FileCode, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const models = [
  {
    name: 'Fixed-Scope Project',
    icon: <FileCode className="h-6 w-6 text-blue-500" />,
    badge: 'Clear Deliverables',
    description: 'Best for well-defined web apps, websites, mobile MVPs, or specific integrations with defined specifications.',
    pricing: 'Milestone-based billing',
    features: [
      'Comprehensive discovery & specification',
      'Fixed timeline and deliverables',
      'Milestone-based progress reviews',
      'Staging environment testing',
      'Final deployment & handover',
      '30-day post-launch warranty',
    ],
    cta: 'Discuss Fixed Project',
    popular: true,
  },
  {
    name: 'Sprint / Dedicated Dev',
    icon: <Layers className="h-6 w-6 text-indigo-500" />,
    badge: 'Iterative & Flexible',
    description: 'Ideal for evolving SaaS platforms, enterprise systems, or companies needing ongoing engineering capability.',
    pricing: 'Sprint / retainer billing',
    features: [
      'Flexible backlog prioritization',
      'Weekly or bi-weekly sprint cycles',
      'Direct technical communication',
      'Feature builds, refactors, and optimizations',
      'Regular architecture reviews',
      'Continuous integration & staging',
    ],
    cta: 'Discuss Dedicated Sprints',
    popular: false,
  },
  {
    name: 'Support & Maintenance',
    icon: <Clock className="h-6 w-6 text-emerald-500" />,
    badge: 'Ongoing Reliability',
    description: 'For existing software platforms requiring security updates, bug fixes, uptime monitoring, and small feature additions.',
    pricing: 'Monthly agreement',
    features: [
      'Scheduled security & dependency updates',
      'Bug fixes & technical troubleshooting',
      'Performance & uptime monitoring',
      'API compatibility maintenance',
      'Minor feature enhancements',
      'Dedicated response SLA',
    ],
    cta: 'Discuss Maintenance',
    popular: false,
  },
];

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Engagement &amp; Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Transparent, Flexible Engagement Models
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Because custom software varies in scope, we offer structured engagement models tailored to your project timeline, budget, and business objectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-2xl p-8 border bg-white flex flex-col justify-between transition-all duration-200 ${
                model.popular
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-slate-100">{model.icon}</div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {model.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{model.name}</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{model.description}</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <p className="text-sm font-semibold text-blue-600">{model.pricing}</p>
                  <p className="text-xs text-slate-400">Custom quote based on scope &amp; requirements</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {model.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={handleCtaClick}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  model.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                {model.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            Operating internationally with businesses across India, the UK, Canada, Europe, and Australia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;