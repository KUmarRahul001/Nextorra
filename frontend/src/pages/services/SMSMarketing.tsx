import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const SMSMarketing: React.FC = () => {
  const service = getServiceBySlug('sms-marketing');

  return (
    <ServiceTemplate
      title={service?.name || "SMS Marketing & Transactional Alerts"}
      description={service?.description || "Bulk promotional SMS campaigns, automated OTP/transactional alert integrations, DLT registration assistance, and SMPP gateway connections."}
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
      image={service?.image || "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default SMSMarketing;