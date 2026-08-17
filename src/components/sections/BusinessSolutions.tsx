import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const challenges = [
  {
    title: 'Need a Custom Business Platform?',
    solution:
      'We design and develop full-stack web applications, customer portals, and internal dashboards tailored to your workflows rather than forcing you into rigid templates.',
    tag: 'Web Applications',
  },
  {
    title: 'Fragmented Tools & Manual Data Entry?',
    solution:
      'We build reliable API integrations, custom middleware, and automated data pipelines that connect your existing software into one coherent system.',
    tag: 'Integrations & APIs',
  },
  {
    title: 'Outgrowing Spreadsheets for Operations?',
    solution:
      'We develop custom ERP modules and operational systems with role-based access, inventory/finance workflows, and comprehensive audit logs.',
    tag: 'Enterprise Systems',
  },
  {
    title: 'Launching a Multi-Tenant Product?',
    solution:
      'We architect scalable SaaS foundations from day one with isolated tenant data, subscription hooks, secure authentication, and administrative controls.',
    tag: 'SaaS Platforms',
  },
  {
    title: 'Offline or Hardware-Connected Tooling Needed?',
    solution:
      'We build native desktop software for Windows, Linux, and macOS that runs locally, interfaces with hardware devices, and processes data securely offline.',
    tag: 'Desktop Software',
  },
  {
    title: 'Extending Services to Mobile Users?',
    solution:
      'We build cross-platform and native mobile applications for iOS and Android with responsive interfaces, push notifications, and reliable offline caching.',
    tag: 'Mobile Apps',
  },
];

const BusinessSolutions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Problem-Driven Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Solving Real Business Challenges With Software
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Technology is only valuable when it eliminates bottlenecks, connects teams, and supports your bottom line.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/40 hover:bg-slate-800 transition-all duration-200"
            >
              <div>
                <div className="inline-block px-2.5 py-1 bg-slate-700/60 text-slate-300 rounded text-xs font-mono font-medium mb-4">
                  {item.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.solution}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors gap-1.5"
                >
                  Discuss this solution
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
