import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const WebAppDevelopment: React.FC = () => {
  return (
    <ServiceTemplate
      title="Full Stack Web App Development"
      description="Build powerful, scalable web applications with modern technologies and robust architecture for your business needs."
      benefits={[
        "Scalable architecture",
        "Secure data handling",
        "Real-time capabilities",
        "Cross-platform compatibility",
        "Custom functionality",
        "Cloud deployment"
      ]}
      features={[
        {
          title: "Frontend Development",
          description: "Modern, responsive user interfaces built with React, Vue, or Angular."
        },
        {
          title: "Backend Development",
          description: "Robust server-side applications with Node.js, Python, or Java."
        },
        {
          title: "Database Design",
          description: "Efficient data storage and retrieval with SQL or NoSQL databases."
        },
        {
          title: "API Development",
          description: "RESTful or GraphQL APIs for seamless integration."
        }
      ]}
      pricing={{
        startingAt: "₹50,000",
        packages: [
          {
            name: "Starter",
            price: "₹50,000",
            features: [
              "Basic Web App",
              "User Authentication",
              "Basic Database",
              "REST API",
              "3 Months Support"
            ]
          },
          {
            name: "Professional",
            price: "₹150,000",
            features: [
              "Advanced Web App",
              "Custom Features",
              "Advanced Database",
              "API Integration",
              "Real-time Features",
              "6 Months Support"
            ]
          },
          {
            name: "Enterprise",
            price: "₹500,000+",
            features: [
              "Complex Web App",
              "Microservices Architecture",
              "Advanced Security",
              "Custom Integration",
              "Scalable Infrastructure",
              "1 Year Support"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default WebAppDevelopment;