import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import ScrollToTop from "./ScrollToTop";

// Core pages (lazy loaded for performance)
const Home = lazy(() => import("./pages/Home"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Internship = lazy(() => import("./pages/Internship"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const TermsAndConditions = lazy(() => import("./TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Services (lazy loaded)
const SocialMediaMarketing = lazy(() => import("./pages/services/SocialMediaMarketing"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));
const SMSMarketing = lazy(() => import("./pages/services/SMSMarketing"));
const WebsiteDesign = lazy(() => import("./pages/services/WebsiteDesign"));
const WebAppDevelopment = lazy(() => import("./pages/services/WebAppDevelopment"));
const EmailMarketing = lazy(() => import("./pages/services/EmailMarketing"));
const MissedCallService = lazy(() => import("./pages/services/MissedCallService"));
const GraphicDesign = lazy(() => import("./pages/services/GraphicDesign"));
const VoiceCallServices = lazy(() => import("./pages/services/VoiceCallServices"));
const AppDevelopment = lazy(() => import("./pages/services/AppDevelopment"));

function App() {
  return (
    <Router>
      {/* Ensures top scroll after route change */}
      <ScrollToTop />

      {/* Suspense fallback for lazy loading */}
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center bg-gray-50 text-gray-600 text-lg">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 🏠 Home */}
            <Route index element={<Home />} />

            {/* 📞 Contact / Get Started */}
            <Route path="get-started" element={<ContactPage />} />

            {/* 🎓 Internship */}
            <Route path="internship" element={<Internship />} />

            {/* 💼 Services Overview */}
            <Route path="services" element={<ServicesOverview />} />

            {/* 🔧 Individual Service Pages */}
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

            {/* ⚖️ Legal Pages */}
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />

            {/* 🔁 Redirect old /pages/... URLs for SEO-safe backward compatibility */}
            <Route path="pages/services/:slug" element={<Navigate to="/services/:slug" replace />} />
            <Route path="pages/privacy-policy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="pages/terms-and-conditions" element={<Navigate to="/terms-and-conditions" replace />} />

            {/* 🚫 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
