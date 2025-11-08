import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/sections/HeroSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PricingSection from '../components/sections/PricingSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ClientsSection from '../components/sections/ClientsSection';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
     <>
      <Helmet>
        <title>Nextorra – Affordable & Scalable Digital Solutions</title>
        <meta
          name="description"
          content="Nextorra provides AI-driven marketing, web development, and business automation solutions to help startups scale efficiently."
        />
        <meta
          name="keywords"
          content="Nextorra, AI solutions, web development, digital marketing, automation tools"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/" />
      </Helmet>
      <div>
        <HeroSection />
        <WhyChooseUs />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <ClientsSection />
      </div>
    </>
  );
};

export default Home;
