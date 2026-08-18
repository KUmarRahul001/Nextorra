import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Users,
  MessageSquare,
  Sparkles,
  Database,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: 'Projects', path: '/admin/projects', icon: <FolderGit2 className="h-4 w-4" /> },
  { name: 'Blog & Articles', path: '/admin/blog', icon: <FileText className="h-4 w-4" /> },
  { name: 'Leads & Enquiries', path: '/admin/leads', icon: <Users className="h-4 w-4" /> },
  { name: 'Chat Transcripts', path: '/admin/chat', icon: <MessageSquare className="h-4 w-4" /> },
  { name: 'Chat Knowledge', path: '/admin/knowledge', icon: <Database className="h-4 w-4" /> },
  { name: 'Daily SEO Automation', path: '/admin/automation', icon: <Sparkles className="h-4 w-4" /> },
  { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
];

const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Route protection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="text-sm">Verifying administrator session...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 justify-between flex-shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              R
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Rahnoxa Admin</h2>
              <span className="text-[10px] text-cyan-400 font-mono">v2.4 Production</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Badge & Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <div className="flex items-center justify-between px-3 py-2 bg-slate-800/40 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white">{user?.username}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Top Header ── */}
      <header className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
            R
          </div>
          <span className="font-bold text-sm text-white">Rahnoxa Admin</span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-slate-800 text-left pt-2 border-t border-slate-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* ── Main Content Body ── */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
