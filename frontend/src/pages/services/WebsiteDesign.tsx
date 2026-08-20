import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const WebsiteDesign: React.FC = () => {
  const service = getServiceBySlug('web-development');

  return (
    <ServiceTemplate
      title={service?.name || "Modern Website Design & Engineering"}
      description={service?.description || "High-performance, mobile-first business websites and corporate digital presence engineered with modern frameworks, fast load times, and conversion-focused layouts."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹4,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default WebsiteDesign;