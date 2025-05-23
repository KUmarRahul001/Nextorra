import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <p>
          At Nextorra, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, contact details, and usage data when you interact with our website or services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
        <p>
          Your information is used to provide and improve our services, communicate with you, and ensure compliance with legal obligations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your data from unauthorized access or disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:contact@nextorra.com" className="text-accent underline">contact@nextorra.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
