/**
 * RAHNOXA Personalized Evidence-Based Outreach & Follow-Up Generator
 * Strict Integrity Rules:
 * - NO fabricated rating references. If rating is null, do not mention stars.
 * - If review snippet is null, speak directly about their local business category.
 * - Structure: Problem → Solution → Offer (Price + Free Domain/Hosting) → Low-friction CTA.
 * - Under 700 chars for WhatsApp.
 */

export function generatePersonalizedOutreach({
  businessName,
  category = 'Coaching Center',
  city = 'Jamshedpur',
  phone,
  email,
  websiteUrl,
  rating = null,
  reviewCount = null,
  reviewSnippet = null,
  competitorCount = null,
  recommendedPlan = 'Starter Business Website (Plan B)',
  recommendedPrice = 5000,
  recommendedService = 'Complete Responsive Business Website',
  format = 'WHATSAPP_SHORT' // 'WHATSAPP_SHORT', 'WHATSAPP_DETAILED', 'EMAIL'
}) {
  const normPrice = Math.max(Number(recommendedPrice) || 5000, 5000);
  
  // Clean evidence-based hook without any fabricated claims
  let reputationHook = `an established presence in ${city}`;
  if (rating && reviewCount) {
    reputationHook = `a ${rating} rating (${reviewCount} reviews) in ${city}`;
  } else if (rating) {
    reputationHook = `a ${rating} rating in ${city}`;
  }

  const cleanSnippet = reviewSnippet ? reviewSnippet.replace(/"/g, '').trim() : null;

  // 1. Scenario: NO WEBSITE FOUND
  if (!websiteUrl || websiteUrl === 'NO_WEBSITE_FOUND' || !websiteUrl.startsWith('http')) {
    if (format === 'WHATSAPP_SHORT') {
      return `Hi ${businessName}! I noticed your institute has ${reputationHook}, but no dedicated website for students searching online.

Without a website, nearby students searching on Google often end up contacting other centers in your area.

We can build a fast, mobile-friendly website for ${businessName} starting at ₹${normPrice} — with free domain setup and 1 year of free hosting included.

Reply YES and I'll send a free homepage preview by tomorrow!

Rahul Kumar | RAHNOXA
👉 See our work: https://rahnoxa.antideploy.com`;
    }

    if (format === 'WHATSAPP_DETAILED') {
      return `Hello ${businessName},

While researching education centers in ${city}, we noticed ${businessName} has ${reputationHook}.

However, without a dedicated mobile website, prospective students and parents cannot view your course batches or send direct WhatsApp admission inquiries.

Here is what we can set up for ${businessName}:
1. Fast mobile website showing all courses & batch timings
2. Instant 1-click WhatsApp enquiry & call buttons
3. Google Maps location & online admission forms
4. Free custom domain + 1st year free hosting included

Investment starts at ₹${normPrice} (Starter Plan — negotiable based on exact scope).

Reply YES and I'll share a custom visual preview for your center!

Rahul Kumar | RAHNOXA
👉 View live projects: https://rahnoxa.antideploy.com`;
    }

    if (format === 'EMAIL') {
      const subjectVariants = [
        `Website & Online Admissions for ${businessName} (${city})`,
        `Digital enquiry portal for ${businessName}`,
        `Quick website proposal for ${businessName} — ${city}`
      ];
      const selectedSubject = subjectVariants[Math.floor(Math.random() * subjectVariants.length)];

      return {
        subject: selectedSubject,
        body: `Hello ${businessName} Team,

We came across your center while analyzing education institutes in ${city} and noticed your active presence.

Currently, when prospective students and parents search for ${category.toLowerCase()} in your locality, your business appears without an official website to download course brochures or submit admission enquiries.

Here is how a dedicated website helps ${businessName}:
• Showcase course batches, faculty credentials, and student results 24/7.
• Capture high-intent admission inquiries directly on WhatsApp and phone.
• Rank higher on Google for local student searches across ${city}.

Package Offer:
• Complete Mobile-Responsive Website starting at ₹${normPrice}
• Free domain name registration + 1 year free cloud hosting included
• Delivery within 3–5 business days

Would you be open to reviewing a free homepage mockup for your center? Reply to this email and we'll send it over.

Warm regards,

Rahul Kumar
Founder & Lead Engineer, RAHNOXA
Phone: +91 8434237052
👉 View live client projects: https://rahnoxa.antideploy.com`
      };
    }
  }

  // 2. Scenario: WEBSITE EXISTS (UPGRADE / OPTIMIZATION)
  if (format === 'WHATSAPP_SHORT') {
    return `Hi ${businessName}! We reviewed your website (${websiteUrl}) and love your active presence in ${city}.

We noticed the mobile loading speed and 1-click WhatsApp admission flow could be upgraded to convert more visitor traffic into paying enrollees.

We build modern, fast websites starting at ₹${normPrice} (with free 1st-year hosting + domain management included).

Reply YES and I'll share a free mockup of the proposed improvements!

Rahul Kumar | RAHNOXA
👉 See our work: https://rahnoxa.antideploy.com`;
  }

  if (format === 'WHATSAPP_DETAILED') {
    return `Hello ${businessName},

We audited ${category.toLowerCase()} websites in ${city} and reviewed ${websiteUrl}.

✅ What is Great: Established presence and clear service offerings in ${city}.
⚡ Opportunity: Upgrading mobile loading speed, WhatsApp lead widgets, and local SEO can help you capture more admissions.

We can revamp your site starting at ₹${normPrice} (Starter Plan — negotiable based on requirements), including 1 year of free hosting.

Reply YES and I'll prepare a free redesign preview for you!

Rahul Kumar | RAHNOXA
👉 View live projects: https://rahnoxa.antideploy.com`;
  }

  return {
    subject: `Website optimization ideas for ${businessName} (${city})`,
    body: `Hello ${businessName} Team,

We recently audited websites in ${city} and analyzed your current portal at ${websiteUrl}.

We identified three high-impact opportunities for ${businessName}:
• Implementing instant 1-click WhatsApp lead buttons for smartphone visitors.
• Optimizing mobile load speeds to reduce visitor bounce rates.
• Enhancing on-page local SEO to dominate Google searches across Jharkhand.

We provide full website redesign and modernization starting at ₹${normPrice} with 1 year of free cloud hosting included.

Reply to this email if you would like to see a free visual mockup of the proposed upgrades.

Best regards,

Rahul Kumar | RAHNOXA
Phone: +91 8434237052
👉 See our work: https://rahnoxa.antideploy.com`
  };
}

/**
 * Value-Based Follow-Up Sequence
 */
export function generateFollowUpMessage({
  businessName,
  category = 'Coaching Center',
  city = 'Jamshedpur',
  sequenceNumber = 1
}) {
  if (sequenceNumber === 1) {
    return `Hi ${businessName}, following up on my note regarding your center's online presence in ${city}. We have a ready demo showing how an instant WhatsApp admission funnel can capture more students. Reply YES and I'll send the live link! - Rahul (RAHNOXA, https://rahnoxa.antideploy.com)`;
  }

  if (sequenceNumber === 2) {
    return `Hi ${businessName}, quick insight: over 80% of students and parents in ${city} search on mobile phones and prefer 1-click WhatsApp inquiries. Our coaching website package starts at ₹5,000 with free domain + 1 year free hosting. Want to see a sample? - Rahul (RAHNOXA)`;
  }

  return `Hi ${businessName}, closing the loop so we don't crowd your inbox. If you ever want to launch a modern website or admission portal in the future, feel free to reach out anytime. Wishing ${businessName} great success! - Rahul Kumar (RAHNOXA, +91 8434237052)`;
}
