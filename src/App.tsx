import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
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
import TermsAndConditions from './TermsAndConditions';
import Internship from './pages/Internship'; // ✅ Corrected import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="services">
            <Route path="social-media-marketing" element={<SocialMediaMarketing />} />
            <Route path="lead-generation" element={<LeadGeneration />} />
            <Route path="sms-marketing" element={<SMSMarketing />} />
            <Route path="website-design" element={<WebsiteDesign />} />
            <Route path="full-stack-web-app" element={<WebAppDevelopment />} />
            <Route path="email-marketing" element={<EmailMarketing />} />
            <Route path="missed-call-service" element={<MissedCallService />} />
            <Route path="graphic-design" element={<GraphicDesign />} />
            <Route path="voice-call-services" element={<VoiceCallServices />} />
            <Route path="app-development" element={<AppDevelopment />} />
          </Route>
          <Route path="internship" element={<Internship />} /> {/* ✅ Moved outside of /services and corrected path */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
