import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  StarIcon,
  BoltIcon,
  Squares2X2Icon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const reasons = [
  {
    icon: <ChartBarIcon className="h-10 w-10" />,
    title: 'Data-Driven Strategies',
    description: 'We analyze real-time metrics to optimize campaigns for maximum ROI and performance.',
    stats: '200%',
    statsLabel: 'Average ROI Increase',
  },
  {
    icon: <StarIcon className="h-10 w-10" />,
    title: 'Affordable Solutions',
    description: 'Flexible plans tailored to your business needs, ensuring maximum value for your investment.',
    stats: '98%',
    statsLabel: 'Client Satisfaction',
  },
  {
    icon: <BoltIcon className="h-10 w-10" />,
    title: 'Fast Implementation',
    description: 'Quick implementation with measurable results in days, not months.',
    stats: '48hrs',
    statsLabel: 'Average Setup Time',
  },
  {
    icon: <Squares2X2Icon className="h-10 w-10" />,
    title: 'Complete Digital Suite',
    description: 'From strategy to execution, we handle all aspects of your digital presence.',
    stats: '10+',
    statsLabel: 'Integrated Services',
  },
];

const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" id="why-choose">
      <div className="absolute inset-0 bg-gradient-mesh opacity-5"></div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Businesses Choose <span className="gradient-text">Nextorra</span>
          </h2>
          <p className="text-gray-600">
            We deliver measurable results through data-driven strategies that grow your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-effect p-8 rounded-xl border border-white/20 hover:border-primary/20 transition-all duration-300 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent p-3 text-white group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {reason.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {reason.description}
                </p>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{reason.stats}</p>
                      <p className="text-sm text-gray-500">{reason.statsLabel}</p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-2 rounded-full bg-primary/10 text-primary"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate('/get-started')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            type="button"
          >
            Start Your Digital Journey
            <ArrowRightIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
