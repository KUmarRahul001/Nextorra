import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../config';
import HeroSection from '../components/sections/HeroSection';
import HeroMarquee from '../components/sections/HeroMarquee';
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

import { getOrganizationSchema, getWebSiteSchema } from '../lib/seo/schema';

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

  const orgSchema = getOrganizationSchema(config.siteUrl);
  const websiteSchema = getWebSiteSchema(config.siteUrl);

  return (
    <>
      <Helmet>
        <title>Rahnoxa | Software Development Company in Jamshedpur</title>
        <meta
          name="description"
          content="Rahnoxa is a leading software development company in Jamshedpur, Jharkhand building bespoke web applications, enterprise ERP systems, mobile apps, SaaS platforms, and API solutions."
        />
        <link rel="canonical" href="https://rahnoxa.rahnoxa-tech.workers.dev/" />
        <meta property="og:title" content="Rahnoxa | Software Development Company in Jamshedpur" />
        <meta property="og:description" content="Rahnoxa is a leading software development company in Jamshedpur, Jharkhand building bespoke web applications, enterprise ERP systems, mobile apps, SaaS platforms, and API solutions." />
        <meta property="og:url" content="https://rahnoxa.rahnoxa-tech.workers.dev/" />
        <meta property="og:image" content="https://rahnoxa.rahnoxa-tech.workers.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Google Knowledge Graph & LocalBusiness Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      <div>
        {/* 1. Hero */}
        <HeroSection />

        {/* 1.5 Infinite Moving Brand Stream below Hero */}
        <HeroMarquee />

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
