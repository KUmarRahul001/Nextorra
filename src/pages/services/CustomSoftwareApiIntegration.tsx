import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const CustomSoftwareApiIntegration: React.FC = () => {
  const service = getServiceBySlug('custom-software-api-integration');

  return (
    <ServiceTemplate
      title={service?.name || "Custom Software & API Integration"}
      description={service?.description || "Bespoke business software, workflow automation, and custom API integrations connecting payment gateways, WhatsApp, CRMs, ERPs, and accounting tools."}
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
      image={service?.image || "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default CustomSoftwareApiIntegration;
