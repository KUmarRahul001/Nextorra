import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
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
        title={`Admin Portal – ${config.siteName}`}
        description="Secure Administrative Console for Rahnoxa."
        url={`${config.siteUrl}/admin/login`}
      />

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 text-slate-100">
        <div className="max-w-md w-full">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3.5 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-cyan-400 mb-4 shadow-xl shadow-blue-600/10">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Rahnoxa Admin Platform</h1>
            <p className="text-xs text-slate-400 mt-1">Management &amp; Content Operations</p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
            {error && (
              <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm mt-2"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
              Administrator accounts are provisioned via environment configuration.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
