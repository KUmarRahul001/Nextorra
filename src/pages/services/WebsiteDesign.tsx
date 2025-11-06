import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';


const WebsiteDesign: React.FC = () => {
  return (
    <ServiceTemplate
      title="Website Design"
      description="Create a stunning online presence with our professional website design services, combining beautiful aesthetics with powerful functionality."
      benefits={[
        "Mobile-responsive design",
        "Search engine optimized",
        "Fast loading speeds",
        "User-friendly navigation",
        "Conversion-focused layout",
        "Brand-aligned visuals"
      ]}
      features={[
        {
          title: "Custom Design",
          description: "Unique, branded website design that stands out from the competition."
        },
        {
          title: "Responsive Development",
          description: "Mobile-first development ensuring your site works perfectly on all devices."
        },
        {
          title: "SEO Integration",
          description: "Built-in SEO best practices for better search engine visibility."
        },
        {
          title: "Performance Optimization",
          description: "Fast-loading pages and optimized user experience."
        }
      ]}
      pricing={{
        startingAt: "₹15,000",
        packages: [
          {
            name: "Basic",
            price: "₹15,000",
            features: [
              "5 Pages",
              "Mobile Responsive",
              "Basic SEO",
              "Contact Form",
              "3 Revisions"
            ]
          },
          {
            name: "Professional",
            price: "₹45,000",
            features: [
              "10 Pages",
              "Mobile Responsive",
              "Advanced SEO",
              "Custom Forms",
              "Social Media Integration",
              "Blog Setup",
              "5 Revisions"
            ]
          },
          {
            name: "Enterprise",
            price: "₹125,000",
            features: [
              "Unlimited Pages",
              "Custom Functionality",
              "E-commerce Integration",
              "Advanced Analytics",
              "Premium SEO",
              "Unlimited Revisions",
              "Priority Support"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default WebsiteDesign;