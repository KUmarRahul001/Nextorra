import React, { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  X,
} from 'lucide-react';
import { api } from '../../lib/api';

const STATUS_OPTIONS = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL',
  'WON',
  'LOST',
  'ARCHIVED',
];

const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const res = await api.getLeads(filterStatus === 'ALL' ? undefined : filterStatus);
      setLeads(res.leads || []);
    } catch {
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [filterStatus]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateLead(id, newStatus);
      loadLeads();
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update lead status');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            Project Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage incoming business enquiries submitted via the contact form and RahBot conversational assistant.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Origin / Source</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Loading enquiries...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No enquiries found. Leads captured from the contact form or RahBot will appear here.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-white">{lead.name}</p>
                        <p className="text-[11px] text-slate-400">{lead.email}</p>
                        {lead.phone && <p className="text-[10px] text-slate-500">{lead.phone}</p>}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 font-medium">
                        {lead.service || 'General Software'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-slate-400 capitalize">
                        {lead.source === 'rahbot_chat' ? '🤖 RahBot Assistant' : '🌐 Website Form'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-400 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-2 py-1 rounded text-[11px] font-bold border bg-slate-950 focus:outline-none ${
                          lead.status === 'NEW'
                            ? 'text-emerald-400 border-emerald-500/30'
                            : lead.status === 'QUALIFIED' || lead.status === 'WON'
                            ? 'text-cyan-400 border-cyan-500/30'
                            : 'text-slate-300 border-slate-700'
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white transition-colors text-xs font-semibold"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">{selectedLead.name}</h3>
                <span className="text-xs text-slate-400">
                  {selectedLead.company ? `${selectedLead.company} • ` : ''}
                  {selectedLead.service}
                </span>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-slate-500 block mb-0.5">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-cyan-400 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Phone</span>
                  <span className="text-slate-200">{selectedLead.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Budget</span>
                  <span className="text-slate-200">{selectedLead.budget || 'To be discussed'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Timeline</span>
                  <span className="text-slate-200">{selectedLead.timeline || 'Flexible'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Project Requirements</span>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 whitespace-pre-line leading-relaxed">
                  {selectedLead.project_description}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 font-semibold block mb-1">Update Status</span>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedLead.id, s)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        selectedLead.status === s
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
