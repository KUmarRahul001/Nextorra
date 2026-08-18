import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const MissedCallService: React.FC = () => {
  return (
    <ServiceTemplate
      title="Missed Call Service & IVR"
      description="Capture leads and automate customer interactions with our advanced missed call and IVR solutions."
      benefits={[
        "24/7 lead capture",
        "Automated response system",
        "Cost-effective solution",
        "Easy integration",
        "Detailed call analytics",
        "Custom voice messages"
      ]}
      features={[
        {
          title: "Missed Call System",
          description: "Automated lead capture through missed calls with instant response."
        },
        {
          title: "IVR Solutions",
          description: "Professional IVR system with custom menu options and routing."
        },
        {
          title: "Analytics Dashboard",
          description: "Track calls, response rates, and campaign performance."
        },
        {
          title: "Integration Services",
          description: "Connect with your CRM and other business systems."
        }
      ]}
      pricing={{
        startingAt: "₹6,000",
        packages: [
          {
            name: "Basic",
            price: "₹6,000/month",
            features: [
              "1 Virtual Number",
              "Basic IVR Menu",
              "500 Minutes",
              "SMS Notifications"
            ]
          },
          {
            name: "Professional",
            price: "₹15,000/month",
            features: [
              "3 Virtual Numbers",
              "Advanced IVR",
              "2000 Minutes",
              "Email & SMS Notifications",
              "CRM Integration",
              "Call Recording"
            ]
          },
          {
            name: "Enterprise",
            price: "₹45,000/month",
            features: [
              "10 Virtual Numbers",
              "Custom IVR Solution",
              "Unlimited Minutes",
              "Multi-channel Notifications",
              "Advanced Integration",
              "24/7 Support",
              "Custom Reports"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default MissedCallService;