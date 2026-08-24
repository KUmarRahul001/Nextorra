/**
 * RAHNOXA Personalized Evidence-Based Outreach & Follow-Up Generator
 * Strict Rules:
 * - NO generic bulk spam.
 * - Always state: WHY THEM? WHAT IS GOOD? WHAT CAN IMPROVE?
 * - Protects ₹5,000 minimum complete website price.
 * - Explicitly mentions: "Price is negotiable depending on your requirements and final scope."
 */

export function generatePersonalizedOutreach({
  businessName,
  category,
  city = 'Jamshedpur',
  phone,
  email,
  websiteUrl,
  websiteStatus = 'NO_WEBSITE_CONFIRMED',
  goodPoints = [],
  badPoints = [],
  recommendedPlan = 'Starter Business Website (Plan B)',
  recommendedPrice = 5000,
  recommendedService = 'Complete Responsive Business Website',
  format = 'WHATSAPP_SHORT' // 'WHATSAPP_SHORT', 'WHATSAPP_DETAILED', 'EMAIL'
}) {
  const normPrice = Math.max(Number(recommendedPrice) || 5000, 5000);
  const defaultGood = goodPoints.length > 0 ? goodPoints : ['Strong local reputation and active client demand in ' + city, 'Clear service offerings for the local market'];
  const defaultBad = badPoints.length > 0 ? badPoints : ['Missing direct 1-click WhatsApp inquiry flow', 'Limited mobile visibility and digital discoverability'];

  // 1. Scenario: NO WEBSITE FOUND
  if (!websiteUrl || websiteStatus === 'NO_WEBSITE_CONFIRMED' || websiteStatus === 'WEBSITE_UNKNOWN') {
    if (format === 'WHATSAPP_SHORT') {
      return `Hello ${businessName},

We came across your business while researching ${category || 'top local'} businesses in ${city}.

Your business has a strong presence, but we could not find an official dedicated website for clients to explore your full services, photos, and connect via WhatsApp.

A modern, fast website helps you:
• Explain your services clearly
• Receive instant 1-click WhatsApp enquiries
• Build customer trust & show location on Google Maps

RAHNOXA can create a mobile-first business website for you starting from ₹${normPrice} (Starter Business Plan).

Price is negotiable depending on your exact requirements and scope. We can show you a free live sample/demo before you decide.

Would you like to see a quick sample?

Rahul Kumar | RAHNOXA
Software & Digital Solutions
🌐 https://rahnoxa.antideploy.com`;
    }

    if (format === 'WHATSAPP_DETAILED') {
      return `Hello ${businessName},

We recently researched ${category || 'commercial'} services across ${city} and noticed your active business profile.

While analyzing your online presence:
• What is Good: Strong local business reputation and customer interest in ${city}.
• Opportunity: You currently do not have an official, dedicated mobile website where prospective clients can browse your complete offerings and verify your credentials.

How RAHNOXA can help:
1. Complete mobile-responsive website
2. 1-Click WhatsApp consultation and call buttons
3. Interactive Google Maps & instant lead enquiry form
4. Essential Local SEO so nearby customers find you first

Recommended Plan: ${recommendedPlan}
Estimated Investment: Starting from ₹${normPrice}
(Price is negotiable based on your specific requirements and scope.)

If you are interested, we can prepare a tailored preview/sample for ${businessName} with zero obligation.

Best regards,
Rahul Kumar
Founder & Engineering Lead, RAHNOXA
🌐 https://rahnoxa.antideploy.com`;
    }

    if (format === 'EMAIL') {
      return {
        subject: `Website opportunity for ${businessName} — ${city}`,
        body: `Hello ${businessName} Team,

We came across your business while researching high-potential ${category || 'local'} enterprises in ${city}.

Your business already has strong recognition in the local market. However, we noticed that potential customers searching for your services online do not find an official website with your complete service catalog, credentials, and instant contact options.

A dedicated business website allows you to:
• Present your full services, photos, and customer reviews professionally.
• Capture high-intent leads 24/7 with direct WhatsApp and phone action buttons.
• Solidify your presence on Google Search across ${city} and Jharkhand.

RAHNOXA specializes in engineering fast, responsive business websites:
• Recommended Package: ${recommendedPlan}
• Starting Estimate: ₹${normPrice} (Negotiable depending on requirements and final scope)

We would be happy to prepare a free mockup/sample showing how ${businessName}'s digital presence could look.

Would you be open to reviewing a quick sample this week?

Warm regards,

Rahul Kumar
RAHNOXA — Software Development & Digital Engineering
Phone: +91 8434237052
Website: https://rahnoxa.antideploy.com`
      };
    }
  }

  // 2. Scenario: WEBSITE EXISTS (AUDITED)
  if (format === 'WHATSAPP_SHORT') {
    return `Hello ${businessName},

We reviewed your official website (${websiteUrl}) while researching ${category || 'businesses'} in ${city}.

We noticed some great positive points:
• ${defaultGood[0] || 'Clean presentation of your business'}

We also noticed opportunities for improvement:
• ${defaultBad[0] || 'Mobile navigation & 1-click WhatsApp contact flow can be enhanced'}

These improvements make it much easier for mobile visitors to contact you immediately.

Recommended Plan: ${recommendedPlan}
Estimated Investment: ₹${normPrice} (Negotiable depending on scope)

If you'd like, we can show you a free mockup of these improvements before you decide.

Rahul Kumar | RAHNOXA
Software & Digital Solutions`;
  }

  if (format === 'WHATSAPP_DETAILED') {
    return `Hello ${businessName},

We recently conducted a digital audit of ${category || 'business'} websites in ${city} and reviewed your site at ${websiteUrl}.

Here are our honest audit findings:

✅ What is Already Good:
• ${defaultGood[0] || 'Professional core business information'}
• ${defaultGood[1] || 'Clear establishment in the local community'}

⚡ Opportunities for Improvement:
• ${defaultBad[0] || 'Adding a prominent 1-click WhatsApp enquiry button for smartphone users'}
• ${defaultBad[1] || 'Improving mobile loading speed and On-Page SEO metadata'}

RAHNOXA can upgrade and optimize your web presence to convert more visitors into paying customers.

Recommended Plan: ${recommendedPlan}
Estimated Investment: ₹${normPrice}
(Price is negotiable depending on your exact requirements and scope.)

Would you be open to a 5-minute discussion or seeing a free visual demo of the proposed improvements?

Best regards,
Rahul Kumar | RAHNOXA`;
  }

  return {
    subject: `Quick website improvement ideas for ${businessName}`,
    body: `Hello ${businessName} Team,

We recently reviewed your website (${websiteUrl}) while researching ${category || 'service'} providers in ${city}.

First, we wanted to highlight what is already working well:
• ${defaultGood[0] || 'Clear presentation of your business and services'}
• ${defaultGood[1] || 'Established reputation in the local market'}

We also noticed a few valuable opportunities that could increase client inquiries:
• ${defaultBad[0] || 'Enhancing mobile conversion flows with direct WhatsApp and Call action buttons'}
• ${defaultBad[1] || 'Optimizing local search metadata and page load performance'}

RAHNOXA helps local businesses build high-converting, modern web solutions:
• Recommended Package: ${recommendedPlan}
• Estimated Price: ₹${normPrice} (Negotiable depending on final scope and requirements)

We can prepare a quick visual preview of the upgraded interface for you to inspect with zero obligation.

Would you be open to reviewing a brief sample?

Warm regards,

Rahul Kumar
RAHNOXA — Software Development & Digital Engineering
Website: https://rahnoxa.antideploy.com`
  };
}

