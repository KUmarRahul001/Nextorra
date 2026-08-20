import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const WebAppDevelopment: React.FC = () => {
  const service = getServiceBySlug('full-stack-web-apps');

  return (
    <ServiceTemplate
      title={service?.name || "Full Stack Web Apps"}
      description={service?.description || "End-to-end web application development — customer self-service portals, administrative dashboards, client collaboration suites, and high-concurrency business platforms."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹39,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default WebAppDevelopment;