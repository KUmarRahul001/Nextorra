import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Target,
  MessageSquare,
  Globe,
  Code,
  Mail,
  Phone,
  Palette,
  PhoneCall,
  Smartphone,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  features: string[];
}

const ServicesOverview: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Social Media Marketing',
      description:
        'Build your brand presence and engage with your audience across all major social platforms.',
      icon: <Share2 className="w-8 h-8" />,
      path: '/services/social-media-marketing',
      features: [
        'Content Strategy',
        'Community Management',
        'Analytics & Reporting',
        'Paid Campaigns',
      ],
    },
    {
      title: 'Lead Generation',
      description:
        'Convert prospects into qualified leads with targeted campaigns and optimization strategies.',
      icon: <Target className="w-8 h-8" />,
      path: '/services/lead-generation',
      features: [
        'Landing Pages',
        'Lead Magnets',
        'Conversion Optimization',
        'Lead Nurturing',
      ],
    },
    {
      title: 'SMS Marketing',
      description:
        'Reach customers directly with personalized SMS campaigns that drive engagement and sales.',
      icon: <MessageSquare className="w-8 h-8" />,
      path: '/services/sms-marketing',
      features: [
        'Bulk SMS',
        'Automated Campaigns',
        'Two-way Messaging',
        'Analytics',
      ],
    },
    {
      title: 'Website Design',
      description:
        'Create stunning, responsive websites that captivate visitors and drive conversions.',
      icon: <Globe className="w-8 h-8" />,
      path: '/services/website-design',
      features: [
        'Responsive Design',
        'UI/UX Optimization',
        'SEO-Friendly',
        'Fast Loading',
      ],
    },
    {
      title: 'Full Stack Web App',
      description:
        'Custom web applications built with cutting-edge technologies for your business needs.',
      icon: <Code className="w-8 h-8" />,
      path: '/services/full-stack-web-app',
      features: [
        'Custom Development',
        'Database Design',
        'API Integration',
        'Cloud Deployment',
      ],
    },
    {
      title: 'Email Marketing',
      description:
        'Engage your audience with personalized email campaigns that convert and retain customers.',
      icon: <Mail className="w-8 h-8" />,
      path: '/services/email-marketing',
      features: [
        'Campaign Design',
        'Automation',
        'Segmentation',
        'Performance Tracking',
      ],
    },
    {
      title: 'Missed Call Service',
      description:
        'Never miss a customer inquiry with automated missed call services and follow-ups.',
      icon: <Phone className="w-8 h-8" />,
      path: '/services/missed-call-service',
      features: [
        'Auto Response',
        'Lead Capture',
        'Real-time Alerts',
        'Integration Ready',
      ],
    },
    {
      title: 'Graphic Design',
      description:
        'Professional designs that communicate your brand message and stand out from the competition.',
      icon: <Palette className="w-8 h-8" />,
      path: '/services/graphic-design',
      features: [
        'Brand Identity',
        'Marketing Materials',
        'Social Graphics',
        'Print Design',
      ],
    },
    {
      title: 'Voice Call Services',
      description:
        'Automated voice calling solutions for marketing, surveys, and customer engagement.',
      icon: <PhoneCall className="w-8 h-8" />,
      path: '/services/voice-call-services',
      features: [
        'IVR Systems',
        'Bulk Voice Calls',
        'Call Analytics',
        'Custom Messages',
      ],
    },
    {
      title: 'App Development',
      description:
        'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: <Smartphone className="w-8 h-8" />,
      path: '/services/app-development',
      features: [
        'iOS & Android',
        'Cross-Platform',
        'App Store Optimization',
        'Maintenance & Support',
      ],
    },
  ];

  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>Our Services – Nextorra</title>
        <meta
          name="description"
          content="Explore Nextorra’s range of digital services, including social media marketing, web design, and automation."
        />
        <meta
          name="keywords"
          content="Nextorra services, digital marketing, automation, web design, social media"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/services" />
      </Helmet>

      {/* ✅ Page Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive digital solutions to grow your business and reach
              your goals
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how our services can help your business grow
            </p>
            <Link
              to="/get-started"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesOverview;
