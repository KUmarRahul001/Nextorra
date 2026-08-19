import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const VoiceCallServices: React.FC = () => {
  const service = getServiceBySlug('voice-call-services');

  return (
    <ServiceTemplate
      title={service?.name || "Voice Call & IVR Solutions"}
      description={service?.description || "Automated outbound voice broadcasting (OBD), custom Interactive Voice Response (IVR) phone menus, and virtual office reception systems."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹3,499", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default VoiceCallServices;