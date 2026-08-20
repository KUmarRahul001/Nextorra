import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight, FiShield, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';
import config from '../../config';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await login({ username, password });
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={`Admin Login – ${config.siteName}`}
        description="Secure Administrative Console for Rahnoxa."
        url={`${config.siteUrl}/admin/login`}
      />

      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-16 text-slate-900">
        <div className="max-w-md w-full">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4 group">
              <img 
                src="/brand/logo-symbol-transparent.png" 
                alt="Rahnoxa Logo" 
                className="h-12 w-auto mx-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              RAHNOXA ADMIN
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Management &amp; Content Operations</p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg shadow-slate-200/50">
            {error && (
              <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2.5">
                <FiAlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="admin"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FiLock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all inline-flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Console'}</span>
                <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <Link to="/" className="text-xs text-slate-500 hover:text-blue-600 font-semibold transition-colors">
                ← Back to public website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
