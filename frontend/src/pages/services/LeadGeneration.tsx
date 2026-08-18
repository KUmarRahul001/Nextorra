import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const LeadGeneration: React.FC = () => {
  return (
    <ServiceTemplate
      title="Lead Generation"
      description="Generate high-quality leads for your business through targeted campaigns, optimized landing pages, and data-driven strategies."
      benefits={[
        "Qualified leads that match your target audience",
        "Higher conversion rates and ROI",
        "Reduced cost per acquisition",
        "Scalable lead generation system",
        "Real-time tracking and analytics",
        "Multi-channel lead capture"
      ]}
      features={[
        {
          title: "Landing Page Optimization",
          description: "High-converting landing pages designed to capture and nurture leads effectively."
        },
        {
          title: "Multi-Channel Campaigns",
          description: "Integrated campaigns across search, social, and email to maximize lead generation."
        },
        {
          title: "Lead Scoring & Qualification",
          description: "Advanced scoring system to identify and prioritize the most valuable leads."
        },
        {
          title: "Analytics & Reporting",
          description: "Comprehensive reporting on lead quality, conversion rates, and campaign performance."
        }
      ]}
      pricing={{
        startingAt: "₹8,000",
        packages: [
          {
            name: "Starter",
            price: "₹8,000/month",
            features: [
              "1 Landing Page",
              "Basic Lead Capture Forms",
              "Email Lead Nurturing",
              "Monthly Performance Report"
            ]
          },
          {
            name: "Growth",
            price: "₹24,000/month",
            features: [
              "3 Landing Pages",
              "Advanced Lead Capture",
              "Multi-Channel Campaigns",
              "Lead Scoring System",
              "Weekly Performance Reports",
              "CRM Integration"
            ]
          },
          {
            name: "Enterprise",
            price: "₹75,000/month",
            features: [
              "Unlimited Landing Pages",
              "Custom Lead Capture Solutions",
              "Full-Scale Marketing Automation",
              "Advanced Lead Scoring",
              "Real-time Analytics",
              "Dedicated Account Manager",
              "Priority Support"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default LeadGeneration;