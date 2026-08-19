import React from 'react';
import { Search, Compass, Layout, Code2, Rocket, LifeBuoy, CheckCircle2 } from 'lucide-react';

const phases = [
  {
    phase: '01',
    name: 'Discovery & System Scoping',
    timeline: 'Days 1–3',
    description: 'We audit your operational workflow, data requirements, user roles, and third-party integrations to produce a scoped technical specification.',
    deliverable: 'Technical Specification Document & Milestone Map',
  },
  {
    phase: '02',
    name: 'Architecture & UI/UX Specs',
    timeline: 'Days 3–7',
    description: 'Database schema modeling, API contract definitions, state machines, and high-fidelity interactive component designs.',
    deliverable: 'Entity-Relationship Schemas & Interactive Prototypes',
  },
  {
    phase: '03',
    name: 'Iterative Engineering Sprints',
    timeline: 'Sprint Weeks',
    description: 'Production frontend and backend code implementation with automated testing, CI/CD pipelines, and milestone staging reviews.',
    deliverable: 'Tested Production Codebase & Staging Deployments',
  },
  {
    phase: '04',
    name: 'Production Deployment & SLA Support',
    timeline: 'Launch & Beyond',
    description: 'Cloud environment provisioning, database index optimization, security hardening, domain cutover, and ongoing engineering maintenance.',
    deliverable: 'Live Production System & 24–48h Technical SLA',
  },
];

const DeliveryProcess: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800" id="delivery-process">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Predictable, Milestone-Driven Execution
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            No ambiguous estimates or endless scopes. We deliver through structured phases with tangible artifacts at every step.
          </p>
        </div>

        {/* Timeline Roadmap / Structured Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-mono text-blue-400">
                    {item.phase}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                    {item.timeline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {item.name}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1">
                  Deliverable
                </span>
                <p className="text-xs font-semibold text-slate-200">
                  {item.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DeliveryProcess;
