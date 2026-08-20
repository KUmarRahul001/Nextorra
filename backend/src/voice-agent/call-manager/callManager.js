/**
 * Rahnoxa Real AI Voice Call Manager
 * Pure real PSTN/SIP execution pipeline. Strictly zero fake simulation in production.
 */

import { db } from '../../../database/supabase.js';
import { buildVoiceSystemPrompt } from '../prompts/voice.prompt.js';
import { TelephonyProvider } from '../telephony/telephonyProvider.js';
import { VoiceOrchestrator } from '../orchestrator/voiceOrchestrator.js';

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
   * Initiate a Real PSTN AI Phone Call
   */
  static async initiateCall({ leadId, adminId, providerId = 'auto' }) {
    const lead = await db.getLead(leadId);
    if (!lead) throw new Error(`Lead with ID ${leadId} not found`);

    if (!lead.phone || lead.phone.trim().length < 8) {
      throw new Error(`Lead ${lead.name} does not have a valid phone number to dial.`);
    }

    // Ensure only one active call exists per lead
    const activeCall = await db.getActiveCallForLead?.(leadId).catch(() => null);
    if (activeCall && ['DIALING', 'IN_PROGRESS', 'QUEUED'].includes(activeCall.status)) {
      throw new Error(`An active call (${activeCall.id}) is already in progress for this lead.`);
    }

    // Check PSTN configuration strictly before creating a call record
    const sipHost = process.env.SIP_TRUNK_HOST;
    const sipUser = process.env.SIP_TRUNK_USERNAME;
    const sipPass = process.env.SIP_TRUNK_PASSWORD;

    if (!sipHost || !sipUser || !sipPass) {
      const err = new Error('Real PSTN calling is not configured. Connect and configure a verified SIP trunk in the server environment (SIP_TRUNK_HOST, SIP_TRUNK_USERNAME, SIP_TRUNK_PASSWORD) to place real physical phone calls.');
      err.code = 'PSTN_NOT_CONFIGURED';
      err.statusCode = 503;
      throw err;
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

    // Select appropriate Voice Provider via Orchestrator
    const selectedProvider = VoiceOrchestrator.selectProvider(providerId);

    const callRecord = await db.createLeadCall({
      lead_id: lead.id,
      agent_id: 'rahbot_voice_v1',
      status: CALL_STATUSES.QUEUED,
      direction: 'OUTBOUND',
      mode: 'PSTN_LIVE',
      metadata: {
        target_name: lead.name,
        target_phone: lead.phone,
        target_service: lead.service,
        system_prompt: systemPrompt,
        provider: selectedProvider.type,
        provider_account: selectedProvider.name,
      },
    });

    // Initiate call via selected Voice Provider adapter
    try {
      const dialResult = await selectedProvider.instance.createCall({
        callId: callRecord.id,
        destinationPhone: lead.phone,
        systemPrompt,
        callerId: process.env.SIP_CALLER_ID,
      });

      return {
        ...callRecord,
        status: dialResult.status,
        provider: dialResult.provider,
        providerAccount: dialResult.providerAccount,
        message: dialResult.message,
      };
    } catch (err) {
      await db.completeLeadCall(callRecord.id, {
        status: CALL_STATUSES.FAILED,
        outcome: 'DIAL_FAILED',
        metadata: { error: err.message },
      }).catch(() => {});
      throw err;
    }
  }
}
