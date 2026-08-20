/**
 * Controlled Voice Agent Tools (Strictly Validated & Allowlisted)
 */

export const VoiceTools = {
  updateLeadDraft: ({ leadId, proposedFields }) => {
    // Validated field allowlist
    const ALLOWED_FIELDS = ['budget', 'timeline', 'requirements', 'modules', 'team_size', 'urgency', 'notes'];
    const safeUpdates = {};

    for (const [key, val] of Object.entries(proposedFields || {})) {
      if (ALLOWED_FIELDS.includes(key) && typeof val === 'string' && val.length < 500) {
        safeUpdates[key] = val;
      }
    }

    return {
      success: true,
      leadId,
      proposedUpdates: safeUpdates,
      requiresAdminApproval: false,
    };
  },

  requestHumanHandoff: ({ reason, urgency }) => {
    return {
      success: true,
      action: 'human_handoff',
      reason: reason || 'Prospect requested direct engineering discussion',
      urgency: urgency || 'NORMAL',
    };
  },
};
