import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiCheckCircle, 
  FiDollarSign, 
  FiCode, 
  FiClock, 
  FiShield, 
  FiAlertTriangle, 
  FiMail 
} from 'react-icons/fi';
import SEO from './components/SEO';

const TermsAndConditions: React.FC = () => {
  const lastUpdated = "August 19, 2026";

  return (
    <>
      <SEO
        title="Terms and Conditions – Rahnoxa Commercial & Engineering Engagement"
        description="Transparent legal terms, payment schedules, 30-day bug fix warranty, and intellectual property transfer agreements for Rahnoxa engineering projects."
        keywords="terms of service, software development agreement, milestone payments, source code ownership, bug warranty SLA, Rahnoxa terms"
        url="https://rahnoxa.pages.dev/terms-and-conditions"
        type="website"
      />

      <main className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-32 pb-24 border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          {/* Header Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <FiFileText className="h-4 w-4 text-blue-600" />
              <span>Commercial Terms</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Terms &amp; Conditions of Service
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Clear, transparent engineering agreements with milestone-based delivery, 100% code ownership, and zero hidden lock-in fees.
            </p>

            <div className="mt-4 inline-block text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
              Effective Date: {lastUpdated} · Version 2.4
            </div>
          </motion.div>

          {/* Core Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 inline-block mb-3">
                <FiCode className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">100% Code Transfer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full copyright and repository ownership transfer directly to the client upon final milestone settlement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 inline-block mb-3">
                <FiShield className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">30-Day Bug Warranty</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All production deployments include 30 calendar days of technical warranty for bug fixes and SLA diagnostics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 inline-block mb-3">
                <FiDollarSign className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">50% / 50% Payment Model</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simple terms: 50% advance to start development, and 50% final balance after work is completed and approved.
              </p>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiFileText className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  1. Agreement &amp; Acceptance
                </h2>
              </div>
              <p>
                By commissioning software development, subscribing to marketing retainers, or utilizing the web platform of <strong>Rahnoxa</strong>, you (the "Client") agree to be bound by these Terms and Conditions. These terms govern all formal Statements of Work (SOW), sprint milestones, and engineering advisory services provided by Rahnoxa.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiCode className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2. Engineering Scope &amp; Deliverables
                </h2>
              </div>
              <p>
                Rahnoxa provides bespoke software engineering, web application development, ERP architectures, API integrations, and digital growth services. Every project operates under a defined Scope of Work:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                <li><strong>Deliverable Specifications:</strong> Exact technical features, frameworks, third-party APIs, and screen mockups are agreed upon prior to commencing development.</li>
                <li><strong>Scope Changes:</strong> Any features requested beyond the initial agreed milestone scope will be quoted separately as an add-on sprint or future phase.</li>
                <li><strong>Staging Environment Previews:</strong> Clients receive access to live staging environments to test features and provide feedback at each sprint milestone.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiDollarSign className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  3. Commercial Pricing &amp; Payment Structure
                </h2>
              </div>
              <p>
                We operate on a straightforward, predictable <strong>50/50 payment model</strong> across all custom development projects:
              </p>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-xs font-mono">50% ADVANCE</span>
                  <p className="text-slate-700"><strong>Project Initiation &amp; Architecture:</strong> 50% upfront payment upon contract signing and requirement finalization to book the dedicated engineering slot and begin development.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">50% FINAL</span>
                  <p className="text-slate-700"><strong>Completion &amp; Handover:</strong> 50% final balance payable after work completion, staging approval, production deployment, and before final source code / credential handover.</p>
                </div>
                <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600">
                  <p>• <strong>Monthly Retainers &amp; Care Plans:</strong> Invoiced at the beginning of each billing cycle on a 30-day recurring basis.</p>
                  <p>• <strong>Taxes:</strong> All stated prices exclude 18% GST where applicable.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiShield className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  4. Intellectual Property &amp; 100% Code Ownership
                </h2>
              </div>
              <p>
                Upon receipt of full and final payment for the project:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Full Transfer:</strong> The Client receives exclusive commercial ownership of all custom frontend UI code, backend microservices, database schemas, and proprietary assets created specifically for the project.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>No Vendor Lock-in:</strong> We hand over Git repositories, deployment configurations, and database credentials directly to you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Open Source Components:</strong> Standard third-party libraries (e.g. React, Node.js, Tailwind CSS) remain subject to their respective open-source licenses (MIT, Apache 2.0).</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiClock className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  5. 30-Day Post-Launch Technical Warranty
                </h2>
              </div>
              <p>
                Every standard project launched by Rahnoxa includes <strong>30 calendar days of complimentary post-launch bug fix warranty</strong> starting from the live deployment date:
              </p>
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 space-y-1.5">
                <p>• <strong>Included:</strong> Fixing software glitches, broken links, backend exception errors, responsive visual bugs, or discrepancies against the approved Scope of Work.</p>
                <p>• <strong>Excluded:</strong> New feature requests, structural redesigns, third-party API outage interruptions, or issues caused by unauthorized client code modifications.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiAlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  6. Limitation of Liability
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                To the maximum extent permitted by applicable Indian law, Rahnoxa shall not be held liable for indirect, punitive, or consequential business damages resulting from third-party hosting outages (e.g., AWS, Cloudflare, Supabase downtime), third-party API changes, or force majeure events. Total commercial liability is strictly limited to the aggregate fee paid by the Client for the specific affected milestone.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiMail className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  7. Governing Law &amp; Inquiries
                </h2>
              </div>
              <p className="text-sm">
                These terms are governed by and construed in accordance with the laws of the Republic of India. For commercial contracts or legal clarifications:
              </p>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1.5">
                <p><strong>Entity:</strong> Rahnoxa Engineering</p>
                <p><strong>Legal &amp; Billing Email:</strong> <a href="mailto:contact.rahnoxa@protonmail.com" className="text-blue-600 font-semibold hover:underline">contact.rahnoxa@protonmail.com</a></p>
                <p><strong>Jurisdiction:</strong> Courts of Jharkhand, India</p>
              </div>
            </section>

          </div>

        </div>
      </main>
    </>
  );
};

export default TermsAndConditions;
