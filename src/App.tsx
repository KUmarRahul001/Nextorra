import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import ScrollToTop from "./ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

// Core public pages (lazy loaded)
const Home = lazy(() => import("./pages/Home"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Internship = lazy(() => import("./pages/Internship"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const TermsAndConditions = lazy(() => import("./TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// ── Tier 1: Software & Engineering (lazy loaded) ──
const WebsiteDesign = lazy(() => import("./pages/services/WebsiteDesign"));
const WebAppDevelopment = lazy(() => import("./pages/services/WebAppDevelopment"));
const AppDevelopment = lazy(() => import("./pages/services/AppDevelopment"));
const CustomSoftwareApiIntegration = lazy(() => import("./pages/services/CustomSoftwareApiIntegration"));
const ERPEnterpriseApplications = lazy(() => import("./pages/services/ERPEnterpriseApplications"));
const SaaSProducts = lazy(() => import("./pages/services/SaaSProducts"));
const DesktopApplications = lazy(() => import("./pages/services/DesktopApplications"));

// ── Tier 2: Marketing & Business Support (lazy loaded) ──
const SocialMediaMarketing = lazy(() => import("./pages/services/SocialMediaMarketing"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));
const SMSMarketing = lazy(() => import("./pages/services/SMSMarketing"));
const EmailMarketing = lazy(() => import("./pages/services/EmailMarketing"));
const MissedCallService = lazy(() => import("./pages/services/MissedCallService"));
const GraphicDesign = lazy(() => import("./pages/services/GraphicDesign"));
const VoiceCallServices = lazy(() => import("./pages/services/VoiceCallServices"));

// ── Admin Management Platform (lazy loaded) ──
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminChat = lazy(() => import("./pages/admin/AdminChat"));
const AdminKnowledge = lazy(() => import("./pages/admin/AdminKnowledge"));
const AdminAutomation = lazy(() => import("./pages/admin/AdminAutomation"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Ensures top scroll after route change */}
        <ScrollToTop />

        {/* Suspense fallback for lazy loading */}
        <Suspense
          fallback={
            <div className="h-screen w-full flex flex-col justify-center items-center bg-[#FAFCFF] text-slate-900">
              <div className="relative flex flex-col items-center gap-4">
                {/* Brand Logo with Pulsing Glow Ring */}
                <div className="relative p-4 rounded-3xl bg-white shadow-xl shadow-blue-500/10 border border-slate-200/80 flex items-center justify-center">
                  <div className="absolute -inset-2 rounded-3xl border-2 border-blue-500/30 border-t-blue-600 animate-spin" />
                  <img 
                    src="/brand/logo-symbol-transparent.png" 
                    alt="Rahnoxa" 
                    className="h-10 w-auto object-contain animate-pulse" 
                  />
                </div>

                {/* Typography & Status Bar */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-black tracking-wider text-slate-900 font-mono">
                    RAHNOXA
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
                    <span className="text-xs text-slate-500 font-mono">Initializing System...</span>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Routes>
            {/* ── Admin Auth & Management Routes ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="chat" element={<AdminChat />} />
              <Route path="knowledge" element={<AdminKnowledge />} />
              <Route path="automation" element={<AdminAutomation />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ── Public Website Routes ── */}
            <Route path="/" element={<Layout />}>
              {/* 🏠 Home */}
              <Route index element={<Home />} />

              {/* 📖 Engineering Blog & Insights */}
              <Route path="blog" element={<BlogIndex />} />
              <Route path="blog/:slug" element={<BlogPost />} />

              {/* 📞 Contact / Get Started */}
              <Route path="get-started" element={<ContactPage />} />

              {/* 🎓 Internship */}
              <Route path="internship" element={<Internship />} />

              {/* 💼 Services Overview */}
              <Route path="services" element={<ServicesOverview />} />

              {/* 🚀 Dynamic Project Showcase Details */}
              <Route path="projects/:slug" element={<ProjectDetail />} />

              {/* ── Tier 1: Software & Engineering ── */}
              <Route path="services/web-development" element={<WebsiteDesign />} />
              <Route path="services/full-stack-web-apps" element={<WebAppDevelopment />} />
              <Route path="services/app-development" element={<AppDevelopment />} />
              <Route path="services/custom-software-api-integration" element={<CustomSoftwareApiIntegration />} />
              <Route path="services/erp-enterprise-applications" element={<ERPEnterpriseApplications />} />
              <Route path="services/saas-products" element={<SaaSProducts />} />
              <Route path="services/desktop-applications" element={<DesktopApplications />} />

              {/* Backward compatibility — old slugs → new canonical slugs */}
              <Route path="services/website-design" element={<Navigate to="/services/web-development" replace />} />
              <Route path="services/full-stack-web-app" element={<Navigate to="/services/full-stack-web-apps" replace />} />

              {/* ── Tier 2: Marketing & Business Support ── */}
              <Route path="services/social-media-marketing" element={<SocialMediaMarketing />} />
              <Route path="services/lead-generation" element={<LeadGeneration />} />
              <Route path="services/sms-marketing" element={<SMSMarketing />} />
              <Route path="services/email-marketing" element={<EmailMarketing />} />
              <Route path="services/missed-call-service" element={<MissedCallService />} />
              <Route path="services/graphic-design" element={<GraphicDesign />} />
              <Route path="services/voice-call-services" element={<VoiceCallServices />} />

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
    </AuthProvider>
  );
}

export default App;
