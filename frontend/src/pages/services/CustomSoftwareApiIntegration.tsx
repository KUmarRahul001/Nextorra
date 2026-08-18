import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const CustomSoftwareApiIntegration: React.FC = () => {
  return (
    <ServiceTemplate
      title="Custom Software & API Integration"
      description="We build bespoke business software tailored to your specific operational requirements, and integrate disparate systems through APIs so your tools work together rather than in silos."
      benefits={[
        'Software built exactly to your workflow',
        'Eliminate manual data transfer between systems',
        'Single source of truth across connected tools',
        'Reduced human error in data handling',
        'Automation of repetitive business processes',
        'Scalable as your operational needs grow',
      ]}
      features={[
        {
          title: 'Bespoke Business Software',
          description:
            'When off-the-shelf software doesn\'t fit your process, we build what does — designed around how your team actually works.',
        },
        {
          title: 'API Integration',
          description:
            'Connect your CRM, ERP, payment platform, communication tools, and internal systems through well-designed API integrations.',
        },
        {
          title: 'Workflow Automation',
          description:
            'Identify repetitive manual tasks and automate them — data entry, report generation, notifications, status updates.',
        },
        {
          title: 'Data Pipeline Design',
          description:
            'Build reliable pipelines that move, transform, and validate data between systems without manual intervention.',
        },
        {
          title: 'Webhook & Event-Driven Integration',
          description:
            'Real-time system-to-system communication using webhooks and event queues rather than polling.',
        },
        {
          title: 'Legacy System Integration',
          description:
            'Wrap or extend older internal systems with modern APIs so they can communicate with newer tools without a full replacement.',
        },
      ]}
      pricing={{
        startingAt: 'Custom',
      }}
      image="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default CustomSoftwareApiIntegration;
