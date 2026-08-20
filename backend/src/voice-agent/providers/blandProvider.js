/**
 * Bland AI Voice Provider Adapter
 * Encapsulates Bland API calls for legitimately authorized accounts.
 * ZERO auto-creation, ZERO evasion, ZERO account rotation for billing bypass.
 */

import { VoiceProvider } from './voiceProvider.interface.js';

export class BlandVoiceProvider extends VoiceProvider {
  constructor(accountConfig) {
    super();
    this.accountName = accountConfig.accountName || 'Primary Bland Account';
    this.apiKey = accountConfig.apiKey;
    this.baseUrl = 'https://api.bland.ai/v1';
    this.isAuthorized = accountConfig.isAuthorized ?? true;
  }

  async createCall({ callId, destinationPhone, systemPrompt, callerId }) {
    if (!this.apiKey) {
      throw new Error(`BLAND_UNCONFIGURED: API key missing for Bland account "${this.accountName}".`);
    }

    if (!this.isAuthorized) {
      throw new Error(`BLAND_UNAUTHORIZED: Account "${this.accountName}" is not authorized for outbound dialing.`);
    }

    const payload = {
      phone_number: destinationPhone,
      task: systemPrompt,
      voice: 'maya',
      reduce_latency: true,
      record: true,
      answered_by_enabled: true,
      metadata: {
        rahnoxa_call_id: callId,
        provider_account: this.accountName,
      },
    };

    if (callerId) payload.from = callerId;

    const response = await fetch(`${this.baseUrl}/calls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || data.status === 'error') {
      throw new Error(data.message || `Bland API error: ${response.statusText}`);
    }

    return {
      provider: 'BLAND',
      providerAccount: this.accountName,
      providerCallId: data.call_id,
      status: 'DIALING',
      message: `Call dispatched through Bland AI (${this.accountName}).`,
    };
  }

  async getCallDetails(providerCallId) {
    const response = await fetch(`${this.baseUrl}/calls/${providerCallId}`, {
      headers: { Authorization: this.apiKey },
    });
    return response.json();
  }
}
