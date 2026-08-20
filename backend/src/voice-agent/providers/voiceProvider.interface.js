/**
 * Universal Voice Provider Interface
 * Agnostic contract implemented by Open-Source and external telephony/AI adapters.
 */

export class VoiceProvider {
  /**
   * @param {Object} params
   * @param {string} params.callId
   * @param {string} params.destinationPhone
   * @param {string} params.systemPrompt
   * @param {string} [params.callerId]
   */
  async createCall(params) {
    throw new Error('createCall() must be implemented by VoiceProvider subclass');
  }

  async getCallStatus(providerCallId) {
    throw new Error('getCallStatus() must be implemented by VoiceProvider subclass');
  }

  async hangupCall(providerCallId) {
    throw new Error('hangupCall() must be implemented by VoiceProvider subclass');
  }

  async getTranscript(providerCallId) {
    throw new Error('getTranscript() must be implemented by VoiceProvider subclass');
  }

  async getRecording(providerCallId) {
    throw new Error('getRecording() must be implemented by VoiceProvider subclass');
  }
}
