import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiGitPullRequest, FiHeadphones, FiShield, FiClock, FiArrowRight } from 'react-icons/fi';
import { TbTopologyStar3 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const reasons = [
  {
    icon: <FiCode className="h-5 w-5 text-blue-600" />,
    title: 'Custom-Built Architecture',
    description: 'We tailor frontend, backend, and data models to your actual business requirements instead of forcing you into generic templates.',
  },
  {
    icon: <TbTopologyStar3 className="h-5 w-5 text-indigo-600" />,
    title: 'Full-Stack Capability',
    description: 'From web applications and mobile apps to database schemas and API integrations, we handle the complete technology scope.',
  },
  {
    icon: <FiGitPullRequest className="h-5 w-5 text-blue-600" />,
    title: 'Flexible Engagement Models',
    description: 'Work with us on fixed-scope milestone projects, dedicated feature sprints, or ongoing maintenance contracts.',
  },
  {
    icon: <FiShield className="h-5 w-5 text-emerald-600" />,
    title: 'Clean, Maintainable Code',
    description: 'We prioritize readable, well-structured TypeScript and modern frameworks to ensure you can extend your software in the future.',
  },
  {
    icon: <FiClock className="h-5 w-5 text-blue-600" />,
    title: 'Transparent Communication',
    description: 'Direct communication, honest timeline estimates, and regular staging environment reviews throughout development.',
  },
  {
    icon: <FiHeadphones className="h-5 w-5 text-amber-600" />,
    title: 'Post-Launch Support',
    description: 'We remain available after deployment for bug fixes, performance monitoring, and subsequent release cycles.',
  },
];

const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200" id="why-choose">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest block mb-2">
            Why Rahnoxa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Engineering Principles You Can Rely On
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
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
              className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all duration-200 shadow-xs"
            >
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 inline-block mb-4">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <span>Start a Conversation About Your Project</span>
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
