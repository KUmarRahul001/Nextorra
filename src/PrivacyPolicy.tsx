import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiLock, 
  FiEye, 
  FiDatabase, 
  FiServer, 
  FiUserCheck, 
  FiMail, 
  FiFileText, 
  FiCheckCircle, 
  FiAlertCircle 
} from 'react-icons/fi';
import SEO from './components/SEO';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "August 19, 2026";

  return (
    <>
      <SEO
        title="Privacy Policy – Rahnoxa Data Protection & Security Governance"
        description="Comprehensive privacy policy and security governance framework for Rahnoxa engineering clients, API consumers, and website visitors."
        keywords="privacy policy, data security, GDPR compliance, Indian DPDP Act, confidential software architecture, Rahnoxa data protection"
        url="https://rahnoxa.pages.dev/privacy-policy"
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
              <FiShield className="h-4 w-4 text-blue-600" />
              <span>Security &amp; Legal Framework</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Privacy Policy &amp; Data Governance
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At <strong className="text-slate-900 font-bold">Rahnoxa</strong>, we treat your business data, intellectual property, source code, and personal information with enterprise-grade security and strict confidentiality.
            </p>

            <div className="mt-4 inline-block text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
              Effective Date: {lastUpdated} · Version 2.4
            </div>
          </motion.div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 inline-block mb-3">
                <FiLock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Zero Data Selling</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never monetize, broker, or sell client data, contact lists, or telemetry to third-party data aggregators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 inline-block mb-3">
                <FiUserCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">100% Client Ownership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All production codebases, schema designs, and proprietary workflows built for you belong exclusively to you.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 inline-block mb-3">
                <FiServer className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Encrypted Pipelines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All client communications, staging environments, and database backups are secured with SSL/TLS 1.3 encryption.
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
                  1. Scope &amp; Purpose
                </h2>
              </div>
              <p>
                This Privacy Policy applies to all services, software engineering consultations, web platforms, and mobile applications provided by <strong>Rahnoxa</strong> (accessible at <a href="https://rahnoxa.pages.dev" className="text-blue-600 font-semibold hover:underline">rahnoxa.pages.dev</a>). It governs how we collect, process, store, and safeguard your personal details, business requirements, and system credentials.
              </p>
              <p>
                By accessing our website, requesting engineering quotes, scheduling discovery calls, or entering into a software development contract with Rahnoxa, you consent to the data practices described herein.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiDatabase className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2. Information We Collect
                </h2>
              </div>
              <p>
                We only collect information that is strictly necessary to evaluate project feasibility, engineer custom software solutions, provide post-launch technical support, and maintain lawful accounting records:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <FiCheckCircle className="text-blue-600 h-4 w-4" />
                    Directly Provided Information
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>Contact details: Full Name, Business Email, WhatsApp / Phone Number.</li>
                    <li>Company information: Legal business name, industry sector, website URL.</li>
                    <li>Technical requirements: Architecture specs, feature lists, API docs.</li>
                    <li>Billing details: GST numbers, invoicing addresses, transactional receipts.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <FiCheckCircle className="text-blue-600 h-4 w-4" />
                    Automated Telemetry &amp; Logs
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    <li>Device &amp; Browser data: IP address, browser type, operating system.</li>
                    <li>Operational logs: Error stack traces, page response times, referral URLs.</li>
                    <li>Bot interaction telemetry: Anonymized chat queries submitted to RahBot.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiEye className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  3. How We Use Your Information
                </h2>
              </div>
              <p>Your data is processed strictly for legitimate engineering and commercial purposes:</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Engineering Delivery:</strong> Architecting custom backend APIs, database schemas, and responsive user interfaces matching your business requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Project Communication:</strong> Scheduling sprint milestones, conducting video reviews, and delivering staging environment builds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Warranty SLA Support:</strong> Diagnosing bug reports, uptime monitoring, and applying security patches during your 30-day post-launch warranty.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Statutory Compliance:</strong> Generating tax invoices, GST filings, and complying with applicable Indian commercial laws.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiLock className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  4. Confidentiality &amp; Non-Disclosure (NDA)
                </h2>
              </div>
              <p>
                We understand that software development involves proprietary business workflows, trade secrets, and unique data structures. 
              </p>
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs sm:text-sm text-blue-900">
                <strong>Our Non-Disclosure Commitment:</strong> All project discussions, database credentials, server SSH keys, and source code repositories shared with Rahnoxa are treated as strictly confidential under industry-standard Non-Disclosure Agreements (NDAs). We do not reuse your custom proprietary code for competing clients.
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiServer className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  5. Third-Party Services &amp; Sub-Processors
                </h2>
              </div>
              <p>
                To provide production-grade hosting and delivery, Rahnoxa utilizes reputable global infrastructure providers. Each sub-processor adheres to strict security certifications (ISO 27001, SOC 2, GDPR):
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li>• <strong>Edge Hosting &amp; CDN:</strong> Cloudflare Pages &amp; Vercel (Edge network, SSL termination, DDoS protection).</li>
                <li>• <strong>Database &amp; Persistence:</strong> Supabase / PostgreSQL &amp; Redis (Encrypted data at rest and in transit).</li>
                <li>• <strong>Transactional Messaging:</strong> Brevo &amp; Fast2SMS (DLT-compliant SMS &amp; verified SMTP notifications).</li>
                <li>• <strong>Code Versioning:</strong> GitHub Enterprise (Private encrypted Git repositories).</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <FiAlertCircle className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  6. Your Rights &amp; Data Control
                </h2>
              </div>
              <p>
                Under the Indian Digital Personal Data Protection (DPDP) Act and global privacy frameworks (GDPR/CCPA), you retain full rights regarding your personal and corporate data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Right to Access:</strong> Request a full export of all project specifications and logs stored on our systems.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Right to Erasure:</strong> Request permanent deletion of test staging databases and staging credentials after launch.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Right to Rectification:</strong> Update or correct your billing and technical contact records at any time.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong>Credential Handover:</strong> Immediate revocation of our administrative access once client handover is finalized.
                </div>
              </div>
            </section>

            {/* Section 7 - Contact DPO */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <FiMail className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  7. Privacy &amp; Data Protection Contact
                </h2>
              </div>
              <p>
                If you have questions regarding this Privacy Policy, wish to execute a custom corporate NDA, or want to exercise your data protection rights, please contact the lead engineer directly:
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-sm">
                <p><strong>Entity:</strong> Rahnoxa Engineering</p>
                <p>
                  <strong>Official Privacy Desk:</strong>{' '}
                  <a href="mailto:contact.rahnoxa@protonmail.com" className="text-blue-600 font-semibold hover:underline">
                    contact.rahnoxa@protonmail.com
                  </a>
                </p>
                <p>
                  <strong>Phone / WhatsApp:</strong>{' '}
                  <a href="tel:+918434237052" className="text-blue-600 hover:underline">
                    +91 8434237052
                  </a>{' '}
                  / +91 8434237049
                </p>
                <p><strong>Geographic Location:</strong> Jharkhand, India (Serving clients globally with remote delivery)</p>
              </div>
            </section>

          </div>

        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
