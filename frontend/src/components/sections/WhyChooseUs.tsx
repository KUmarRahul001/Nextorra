import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { 
  HiOutlineCubeTransparent, 
  HiOutlineCpuChip, 
  HiOutlineShieldCheck, 
  HiOutlineClock, 
  HiOutlineChatBubbleLeftRight,
  HiOutlineCommandLine
} from 'react-icons/hi2';
import { TbGitBranch, TbRocket, TbSparkles } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const reasons = [
  {
    icon: <HiOutlineCommandLine className="h-6 w-6 text-blue-600" />,
    badgeBg: "bg-blue-50 border-blue-100",
    title: 'Custom-Built Architecture',
    description: 'We tailor frontend, backend, and data models to your actual business requirements instead of forcing you into generic templates.',
  },
  {
    icon: <HiOutlineCpuChip className="h-6 w-6 text-indigo-600" />,
    badgeBg: "bg-indigo-50 border-indigo-100",
    title: 'Full-Stack Capability',
    description: 'From web applications and mobile apps to database schemas and API integrations, we handle the complete technology scope.',
  },
  {
    icon: <TbGitBranch className="h-6 w-6 text-cyan-600" />,
    badgeBg: "bg-cyan-50 border-cyan-100",
    title: 'Flexible Engagement Models',
    description: 'Work with us on fixed-scope milestone projects, dedicated feature sprints, or ongoing maintenance contracts.',
  },
  {
    icon: <HiOutlineShieldCheck className="h-6 w-6 text-emerald-600" />,
    badgeBg: "bg-emerald-50 border-emerald-100",
    title: 'Clean, Maintainable Code',
    description: 'We prioritize readable, well-structured TypeScript and modern frameworks to ensure you can extend your software in the future.',
  },
  {
    icon: <HiOutlineClock className="h-6 w-6 text-violet-600" />,
    badgeBg: "bg-violet-50 border-violet-100",
    title: 'Transparent Communication',
    description: 'Direct communication, honest timeline estimates, and regular staging environment reviews throughout development.',
  },
  {
    icon: <HiOutlineChatBubbleLeftRight className="h-6 w-6 text-amber-600" />,
    badgeBg: "bg-amber-50 border-amber-100",
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <TbSparkles className="h-4 w-4" />
            <span>Why Rahnoxa</span>
          </div>
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
              className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 shadow-xs group"
            >
              <div className={`p-3 rounded-xl border ${reason.badgeBg} inline-block mb-4 transition-transform group-hover:scale-110`}>
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
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
            className="btn btn-primary inline-flex items-center gap-2 group shadow-md"
          >
            <span>Start a Conversation About Your Project</span>
            <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
