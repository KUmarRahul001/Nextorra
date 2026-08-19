import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  FiGrid,
  FiFolder,
  FiFileText,
  FiUsers,
  FiMessageSquare,
  FiDatabase,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
  FiShield,
  FiZap
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: <FiGrid className="h-4 w-4" /> },
  { name: 'Projects', path: '/admin/projects', icon: <FiFolder className="h-4 w-4" /> },
  { name: 'Blog & Articles', path: '/admin/blog', icon: <FiFileText className="h-4 w-4" /> },
  { name: 'Leads & Enquiries', path: '/admin/leads', icon: <FiUsers className="h-4 w-4" /> },
  { name: 'Chat Transcripts', path: '/admin/chat', icon: <FiMessageSquare className="h-4 w-4" /> },
  { name: 'Chat Knowledge', path: '/admin/knowledge', icon: <FiDatabase className="h-4 w-4" /> },
  { name: 'SEO Automation', path: '/admin/automation', icon: <HiOutlineSparkles className="h-4 w-4" /> },
  { name: 'Settings', path: '/admin/settings', icon: <FiSettings className="h-4 w-4" /> },
];

const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Route protection
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center text-slate-500">
        <div className="text-sm font-mono flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600 animate-ping" />
          Verifying administrator session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row font-sans">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-5 justify-between flex-shrink-0 shadow-xs">
        <div className="space-y-6">
          {/* Official Brand Logo */}
          <Link to="/" className="flex items-center gap-3 px-2 py-1 group">
            <img 
              src="/brand/logo-symbol-transparent.png" 
              alt="Rahnoxa Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-black text-sm text-slate-900 tracking-tight leading-none">
                RAHNOXA
              </span>
              <span className="text-[9px] text-blue-600 font-mono tracking-widest uppercase font-bold mt-0.5">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

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
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiExternalLink className="h-3.5 w-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              v2.4
            </span>
          </Link>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || user?.username || 'Lead Engineer'}
                </p>
                <p className="text-[10px] text-slate-500 font-mono capitalize">
                  {user?.role || 'Administrator'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
              title="Logout"
            >
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header Bar ── */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <img 
            src="/brand/logo-symbol-transparent.png" 
            alt="Rahnoxa Logo" 
            className="h-7 w-auto object-contain" 
          />
          <span className="font-bold text-sm text-slate-900">Rahnoxa Admin</span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        >
          {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
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
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-rose-600 flex items-center gap-2 px-3 py-2 hover:bg-rose-50 rounded-lg w-full"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Main Operations Workspace ── */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#F8FAFC]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
