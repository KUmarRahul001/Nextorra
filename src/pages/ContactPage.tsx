import React, { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { tier1Services, tier2Services } from "../data/services";
import config from "../config";

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
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const response = await fetch(config.forms.contactApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          error: false,
          message:
            "Thank you! Your message has been sent successfully. We will get back to you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Oops! Something went wrong. Please try again later.",
      });
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

        {/* ✅ Open Graph (Social Preview) */}
        <meta property="og:title" content={`Start a Project / Contact – ${config.siteName}`} />
        <meta
          property="og:description"
          content={`Discuss your software, web application, mobile app, or enterprise system project with ${config.siteName}.`}
        />
        <meta
          property="og:url"
          content={`${config.siteUrl}/get-started`}
        />
        <meta
          property="og:image"
          content={`${config.siteUrl}/assets/og-image.png`}
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Start a Project / Contact – ${config.siteName}`} />
        <meta
          name="twitter:description"
          content={`Discuss your software, web application, mobile app, or enterprise system project with ${config.siteName}.`}
        />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}/assets/og-image.png`}
        />
      </Helmet>

      {/* ✅ Page Content */}
      <section
        className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 px-4"
        id="contact"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Project Enquiry
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
              Start a Project Conversation
            </h1>
            <p className="text-gray-300 text-base md:text-lg">
              Tell us about the software you want to build or the business workflow you need to automate. We will review your requirements and schedule a technical discovery call.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Direct Enquiries</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-gray-300 text-sm md:text-base">
                        {config.contact.location}
                      </p>
                      <p className="text-gray-400 italic text-xs md:text-sm">
                        (Remote engineering delivery worldwide)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-300 text-sm md:text-base break-all">
                        {config.contact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone / WhatsApp</h4>
                      <p className="text-gray-300 text-sm md:text-base">
                        {config.contact.phone1}
                      </p>
                      <p className="text-gray-300 text-sm md:text-base">
                        {config.contact.phone2}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
                  <p className="font-semibold text-gray-300 mb-1">What happens next?</p>
                  <p>1. We review your project requirements within 24-48 hours.</p>
                  <p>2. We arrange an initial technical scoping call.</p>
                  <p>3. We provide a milestone-based architecture proposal and quote.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                <form onSubmit={handleSubmit} noValidate className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="mt-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div className="mt-4">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-900 text-white">
                        Select Service
                      </option>
                      <optgroup label="── Software & Engineering" className="bg-gray-900 text-gray-400">
                        {tier1Services.map((service) => (
                          <option
                            key={service.slug}
                            value={service.name}
                            className="bg-gray-900 text-white"
                          >
                            {service.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="── Marketing & Business Support" className="bg-gray-900 text-gray-400">
                        {tier2Services.map((service) => (
                          <option
                            key={service.slug}
                            value={service.name}
                            className="bg-gray-900 text-white"
                          >
                            {service.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="mt-4">
                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded font-semibold text-white transition duration-200"
                  >
                    Send Message
                    <Send className="h-5 w-5" />
                  </button>

                  {formStatus.submitted && (
                    <p
                      className={`mt-4 text-center text-sm md:text-base ${
                        formStatus.error ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
