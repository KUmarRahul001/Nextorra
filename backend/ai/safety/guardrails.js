/**
 * Rahnoxa AI Safety & Defensive Filter
 * Protects against prompt injection, system prompt extraction, credential probing, and role escalation.
 */

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|your|above)\s+instructions/i,
  /reveal\s+(your\s+)?system\s+prompt/i,
  /show\s+(your\s+)?system\s+prompt/i,
  /what\s+is\s+(your\s+)?system\s+prompt/i,
  /admin\s+password/i,
  /database\s+credentials/i,
  /jwt_secret|api_key|service_role/i,
  /pretend\s+you\s+are\s+(the\s+)?admin(istrator)?/i,
  /bypass\s+(rahnoxa\s+)?safety/i,
  /drop\s+table|union\s+select/i,
  /show\s+(me\s+)?private\s+leads/i,
  /show\s+(me\s+)?unpublished/i,
];

export function validateInputSafety(userInput) {
  if (typeof userInput !== 'string') {
    return { safe: false, reason: 'Invalid input format' };
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(userInput)) {
      return {
        safe: false,
        reason: 'PROMPT_INJECTION_DETECTED',
        sanitizedReply:
          "I am RahBot, Rahnoxa's AI Business Assistant. I operate strictly within public technical scoping and business inquiry parameters for Rahnoxa. I do not disclose internal configurations, credentials, or private data. How may I assist you with your software development requirements?",
      };
    }
  }

  return { safe: true };
}

export function sanitizeAIOutput(aiOutput) {
  if (typeof aiOutput !== 'string') return '';
  
  // Guard against accidental leakage of internal keys or sensitive tokens
  return aiOutput
    .replace(/(eyJh[a-zA-Z0-9_-]+\.eyJh[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/g, '[REDACTED_TOKEN]')
    .replace(/(sk-[a-zA-Z0-9]{20,})/g, '[REDACTED_KEY]')
    .replace(/(postgres:\/\/[^\s]+)/g, '[REDACTED_DB_URL]');
}
