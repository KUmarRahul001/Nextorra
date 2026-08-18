import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const SocialMediaMarketing: React.FC = () => {
  return (
    <ServiceTemplate
      title="Social Media Marketing"
      description="Drive engagement, build brand awareness, and generate leads through strategic social media campaigns across multiple platforms."
      benefits={[
        "Increased brand visibility and recognition",
        "Higher engagement rates with target audience",
        "Improved customer relationships and loyalty",
        "Direct channel for customer feedback and support",
        "Enhanced website traffic and lead generation",
        "Better ROI through targeted advertising"
      ]}
      features={[
        {
          title: "Platform Management",
          description: "Professional management of your social media accounts across Facebook, Instagram, Twitter, and LinkedIn."
        },
        {
          title: "Content Creation",
          description: "Eye-catching visuals and engaging copy that resonates with your target audience."
        },
        {
          title: "Campaign Strategy",
          description: "Data-driven campaign planning and execution to achieve your business goals."
        },
        {
          title: "Performance Analytics",
          description: "Detailed reporting and analytics to track campaign success and ROI."
        }
      ]}
      pricing={{
        startingAt: "₹2,000",
        packages: [
          {
            name: "Basic",
            price: "₹2,000/month",
            features: [
              "1 Social Media Platform",
              "5 Posts per Week",
              "Basic Analytics",
              "Monthly Report"
            ]
          },
          {
            name: "Professional",
            price: "₹8,000/month",
            features: [
              "3 Social Media Platforms",
              "10 Posts per Week",
              "Advanced Analytics",
              "Bi-weekly Report",
              "Ad Campaign Management",
              "Community Management"
            ]
          },
          {
            name: "Enterprise",
            price: "₹32,000/month",
            features: [
              "All Social Media Platforms",
              "Unlimited Posts",
              "Premium Analytics",
              "Weekly Report",
              "Advanced Ad Campaigns",
              "24/7 Community Management",
              "Crisis Management",
              "Influencer Collaboration"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/3850250/pexels-photo-3850250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default SocialMediaMarketing;