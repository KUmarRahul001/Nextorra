import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const DesktopApplications: React.FC = () => {
  const service = getServiceBySlug('desktop-applications');

  return (
    <ServiceTemplate
      title={service?.name || "Desktop Applications"}
      description={service?.description || "Windows, Linux, and macOS business software for offline data processing, hardware device integration, local POS billing, and secure desktop tooling."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹34,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default DesktopApplications;
