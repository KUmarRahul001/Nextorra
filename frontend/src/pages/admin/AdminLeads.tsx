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
  const [providers, setProviders] = useState<any[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('auto');

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

  const loadProviders = async () => {
    try {
      const res = await api.getVoiceProviders();
      setProviders(res.providers || []);
    } catch {
      setProviders([]);
    }
  };

  useEffect(() => {
    loadLeads();
    loadProviders();
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            Project Enquiries &amp; Leads
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage incoming business enquiries submitted via the contact form and RahBot conversational assistant.
          </p>
        </div>

        {/* Status, Export & Provider Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem('rahnoxa_admin_token') || sessionStorage.getItem('rahnoxa_admin_token');
                const res = await fetch('/v1/discovery/export-xlsx', {
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Export failed');
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `RAHNOXA_Jamshedpur_Sales_${new Date().toISOString().split('T')[0]}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
              } catch (err: any) {
                alert(err.message || 'Failed to export sales database');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-all"
          >
            📊 Export to XLSX
          </button>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
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
      </div>

      {/* 10-Day Sales Campaign Tracker Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-800/80 rounded-2xl p-4 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
              10-Day Sales Mode
            </span>
            <h2 className="text-sm font-bold tracking-tight text-white">Target: ₹5,000 Revenue in 10 Days</h2>
          </div>
          <p className="text-xs text-blue-200/80 mt-1">
            Commercial Floor: Complete Business Websites must NEVER be quoted below ₹5,000. Jamshedpur &rarr; Jharkhand Market.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center">
            <span className="block text-[10px] text-blue-200 uppercase font-sans">Min Website</span>
            <span className="font-bold text-amber-300">₹5,000</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center">
            <span className="block text-[10px] text-blue-200 uppercase font-sans">Goal</span>
            <span className="font-bold text-emerald-300">₹5,000</span>
          </div>
        </div>
      </div>

      {/* Prospect Discovery & Direct URL Search Engine */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              🔍 Live Prospect Research &amp; Client Discovery
            </h3>
            <p className="text-[11px] text-slate-500">
              Discover real businesses in Jamshedpur/Jharkhand or analyze any Google Maps / Website URL.
            </p>
          </div>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const targetLoc = (form.elements.namedItem('discovery_loc') as HTMLInputElement)?.value || 'Jamshedpur';
            const targetCat = (form.elements.namedItem('discovery_cat') as HTMLInputElement)?.value || 'Coaching Institute';
            
            try {
              const token = localStorage.getItem('rahnoxa_admin_token') || sessionStorage.getItem('rahnoxa_admin_token');
              const res = await fetch('/v1/discovery/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ location: targetLoc, category: targetCat, limit: 10, providerId: 'osm_nominatim' })
              });
              const json = await res.json();
              if (!json.success) throw new Error(json.error || 'Discovery failed');
              
              const count = json.data?.discovered_count || 0;
              alert(`✅ Discovery Complete!\n\nDiscovered ${count} real businesses in ${targetLoc} (${targetCat}). Converting priority leads into pipeline...`);
              
              // Automatically convert discovered businesses to leads
              if (json.data?.businesses) {
                for (const b of json.data.businesses) {
                  await fetch('/v1/discovery/convert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ business: b })
                  });
                }
              }
              loadLeads();
            } catch (err: any) {
              alert(err.message || 'Discovery search failed');
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs"
        >
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Area / City</label>
            <input
              name="discovery_loc"
              defaultValue="Golmuri, Jamshedpur"
              placeholder="e.g. Sakchi, Bistupur, Golmuri"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Industry / Category</label>
            <input
              name="discovery_cat"
              defaultValue="Coaching Centre"
              placeholder="e.g. Salons, Gyms, Clinics, Restaurants"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-1 md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all text-xs flex items-center justify-center gap-2"
            >
              🚀 Search &amp; Import Clients
            </button>
          </div>
        </form>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#F8FAFC]/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Origin / Source</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
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
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        <p className="text-[11px] text-slate-500">{lead.email}</p>
                        {lead.phone && <p className="text-[10px] text-slate-500">{lead.phone}</p>}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 font-medium">
                        {lead.service || 'General Software'}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-slate-500 capitalize">
                        {lead.source === 'rahbot_chat' ? '🤖 RahBot Assistant' : '🌐 Website Form'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-2 py-1 rounded text-[11px] font-bold border bg-[#F8FAFC] focus:outline-none ${
                          lead.status === 'NEW'
                            ? 'text-emerald-400 border-emerald-500/30'
                            : lead.status === 'QUALIFIED' || lead.status === 'WON'
                            ? 'text-cyan-400 border-cyan-500/30'
                            : 'text-slate-700 border-slate-200'
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
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={async () => {
                            try {
                              const res = await api.createVoiceSession(lead.id, 'English');
                              alert(`🎙️ [RISHIMA CLOUD VOICE SESSION STARTED]\n\n• Session ID: ${res.session.sessionId}\n• Prospect: ${res.session.leadName}\n• Service: ${res.session.leadService}\n• Rishima Initial Greeting:\n"${res.session.greeting}"\n\nLive real-time WebRTC audio pipeline connected.`);
                              loadLeads();
                            } catch (err: any) {
                              alert(err.message || 'Failed to start voice session');
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white border border-cyan-200 transition-colors text-xs font-semibold"
                          title="Start Real-Time Browser WebRTC Voice Session"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          Voice Session
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const res = await api.startVoiceCall(lead.id, selectedProvider);
                              alert(`📞 [OUTBOUND PSTN CALL INITIATED]\n\n• Target Phone: ${lead.phone}\n• Contact Name: ${lead.name}\n• Engine: ${res.call?.provider || 'LiveKit / SIP'}\n• Status: ${res.call?.status || 'DIALING'}`);
                              loadLeads();
                            } catch (err: any) {
                              if (err.message && err.message.includes('PSTN_NOT_CONFIGURED')) {
                                alert(`⚠️ PSTN Telephony is not configured.\n\nTo place physical telephone calls that ring a mobile phone, connect an authorized SIP carrier in the server environment.`);
                              } else {
                                alert(err.message || 'Call initiation failed');
                              }
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-700 border border-slate-200 transition-colors text-xs font-semibold cursor-pointer"
                          title="Place PSTN Outbound Phone Call"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          Phone Call
                        </button>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-600 text-slate-800 hover:text-white transition-colors text-xs font-semibold"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </div>
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-5 sm:p-7 text-slate-900 space-y-5 shadow-2xl my-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 shrink-0">
              <div>
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">{selectedLead.name}</h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedLead.company ? `${selectedLead.company} • ` : ''}
                  {selectedLead.service || selectedLead.recommended_offer || 'Business Website'}
                </span>
              </div>
              <button 
                onClick={() => setSelectedLead(null)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">Contact Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-blue-600 font-semibold hover:underline break-all">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">Phone / WhatsApp</span>
                  <span className="text-slate-900 font-semibold">{selectedLead.phone || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">Estimated Budget</span>
                  <span className="text-slate-900 font-semibold">{selectedLead.budget || '₹5,000 (Starter Plan)'}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">Delivery Timeline</span>
                  <span className="text-slate-900 font-semibold">{selectedLead.timeline || '3-5 Business Days'}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-700 font-bold block">Personalized Outreach Draft &amp; Opportunity Details</span>
                  {selectedLead.phone && (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(selectedLead.project_description || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      💬 Open in WhatsApp
                    </a>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed font-sans text-xs select-all">
                  {selectedLead.project_description}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-700 font-bold block mb-2">Update Pipeline Status</span>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedLead.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedLead.status === s
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 shrink-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedLead.project_description || '');
                  alert('📋 Outreach text copied to clipboard!');
                }}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                📋 Copy Message
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors"
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
