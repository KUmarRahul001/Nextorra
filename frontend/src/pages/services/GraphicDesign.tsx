import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const GraphicDesign: React.FC = () => {
  return (
    <ServiceTemplate
      title="Graphic Design"
      description="Create stunning visual content that captures attention and communicates your brand message effectively."
      benefits={[
        "Professional brand image",
        "Consistent visual identity",
        "Eye-catching designs",
        "Print-ready files",
        "Quick turnaround",
        "Unlimited revisions"
      ]}
      features={[
        {
          title: "Logo Design",
          description: "Custom logo creation with brand guidelines and multiple formats."
        },
        {
          title: "Marketing Materials",
          description: "Brochures, flyers, banners, and other promotional materials."
        },
        {
          title: "Social Media Graphics",
          description: "Engaging visuals optimized for different social platforms."
        },
        {
          title: "Brand Identity",
          description: "Complete brand identity packages including style guides."
        }
      ]}
      pricing={{
        startingAt: "₹3,000",
        packages: [
          {
            name: "Basic",
            price: "₹3,000",
            features: [
              "Logo Design",
              "2 Design Concepts",
              "Basic File Formats",
              "2 Revisions"
            ]
          },
          {
            name: "Professional",
            price: "₹15,000",
            features: [
              "Logo + Brand Identity",
              "5 Design Concepts",
              "All File Formats",
              "Social Media Kit",
              "5 Revisions",
              "Brand Guidelines"
            ]
          },
          {
            name: "Enterprise",
            price: "₹45,000",
            features: [
              "Complete Brand Package",
              "Unlimited Concepts",
              "All Marketing Materials",
              "Custom Illustrations",
              "Unlimited Revisions",
              "Priority Support",
              "Source Files"
            ]
          }
        ]
      }}
      image="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default GraphicDesign;