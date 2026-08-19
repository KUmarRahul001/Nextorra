import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const MissedCallService: React.FC = () => {
  const service = getServiceBySlug('missed-call-service');

  return (
    <ServiceTemplate
      title={service?.name || "Missed Call Alert Service"}
      description={service?.description || "Zero-cost lead capture for Indian callers — customers give a missed call to receive automated SMS receipts, WhatsApp catalogs, or callback registrations."}
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
      image={service?.image || "https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default MissedCallService;