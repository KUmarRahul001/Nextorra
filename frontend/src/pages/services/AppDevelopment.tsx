import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const AppDevelopment: React.FC = () => {
  return (
    <ServiceTemplate
      title="Application Development"
      description="Create powerful mobile applications for Android, iOS, and cross-platform with cutting-edge technology and user-centric design."
      benefits={[
        "Native performance",
        "Cross-platform compatibility",
        "Scalable architecture",
        "Offline functionality",
        "Push notifications",
        "Regular updates"
      ]}
      features={[
        {
          title: "Custom Development",
          description: "Tailored mobile applications built for your specific business needs."
        },
        {
          title: "Cross-Platform",
          description: "Apps that work seamlessly on both iOS and Android platforms."
        },
        {
          title: "UI/UX Design",
          description: "Intuitive and engaging user interfaces with modern design."
        },
        {
          title: "Backend Integration",
          description: "Robust backend systems and API integration."
        }
      ]}
      pricing={{
        startingAt: "₹75,000",
        packages: [
          {
            name: "Basic",
            price: "₹75,000",
            features: [
              "Single Platform",
              "Basic Features",
              "Standard UI",
              "3 Months Support"
            ]
          },
          {
            name: "Professional",
            price: "₹200,000",
            features: [
              "Cross-Platform",
              "Advanced Features",
              "Custom UI/UX",
              "API Integration",
              "6 Months Support",
              "Analytics Integration"
            ]
          },
          {
            name: "Enterprise",
            price: "₹500,000+",
            features: [
              "Full-Featured App",
              "Complex Integration",
              "Premium UI/UX",
              "Advanced Security",
              "1 Year Support",
              "Custom Backend",
              "Scaling Support"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default AppDevelopment;