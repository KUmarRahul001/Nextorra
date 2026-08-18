import { getDB } from '../_db.js';

/**
 * Knowledge retrieval helper
 */
async function getRelevantContext(db, query) {
  const items = await db.getKnowledgeItems();
  const lowerQuery = query.toLowerCase();
  
  const matched = items.filter(item => {
    const tags = item.tags.toLowerCase();
    const content = item.content.toLowerCase();
    const title = item.title.toLowerCase();
    return (
      lowerQuery.includes(item.category) ||
      tags.split(',').some(t => lowerQuery.includes(t.trim())) ||
      title.split(' ').some(w => w.length > 3 && lowerQuery.includes(w)) ||
      content.split(' ').some(w => w.length > 4 && lowerQuery.includes(w))
    );
  });

  const selected = matched.length > 0 ? matched : items.slice(0, 4);
  return selected.map(i => `[${i.title}]: ${i.content}`).join('\n\n');
}

/**
 * Intelligent Rule-based & Knowledge Retrieval AI Engine (RahBot)
 */
function generateAssistantResponse(userMessage, contextKnowledge, conversationHistory, leadState) {
  const lower = userMessage.toLowerCase().trim();

  // Safety / Prompt-injection defense
  if (
    lower.includes('ignore previous instructions') ||
    lower.includes('system prompt') ||
    lower.includes('admin password') ||
    lower.includes('database credentials') ||
    lower.includes('reveal secret')
  ) {
    return {
      reply: "I am RahBot, Rahnoxa's AI Business Assistant. I operate strictly within public business and technical scoping parameters for Rahnoxa. How can I help with your software engineering requirements?",
      intent: 'security_blocked',
    };
  }

  // Human handoff detection
  if (
    lower.includes('speak to human') ||
    lower.includes('talk to a person') ||
    lower.includes('human agent') ||
    lower.includes('call me directly') ||
    lower.includes('legal dispute') ||
    lower.includes('contract agreement')
  ) {
    return {
      reply: "I can immediately connect you with our engineering leadership team. You can reach us directly at **contact.rahnoxa@protonmail.com** or call **+91 8434237052** / **+91 8434237049**. If you share your name and email, I will also create a prioritized enquiry ticket for you right now.",
      intent: 'human_handoff',
    };
  }

  // Internship questions
  if (lower.includes('internship') || lower.includes('intern') || lower.includes('training') || lower.includes('apply for job')) {
    return {
      reply: "Rahnoxa offers engineering internship programs in **Web Development, Mobile App Dev (React Native/Flutter), AI/Machine Learning, Python, and Data Science**. You can review available tracks and apply directly on our [Internships Page](/internship). Would you like to know about any specific track?",
      intent: 'internship_query',
    };
  }

  // Pricing questions
  if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('how much')) {
    return {
      reply: "Because we engineer custom software tailored to specific operational requirements, pricing depends on your architecture scope, integrations, and deployment model. We offer **Fixed Milestone Contracts**, **Dedicated Sprints**, and **Ongoing Maintenance Agreements**.\n\nTo get a clear estimate, would you like to discuss your project scope or [Schedule a Technical Discovery Call](/get-started)?",
      intent: 'pricing_query',
    };
  }

  // ERP Questions
  if (lower.includes('erp') || lower.includes('enterprise software') || lower.includes('inventory') || lower.includes('hrms')) {
    return {
      reply: "Rahnoxa specializes in **Custom Modular ERP Systems**. We build domain-isolated modules for inventory management, multi-role RBAC, billing, operations tracking, and custom API integrations. Unlike rigid off-the-shelf software, our ERPs adapt to your exact business workflows.\n\nAre you looking to replace an existing system or build custom modules from scratch?",
      intent: 'erp_query',
    };
  }

  // Mobile App Questions
  if (lower.includes('mobile app') || lower.includes('android') || lower.includes('ios') || lower.includes('flutter') || lower.includes('react native')) {
    return {
      reply: "We build native and cross-platform mobile applications using **React Native and Flutter**, backed by secure cloud APIs and real-time synchronization. We cover UI/UX design, edge backend integration, and App Store / Google Play publishing.\n\nWhat kind of mobile application are you planning?",
      intent: 'mobile_query',
    };
  }

  // Web & SaaS Questions
  if (lower.includes('saas') || lower.includes('web app') || lower.includes('website') || lower.includes('full stack')) {
    return {
      reply: "We engineer high-performance **Full-Stack Web Applications and Multi-Tenant SaaS Platforms** using React, TypeScript, Node.js, and modern cloud databases. Our builds prioritize sub-second load times, clean API contracts, and robust multi-tenant data isolation.\n\nWould you like to explore our [Full-Stack Services](/services/full-stack-web-apps) or share your project requirements?",
      intent: 'web_query',
    };
  }

  // Default contextual response
  return {
    reply: `Hello! I am **RahBot**, the AI assistant for **Rahnoxa**.\n\nWe engineer custom **Web Platforms, Mobile Apps, Enterprise ERPs, SaaS Products, and API Integrations**. We also offer engineering internships.\n\nHow can I assist you today? You can ask about our technical capabilities, explore services, or share your project requirements for an enquiry!`,
    intent: 'general_help',
  };
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { message, conversation_id, session_id } = data;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message content is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = await getDB(context);
    let convId = conversation_id;

    if (!convId) {
      const conv = await db.createConversation(session_id || `sess-${Date.now()}`);
      convId = conv.id;
    }

    // Save user message
    await db.addMessage(convId, 'user', message.trim());

    // Retrieve knowledge context
    const knowledgeContext = await getRelevantContext(db, message);
    const history = await db.getMessages(convId);

    // Generate assistant response
    const { reply, intent } = generateAssistantResponse(
      message,
      knowledgeContext,
      history,
      data.leadState || {}
    );

    // Save assistant message
    const assistantMsg = await db.addMessage(convId, 'assistant', reply, { intent });

    return new Response(
      JSON.stringify({
        success: true,
        conversation_id: convId,
        message: assistantMsg,
        intent,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Chat service error', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
