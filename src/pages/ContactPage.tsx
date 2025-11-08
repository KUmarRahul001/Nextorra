import React, { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const services = [
  "Social Media Marketing",
  "Lead Generation",
  "SMS Marketing & SMPP",
  "Website Design",
  "Full Stack Web App",
  "Email Marketing",
  "Missed Call Service & IVR",
  "Graphic Design",
  "Voice Call Services",
  "App Development",
];

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
      const response = await fetch("https://formspree.io/f/mqaqoapn", {
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
    } catch (error) {
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
        <title>Contact Us – Nextorra</title>
        <meta
          name="description"
          content="Get in touch with Nextorra for web development, AI, marketing, or app design services. Contact us via email, phone, or our online form to discuss your project."
        />
        <meta
          name="keywords"
          content="Nextorra contact, contact Nextorra, web development, AI company, digital marketing agency, app design services, email Nextorra, call Nextorra"
        />
        <link rel="canonical" href="https://nextorra.netlify.app/contact" />

        {/* ✅ Open Graph (Social Preview) */}
        <meta property="og:title" content="Contact Us – Nextorra" />
        <meta
          property="og:description"
          content="Connect with Nextorra to explore AI-driven marketing, app design, and web development solutions tailored to your business."
        />
        <meta
          property="og:url"
          content="https://nextorra.netlify.app/contact"
        />
        <meta
          property="og:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us – Nextorra" />
        <meta
          name="twitter:description"
          content="Reach out to Nextorra’s team for digital services, app development, and AI-based business solutions."
        />
        <meta
          name="twitter:image"
          content="https://nextorra.netlify.app/assets/og-image.jpg"
        />
      </Helmet>

      {/* ✅ Page Content */}
      <section
        className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 px-4"
        id="contact"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Grow Together
            </h2>
            <p className="text-gray-300">
              Have a project or idea? Let's connect and make it real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium mb-1">Our Location</h4>
                      <p className="text-gray-300 text-sm md:text-base">
                        Remote Service - Based in Jamshedpur, Jharkhand
                      </p>
                      <p className="text-gray-400 italic text-xs md:text-sm">
                        (We operate remotely)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <p className="text-gray-300 text-sm md:text-base break-all">
                        contact.nextorra@protonmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <p className="text-gray-300 text-sm md:text-base">
                        +91 8434237052
                      </p>
                      <p className="text-gray-300 text-sm md:text-base">
                        +91 8434237049
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-medium mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 p-2.5 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 p-2.5 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 p-2.5 rounded-full hover:bg-white/30 transition-colors duration-200"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
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
                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                          className="bg-gray-900 text-white"
                        >
                          {service}
                        </option>
                      ))}
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
