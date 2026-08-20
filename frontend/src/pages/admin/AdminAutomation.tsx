import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

const AdminAutomation: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<any | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await api.getAutomation();
      setData(res);
    } catch {
      setData({ jobs: [], runs: [] });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRunNow = async () => {
    setIsRunning(true);
    setRunResult(null);
    try {
      const res = await api.runAutomation();
      setRunResult(res);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Automation execution failed');
    } finally {
      setIsRunning(false);
    }
  };

  const handleToggleAutoPublish = async (job: any) => {
    const nextVal = job.auto_publish ? 0 : 1;
    try {
      await api.updateAutomation({ id: job.id, auto_publish: nextVal });
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to update configuration');
    }
  };

  const job = data?.jobs?.[0] || {
    name: 'Daily 18:00 IST SEO Blog Generator',
    schedule: 'Every day at 18:00 IST',
    enabled: 1,
    auto_publish: 0,
    status: 'IDLE',
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            Daily SEO Blog Automation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous daily technical article generator operating at 18:00 IST. Automatically prepares SEO articles with strict safety review workflows.
          </p>
        </div>

        <button
          onClick={handleRunNow}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-900 text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating Technical Article...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Run Generation Pipeline Now
            </>
          )}
        </button>
      </div>

      {/* Execution Feedback Notification */}
      {runResult && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start justify-between text-xs text-emerald-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Pipeline Execution Succeeded!</p>
              <p className="text-slate-700 mt-0.5">{runResult.message}</p>
              {runResult.post && (
                <div className="mt-2 flex gap-3">
                  <Link
                    to="/admin/blog"
                    className="text-cyan-300 hover:underline font-semibold"
                  >
                    View in Blog Manager →
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setRunResult(null)}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Control & Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule & Model Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-400" />
              Cron Trigger &amp; Schedule
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              Active
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Target Time</span>
              <span className="font-mono font-semibold text-slate-900">18:00 IST (Daily)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Topic Rotation Engine</span>
              <span className="text-slate-800">Enabled (Anti-Duplication Matrix)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Primary Domain Focus</span>
              <span className="text-slate-800">ERP, SaaS, Cloud, Microservices</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Target Word Count</span>
              <span className="text-slate-800">1,200 – 1,800 Words</span>
            </div>
          </div>
        </div>

        {/* Safety & Publishing Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              Safety &amp; Review Workflow
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {job.auto_publish ? 'Auto-Publish ON' : 'Draft First'}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            By default, new articles enter the <b>DRAFT</b> queue so administrators can review formatting, internal links, and SEO snippets prior to public indexing.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-900">Direct Auto-Publish</p>
              <p className="text-[11px] text-slate-500">Bypasses draft review when enabled</p>
            </div>

            <button
              onClick={() => handleToggleAutoPublish(job)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                job.auto_publish
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-blue-600 text-slate-900 border-blue-500 shadow-md'
              }`}
            >
              {job.auto_publish ? 'Disable Auto-Publish' : 'Enable Auto-Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Execution History & Audit Logs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-cyan-400" />
          Automation Execution Audit Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#F8FAFC]/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Topic / Keyword</th>
                <th className="py-3 px-4">Generated Title</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {data?.runs?.length > 0 ? (
                data.runs.map((run: any) => (
                  <tr key={run.id} className="hover:bg-slate-50/30">
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {new Date(run.started_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{run.topic}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {run.output_title || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          run.status === 'SUCCESS'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No execution runs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAutomation;
