import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const SaaSProducts: React.FC = () => {
  return (
    <ServiceTemplate
      title="SaaS Products"
      description="We build multi-user, subscription-based software platforms from the ground up — including user management, tenant isolation, billing hooks, and the infrastructure to support multiple customers running on the same system."
      benefits={[
        'Multi-tenant architecture from day one',
        'User onboarding and subscription management',
        'Scalable infrastructure for growing user bases',
        'Secure per-tenant data isolation',
        'Admin dashboards for monitoring and support',
        'API-first design for integrations and mobile clients',
      ]}
      features={[
        {
          title: 'Multi-Tenant Data Architecture',
          description:
            'Each customer\'s data is logically or physically isolated, ensuring security and compliance without duplicating infrastructure.',
        },
        {
          title: 'User Management & Auth',
          description:
            'Sign-up, login, password reset, roles, and permissions — production-ready authentication from the start.',
        },
        {
          title: 'Subscription & Billing Hooks',
          description:
            'We integrate with payment providers for subscription billing, free trials, and plan upgrades. You own the business logic.',
        },
        {
          title: 'Admin Panel',
          description:
            'An internal admin interface to monitor accounts, manage users, view usage, and handle support tasks.',
        },
        {
          title: 'API-First Design',
          description:
            'All core functionality is exposed via a well-documented API, enabling future mobile apps, integrations, and third-party access.',
        },
        {
          title: 'Deployment & Hosting',
          description:
            'We can advise on and assist with cloud hosting setup, CI/CD pipelines, and environment management.',
        },
      ]}
      pricing={{
        startingAt: 'Custom',
      }}
      image="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default SaaSProducts;
