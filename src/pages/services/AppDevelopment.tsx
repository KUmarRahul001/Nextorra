import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const AppDevelopment: React.FC = () => {
  const service = getServiceBySlug('app-development');

  return (
    <ServiceTemplate
      title={service?.name || "Mobile App Development"}
      description={service?.description || "Native and cross-platform mobile applications for Android and iOS built with React Native and Flutter."}
      delivery={service?.delivery}
      targetCustomer={service?.targetCustomer}
      benefits={service?.benefits || []}
      features={service?.features || []}
      included={service?.included}
      excluded={service?.excluded}
      revisions={service?.revisions}
      warranty={service?.warranty}
      thirdPartyCosts={service?.thirdPartyCosts}
      pricing={service?.pricing || { startingAt: "₹44,999", packages: [] }}
      image={service?.image || "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default AppDevelopment;