import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { tier1Services, tier2Services } from '../../data/services';
import config from '../../config';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: boolean;
    message: string;
  }>({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    try {
      const response = await fetch(config.forms.contactApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you! Your message has been sent successfully. We will get back to you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Oops! Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <section className="section bg-gradient-to-b from-gray-900 to-primary-dark text-white" id="contact">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Grow Together</h2>
          <p className="text-gray-300">Have a project or idea? Let's connect and make it real.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 animate-on-scroll">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-gray-300">{config.contact.location}</p>
                    <p className="text-gray-400 italic text-sm">(We operate remotely)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Us</h4>
                    <p className="text-gray-300">{config.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Call Us</h4>
                    <p className="text-gray-300">{config.contact.phone1}</p>
                    <p className="text-gray-300">{config.contact.phone2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="mt-4">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Service</option>
                    <optgroup label="── Software & Engineering">
                      {tier1Services.map((service) => (
                        <option key={service.slug} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── Marketing & Business Support">
                      {tier2Services.map((service) => (
                        <option key={service.slug} value={service.name}>
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
                    className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full flex items-center justify-center gap-3 bg-primary px-5 py-3 rounded font-semibold text-white hover:bg-primary-dark transition"
                >
                  Send Message
                  <Send className="h-5 w-5" />
                </button>
                {formStatus.submitted && (
                  <p
                    className={`mt-4 text-center ${
                      formStatus.error ? 'text-red-500' : 'text-green-400'
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
  );
};

export default ContactSection;
