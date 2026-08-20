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
