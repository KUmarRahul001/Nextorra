import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const ERPEnterpriseApplications: React.FC = () => {
  const service = getServiceBySlug('erp-enterprise-applications');

  return (
    <ServiceTemplate
      title={service?.name || "ERP & Enterprise Applications"}
      description={service?.description || "Enterprise resource planning modules and internal operational platforms designed to support complex business workflows, inventory, HRMS, and multi-branch operations at scale."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹75,000", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default ERPEnterpriseApplications;
