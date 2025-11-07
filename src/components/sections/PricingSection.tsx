import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for small businesses just getting started with digital marketing',
    price: '₹9,999',
    period: '/month',
    features: [
      'Social Media Management (1 platform)',
      'Basic SEO Setup',
      'Email Template Design',
      'Website Analytics',
      '5 Social Media Posts',
      'Monthly Report'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Premium',
    description: 'Ideal for growing businesses looking to expand their digital presence',
    price: '₹24,999',
    period: '/month',
    features: [
      'Social Media Management (3 platforms)',
      'Comprehensive SEO',
      'Email Marketing Campaigns',
      'Google Ads Management',
      '20 Social Media Posts',
      'Lead Generation Strategy',
      'Bi-weekly Reporting',
      'Dedicated Account Manager'
    ],
    cta: 'Get Premium',
    popular: true
  },
  {
    name: 'Professional',
    description: 'Complete solution for established businesses seeking maximum growth',
    price: 'Custom',
    period: 'pricing',
    features: [
      'Full Social Media Management',
      'Advanced SEO & Content Strategy',
      'PPC Campaign Management',
      'Custom Website Development',
      'Unlimited Social Media Posts',
      'Conversion Rate Optimization',
      'App Development Consultation',
      'Weekly Reporting',
      'Priority Support',
      'Strategy Consultation'
    ],
    cta: 'Contact Us',
    popular: false
  }
];

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" 
      id="pricing"
    >
      <div className="absolute inset-0 opacity-5"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-blue-600 font-semibold text-sm">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Flexible <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Solutions</span> for Every Business
          </h2>
          <p className="text-lg text-gray-600">
            Choose the perfect plan that aligns with your business goals
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? 'md:scale-105' : ''}`}
            >
              <div
                className={`rounded-2xl p-8 h-full border transition-all duration-300 relative overflow-hidden bg-white ${
                  plan.popular
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'border-gray-200 group-hover:border-blue-300 group-hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                        className="flex items-start gap-3"
                      >
                        <div className="rounded-full p-1 bg-blue-100 text-blue-600 flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={handleCtaClick}
                    className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 group/btn ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block rounded-2xl p-8 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Let's create a tailored package that fits your specific requirements
            </p>
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group hover:-translate-y-0.5"
            >
              Request Custom Quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;