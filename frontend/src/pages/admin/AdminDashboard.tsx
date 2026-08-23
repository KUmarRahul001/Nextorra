import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiFolder,
  FiFileText,
  FiArrowRight,
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiMessageSquare,
  FiExternalLink
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineCpuChip } from 'react-icons/hi2';
import { api } from '../../lib/api';
import DiscoveryDesk from '../../components/admin/DiscoveryDesk';

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.getDashboardStats();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping" />
        Loading operations metrics...
      </div>
    );
  }

  const stats = data?.stats || {
    projects: { total: 4, published: 4 },
    blogs: { total: 2, draft: 0, published: 2 },
    leads: { total: 0, new: 0 },
    chat: { conversations: 0 },
    automation: { runs: 1 },
  };

  const statCards = [
    {
      title: 'New Inquiries',
      value: stats.leads?.new || 0,
      sub: `${stats.leads?.total || 0} total leads captured`,
      icon: <FiUsers className="h-5 w-5 text-emerald-600" />,
      link: '/admin/leads',
      bg: 'bg-emerald-50 border-emerald-200/80',
    },
    {
      title: 'Live Projects',
      value: stats.projects?.published || 0,
      sub: `${stats.projects?.total || 0} portfolio showcases`,
      icon: <FiFolder className="h-5 w-5 text-blue-600" />,
      link: '/admin/projects',
      bg: 'bg-blue-50 border-blue-200/80',
    },
    {
      title: 'Engineering Articles',
      value: stats.blogs?.published || 0,
      sub: `${stats.blogs?.draft || 0} drafts awaiting review`,
      icon: <FiFileText className="h-5 w-5 text-indigo-600" />,
      link: '/admin/blog',
      bg: 'bg-indigo-50 border-indigo-200/80',
    },
    {
      title: 'AI Consultations',
      value: stats.chat?.conversations || 0,
      sub: 'RahBot client interactions',
      icon: <FiMessageSquare className="h-5 w-5 text-violet-600" />,
      link: '/admin/chat',
      bg: 'bg-violet-50 border-violet-200/80',
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 text-slate-900">
      
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Matrix &amp; Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status overview for Rahnoxa engineering deployments and lead intake.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="btn btn-primary text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-sm"
          >
            <FiPlus className="h-3.5 w-3.5" />
            <span>Add Showcase</span>
          </Link>
          <Link
            to="/admin/blog"
            className="btn btn-outline text-xs font-semibold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 bg-white shadow-2xs"
          >
            <FiFileText className="h-3.5 w-3.5 text-blue-600" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* ── Key Metrics Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${card.bg}`}>
                  {card.icon}
                </div>
                <FiArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                {card.title}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {card.value}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3 pt-3 border-t border-slate-100">
              {card.sub}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Location Discovery Engine (Jamshedpur / Adityapur / Kolkata) ── */}
      <DiscoveryDesk />

      {/* ── Operations & Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Leads & Inquiries */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                <FiUsers className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Recent Project Inquiries</h2>
            </div>
            <Link to="/admin/leads" className="text-xs font-semibold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          {data?.recentLeads?.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {data.recentLeads.map((lead: any) => (
                <div key={lead.id} className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{lead.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{lead.serviceRequested || 'General Inquiry'}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {lead.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              <FiCheckCircle className="h-6 w-6 mx-auto mb-2 text-slate-300" />
              <span>No pending inquiries. All captured leads will appear here in real time.</span>
            </div>
          )}
        </div>

        {/* Right: Automated SEO & Infrastructure Health */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <HiOutlineSparkles className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Automated Pipeline Health</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              OPERATIONAL
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Edge Gateway &amp; CDN</p>
                <p className="text-[11px] text-slate-500 font-mono">Cloudflare Pages · Sub-150ms</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">AI Assistant Cluster</p>
                <p className="text-[11px] text-slate-500 font-mono">RahBot · Active Knowledge</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Daily SEO Automation</p>
                <p className="text-[11px] text-slate-500 font-mono">Cron Scheduled · Node.js</p>
              </div>
              <Link to="/admin/automation" className="text-blue-600 font-bold hover:underline">
                Inspect
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
