import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Cpu,
  GitBranch,
} from 'lucide-react';

const techCategories = [
  {
    category: 'Frontend & UI',
    icon: <Code2 className="h-6 w-6 text-blue-500" />,
    description: 'Responsive, accessible, and fast web user interfaces.',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5 / CSS3'],
  },
  {
    category: 'Backend & APIs',
    icon: <Server className="h-6 w-6 text-indigo-500" />,
    description: 'Server architecture, RESTful services, and integration layers.',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'Webhooks'],
  },
  {
    category: 'Databases & Storage',
    icon: <Database className="h-6 w-6 text-emerald-500" />,
    description: 'Structured data persistence, transactions, and caching.',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'Mobile & Cross-Platform',
    icon: <Smartphone className="h-6 w-6 text-cyan-500" />,
    description: 'Native and hybrid mobile app engineering for iOS and Android.',
    items: ['React Native', 'Flutter', 'Android SDK', 'iOS tooling'],
  },
  {
    category: 'Desktop & Systems',
    icon: <Cpu className="h-6 w-6 text-purple-500" />,
    description: 'Client software running on Windows, Linux, and macOS platforms.',
    items: ['Electron', 'Native Shell Scripts', 'Local Storage APIs'],
  },
  {
    category: 'DevOps & Toolchain',
    icon: <GitBranch className="h-6 w-6 text-amber-500" />,
    description: 'Version control, automated build pipelines, and cloud hosting.',
    items: ['Git & GitHub', 'Netlify Edge', 'Docker Basics', 'CI/CD Pipelines'],
  },
];

const TechStackSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/90 text-white relative overflow-hidden border-y border-slate-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-cyan-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Modern Technologies We Work With
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We choose reliable, community-backed frameworks and tools suited to the longevity of your software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.category}</h3>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {cat.items.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-block px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
