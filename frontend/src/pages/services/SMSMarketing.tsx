import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const SMSMarketing: React.FC = () => {
  return (
    <ServiceTemplate
      title="SMS Marketing & SMPP"
      description="Reach your customers instantly with targeted SMS campaigns and reliable SMPP solutions for bulk messaging needs."
      benefits={[
        "Instant delivery and high open rates",
        "Direct communication with customers",
        "Automated campaign scheduling",
        "Detailed delivery reports",
        "Custom sender IDs",
        "API integration capabilities"
      ]}
      features={[
        {
          title: "Bulk SMS Campaigns",
          description: "Send personalized messages to thousands of customers simultaneously."
        },
        {
          title: "SMPP Integration",
          description: "Direct SMPP connectivity for reliable and fast message delivery."
        },
        {
          title: "Campaign Analytics",
          description: "Track delivery rates, engagement, and campaign performance."
        },
        {
          title: "API Access",
          description: "Integrate SMS capabilities into your existing systems and applications."
        }
      ]}
      pricing={{
        startingAt: "₹5,000",
        packages: [
          {
            name: "Basic",
            price: "₹5,000/month",
            features: [
              "10,000 SMS Credits",
              "Basic Analytics",
              "Single Sender ID",
              "Web Portal Access"
            ]
          },
          {
            name: "Business",
            price: "₹15,000/month",
            features: [
              "50,000 SMS Credits",
              "Advanced Analytics",
              "Multiple Sender IDs",
              "API Access",
              "Priority Support",
              "Campaign Scheduling"
            ]
          },
          {
            name: "Enterprise",
            price: "₹45,000/month",
            features: [
              "200,000 SMS Credits",
              "Premium Analytics",
              "Unlimited Sender IDs",
              "SMPP Access",
              "24/7 Support",
              "Custom Integration",
              "Dedicated Account Manager"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default SMSMarketing;