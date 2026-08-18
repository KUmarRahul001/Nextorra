import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const VoiceCallServices: React.FC = () => {
  return (
    <ServiceTemplate
      title="Voice Call Services"
      description="Engage customers effectively with professional voice call solutions for marketing, support, and automated messaging."
      benefits={[
        "Wide reach capability",
        "Automated call scheduling",
        "Multiple language support",
        "Real-time reporting",
        "Custom voice messages",
        "Call recording features"
      ]}
      features={[
        {
          title: "Automated Calls",
          description: "Scheduled voice broadcasts for marketing and announcements."
        },
        {
          title: "Interactive Voice Response",
          description: "Advanced IVR systems for customer service and support."
        },
        {
          title: "Call Analytics",
          description: "Detailed reporting on call metrics and performance."
        },
        {
          title: "Custom Solutions",
          description: "Tailored voice call solutions for specific business needs."
        }
      ]}
      pricing={{
        startingAt: "₹10,000",
        packages: [
          {
            name: "Starter",
            price: "₹10,000/month",
            features: [
              "1000 Minutes",
              "Basic Voice Broadcasting",
              "Standard Reports",
              "Email Support"
            ]
          },
          {
            name: "Business",
            price: "₹25,000/month",
            features: [
              "5000 Minutes",
              "Advanced Voice Broadcasting",
              "IVR Integration",
              "Custom Voice Recording",
              "Priority Support",
              "Detailed Analytics"
            ]
          },
          {
            name: "Enterprise",
            price: "₹75,000/month",
            features: [
              "Unlimited Minutes",
              "Full Suite Voice Solutions",
              "Custom Integration",
              "24/7 Support",
              "Advanced Analytics",
              "API Access",
              "Dedicated Manager"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default VoiceCallServices;