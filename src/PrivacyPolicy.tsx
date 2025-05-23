import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-gray-900 min-h-screen py-16 px-6 text-gray-300">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
          Privacy Policy
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Introduction</h2>
          <p>
            At <a href="/" className="text-accent font-semibold">Nextorra</a>, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your data when you interact with our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
          <p>
            We may gather personal details like your name, email, phone number, and usage behavior when you engage with our website or products.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">How We Use Your Information</h2>
          <p>
            Your information is used solely to enhance our services, provide support, send relevant communications, and meet regulatory obligations.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Data Security</h2>
          <p>
            We follow strict security practices and implement reliable technologies to protect your personal information against unauthorized access or misuse.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Your Rights</h2>
          <p>
            You have the right to view, update, or delete your personal data. Contact us at{' '}
            <a
              href="mailto:contact@nextorra.com"
              className="text-accent underline hover:text-white transition-colors"
            >
              contact@nextorra.com
            </a>{' '}
            to request any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">Changes to This Policy</h2>
          <p>
            This policy may be updated from time to time. The latest version will always be available on this page with an effective date.
          </p>
        </section>

        <p className="mt-10 text-sm text-gray-500">
          Effective Date: May 24, 2025
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
