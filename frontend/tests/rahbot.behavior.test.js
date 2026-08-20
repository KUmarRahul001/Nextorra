/**
 * RahBot Comprehensive Behavioral Test Matrix (40+ test cases)
 * Tests intent classification, service resolution, form trigger correctness, contextual memory, and CTA generation.
 */

import { SERVICES_KNOWLEDGE_BASE } from '../src/components/chatbot/knowledge.js';
import { resolveService } from '../src/components/chatbot/serviceResolver.js';
import { detectIntent } from '../src/components/chatbot/intentDetector.js';
import { buildBotDecision } from '../src/components/chatbot/responseBuilder.js';
import { createInitialContext, updateConversationContext } from '../src/components/chatbot/conversationState.js';

const TEST_CASES = [
  // ── Category A: Service Information (Must NEVER auto-open form) ───────────────
  {
    input: 'Can you build a custom ERP system?',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about ERP.',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What ERP features do you provide?',
    expectedIntent: 'service_features',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about Full-Stack Web Apps',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-web-apps',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about SaaS development.',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-saas',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What mobile apps can you build?',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-mobile',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Can you build a cross-platform desktop application?',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-desktop',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about Modern Website Design',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-web-design',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about your lead generation services',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-lead-gen',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about social media marketing',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-social-media',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What is your missed call alert service?',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-missed-call',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about Voice Call & IVR Solutions',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-voice',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'Tell me about Brand & Graphic Design',
    expectedIntent: 'service_information',
    expectedServiceId: 'service-design',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },

  // ── Category B: Technology Stack Queries (Must NEVER auto-open form) ──────────
  {
    input: 'What technology do you use for ERP?',
    expectedIntent: 'technology_stack',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What mobile technologies do you use?',
    expectedIntent: 'technology_stack',
    expectedServiceId: 'service-mobile',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What tech stack do you use for SaaS?',
    expectedIntent: 'technology_stack',
    expectedServiceId: 'service-saas',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },
  {
    input: 'What database do you use for full stack apps?',
    expectedIntent: 'technology_stack',
    expectedServiceId: 'service-web-apps',
    expectedFormOpen: false,
    expectedCTAType: 'view_service',
  },

  // ── Category C: Pricing & Packages (Must NEVER auto-open form) ────────────────
  {
    input: 'How much does ERP cost?',
    expectedIntent: 'pricing',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'view_pricing',
  },
  {
    input: 'How much does a website cost?',
    expectedIntent: 'pricing',
    expectedServiceId: 'service-web-design',
    expectedFormOpen: false,
    expectedCTAType: 'view_pricing',
  },
  {
    input: 'What are your mobile app packages?',
    expectedIntent: 'pricing',
    expectedServiceId: 'service-mobile',
    expectedFormOpen: false,
    expectedCTAType: 'view_pricing',
  },
  {
    input: 'How much does a project cost?',
    expectedIntent: 'pricing',
    expectedServiceId: null,
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },

  // ── Category D: Lead Intent (Explicit triggers - Should open form) ────────────
  {
    input: 'I want to submit a project enquiry',
    expectedIntent: 'submit_enquiry',
    expectedFormOpen: true,
    expectedCTAType: 'submit_enquiry',
  },
  {
    input: 'Submit enquiry',
    expectedIntent: 'submit_enquiry',
    expectedFormOpen: true,
    expectedCTAType: 'submit_enquiry',
  },
  {
    input: 'Book a consultation.',
    expectedIntent: 'consultation',
    expectedFormOpen: false,
    expectedCTAType: 'consultation',
  },
  {
    input: 'I want to hire your team.',
    expectedIntent: 'submit_enquiry',
    expectedFormOpen: true,
    expectedCTAType: 'submit_enquiry',
  },
  {
    input: 'Fill enquiry form',
    expectedIntent: 'submit_enquiry',
    expectedFormOpen: true,
    expectedCTAType: 'submit_enquiry',
  },

  // ── Category E: Comparisons (Must NEVER auto-open form) ───────────────────────
  {
    input: 'ERP vs SaaS?',
    expectedIntent: 'comparison',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
  {
    input: 'React vs Flutter for my project?',
    expectedIntent: 'comparison',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
  {
    input: 'Website vs web application?',
    expectedIntent: 'comparison',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },

  // ── Category F: Internship (Must NEVER auto-open form) ────────────────────────
  {
    input: 'Tell me about engineering internships',
    expectedIntent: 'internship',
    expectedServiceId: 'program-internship',
    expectedFormOpen: false,
    expectedCTAType: 'view_internships',
  },
  {
    input: 'How can students apply for internships?',
    expectedIntent: 'internship',
    expectedServiceId: 'program-internship',
    expectedFormOpen: false,
    expectedCTAType: 'view_internships',
  },

  // ── Category G: Service Discovery & Navigation ────────────────────────────────
  {
    input: 'What services do you offer?',
    expectedIntent: 'service_discovery',
    expectedFormOpen: false,
    expectedCTAType: 'navigation',
  },
  {
    input: 'Open ERP services.',
    expectedIntent: 'navigation',
    expectedServiceId: 'service-erp',
    expectedFormOpen: false,
    expectedCTAType: 'navigation',
  },

  // ── Category H: Conversational Politeness ─────────────────────────────────────
  {
    input: 'Hello',
    expectedIntent: 'greeting',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
  {
    input: 'Thank you for your help',
    expectedIntent: 'thanks',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
  {
    input: 'Goodbye',
    expectedIntent: 'goodbye',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
  {
    input: 'Help',
    expectedIntent: 'help',
    expectedFormOpen: false,
    expectedCTAType: 'none',
  },
];

console.log(`\n🧪 Running RahBot Behavioral Test Suite (${TEST_CASES.length} Test Cases)...\n`);

let passedCount = 0;
let failedCount = 0;

TEST_CASES.forEach((tc, idx) => {
  const context = createInitialContext();
  const resolved = resolveService(tc.input, context);
  const decision = buildBotDecision(tc.input, resolved, context);

  const intentPass = decision.intent === tc.expectedIntent;
  const formPass = decision.shouldOpenForm === tc.expectedFormOpen;
  const ctaPass = decision.ctaType === tc.expectedCTAType;
  const servicePass = tc.expectedServiceId === undefined || resolved.service?.id === tc.expectedServiceId;

  const isPass = intentPass && formPass && ctaPass && servicePass;

  if (isPass) {
    passedCount++;
    console.log(`✅ [TEST ${idx + 1}] "${tc.input}" → ${decision.intent} (Service: ${resolved.service?.name || 'None'}) | FormOpen: ${decision.shouldOpenForm} | CTA: ${decision.ctaType}`);
  } else {
    failedCount++;
    console.error(`❌ [TEST ${idx + 1} FAILED] "${tc.input}"`);
    console.error(`   Intent: expected=${tc.expectedIntent}, got=${decision.intent} [${intentPass ? 'OK' : 'MISMATCH'}]`);
    console.error(`   Service: expected=${tc.expectedServiceId}, got=${resolved.service?.id} [${servicePass ? 'OK' : 'MISMATCH'}]`);
    console.error(`   FormOpen: expected=${tc.expectedFormOpen}, got=${decision.shouldOpenForm} [${formPass ? 'OK' : 'MISMATCH'}]`);
    console.error(`   CTA: expected=${tc.expectedCTAType}, got=${decision.ctaType} [${ctaPass ? 'OK' : 'MISMATCH'}]`);
  }
});

// ── Conversational Context Switching Tests ─────────────────────────────────────
console.log('\n🧠 Testing Conversational Context & Reset Switching...\n');

let ctx = createInitialContext();

// Step 1: User asks about ERP
let res1 = resolveService('Tell me about ERP', ctx);
let dec1 = buildBotDecision('Tell me about ERP', res1, ctx);
ctx = updateConversationContext(ctx, 'Tell me about ERP', dec1.intent, res1.service?.id, res1.service?.name);
const step1Pass = res1.service?.id === 'service-erp';
console.log(`Context Step 1 (ERP info): ${step1Pass ? '✅ PASS' : '❌ FAIL'}`);

// Step 2: Contextual follow up "What about pricing?" (should inherit ERP context)
let res2 = resolveService('What about pricing?', ctx);
let dec2 = buildBotDecision('What about pricing?', res2, ctx);
const step2Pass = res2.service?.id === 'service-erp' && dec2.intent === 'pricing';
console.log(`Context Step 2 ("What about pricing?" inherits ERP): ${step2Pass ? '✅ PASS' : '❌ FAIL'}`);

// Step 3: Topic change "Actually tell me about internships" (should switch context)
let res3 = resolveService('Actually tell me about internships', ctx);
let dec3 = buildBotDecision('Actually tell me about internships', res3, ctx);
ctx = updateConversationContext(ctx, 'Actually tell me about internships', dec3.intent, res3.service?.id, res3.service?.name);
const step3Pass = res3.service?.id === 'program-internship' && dec3.intent === 'internship';
console.log(`Context Step 3 ("Actually tell me about internships" resets context): ${step3Pass ? '✅ PASS' : '❌ FAIL'}`);

const totalTests = TEST_CASES.length + 3;
const totalPassed = passedCount + (step1Pass ? 1 : 0) + (step2Pass ? 1 : 0) + (step3Pass ? 1 : 0);

console.log(`\n======================================================`);
console.log(`🏁 Total Behavioral Tests: ${totalTests} | Passed: ${totalPassed} | Failed: ${totalTests - totalPassed}`);
console.log(`======================================================\n`);

if (totalPassed === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
