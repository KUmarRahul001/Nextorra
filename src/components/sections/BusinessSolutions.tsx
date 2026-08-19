import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
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
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200" id="solutions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-2">
            Problem-Driven Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Solving Real Business Challenges With Software
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
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
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-200 shadow-xs"
            >
              <div>
                <div className="inline-block px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded text-xs font-mono font-medium mb-4">
                  {item.tag}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-start gap-2">
                  <FiCheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.solution}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/get-started');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1.5"
                >
                  <span>Discuss this solution</span>
                  <FiArrowRight className="h-3.5 w-3.5" />
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
