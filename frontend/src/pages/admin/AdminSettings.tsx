import React, { useState, useEffect } from 'react';
import { Settings, Save, Shield, Globe, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import config from '../../config';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    site_name: config.siteName,
    site_url: config.siteUrl,
    contact_email: 'contact.rahnoxa@protonmail.com',
    ai_assistant_name: 'RahBot',
    automation_schedule: 'Daily at 18:00 IST',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-slate-500" />
          Platform &amp; Engine Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure production deployment metadata, AI Assistant behavior, and global endpoints.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Settings successfully updated.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 max-w-2xl text-xs">
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            General Branding &amp; Deployment
          </h3>

          <div>
            <label className="block text-slate-500 mb-1">Company / Platform Name</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Production URL</label>
            <input
              type="text"
              value={settings.site_url}
              onChange={(e) => setSettings({ ...settings, site_url: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Primary Routing Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            AI &amp; Automation Identity
          </h3>

          <div>
            <label className="block text-slate-500 mb-1">AI Assistant Identifier</label>
            <input
              type="text"
              value={settings.ai_assistant_name}
              onChange={(e) => setSettings({ ...settings, ai_assistant_name: e.target.value })}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1">SEO Generator Cron Schedule</label>
            <input
              type="text"
              disabled
              value={settings.automation_schedule}
              className="w-full bg-[#F8FAFC]/60 border border-slate-200/60 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed font-mono"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-slate-900 font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2 text-xs"
          >
            <Save className="h-4 w-4" />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
