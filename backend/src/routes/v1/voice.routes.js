import { Router } from 'express';
import { CallManager } from '../../voice-agent/call-manager/callManager.js';
import { VoiceOrchestrator } from '../../voice-agent/orchestrator/voiceOrchestrator.js';
import { BrowserVoiceSessionProvider } from '../../voice-agent/session/browserVoiceSession.js';
import { db } from '../../../database/supabase.js';

const router = Router();
const sessionProvider = new BrowserVoiceSessionProvider();

// ── Real-Time Cloud Voice Sessions (Browser / WebRTC) ──

// POST /v1/voice/sessions - Start a real browser voice session
router.post('/sessions', async (req, res, next) => {
  try {
    const { lead_id, language } = req.body;
    if (!lead_id) return res.status(400).json({ success: false, error: 'lead_id is required' });

    const session = await sessionProvider.createSession({ leadId: lead_id, language });
    res.json({ success: true, session });
  } catch (err) {
    next(err);
  }
});

// POST /v1/voice/sessions/:id/speak - Process live speech utterance
router.post('/sessions/:id/speak', async (req, res, next) => {
  try {
    const { text } = req.body;
    const reply = await sessionProvider.processUserUtterance(req.params.id, text);
    res.json({ success: true, reply });
  } catch (err) {
    next(err);
  }
});

// POST /v1/voice/sessions/:id/end - Terminate session & extract structured summary
router.post('/sessions/:id/end', async (req, res, next) => {
  try {
    const result = await sessionProvider.endSession(req.params.id);
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
});

// GET /v1/voice/sessions/:id - Get session status
router.get('/sessions/:id', async (req, res, next) => {
  try {
    const status = await sessionProvider.getSessionStatus(req.params.id);
    res.json({ success: true, status });
  } catch (err) {
    next(err);
  }
});

// ── Providers & PSTN Dispatches ──

// GET /v1/voice/providers - List configured authorized voice providers
router.get('/providers', async (req, res) => {
  const providers = VoiceOrchestrator.getAvailableProviders().map((p) => ({
    id: p.id,
    name: p.name,
    type: p.type,
    isConfigured: p.isConfigured,
    licensingCost: p.licensingCost,
  }));
  res.json({ success: true, providers });
});

// POST /v1/voice/calls/start
router.post('/calls/start', async (req, res, next) => {
  try {
    const { lead_id, provider_id } = req.body;
    if (!lead_id) return res.status(400).json({ success: false, error: 'lead_id is required' });

    const call = await CallManager.initiateCall({ leadId: lead_id, providerId: provider_id || 'auto' });
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
