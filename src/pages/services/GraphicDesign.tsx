import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';
import { getServiceBySlug } from '../../data/services';

const GraphicDesign: React.FC = () => {
  const service = getServiceBySlug('graphic-design');

  return (
    <ServiceTemplate
      title={service?.name || "Brand & Graphic Design"}
      description={service?.description || "Visual identity design, vector logos, business stationery, marketing brochures, pitch decks, and digital banners."}
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
      image={service?.image || "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
    />
  );
};

export default GraphicDesign;