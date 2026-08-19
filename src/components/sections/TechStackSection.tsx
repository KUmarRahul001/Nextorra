import React from 'react';
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Cpu,
  GitBranch,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

const techCategories = [
  {
    category: 'Frontend & Client Applications',
    icon: <Code2 className="h-5 w-5 text-blue-400" />,
    description: 'High-performance SPAs and responsive interfaces with strict typing and modern state management.',
    items: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Framer Motion'],
  },
  {
    category: 'Backend & Microservices',
    icon: <Server className="h-5 w-5 text-indigo-400" />,
    description: 'Stateless RESTful APIs, distributed services, authentication gateways, and task schedulers.',
    items: ['Node.js', 'Express', 'Go', 'Python', 'JWT / OAuth2', 'REST & gRPC'],
  },
  {
    category: 'Database & Persistent Storage',
    icon: <Database className="h-5 w-5 text-emerald-400" />,
    description: 'Relational data modeling, ACID transactions, caching layers, and object storage.',
    items: ['PostgreSQL', 'Redis', 'Supabase', 'MySQL', 'Cloudflare R2 / S3'],
  },
  {
    category: 'Mobile & Multi-Platform',
    icon: <Smartphone className="h-5 w-5 text-cyan-400" />,
    description: 'Cross-platform mobile applications sharing business logic with native-feel interactions.',
    items: ['React Native', 'Flutter', 'Expo SDK', 'iOS APNs', 'Android FCM'],
  },
];

const TechStackSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800" id="tech-stack">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
            Engineering Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Production-Proven Technology Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            We avoid unnecessary bleeding-edge hype. Our systems are built on battle-tested frameworks that prioritize stability, maintainability, and long-term business value.
          </p>
        </div>

        {/* 2x2 Clean Engineering Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {techCategories.map((cat, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 hover:border-slate-700 transition-colors space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex-shrink-0">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {cat.category}
                </h3>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {cat.description}
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                {cat.items.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Standards Callout Row */}
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <span>Strict TypeScript typing &amp; automated test coverage for core business logic</span>
          </div>
          <span className="font-mono text-slate-500">Security: OWASP Top 10 Compliant</span>
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
