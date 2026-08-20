import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../config';
import HeroSection from '../components/sections/HeroSection';
import BusinessSolutions from '../components/sections/BusinessSolutions';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TechStackSection from '../components/sections/TechStackSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import DeliveryProcess from '../components/sections/DeliveryProcess';
import AboutSection from '../components/sections/AboutSection';
import PricingSection from '../components/sections/PricingSection';
import SupportMaintenanceSection from '../components/sections/SupportMaintenanceSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';

const Home: React.FC = () => {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${config.siteName} – Software Development & Technology Engineering`}</title>
        <meta
          name="description"
          content={`${config.siteName} is a software engineering company building custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations.`}
        />
        <meta
          name="keywords"
          content={`${config.siteName}, software development, web applications, mobile apps, custom ERP, SaaS engineering, enterprise software, API integration`}
        />
        <link rel="canonical" href={`${config.siteUrl}/`} />
      </Helmet>

      <div>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Business Solutions / Problems */}
        <BusinessSolutions />

        {/* 3. Core Services (Prioritizes Tier 1 Software & Engineering) */}
        <ServicesSection />

        {/* 4. Selected Work / Demonstrations (Explicitly marked as concepts/demos) */}
        <PortfolioSection />

        {/* 5. Technology Stack */}
        <TechStackSection />

        {/* 6. Why Rahnoxa / Principles */}
        <WhyChooseUs />

        {/* 7. Structured Delivery Process */}
        <DeliveryProcess />

        {/* 8. About Rahnoxa (Truthful capability positioning) */}
        <AboutSection />

        {/* 9. Engagement Models & Pricing */}
        <PricingSection />

        {/* 10. Support & Maintenance */}
        <SupportMaintenanceSection />

        {/* 11. Final Call-to-Action */}
        <FinalCtaSection />
      </div>
    </>
  );
};

export default Home;