/**
 * Follow-Up Engine (Value-Based, Non-Spam Sequences)
 */
export function generateFollowUpMessage({
  businessName,
  category,
  city = 'Jamshedpur',
  sequenceNumber = 1, // 1 (Day 2), 2 (Day 5), 3 (Day 8 - Final)
  recommendedService = 'Business Website'
}) {
  if (sequenceNumber === 1) {
    return `Hello ${businessName}, following up briefly on my earlier note regarding your online presence in ${city}. We prepared a quick outline showing how a direct WhatsApp-integrated website can capture more student/client inquiries. Would you like me to share a quick 2-minute live preview? - Rahul (RAHNOXA)`;
  }

  if (sequenceNumber === 2) {
    return `Hello ${businessName}, sharing a quick insight: most customers in ${city} search for ${category || 'services'} on mobile phones and prefer immediate WhatsApp enquiries over calling. We have a ready demo tailored for your industry starting at ₹5,000 (negotiable). Let me know if you'd like to take a look! - Rahul (RAHNOXA)`;
  }

  // Final Polite Follow-Up (Day 8)
  return `Hello ${businessName}, closing the loop from our side so we don't bother you. If you ever consider refreshing your website or building a new digital catalogue in the future, feel free to reach out. Wishing ${businessName} continued success! - Rahul Kumar (RAHNOXA, +91 8434237052)`;
}
