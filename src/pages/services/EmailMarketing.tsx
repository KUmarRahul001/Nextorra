import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const EmailMarketing: React.FC = () => {
  const service = getServiceBySlug('email-marketing');

  return (
    <ServiceTemplate
      title={service?.name || "Email Marketing & Lifecycle Automation"}
      description={service?.description || "Targeted email campaigns, automated customer onboarding sequences, newsletter templates, and DNS deliverability configuration."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹1,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default EmailMarketing;