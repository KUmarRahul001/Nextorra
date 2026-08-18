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
          "Thank you! Your project enquiry has been submitted. The Rahnoxa engineering team will follow up within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      setFormStatus({
        submitted: true,
        error: true,
        message: err.message || "Failed to submit enquiry. Please try again or reach out directly on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>{`Start a Project / Contact – ${config.siteName}`}</title>
        <meta
          name="description"
          content={`Discuss your software, web application, mobile app, ERP, or SaaS project with ${config.siteName}. Submit an enquiry to schedule a technical discovery call.`}
        />
        <meta
          name="keywords"
          content={`${config.siteName} contact, hire software developers, custom web app, mobile app development, custom ERP software, SaaS development, API integration enquiry`}
        />
        <link rel="canonical" href={`${config.siteUrl}/get-started`} />

        {/* ✅ Open Graph */}
        <meta property="og:title" content={`Start a Project / Contact – ${config.siteName}`} />
        <meta
          property="og:description"
          content={`Discuss your software, web application, mobile app, or enterprise system project with ${config.siteName}.`}
        />
        <meta property="og:url" content={`${config.siteUrl}/get-started`} />
        <meta property="og:image" content={`${config.siteUrl}/assets/og-image.png`} />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Start a Project / Contact – ${config.siteName}`} />
        <meta
          name="twitter:description"
          content={`Discuss your software, web application, mobile app, or enterprise system project with ${config.siteName}.`}
        />
        <meta name="twitter:image" content={`${config.siteUrl}/assets/og-image.png`} />
      </Helmet>

      {/* ✅ Page Content */}
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/30 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Project Enquiry
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Start a Project Conversation
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Tell us about the software you want to build or the business workflow you need to automate. We will review your requirements and schedule a technical discovery call.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Direct Channels</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600/20 text-cyan-400 p-3 rounded-2xl border border-blue-500/30 flex-shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-0.5">Location</h4>
                        <p className="text-slate-300 text-sm">{config.contact.location}</p>
                        <p className="text-slate-400 italic text-xs mt-0.5">
                          (Remote engineering delivery worldwide)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600/20 text-cyan-400 p-3 rounded-2xl border border-blue-500/30 flex-shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-white text-sm mb-0.5">Email</h4>
                        <p className="text-slate-300 text-sm break-all">{config.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600/20 text-cyan-400 p-3 rounded-2xl border border-blue-500/30 flex-shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-0.5">Phone / WhatsApp</h4>
                        <p className="text-slate-300 text-sm">{config.contact.phone1}</p>
                        <p className="text-slate-300 text-sm">{config.contact.phone2}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
                  <p className="font-semibold text-slate-300 text-sm">Engagement Flow:</p>
                  <p>1. Requirement &amp; scope review (24-48 hrs).</p>
                  <p>2. Interactive technical discovery session.</p>
                  <p>3. Architecture proposal &amp; milestone estimation.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/80 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Send an Enquiry</h3>

                {formStatus.submitted && (
                  <div
                    className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm ${
                      formStatus.error
                        ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    }`}
                  >
                    {formStatus.error ? (
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    )}
                    <div>{formStatus.message}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Alex Miller"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Primary Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Project Description / Requirements <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Describe your product idea, tech stack preference, timeline, or workflow bottleneck..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
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
