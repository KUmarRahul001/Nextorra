import React from 'react';
import { motion } from 'framer-motion';
import { Code, GitPullRequest, Workflow, Headphones, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const reasons = [
  {
    icon: <Code className="h-6 w-6 text-blue-500" />,
    title: 'Custom-Built Architecture',
    description: 'We tailor frontend, backend, and data models to your actual business requirements instead of forcing you into generic templates.',
  },
  {
    icon: <Workflow className="h-6 w-6 text-indigo-500" />,
    title: 'Full-Stack Capability',
    description: 'From web applications and mobile apps to database schemas and API integrations, we handle the complete technology scope.',
  },
  {
    icon: <GitPullRequest className="h-6 w-6 text-purple-500" />,
    title: 'Flexible Engagement Models',
    description: 'Work with us on fixed-scope milestone projects, dedicated feature sprints, or ongoing maintenance contracts.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    title: 'Clean, Maintainable Code',
    description: 'We prioritize readable, well-structured TypeScript and modern frameworks to ensure you can extend your software in the future.',
  },
  {
    icon: <Clock className="h-6 w-6 text-cyan-500" />,
    title: 'Transparent Communication',
    description: 'Direct communication, honest timeline estimates, and regular staging environment reviews throughout development.',
  },
  {
    icon: <Headphones className="h-6 w-6 text-amber-500" />,
    title: 'Post-Launch Support',
    description: 'We remain available after deployment for bug fixes, performance monitoring, and subsequent release cycles.',
  },
];

const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="why-choose">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Why Nextorra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Engineering Principles You Can Rely On
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We focus on technical precision, sustainable architecture, and dependable delivery for every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-xl hover:border-blue-500/40 hover:bg-slate-800 transition-all duration-200"
            >
              <div className="p-3 rounded-lg bg-slate-700/50 inline-block mb-4">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              navigate('/get-started');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30"
          >
            Start a Conversation About Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
