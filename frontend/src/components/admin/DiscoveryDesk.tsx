import React, { useState } from 'react';
import { FiSearch, FiMapPin, FiCheckCircle, FiSend, FiAlertTriangle, FiLink } from 'react-icons/fi';
import { api } from '../../lib/api';

const DiscoveryDesk: React.FC = () => {
  const [mode, setMode] = useState<'url' | 'batch'>('url');
  const [directUrl, setDirectUrl] = useState('');
  const [location, setLocation] = useState('Jamshedpur');
  const [category, setCategory] = useState('Coaching Institute');
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [convertedLeads, setConvertedLeads] = useState<Record<string, { leadId: string; draft: string; whatsAppLink: string | null }>>({});

  // 1. Direct URL Discovery (Free & Zero-Cost Google Maps / Web Profile Parser)
  const handleDirectUrlDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrl.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.discoverFromUrl({
        url: directUrl.trim(),
        location,
        category,
      });

      if (res.success && res.data) {
        setResults([res.data]);
        setSummary({ discovered: 1, valid: 1, duplicates: 0 });
      } else {
        setErrorMsg(res.error || 'Could not parse target URL.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze direct business URL.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Batch Provider Discovery
  const handleStartBatchDiscovery = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.startDiscoveryJob({ location, category, limit });
      if (res.success && res.data) {
        setResults(res.data.businesses || []);
        setSummary({
          discovered: res.data.discovered_count,
          valid: res.data.valid_count,
          duplicates: res.data.duplicate_count,
        });
      } else {
        setErrorMsg(res.error || 'Failed to execute discovery job.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Discovery provider not configured. Please supply GOOGLE_PLACES_API_KEY for batch queries.');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async (business: any) => {
    try {
      const res = await api.convertDiscoveredLead(business);
      if (res.success && res.data) {
        setConvertedLeads(prev => ({
          ...prev,
          [business.id]: {
            leadId: res.data.lead.id,
            draft: res.data.draftMessage,
            whatsAppLink: res.data.whatsAppLink
          }
        }));
      }
    } catch (err) {
      console.error('Conversion error:', err);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Real Data Discovery Engine
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Free Maps URL Parser &amp; Location Business Discovery
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Zero API cost: Paste any Google Maps place link or run batch directory discovery across Jharkhand &amp; Kolkata.
          </p>
        </div>

        {/* Discovery Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'url' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct Maps Link (Free)
          </button>
          <button
            type="button"
            onClick={() => setMode('batch')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'batch' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Batch Query
          </button>
        </div>
      </div>

      {/* Mode 1: Free Direct Google Maps URL Inspector */}
      {mode === 'url' && (
        <form onSubmit={handleDirectUrlDiscovery} className="space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Google Maps Place URL / Business Profile Link <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                placeholder="https://www.google.com/maps/place/BusinessName/@lat,lng..."
                value={directUrl}
                onChange={(e) => setDirectUrl(e.target.value)}
                className="flex-1 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary text-xs font-bold px-6 py-2.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-sm flex-shrink-0"
              >
                <FiLink className="h-4 w-4" />
                <span>{loading ? 'Analyzing...' : 'Parse & Extract Opportunity'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Location Context</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none"
              >
                <option value="Jamshedpur">Jamshedpur (Jharkhand)</option>
                <option value="Adityapur">Adityapur (Jharkhand)</option>
                <option value="Gamharia">Gamharia (Jharkhand)</option>
                <option value="Ranchi">Ranchi (Jharkhand)</option>
                <option value="Kolkata">Kolkata (West Bengal)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Category Niche</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none"
              >
                <option value="Coaching Institute">Coaching &amp; Computer Institute</option>
                <option value="Manufacturer">Manufacturer &amp; Industrial SME</option>
                <option value="Gym">Fitness Gym / Yoga Studio</option>
                <option value="Salon">Salon &amp; Wellness</option>
                <option value="Restaurant">Restaurant &amp; Café</option>
                <option value="CA">CA &amp; Accounting Firm</option>
                <option value="Real Estate">Real Estate &amp; Builders</option>
              </select>
            </div>
          </div>
        </form>
      )}

      {/* Mode 2: Batch Query Form */}
      {mode === 'batch' && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Target Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none"
            >
              <option value="Jamshedpur">Jamshedpur (Jharkhand)</option>
              <option value="Adityapur">Adityapur (Jharkhand)</option>
              <option value="Gamharia">Gamharia (Jharkhand)</option>
              <option value="Ranchi">Ranchi (Jharkhand)</option>
              <option value="Kolkata">Kolkata (West Bengal)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none"
            >
              <option value="Coaching Institute">Coaching &amp; Computer Institute</option>
              <option value="Manufacturer">Manufacturer &amp; Industrial SME</option>
              <option value="Gym">Fitness Gym</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Limit</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800"
              min={5}
              max={50}
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleStartBatchDiscovery}
              disabled={loading}
              className="w-full btn btn-primary text-xs font-bold py-2.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FiSearch className="h-4 w-4" />
              <span>{loading ? 'Discovering...' : 'Start Batch Job'}</span>
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <FiAlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Provider Notice:</p>
            <p className="mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Discovered Real Opportunity Cards */}
      {results.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Analyzed Opportunities ({results.length})
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Parsed &amp; Scored via Opportunity Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((biz) => {
              const convertedInfo = convertedLeads[biz.id];
              return (
                <div
                  key={biz.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all space-y-3 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {biz.category}
                      </span>
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Score: {biz.opportunityScore}/100
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{biz.businessName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <FiMapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span>{biz.city} · {biz.source}</span>
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-semibold">Website Status:</span>
                        <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md ${
                          biz.websiteStatus === 'WEBSITE_FOUND' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          biz.websiteStatus === 'NO_WEBSITE_CONFIRMED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {biz.websiteStatus || 'WEBSITE_UNKNOWN'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-semibold">Score Confidence:</span>
                        <span className="font-bold text-slate-800">{biz.scoreConfidence || 'MEDIUM'}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-semibold">Detected Opportunity:</span>
                        <span className="font-mono font-bold text-amber-700">{biz.opportunityClass}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-semibold">Recommended Offer:</span>
                        <span className="font-bold text-blue-700">{biz.recommendedOffer}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="font-semibold">Starting Price:</span>
                        <span className="font-mono font-bold text-slate-900">₹{biz.recommendedPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Conversion & Review State */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {!convertedInfo ? (
                      <button
                        type="button"
                        onClick={() => handleConvert(biz)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold btn btn-primary inline-flex items-center justify-center gap-2 shadow-xs"
                      >
                        <FiCheckCircle className="h-3.5 w-3.5" />
                        <span>Convert to Contact-Ready Lead</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center justify-between font-mono">
                          <span>✓ Lead Saved (Status: CONTACT_READY)</span>
                        </div>
                        {convertedInfo.whatsAppLink && (
                          <button
                            type="button"
                            onClick={() => window.open(convertedInfo.whatsAppLink!, '_blank')}
                            className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white inline-flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <FiSend className="h-3.5 w-3.5" />
                            <span>Review Draft &amp; Open WhatsApp</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryDesk;
