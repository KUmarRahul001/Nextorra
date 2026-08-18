import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const EmailMarketing: React.FC = () => {
  return (
    <ServiceTemplate
      title="Email Marketing"
      description="Drive engagement and sales with targeted email campaigns, automated workflows, and personalized content."
      benefits={[
        "Higher customer engagement",
        "Increased conversion rates",
        "Automated customer journeys",
        "Personalized messaging",
        "Detailed analytics",
        "List growth strategies"
      ]}
      features={[
        {
          title: "Campaign Management",
          description: "Strategic planning and execution of email campaigns."
        },
        {
          title: "Automation Workflows",
          description: "Automated sequences based on customer behavior and triggers."
        },
        {
          title: "Template Design",
          description: "Custom, responsive email templates that convert."
        },
        {
          title: "Performance Tracking",
          description: "Comprehensive analytics and A/B testing."
        }
      ]}
      pricing={{
        startingAt: "₹4,000",
        packages: [
          {
            name: "Basic",
            price: "₹4,000/month",
            features: [
              "Up to 5,000 Subscribers",
              "Basic Templates",
              "Monthly Newsletter",
              "Basic Analytics"
            ]
          },
          {
            name: "Growth",
            price: "₹12,000/month",
            features: [
              "Up to 25,000 Subscribers",
              "Custom Templates",
              "Automation Workflows",
              "A/B Testing",
              "Advanced Analytics",
              "List Segmentation"
            ]
          },
          {
            name: "Enterprise",
            price: "₹35,000/month",
            features: [
              "Unlimited Subscribers",
              "Premium Templates",
              "Complex Automations",
              "Advanced Segmentation",
              "Priority Support",
              "Strategy Consultation",
              "Custom Integration"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default EmailMarketing;