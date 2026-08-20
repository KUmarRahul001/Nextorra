import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const SaaSProducts: React.FC = () => {
  const service = getServiceBySlug('saas-products');

  return (
    <ServiceTemplate
      title={service?.name || "SaaS Products"}
      description={service?.description || "Multi-user, subscription-based cloud software platforms engineered with tenant isolation, automated billing pipelines, team seat management, and scalable cloud infrastructure."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹64,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default SaaSProducts;
