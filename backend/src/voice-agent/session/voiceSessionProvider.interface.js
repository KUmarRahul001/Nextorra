/**
 * Universal Real-Time Voice Session Provider Interface
 * Agnostic contract for zero-cost browser/WebRTC voice sessions.
 */

export class VoiceSessionProvider {
  /**
   * @param {Object} params
   * @param {string} params.leadId
   * @param {string} [params.language]
   * @param {string} [params.adminId]
   */
  async createSession(params) {
    throw new Error('createSession() must be implemented by subclass');
  }

  async getSessionStatus(sessionId) {
    throw new Error('getSessionStatus() must be implemented by subclass');
  }

  async endSession(sessionId) {
    throw new Error('endSession() must be implemented by subclass');
  }

  async processUserUtterance(sessionId, utterance) {
    throw new Error('processUserUtterance() must be implemented by subclass');
  }

  async getTranscript(sessionId) {
    throw new Error('getTranscript() must be implemented by subclass');
  }

  async getSummary(sessionId) {
    throw new Error('getSummary() must be implemented by subclass');
  }
}
