import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const LeadGeneration: React.FC = () => {
  const service = getServiceBySlug('lead-generation');

  return (
    <ServiceTemplate
      title={service?.name || "B2B Lead Generation & Local Dominance"}
      description={service?.description || "Targeted lead capture funnels, Google Business Profile local dominance, and automated lead qualification pipelines."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹2,499", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default LeadGeneration;