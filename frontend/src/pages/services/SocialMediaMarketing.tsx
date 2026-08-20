import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const SocialMediaMarketing: React.FC = () => {
  const service = getServiceBySlug('social-media-marketing');

  return (
    <ServiceTemplate
      title={service?.name || "Social Media Marketing & Creatives"}
      description={service?.description || "Brand-aligned social media creatives, structured posting calendars, and targeted Meta advertising campaigns."}
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
      image={service?.image || "https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default SocialMediaMarketing;