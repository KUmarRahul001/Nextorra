/**
 * Open-Source Self-Hosted Voice Provider Adapter
 * Connects LiveKit Agents, Asterisk/SIP, Faster-Whisper, Ollama, and Kokoro.
 */

import { VoiceProvider } from './voiceProvider.interface.js';
import { TelephonyProvider } from '../telephony/telephonyProvider.js';

export class OpenSourceVoiceProvider extends VoiceProvider {
  constructor(config = {}) {
    super();
    this.accountName = config.accountName || 'Self-Hosted LiveKit Stack';
  }

  async createCall({ callId, destinationPhone, systemPrompt, callerId }) {
    // Check if SIP gateway credentials exist
    const sipHost = process.env.SIP_TRUNK_HOST;
    const sipUser = process.env.SIP_TRUNK_USERNAME;
    const sipPass = process.env.SIP_TRUNK_PASSWORD;

    if (!sipHost || !sipUser || !sipPass) {
      throw new Error(
        'PSTN_NOT_CONFIGURED: Real PSTN calling is not configured. Missing SIP_TRUNK_HOST or credentials in server environment.'
      );
    }

    const result = await TelephonyProvider.dial({
      callId,
      destinationPhone,
      mode: 'PSTN_LIVE',
      callerId,
    });

    return {
      provider: 'OPEN_SOURCE',
      providerAccount: this.accountName,
      providerCallId: `lk-${callId}`,
      status: result.status,
      message: result.message,
    };
  }
}
