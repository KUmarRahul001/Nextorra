import React from 'react';
import ServiceTemplate from '../../components/ServiceTemplate';

const DesktopApplications: React.FC = () => {
  return (
    <ServiceTemplate
      title="Desktop Applications"
      description="We develop Windows, Linux, and macOS desktop applications for internal business use — operational tooling, data management software, and applications that need to run offline or on local infrastructure."
      benefits={[
        'Works offline without internet dependency',
        'Direct access to local hardware and file system',
        'Can be deployed on company-managed machines',
        'Better performance for data-intensive operations',
        'Suitable for environments with strict network restrictions',
        'Packaged and distributable as a standard installer',
      ]}
      features={[
        {
          title: 'Cross-Platform Development',
          description:
            'Build once, run on Windows, macOS, and Linux — or target a single platform depending on your team\'s infrastructure.',
        },
        {
          title: 'Local Data Management',
          description:
            'Applications that read, write, and process data locally — with optional sync to cloud when connectivity is available.',
        },
        {
          title: 'Hardware Integration',
          description:
            'Integration with printers, barcode scanners, serial devices, and other hardware connected to the user\'s machine.',
        },
        {
          title: 'Installer & Distribution',
          description:
            'Packaged as a standard installer for easy deployment across your organisation without requiring technical setup.',
        },
        {
          title: 'Auto-Update Mechanism',
          description:
            'Built-in update checking so deployed applications can receive new versions without manual reinstallation.',
        },
        {
          title: 'Internal Tools',
          description:
            'Reporting tools, data entry applications, configuration managers, and operational dashboards designed for specific workflows.',
        },
      ]}
      pricing={{
        startingAt: 'Custom',
      }}
      image="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    />
  );
};

export default DesktopApplications;
