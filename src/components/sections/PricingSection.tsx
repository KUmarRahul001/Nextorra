import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Clock, Zap, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const engagementModels = [
  {
    name: 'Starter / Fixed Scope',
    badge: 'Clear Deliverables',
    description: 'Best for landing pages, websites, mobile MVPs, or specific API integrations with well-defined requirements.',
    pricing: 'Starts at ₹4,999',
    pricingNote: 'Fixed milestone pricing based on chosen package',
    features: [
      'Comprehensive discovery & architectural spec',
      'Fixed timeline with milestone review points',
      'Staging environment testing before release',
      'Free automated SSL and cloud deployment setup',
      '30-day post-launch technical bug fix warranty',
      '100% Client Ownership of code & domain',
    ],
    cta: 'Explore Fixed Packages',
    popular: false,
  },
  {
    name: 'Growth Care Retainer',
    badge: 'Recommended for Active Businesses',
    description: 'Continuous technical management, proactive security updates, monthly performance tuning, and dedicated developer hours.',
    pricing: '₹3,999 / month',
    pricingNote: 'Month-to-month billing · Zero lock-in contracts',
    features: [
      '24/7 Cloud hosting & uptime monitoring',
      'Weekly automated cloud database backups',
      '4 Hours / month of developer feature changes',
      'Monthly Google Core Web Vitals & SEO health audit',
      'WhatsApp & form automation health verification',
      '24-Hour SLA on critical bug fixes',
    ],
    cta: 'Start Monthly Care',
    popular: true,
  },
  {
    name: 'Sprint / Dedicated Dev',
    badge: 'Iterative Engineering',
    description: 'Ideal for evolving SaaS platforms, custom ERP modules, or companies needing continuous engineering capacity.',
    pricing: 'Sprint / Milestone Billing',
    pricingNote: 'Tailored to sprint backlog and complexity',
    features: [
      'Flexible sprint backlog prioritization',
      'Bi-weekly delivery and review cycles',
      'Direct technical communication with developers',
      'Feature builds, database refactoring & optimization',
      'Continuous integration & staging deployments',
      'Dedicated engineering SLA',
    ],
    cta: 'Discuss Dedicated Sprints',
    popular: false,
  },
];

const rescueTiers = [
  {
    title: 'Website Crash Fix',
    price: '₹2,999',
    sla: '< 4–8h SLA',
    desc: 'Fatal PHP/JS errors, 500 server crashes, database connection errors.',
  },
  {
    title: 'DNS / Domain / SSL',
    price: '₹1,499',
    sla: '< 2–4h SLA',
    desc: 'SSL handshake errors, DNS propagation issues, Cloudflare conflict resolution.',
  },
  {
    title: 'Spam Email / SPF Fix',
    price: '₹1,999',
    sla: '< 2–4h SLA',
    desc: 'SPF, DKIM, DMARC configuration to ensure business emails land in inboxes.',
  },
  {
    title: '24h Express Launch',
    price: '₹7,499',
    sla: '24h SLA',
    desc: 'Emergency single-page responsive website live before an event or marketing launch.',
  },
];

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest mb-2 block">
            Transparent Pricing Models
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Affordable, Flexible Engagement Models
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From single milestone builds starting at ₹4,999 to continuous monthly care plans and same-day emergency rescue — structured for Indian SMBs and startups.
          </p>
        </motion.div>

        {/* 3 Main Engagement Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {engagementModels.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                model.popular
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 md:-translate-y-2'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Recommended
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-blue-700 border border-slate-200">
                    {model.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{model.name}</h3>
                <p className="text-xs text-slate-600 mb-5 leading-relaxed">{model.description}</p>

                <div className="mb-6 pb-6 border-t border-b border-slate-100 pt-4">
                  <p className="text-2xl font-black text-slate-900">{model.pricing}</p>
                  <p className="text-xs text-slate-500 mt-1">{model.pricingNote}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {model.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={handleCtaClick}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  model.popular
                    ? 'btn btn-primary'
                    : 'btn btn-outline'
                }`}
              >
                <span>{model.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Emergency / Rescue Section Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider block mb-1">
                Rahnoxa Rescue &amp; Last-Minute Saver
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Urgent Technical Rescue &amp; Same-Day Fixes
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                When time is critical and other agencies say "wait 2 weeks" — Rahnoxa provides fixed-price rapid triage.
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
            >
              Request Emergency Triage →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rescueTiers.map((tier, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                    {tier.sla}
                  </span>
                  <span className="text-base font-bold text-slate-900">{tier.price}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{tier.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center mt-8 text-xs text-slate-500">
          <p>All prices in INR exclude 18% GST where applicable. Serving businesses across India with dedicated 24–48 hour discovery SLAs.</p>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;