import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineArrowsRightLeft, 
  HiOutlineBuildingOffice2, 
  HiOutlineCloudArrowUp, 
  HiOutlineComputerDesktop, 
  HiOutlineDevicePhoneMobile,
  HiOutlineCheckCircle,
  HiOutlineBanknotes,
  HiOutlineWrenchScrewdriver,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { TbSparkles } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const challenges = [
  {
    icon: <HiOutlineGlobeAlt className="h-6 w-6 text-blue-600" />,
    badgeBg: "bg-blue-50 border-blue-100",
    title: 'Need a Custom Business Platform?',
    solution:
      'We design and develop full-stack web applications, customer portals, and internal dashboards tailored to your workflows rather than forcing you into rigid templates.',
    tag: 'Web Applications',
    route: '/services/full-stack-web-apps',
  },
  {
    icon: <HiOutlineArrowsRightLeft className="h-6 w-6 text-indigo-600" />,
    badgeBg: "bg-indigo-50 border-indigo-100",
    title: 'Fragmented Tools & Manual Data Entry?',
    solution:
      'We build reliable API integrations, custom middleware, and automated data pipelines that connect your existing software into one coherent system.',
    tag: 'Integrations & APIs',
    route: '/services/custom-software-api-integration',
  },
  {
    icon: <HiOutlineBuildingOffice2 className="h-6 w-6 text-cyan-600" />,
    badgeBg: "bg-cyan-50 border-cyan-100",
    title: 'Outgrowing Spreadsheets for Operations?',
    solution:
      'We develop custom ERP modules and operational systems with role-based access, inventory/finance workflows, and audit logs.',
    tag: 'Enterprise ERP',
    route: '/services/erp-enterprise-applications',
  },
  {
    icon: <HiOutlineCloudArrowUp className="h-6 w-6 text-emerald-600" />,
    badgeBg: "bg-emerald-50 border-emerald-100",
    title: 'Launching a Multi-Tenant Product?',
    solution:
      'We architect scalable SaaS foundations with isolated tenant data schemas, subscription integration hooks, and administrative controls.',
    tag: 'SaaS Platforms',
    route: '/services/saas-products',
  },
  {
    icon: <HiOutlineBanknotes className="h-6 w-6 text-amber-600" />,
    badgeBg: "bg-amber-50 border-amber-100",
    title: 'Retail POS, Invoicing & Inventory Bottlenecks?',
    solution:
      'Turnkey and custom billing engines with GST compliance, real-time stock sync, thermal printing support, and multi-branch management.',
    tag: 'POS & Billing',
    route: '/services/desktop-applications',
  },
  {
    icon: <HiOutlineDevicePhoneMobile className="h-6 w-6 text-violet-600" />,
    badgeBg: "bg-violet-50 border-violet-100",
    title: 'Extending Services to Mobile Users?',
    solution:
      'We build cross-platform and native mobile applications for iOS and Android with responsive interfaces, push notifications, and offline caching.',
    tag: 'Mobile Apps',
    route: '/services/app-development',
  },
  {
    icon: <HiOutlineSparkles className="h-6 w-6 text-blue-600" />,
    badgeBg: "bg-blue-50 border-blue-100",
    title: 'Modern High-Converting Brand & Web Presence?',
    solution:
      'Fast-loading business websites with structured technical SEO, direct WhatsApp lead capture, and no recurring theme licensing fees.',
    tag: 'Website Engineering',
    route: '/services/web-development',
  },
  {
    icon: <HiOutlineComputerDesktop className="h-6 w-6 text-indigo-600" />,
    badgeBg: "bg-indigo-50 border-indigo-100",
    title: 'Offline or Hardware-Connected Tooling Needed?',
    solution:
      'Desktop software for Windows, Linux, and macOS that runs locally without an active connection, interfaces with hardware peripherals, and stores data securely.',
    tag: 'Desktop Software',
    route: '/services/desktop-applications',
  },
  {
    icon: <HiOutlineWrenchScrewdriver className="h-6 w-6 text-emerald-600" />,
    badgeBg: "bg-emerald-50 border-emerald-100",
    title: 'Legacy System Maintenance & Refactoring?',
    solution:
      'Refactoring brittle codebases, upgrading deprecated dependencies, patching security issues, and stabilizing active production systems.',
    tag: 'Rescue & Care',
    route: '/services',
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <TbSparkles className="h-4 w-4" />
            <span>Problem-Driven Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Solving Real Business Challenges With Software
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Technology is only valuable when it eliminates operational bottlenecks, connects teams, and supports your bottom line.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all duration-300 shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${item.badgeBg} transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-[11px] font-mono font-medium">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.solution}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    navigate(item.route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1.5 group-hover:translate-x-0.5"
                >
                  <span>Explore Solution</span>
                  <FiArrowRight className="h-3.5 w-3.5" />
                </button>
                <HiOutlineCheckCircle className="h-4 w-4 text-emerald-500 opacity-80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
