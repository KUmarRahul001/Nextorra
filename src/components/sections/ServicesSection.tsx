import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  ShareIcon,
  UserPlusIcon,
  ChatBubbleOvalLeftIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  PhoneIcon,
  PaintBrushIcon,
  PhoneArrowUpRightIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    icon: <ShareIcon className="h-8 w-8 text-white" />,
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that increase engagement and drive conversions.',
    features: ['Campaign Strategy', 'Content Creation', 'Community Management']
  },
  {
    icon: <UserPlusIcon className="h-8 w-8 text-white" />,
    title: 'Lead Generation',
    description: 'Data-driven strategies to capture qualified leads for your business.',
    features: ['Landing Pages', 'Lead Nurturing', 'Conversion Optimization']
  },
  {
    icon: <ChatBubbleOvalLeftIcon className="h-8 w-8 text-white" />,
    title: 'SMS Marketing & SMPP',
    description: 'Direct communication channels with your audience through targeted SMS campaigns.',
    features: ['Bulk SMS', 'SMPP Integration', 'Campaign Analytics']
  },
  {
    icon: <GlobeAltIcon className="h-8 w-8 text-white" />,
    title: 'Website Design',
    description: 'Custom, responsive websites that convert visitors into customers.',
    features: ['UI/UX Design', 'Responsive Development', 'SEO Optimization']
  },
  {
    icon: <CodeBracketIcon className="h-8 w-8 text-white" />,
    title: 'Full Stack Web App',
    description: 'End-to-end web application development with robust functionality.',
    features: ['Custom Development', 'API Integration', 'Cloud Deployment']
  },
  {
    icon: <EnvelopeIcon className="h-8 w-8 text-white" />,
    title: 'Email Marketing',
    description: 'Personalized email campaigns that nurture leads and boost sales.',
    features: ['Campaign Automation', 'A/B Testing', 'Performance Analytics']
  },
  {
    icon: <PhoneIcon className="h-8 w-8 text-white" />,
    title: 'Missed Call Service & IVR',
    description: 'Capture leads and provide information through missed call services.',
    features: ['IVR System', 'Call Analytics', 'Lead Capture']
  },
  {
    icon: <PaintBrushIcon className="h-8 w-8 text-white" />,
    title: 'Graphic Design',
    description: 'Eye-catching designs for ads, logos, brochures, and marketing materials.',
    features: ['Brand Identity', 'Marketing Materials', 'Social Media Graphics']
  },
  {
    icon: <PhoneArrowUpRightIcon className="h-8 w-8 text-white" />,
    title: 'Voice Call Services',
    description: 'Automated voice campaigns and customer service solutions.',
    features: ['Voice Broadcasting', 'Call Center Setup', 'IVR Integration']
  },
  {
    icon: <DevicePhoneMobileIcon className="h-8 w-8 text-white" />,
    title: 'App Development',
    description: 'Custom mobile applications for Android, iOS, and cross-platform.',
    features: ['Native Apps', 'Cross-platform', 'App Store Publishing']
  }
];

const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  return (
    <> <Helmet>
        <title>Our Services – Nextorra</title>
        <meta
          name="description"
          content="Explore Nextorra's wide range of services including AI-driven marketing, web development, and automation tools."
        />
        <meta
          name="keywords"
          content="Nextorra services, AI development, automation, web design, digital marketing"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/services" />
      </Helmet>

     <section className="section bg-gradient-to-b from-gray-900 to-primary-dark relative" id="services">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.1)_0%,transparent_100%)] opacity-50"></div>
      
      <div className="container relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Comprehensive Digital Solutions</h2>
          <p className="text-gray-300 text-lg">Transform your business with our full suite of digital marketing and development services.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="glass-effect rounded-xl p-8 h-full border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container with Glow Effect */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent p-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 relative z-10">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <CheckCircleIcon className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Call to Action */}
                <div className="pt-4 mt-auto border-t border-white/10">
                  <a 
                    href="#contact" 
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group/btn"
                  >
                    Learn More
                    <ArrowRightIcon className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);
};

export default ServicesSection;
