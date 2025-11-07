import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';

// Legal/really separate pages (not sections)
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';

// Service detail pages
import SocialMediaMarketing from './pages/services/SocialMediaMarketing';
import LeadGeneration from './pages/services/LeadGeneration';
import SMSMarketing from './pages/services/SMSMarketing';
import WebsiteDesign from './pages/services/WebsiteDesign';
import WebAppDevelopment from './pages/services/WebAppDevelopment';
import EmailMarketing from './pages/services/EmailMarketing';
import MissedCallService from './pages/services/MissedCallService';
import GraphicDesign from './pages/services/GraphicDesign';
import VoiceCallServices from './pages/services/VoiceCallServices';
import AppDevelopment from './pages/services/AppDevelopment';

import Internship from './pages/Internship';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Homepage - Main single-page with sections */}
          <Route index element={<Home />} />

          {/* Get Started / Contact Page */}
          <Route path="get-started" element={<ContactPage />} />

          {/* Internship Page */}
          <Route path="internship" element={<Internship />} />

          {/* Service Detail Pages */}
          <Route path="services/social-media-marketing" element={<SocialMediaMarketing />} />
          <Route path="services/lead-generation" element={<LeadGeneration />} />
          <Route path="services/sms-marketing" element={<SMSMarketing />} />
          <Route path="services/website-design" element={<WebsiteDesign />} />
          <Route path="services/full-stack-web-app" element={<WebAppDevelopment />} />
          <Route path="services/email-marketing" element={<EmailMarketing />} />
          <Route path="services/missed-call-service" element={<MissedCallService />} />
          <Route path="services/graphic-design" element={<GraphicDesign />} />
          <Route path="services/voice-call-services" element={<VoiceCallServices />} />
          <Route path="services/app-development" element={<AppDevelopment />} />

          {/* Legal Pages */}
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;