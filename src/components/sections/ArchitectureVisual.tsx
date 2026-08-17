import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal as TerminalIcon,
  Globe2,
  Zap,
} from 'lucide-react';

const ArchitectureVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'metrics'>('architecture');

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Outer Glow & Ambient Ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl blur-xl opacity-30 animate-pulse" />

      {/* Main Glassmorphic Container */}
      <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Terminal / IDE Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
            <span className="ml-2 text-xs font-mono text-slate-400">nextorra-cluster :: prod-v2.4</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              System Mesh
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'metrics'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Telemetry
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {activeTab === 'architecture' ? (
          <div className="p-6 space-y-4 font-mono text-xs">
            {/* Top Gateway Layer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-cyan-400">
                  <Globe2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span>Edge API Gateway</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Cloudflare Global Anycast • Rate-Limited</div>
                </div>
              </div>
              <div className="text-right text-slate-400">
                <span className="text-cyan-400 font-bold">14ms</span>
                <div className="text-[10px] text-slate-500">Latency</div>
              </div>
            </motion.div>

            {/* Connecting Stream Lines */}
            <div className="flex justify-center my-1">
              <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 animate-pulse" />
            </div>

            {/* Core Microservices / Enterprise Modules */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-3.5 rounded-xl bg-gradient-to-br from-slate-950/80 to-slate-900/60 border border-slate-800/80 group hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-sans font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    99.99%
                  </span>
                </div>
                <div className="font-sans font-semibold text-slate-200 text-sm mb-1">ERP Core &amp; SaaS</div>
                <div className="text-slate-400 text-[11px] font-sans">Multi-tenant isolation, RBAC &amp; event pipeline</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-3.5 rounded-xl bg-gradient-to-br from-slate-950/80 to-slate-900/60 border border-slate-800/80 group hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-cyan-400 font-sans font-medium">Async Jobs</span>
                </div>
                <div className="font-sans font-semibold text-slate-200 text-sm mb-1">Custom APIs</div>
                <div className="text-slate-400 text-[11px] font-sans">High-throughput Webhooks &amp; Integrations</div>
              </motion.div>
            </div>

            {/* Connecting Stream Lines */}
            <div className="flex justify-center my-1">
              <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 animate-pulse" />
            </div>

            {/* Persistence & Data Fabric */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span>Database &amp; Object Store</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">PostgreSQL • Redis Cache • Encrypted S3</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Replicated</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Throughput</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">12.4k</div>
                <div className="text-[10px] text-slate-500">req / sec</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">P99 Response</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">38ms</div>
                <div className="text-[10px] text-slate-500">global avg</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Error Rate</div>
                <div className="text-lg font-bold text-blue-400 font-mono">0.001%</div>
                <div className="text-[10px] text-slate-500">zero fatal</div>
              </div>
            </div>

            {/* Live Streaming Log preview */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-3.5 font-mono text-[11px] text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-slate-500 border-b border-slate-800/80 pb-2 mb-2">
                <span className="flex items-center gap-1.5">
                  <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
                  Live Event Stream
                </span>
                <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Streaming
                </span>
              </div>
              <div className="text-cyan-300">[INFO] Event router: dispathed 12,410 tasks to worker nodes</div>
              <div className="text-slate-400">[TRACE] PostgreSQL pool connection healthy (32 active / 120 idle)</div>
              <div className="text-emerald-400">[SUCCESS] Automated zero-downtime deployment verified</div>
            </div>
          </div>
        )}

        {/* Footer Technical Bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Server className="h-3.5 w-3.5 text-blue-400" />
            <span>Architecture: Microservices &amp; Modular Monolith</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Zap className="h-3 w-3" />
            <span>Real-Time SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureVisual;
