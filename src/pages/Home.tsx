import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/sections/HeroSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PricingSection from '../components/sections/PricingSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ClientsSection from '../components/sections/ClientsSection';

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
      <SEO
        title="Nextorra - Digital Marketing & Web Development"
        description="Grow your business with Nextorra’s digital marketing, software development, branding, and web design solutions."
        url="https://nextorra.netlify.app/"
      />
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
