/**
 * Rahnoxa AI Voice Call Manager
 * Orchestrates calls, manages state machine transitions, records transcripts, and triggers summarization.
 */

import { db } from '../../../database/supabase.js';
import { buildVoiceSystemPrompt } from '../prompts/voice.prompt.js';

export const CALL_STATUSES = {
  QUEUED: 'QUEUED',
  DIALING: 'DIALING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  NO_ANSWER: 'NO_ANSWER',
};

export class CallManager {
  /**
   * Start or simulate an AI Voice Call for a given lead
   */
  static async initiateCall({ leadId, adminId, mode = 'SIMULATED' }) {
    const lead = await db.getLead(leadId);
    if (!lead) throw new Error(`Lead with ID ${leadId} not found`);

    // Ensure only one active call exists per lead
    const activeCall = await db.getActiveCallForLead?.(leadId).catch(() => null);
    if (activeCall && ['DIALING', 'IN_PROGRESS', 'QUEUED'].includes(activeCall.status)) {
      throw new Error(`An active call (${activeCall.id}) is already in progress for this lead.`);
    }

    // Fetch relevant service knowledge (canonical matching without random fallback)
    let serviceKnowledge = '';
    try {
      const items = await db.getKnowledgeItems('services');
      if (items && items.length > 0 && lead.service) {
        const leadServiceLower = lead.service.toLowerCase().trim();
        const matched = items.find((item) => {
          const title = item.title.toLowerCase();
          const category = (item.category || '').toLowerCase();
          return title.includes(leadServiceLower) || leadServiceLower.includes(title) || category.includes(leadServiceLower);
        });
        if (matched) {
          serviceKnowledge = matched.content;
        }
      }
    } catch {
      // Intentionally keep empty if lookup fails to use generic company prompt
    }

    if (!serviceKnowledge) {
      serviceKnowledge = 'Rahnoxa provides custom full-stack web applications, modular ERPs, mobile apps, SaaS products, and API integrations with transparent milestone-based delivery (50% start / 50% handover) and a 30-Day Technical Bug Warranty.';
    }

    const systemPrompt = buildVoiceSystemPrompt({
      lead,
      serviceKnowledge,
      callObjective: 'Conduct discovery, qualify project scope, timeline, and estimate requirements.',
    });

    const callRecord = await db.createLeadCall({
      lead_id: lead.id,
      agent_id: 'rahbot_voice_v1',
      status: CALL_STATUSES.IN_PROGRESS,
      direction: 'OUTBOUND',
      mode,
      metadata: {
        target_name: lead.name,
        target_phone: lead.phone,
        target_service: lead.service,
        system_prompt: systemPrompt,
      },
    });

    // Run simulated conversation workflow if in simulated dev mode
    if (mode === 'SIMULATED') {
      this._runSimulationAsync(callRecord.id, lead);
    }

    return callRecord;
  }

  /**
   * Internal simulation engine for zero-cost offline development & testing
   */
  static async _runSimulationAsync(callId, lead) {
    const simTranscripts = [
      { speaker: 'AGENT', text: `Hi ${lead.name}! This is RahBot calling from Rahnoxa. I noticed your enquiry regarding ${lead.service || 'software development'}. Do you have two minutes to discuss your project scope?` },
      { speaker: 'LEAD', text: `Yes, sure. We are looking for an ERP solution with inventory, billing, and HR modules for our 2 branches.` },
      { speaker: 'AGENT', text: `That's great. At Rahnoxa, we engineer modular ERP systems with real-time branch sync, strict RBAC, and clean APIs. What is your target deployment timeline?` },
      { speaker: 'LEAD', text: `We are looking to roll this out within 2 to 3 months, and our estimated budget is around ₹1.5 to ₹2.5 Lakhs.` },
      { speaker: 'AGENT', text: `Understood! Our starter ERP modules begin at ₹59,999 with 50% start / 50% handover milestones and a 30-Day Bug Warranty. I have recorded your specifications, and our senior architect will follow up with a proposal within 24 to 48 hours.` },
      { speaker: 'LEAD', text: `Perfect, thank you!` },
    ];

    for (let i = 0; i < simTranscripts.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      await db.addCallTranscript(callId, simTranscripts[i].speaker, simTranscripts[i].text, i);
    }

    // Extract structured summary & update lead
    const summaryData = {
      summary: `Lead ${lead.name} requires a custom ERP with Inventory, Billing, and HRMS for 2 branches within 2–3 months. Budget estimated at ₹1.5L–₹2.5L.`,
      requirements: ['Inventory Management', 'Billing / POS', 'HRMS Module', 'Multi-Branch Sync (2 branches)'],
      extractedBudget: '₹1,50,000 – ₹2,50,000',
      extractedTimeline: '2–3 Months',
      leadScore: 88,
      leadTemperature: 'HOT',
      nextAction: 'Prepare Custom ERP Milestone Proposal',
    };

    await db.completeLeadCall(callId, {
      duration_seconds: 142,
      summary: summaryData.summary,
      outcome: 'QUALIFIED_SUCCESS',
      sentiment: 'POSITIVE',
      lead_score: summaryData.leadScore,
      next_action: summaryData.nextAction,
      metadata: summaryData,
    });

    // Update the parent lead record with verified extracted scope
    await db.updateLead(lead.id, {
      status: 'QUALIFIED',
      budget: summaryData.extractedBudget,
      timeline: summaryData.extractedTimeline,
      notes: `[AI Voice Call Summary - 88/100 HOT]:\n${summaryData.summary}`,
    });
  }
}
