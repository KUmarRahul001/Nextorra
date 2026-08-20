import React, { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { tier1Services, tier2Services } from "../data/services";
import config from "../config";
import { api } from "../lib/api";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: boolean;
    message: string;
  }>({
    submitted: false,
    error: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Please fill in all required fields (Name, Email, Message).",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service || "General Software Engineering",
        project_description: formData.message,
        source: "website_contact_form",
      });

      setFormStatus({
        submitted: true,
        error: false,
        message:
          "Thank you! Your project enquiry has been submitted. I will personally review your technical requirements and follow up within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Failed to submit enquiry. Please check your internet connection or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${config.siteName}`,
    description: `Start a software project enquiry with ${config.siteName}.`,
    url: `${config.siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: config.siteName,
      email: config.contact.email,
      telephone: config.contact.phone1,
      address: {
        "@type": "PostalAddress",
        addressLocality: config.contact.location,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{`Start a Project / Contact Engineering – ${config.siteName}`}</title>
        <meta
          name="description"
          content={`Connect with ${config.siteName}'s engineering team to build custom web applications, ERPs, SaaS platforms, and mobile apps.`}
        />
        <link rel="canonical" href={`${config.siteUrl}/contact`} />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>

        {/* Open Graph */}
        <meta property="og:title" content={`Start a Project – ${config.siteName}`} />
        <meta
          property="og:description"
          content={`Discuss your software specifications and request a transparent architecture quote from ${config.siteName}.`}
        />
        <meta property="og:url" content={`${config.siteUrl}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${config.siteUrl}/assets/og-image.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Start a Project / Contact – ${config.siteName}`} />
        <meta
          name="twitter:description"
          content={`Discuss your software, web application, mobile app, or enterprise system project with ${config.siteName}.`}
        />
        <meta name="twitter:image" content={`${config.siteUrl}/assets/og-image.png`} />
      </Helmet>

      {/* ✅ Page Content */}
      <div className="min-h-screen bg-[#FAFCFF] text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white gradient-mesh-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 rounded-full border border-blue-200 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-6 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Project Enquiry
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Start a Project Conversation
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tell us about the software you want to build or the business workflow you need to automate. We will review your requirements and schedule a technical discovery call.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Direct Channels</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100 flex-shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Location</h4>
                        <p className="text-slate-600 text-sm">{config.contact.location}</p>
                        <p className="text-slate-400 italic text-xs mt-0.5">
                          (Remote engineering delivery worldwide)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100 flex-shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Email</h4>
                        <p className="text-slate-600 text-sm break-all">{config.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100 flex-shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Phone / WhatsApp</h4>
                        <p className="text-slate-600 text-sm">{config.contact.phone1}</p>
                        <p className="text-slate-600 text-sm">{config.contact.phone2}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 leading-relaxed space-y-2 font-mono">
                  <p className="font-semibold text-slate-900 text-sm font-sans">Engagement Flow:</p>
                  <p>1. Requirement &amp; scope review (24-48 hrs).</p>
                  <p>2. Interactive technical discovery session.</p>
                  <p>3. Architecture proposal &amp; milestone estimation.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send an Enquiry</h3>

                {formStatus.submitted && (
                  <div
                    className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm ${
                      formStatus.error
                        ? "bg-rose-50 border border-rose-200 text-rose-800"
                        : "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    }`}
                  >
                    {formStatus.error ? (
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-rose-600" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                    )}
                    <div>{formStatus.message}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Alex Miller"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Primary Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm"
                      >
                        <option value="">Select a service category</option>
                        <optgroup label="Software & Engineering">
                          {tier1Services.map((s) => (
                            <option key={s.slug} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Marketing & Support">
                          {tier2Services.map((s) => (
                            <option key={s.slug} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Project Description / Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Describe your product idea, tech stack preference, timeline, or workflow bottleneck..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 btn btn-primary text-sm font-bold shadow-md"
                  >
                    <span>{isSubmitting ? "Submitting Enquiry..." : "Submit Project Enquiry"}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
