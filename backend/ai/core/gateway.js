import { config } from '../../config/env.js';
import { RahnoxaLocalProvider } from '../providers/localProvider.js';
import { validateInputSafety, sanitizeAIOutput } from '../safety/guardrails.js';
import { retrieveRelevantKnowledge } from '../retrieval/rag.js';
import { RAHBOT_SYSTEM_V1 } from '../prompts/rahbot.system.js';
import { BLOG_SYSTEM_V1 } from '../prompts/blog.system.js';

class RahnoxaAIGateway {
  constructor() {
    this.providers = new Map();
    this.providers.set('rahnoxa_local', new RahnoxaLocalProvider());
    this.defaultProvider = 'rahnoxa_local';
  }

  getProvider(name) {
    const providerName = name || config.ai.provider || this.defaultProvider;
    return this.providers.get(providerName) || this.providers.get(this.defaultProvider);
  }

  async processChat({ message, conversationId, category }) {
    // 1. Validate Input Safety (Prompt-injection & secret filtering)
    const safetyCheck = validateInputSafety(message);
    if (!safetyCheck.safe) {
      return {
        reply: safetyCheck.sanitizedReply,
        intent: 'security_blocked',
        provider: 'safety_layer',
        safety_status: 'BLOCKED',
      };
    }

    // 2. Retrieve Knowledge via RAG
    const knowledgeItems = await retrieveRelevantKnowledge(message, category);

    // 3. Route to active AI Provider
    const provider = this.getProvider();
    const result = await provider.chat({
      message,
      contextKnowledge: knowledgeItems,
      systemPrompt: RAHBOT_SYSTEM_V1,
      model: config.ai.chatModel,
    });

    // 4. Sanitize Output before delivering
    const sanitizedReply = sanitizeAIOutput(result.reply);

    return {
      reply: sanitizedReply,
      intent: result.intent || 'general_help',
      provider: provider.name,
      safety_status: 'CLEAN',
    };
  }

  async generateBlogArticle({ topic, keyword, category }) {
    const provider = this.getProvider();
    return provider.generateArticle({
      topic,
      keyword,
      category,
      systemPrompt: BLOG_SYSTEM_V1,
      model: config.ai.blogModel,
    });
  }
}

export const aiGateway = new RahnoxaAIGateway();
