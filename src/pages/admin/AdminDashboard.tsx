import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FolderGit2,
  FileText,
  Sparkles,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import { api } from '../../lib/api';

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
    return <div className="p-8 text-center text-slate-500">Loading operations dashboard...</div>;
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
      title: 'New Enquiries',
      value: stats.leads?.new || 0,
      sub: `${stats.leads?.total || 0} total leads`,
      icon: <Users className="h-5 w-5 text-emerald-400" />,
      link: '/admin/leads',
      bg: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Published Projects',
      value: stats.projects?.published || 0,
      sub: `${stats.projects?.total || 0} total showcases`,
      icon: <FolderGit2 className="h-5 w-5 text-blue-400" />,
      link: '/admin/projects',
      bg: 'from-blue-500/10 to-blue-500/5',
      border: 'border-blue-500/20',
    },
    {
      title: 'Blog Articles',
      value: stats.blogs?.published || 0,
      sub: `${stats.blogs?.draft || 0} drafts awaiting review`,
      icon: <FileText className="h-5 w-5 text-indigo-400" />,
      link: '/admin/blog',
      bg: 'from-indigo-500/10 to-indigo-500/5',
      border: 'border-indigo-500/20',
    },
    {
      title: 'Daily SEO Automation',
      value: stats.automation?.runs || 0,
      sub: 'Next run: 18:00 IST',
      icon: <Sparkles className="h-5 w-5 text-cyan-400" />,
      link: '/admin/automation',
      bg: 'from-cyan-500/10 to-cyan-500/5',
      border: 'border-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Operations Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time platform overview across leads, projects, blog content, and automated SEO jobs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Project
          </Link>
          <Link
            to="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Article
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c, i) => (
          <Link
            key={i}
            to={c.link}
            className={`p-5 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} hover:border-slate-600 transition-all duration-200 block`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{c.title}</span>
              <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {c.icon}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white mb-1">{c.value}</div>
            <div className="text-[11px] text-slate-400">{c.sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Leads */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              Recent Project Enquiries
            </h2>
            <Link to="/admin/leads" className="text-xs text-blue-400 hover:text-cyan-300 font-semibold">
              View All →
            </Link>
          </div>

          {data?.recentLeads && data.recentLeads.length > 0 ? (
            <div className="space-y-3">
              {data.recentLeads.slice(0, 4).map((lead: any) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{lead.name}</p>
                    <p className="text-slate-400 text-[11px]">{lead.email} • {lead.service}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lead.status === 'NEW'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No project enquiries received yet. New visitor leads from contact &amp; RahBot will appear here.
            </div>
          )}
        </div>

        {/* Right: Automation Status & Recent Blogs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Daily SEO Automation Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Daily 18:00 IST Blog Generator
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Active Schedule
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Autonomous article engine configured to generate technical SEO articles every day at 18:00 IST. Automatically queued to Draft for review.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-500">Auto-Publish: <b className="text-slate-300">Disabled (Review First)</b></span>
              <Link
                to="/admin/automation"
                className="text-xs text-blue-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
              >
                Automation Center
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-400" />
                Recent Blog Posts
              </h2>
              <Link to="/admin/blog" className="text-xs text-blue-400 hover:text-cyan-300 font-semibold">
                Manage Blog →
              </Link>
            </div>

            <div className="space-y-2.5">
              {data?.recentBlogs?.slice(0, 3).map((blog: any) => (
                <div
                  key={blog.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-200 truncate max-w-[280px]">
                    {blog.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 text-[10px] font-semibold">
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
