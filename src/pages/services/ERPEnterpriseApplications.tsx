import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const ERPEnterpriseApplications: React.FC = () => {
  return (
    <ServiceTemplate
      title="ERP & Enterprise Applications"
      description="We design and build enterprise resource planning modules and internal operational platforms that support business processes. Our approach is requirements-first — we understand your workflows before writing a line of code."
      benefits={[
        'Centralised data across departments',
        'Reduced manual process overhead',
        'Role-based access and permissions',
        'Scalable architecture for growing teams',
        'Integration with existing business tools',
        'Audit trails and reporting',
      ]}
      features={[
        {
          title: 'Workflow Automation',
          description:
            'Automate repetitive internal processes — approvals, notifications, status tracking — reducing errors and saving time.',
        },
        {
          title: 'Multi-Module Architecture',
          description:
            'Finance, HR, inventory, procurement — each module can be built incrementally and integrated into a unified system.',
        },
        {
          title: 'Custom Reporting & Dashboards',
          description:
            'Real-time visibility into operational metrics with role-specific dashboards and exportable reports.',
        },
        {
          title: 'Role-Based Access Control',
          description:
            'Granular permissions ensure staff see and interact with only the data relevant to their role.',
        },
        {
          title: 'Third-Party Integrations',
          description:
            'Connect your ERP to accounting software, CRMs, communication tools, and existing infrastructure.',
        },
        {
          title: 'Deployment Options',
          description:
            'Cloud-hosted, on-premise, or hybrid deployment depending on your data governance requirements.',
        },
      ]}
      pricing={{
        startingAt: 'Custom',
      }}
      image="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default ERPEnterpriseApplications;
