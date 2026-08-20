import { resolveService } from '../src/components/chatbot/serviceResolver';
import { detectIntent } from '../src/components/chatbot/intentDetector';
import { buildBotDecision } from '../src/components/chatbot/responseBuilder';
import { createInitialContext, updateConversationContext } from '../src/components/chatbot/conversationState';

interface TestCase {
  name: string;
  input: string;
  expectedIntent: string;
  expectedServiceId?: string;
  shouldOpenForm?: boolean;
  expectedKeywordInReply?: string;
  contextModifier?: (ctx: any) => any;
}

const testCases: TestCase[] = [
  {
    name: '1. Basic Greeting (Hello)',
    input: 'Hello',
    expectedIntent: 'greeting',
    shouldOpenForm: false,
    expectedKeywordInReply: 'RahBot',
  },
  {
    name: '1a. Conversational Greeting (hiii)',
    input: 'hiii',
    expectedIntent: 'greeting',
    shouldOpenForm: false,
    expectedKeywordInReply: 'RahBot',
  },
  {
    name: '1b. Conversational Greeting (heyyy)',
    input: 'heyyy',
    expectedIntent: 'greeting',
    shouldOpenForm: false,
    expectedKeywordInReply: 'RahBot',
  },
  {
    name: '1c. Conversational Greeting (hellooo)',
    input: 'hellooo',
    expectedIntent: 'greeting',
    shouldOpenForm: false,
    expectedKeywordInReply: 'RahBot',
  },
  {
    name: '2. Gratitude / Thanks',
    input: 'Thank you for your help',
    expectedIntent: 'thanks',
    shouldOpenForm: false,
    expectedKeywordInReply: 'welcome',
  },
  {
    name: '3. Goodbye',
    input: 'Goodbye, have a nice day',
    expectedIntent: 'goodbye',
    shouldOpenForm: false,
    expectedKeywordInReply: 'Rahnoxa',
  },
  {
    name: '4. Service Discovery (Broad List)',
    input: 'What services do you provide?',
    expectedIntent: 'service_discovery',
    shouldOpenForm: false,
    expectedKeywordInReply: 'Software Engineering',
  },
  {
    name: '5. Custom ERP Query',
    input: 'Can you build a custom ERP system?',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-erp',
    shouldOpenForm: false,
    expectedKeywordInReply: 'ERP & Enterprise Applications',
  },
  {
    name: '6. Full-Stack Web App Query',
    input: 'Tell me about Full-Stack Web Apps',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-web-apps',
    shouldOpenForm: false,
    expectedKeywordInReply: 'Full Stack Web Apps',
  },
  {
    name: '7. Mobile App Development',
    input: 'What mobile app frameworks do you use?',
    expectedIntent: 'technology_stack',
    expectedServiceId: 'service-mobile',
    shouldOpenForm: false,
    expectedKeywordInReply: 'React Native',
  },
  {
    name: '8. SaaS Product Query',
    input: 'Tell me about SaaS Products',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-saas',
    shouldOpenForm: false,
    expectedKeywordInReply: 'SaaS Products',
  },
  {
    name: '9. Custom API Integration',
    input: 'Tell me about custom software api integration',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-custom-api',
    shouldOpenForm: false,
    expectedKeywordInReply: 'Custom Software & API Integration',
  },
  {
    name: '10. Direct ERP Pricing Query',
    input: 'How much does an ERP cost?',
    expectedIntent: 'pricing',
    expectedServiceId: 'service-erp',
    shouldOpenForm: false,
    expectedKeywordInReply: '₹59,999',
  },
  {
    name: '11. Contextual Pricing (ERP in Context)',
    input: 'What about pricing?',
    expectedIntent: 'pricing',
    expectedServiceId: 'service-erp',
    shouldOpenForm: false,
    expectedKeywordInReply: '₹59,999',
    contextModifier: (ctx) => updateConversationContext(ctx, 'Tell me about ERP', 'service_information', 'service-erp', 'ERP & Enterprise Applications'),
  },
  {
    name: '12. Topic Switch from ERP to Internship',
    input: 'Actually, tell me about internships',
    expectedIntent: 'internship',
    shouldOpenForm: false,
    expectedKeywordInReply: 'internship',
    contextModifier: (ctx) => updateConversationContext(ctx, 'Tell me about ERP', 'service_information', 'service-erp', 'ERP & Enterprise Applications'),
  },
  {
    name: '13. Explicit Lead Submission Intent',
    input: 'I want to submit my project enquiry',
    expectedIntent: 'submit_enquiry',
    shouldOpenForm: true,
    expectedKeywordInReply: 'enquiry',
  },
  {
    name: '14. Consultation Booking Request',
    input: 'Book a consultation call with an engineer',
    expectedIntent: 'consultation',
    shouldOpenForm: true,
    expectedKeywordInReply: 'consultation',
  },
  {
    name: '15. Ambiguous Pricing without Context',
    input: 'How much does it cost?',
    expectedIntent: 'ambiguous',
    shouldOpenForm: false,
    expectedKeywordInReply: 'Which service or package',
  },
  {
    name: '16. Direct Navigation Request',
    input: 'Open website design',
    expectedIntent: 'navigation',
    expectedServiceId: 'service-web-design',
    shouldOpenForm: false,
  },
];

console.log('====================================================');
console.log('🤖 RUNNING RAHBOT CONVERSATION & INTENT TEST SUITE');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  let context = createInitialContext();
  if (tc.contextModifier) {
    context = tc.contextModifier(context);
  }

  const resolved = resolveService(tc.input, context);
  const { intent } = detectIntent(tc.input, resolved, context);
  const decision = buildBotDecision(tc.input, resolved, context);

  const errors: string[] = [];

  if (intent !== tc.expectedIntent) {
    errors.push(`Intent mismatch: got "${intent}", expected "${tc.expectedIntent}"`);
  }

  if (tc.expectedServiceId && resolved.service?.id !== tc.expectedServiceId) {
    errors.push(`Service mismatch: got "${resolved.service?.id}", expected "${tc.expectedServiceId}"`);
  }

  if (tc.shouldOpenForm !== undefined && decision.shouldOpenForm !== tc.shouldOpenForm) {
    errors.push(`Form visibility mismatch: got shouldOpenForm=${decision.shouldOpenForm}, expected ${tc.shouldOpenForm}`);
  }

  if (tc.expectedKeywordInReply && !decision.reply.toLowerCase().includes(tc.expectedKeywordInReply.toLowerCase())) {
    errors.push(`Reply missing keyword "${tc.expectedKeywordInReply}"`);
  }

  if (errors.length === 0) {
    console.log(`✅ PASS: ${tc.name}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${tc.name}`);
    errors.forEach((e) => console.error(`   - ${e}`));
    failed++;
  }
}

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passed} Passed | ${failed} Failed`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL RAHBOT TESTS PASSED SUCCESSFULLY!\n');
}
