import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Server,
  Database,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Layers,
  Sparkles,
  Lock,
  Search,
  Cloud,
  Cpu,
  Palette,
  ShoppingCart
} from "lucide-react";
import { ALL_SKILLS, TechCategory, TechItem } from "../../data/technologies";
import { ALL_SKILL_ICONS } from "../../data/skillIcons";

const categoryTabs: { id: TechCategory; label: string; icon: React.ReactNode; count: number }[] = [
  { id: "all", label: "All 100+ Skills", icon: <Layers className="h-3.5 w-3.5" />, count: ALL_SKILLS.length },
  { id: "frontend", label: "Frontend & UI", icon: <Code2 className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "frontend").length },
  { id: "backend", label: "Backend & APIs", icon: <Server className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "backend").length },
  { id: "database", label: "Database & Cache", icon: <Database className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "database").length },
  { id: "mobile", label: "Mobile Apps", icon: <Smartphone className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "mobile").length },
  { id: "cms", label: "CMS & E-Commerce", icon: <ShoppingCart className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "cms").length },
  { id: "devops", label: "DevOps & Cloud", icon: <Cloud className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "devops").length },
  { id: "ai", label: "AI & Data Science", icon: <Cpu className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "ai").length },
  { id: "design_qa", label: "Design & QA", icon: <Palette className="h-3.5 w-3.5" />, count: ALL_SKILLS.filter(s => s.category === "design_qa").length },
];

export const TechStackShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TechCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTechnologies = useMemo(() => {
    let list = activeTab === "all"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((t) => t.category === activeTab);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery]);

  return (
    <section className="py-24 bg-white text-slate-900 relative border-b border-slate-200 overflow-hidden" id="tech-stack">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 pb-8 border-b border-slate-200">
          <div className="lg:col-span-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Full Technology Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              100+ Production Technologies &amp; Skills
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From modern reactive frameworks (React, Next.js, Vue) to battle-tested enterprise backends (.NET, PHP, Laravel, Java, Python), high-performance databases, and native mobile apps.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Indexed Technologies</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{ALL_SKILLS.length}+ Stacks</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 font-black text-lg">
                100+
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search PHP, ASP.NET, React, Python, MySQL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-mono self-end md:self-center">
            Showing <span className="font-bold text-slate-900">{filteredTechnologies.length}</span> of {ALL_SKILLS.length} skills
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech: TechItem) => {
              const iconElement = ALL_SKILL_ICONS[tech.iconKey] || <Code2 className="h-full w-full" />;

              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3.5">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${tech.color}15`,
                          color: tech.color,
                        }}
                      >
                        {iconElement}
                      </div>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80">
                        {tech.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>{tech.name}</span>
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed mt-1.5 mb-3 line-clamp-2">
                      {tech.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="capitalize">{tech.category.replace("_", " & ")}</span>
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 font-bold">
                      Supported <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
              <ShieldCheck className="h-5 w-5 flex-shrink-0" />
              <span>Static Typing &amp; Strict Contracts</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every data structure is strongly typed with TypeScript or native typed definitions, establishing reliable contracts across all APIs and client interfaces.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Database className="h-5 w-5 flex-shrink-0" />
              <span>Relational Schema Integrity</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supabase PostgreSQL serves as the relational database authority, enforcing ACID transactional guarantees, Row Level Security (RLS), and schema integrity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
              <Lock className="h-5 w-5 flex-shrink-0" />
              <span>Enterprise Security &amp; Auth</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cryptographically verified JWT tokens, strict role verification middleware, and zero-trust perimeter configurations protect operational workflows.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 sm:p-12 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Need a specialized stack or legacy migration?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Whether building greenfield cloud microservices or migrating legacy PHP/.NET applications to modern React and Supabase architectures, our engineers deliver maintainable code.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/get-started");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF2F87] to-[#FE3061] shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Consult Our Engineers</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechStackShowcase;
