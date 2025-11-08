import React from "react";
import { Helmet } from "react-helmet-async";

const Terms: React.FC = () => {
  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>Terms & Conditions – Nextorra</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Nextorra’s digital services, marketing tools, and software solutions. Understand your rights, obligations, and service limitations."
        />
        <meta
          name="keywords"
          content="Nextorra terms, Nextorra conditions, user agreement, website policy, digital services terms, software terms"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/terms" />

        {/* ✅ Optional Open Graph for Social Media */}
        <meta property="og:title" content="Terms & Conditions – Nextorra" />
        <meta
          property="og:description"
          content="Review Nextorra’s terms and conditions for using our services and digital solutions."
        />
        <meta
          property="og:url"
          content="https://nextorra.netlify.app/terms"
        />
        <meta
          property="og:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Terms & Conditions – Nextorra"
        />
        <meta
          name="twitter:description"
          content="Understand the rules and policies governing the use of Nextorra’s services."
        />
        <meta
          name="twitter:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
      </Helmet>

      {/* ✅ Page Content */}
      <main className="container py-16 max-w-4xl text-dark animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 gradient-text">
          Terms and Conditions
        </h1>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            1. Agreement to Terms
          </h2>
          <p className="text-gray mb-4">
            By accessing and using Nextorra's services, you agree to be bound by
            these Terms and Conditions. If you disagree with any part of these
            terms, you may not access our services.
          </p>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            2. Services
          </h2>
          <p className="text-gray mb-4">
            Nextorra provides digital marketing and development services
            including but not limited to social media marketing, web
            development, app development, and digital advertising.
          </p>
          <ul className="list-disc list-inside text-gray space-y-2 pl-5">
            <li>
              All services are provided "as is" without warranty of any kind
            </li>
            <li>Service delivery timelines are estimates and subject to change</li>
            <li>
              We reserve the right to modify or discontinue services without
              notice
            </li>
          </ul>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            3. Payment Terms
          </h2>
          <p className="text-gray mb-4">
            Payment terms vary by service and package selected. Generally:
          </p>
          <ul className="list-disc list-inside text-gray space-y-2 pl-5">
            <li>Advance payment may be required for certain services</li>
            <li>Monthly services are billed at the start of each month</li>
            <li>Late payments may result in service suspension</li>
          </ul>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-gray mb-4">
            All materials, including designs, code, and content created by
            Nextorra remain our intellectual property until full payment is
            received and ownership transfer is explicitly stated in writing.
          </p>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            5. Client Responsibilities
          </h2>
          <p className="text-gray mb-4">Clients are responsible for:</p>
          <ul className="list-disc list-inside text-gray space-y-2 pl-5">
            <li>Providing accurate and timely information</li>
            <li>Reviewing and approving deliverables</li>
            <li>Ensuring compliance with relevant laws and regulations</li>
            <li>Maintaining confidentiality of project details</li>
          </ul>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray mb-4">
            Nextorra shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our
            services.
          </p>
        </section>

        <section className="mb-10 animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            7. Termination
          </h2>
          <p className="text-gray mb-4">
            Either party may terminate services with written notice according to
            the terms specified in the service agreement. Termination does not
            affect accrued rights or liabilities.
          </p>
        </section>

        <section className="animate-slide-up">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            8. Changes to Terms
          </h2>
          <p className="text-gray mb-4">
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to our website.
          </p>
        </section>
      </main>
    </>
  );
};

export default Terms;
