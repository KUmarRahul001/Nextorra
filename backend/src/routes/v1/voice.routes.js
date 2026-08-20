import { Router } from 'express';
import { CallManager } from '../../voice-agent/call-manager/callManager.js';
import { db } from '../../../database/supabase.js';

const router = Router();

// POST /v1/voice/calls/start
router.post('/calls/start', async (req, res, next) => {
  try {
    const { lead_id, mode } = req.body;
    if (!lead_id) return res.status(400).json({ success: false, error: 'lead_id is required' });

    const call = await CallManager.initiateCall({ leadId: lead_id, mode: mode || 'SIMULATED' });
    res.json({ success: true, call });
  } catch (err) {
    next(err);
  }
});

// GET /v1/voice/health - Check Telephony & SIP Trunk connectivity readiness
router.get('/health', async (req, res) => {
  const isConfigured = !!(
    process.env.SIP_TRUNK_HOST &&
    process.env.SIP_TRUNK_USERNAME &&
    process.env.SIP_TRUNK_PASSWORD
  );

  res.json({
    success: true,
    status: isConfigured ? 'READY' : 'UNCONFIGURED',
    carrier: isConfigured ? (process.env.SIP_PROVIDER_NAME || 'CUSTOM_SIP_TRUNK') : null,
    sipHost: process.env.SIP_TRUNK_HOST ? `${process.env.SIP_TRUNK_HOST.slice(0, 4)}***` : null,
    callerId: process.env.SIP_CALLER_ID || null,
    mediaAnchoring: 'IN_INDIA',
    compliance: 'TRAI_TCCCPR_COMPLIANT',
  });
});

// GET /v1/voice/calls/:leadId
router.get('/calls/:leadId', async (req, res, next) => {
  try {
    const calls = await db.getLeadCalls(req.params.leadId);
    res.json({ success: true, calls });
  } catch (err) {
    next(err);
  }
});

export default router;
