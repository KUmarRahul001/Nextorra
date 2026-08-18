import { getDB } from '../_db.js';
import { requireAuth } from '../_auth.js';

// Pre-defined technical topic matrix with rotating categories to prevent duplication
const TOPIC_REPOSITORY = [
  {
    topic: "Enterprise API Integration Strategies for High-Throughput Microservices",
    category: "Software Architecture",
    keyword: "enterprise api integration services",
    image: "/assets/image.png",
    generateContent: () => ({
      title: "Enterprise API Integration Strategies for High-Throughput Microservices",
      slug: `enterprise-api-integration-strategies-${Date.now().toString(36)}`,
      excerpt: "A deep dive into webhook queueing, rate limiting, and resilient API architecture for modern distributed systems.",
      content: `## The Imperative for Resilient API Integration\n\nIn modern distributed software ecosystems, seamless data exchange between third-party SaaS tools, internal ERP platforms, and cloud databases is critical. Without defensive API engineering, microservices become vulnerable to cascading timeout failures and data desynchronization.\n\n### Architectural Best Practices\n\n1. **Idempotency Keys**: Guarantee that duplicate network requests never result in duplicate financial or inventory transactions.\n2. **Asynchronous Message Queueing**: Decouple high-frequency webhook ingest from database transactions using worker pools.\n3. **Granular Circuit Breakers**: Automatically isolate failing external dependencies before they consume edge compute resources.\n\n### Real-World Application\n\nAt Rahnoxa, we engineer resilient backend integration layers and custom middleware. Explore our [Custom Software & API Integration Services](/services/custom-software-api-integration) or [Start a Project](/get-started) to architect your technical infrastructure.`,
      tags: ["API Integration", "Microservices", "Backend Engineering", "Cloud"],
      reading_time: "5 min read",
      ai_seo_score: 93,
    }),
  },
  {
    topic: "Why Custom Software Outperforms Generic SaaS for Complex Business Workflows",
    category: "Software Engineering",
    keyword: "custom software development vs saas",
    image: "/assets/Tech_Startup_Branding.png",
    generateContent: () => ({
      title: "Why Custom Software Outperforms Generic SaaS for Complex Business Workflows",
      slug: `custom-software-vs-generic-saas-${Date.now().toString(36)}`,
      excerpt: "Evaluating operational ROI, data ownership, and technical agility: when to build custom software over off-the-shelf subscriptions.",
      content: `## The Limits of Generic SaaS Platforms\n\nWhile off-the-shelf software offers fast initial onboarding, expanding businesses inevitably encounter restrictive subscription tiers, feature bloat, and rigid database schemas that stall operational efficiency.\n\n### Strategic Advantages of Bespoke Development\n\n- **100% Data & Code Ownership**: Eliminate recurring per-seat licensing penalties.\n- **Tailored Operational Alignment**: Build UI and backend workflows around your team's authentic processes.\n- **Uncapped Scalability**: Deploy on modern cloud serverless infrastructure without artificial vendor throughput caps.\n\nLearn how Rahnoxa builds tailored web and enterprise applications in our [Web Development Services](/services/web-development).`,
      tags: ["Custom Software", "SaaS", "Enterprise Architecture", "ROI"],
      reading_time: "6 min read",
      ai_seo_score: 95,
    }),
  },
  {
    topic: "Designing Secure Multi-Tenant Databases for Cloud SaaS Applications",
    category: "Database & Cloud",
    keyword: "multi-tenant database architecture",
    image: "/assets/catalogPro.png",
    generateContent: () => ({
      title: "Designing Secure Multi-Tenant Databases for Cloud SaaS Applications",
      slug: `designing-secure-multi-tenant-databases-${Date.now().toString(36)}`,
      excerpt: "Comparing pooled vs siloed database models, row-level security, and query isolation for modern B2B SaaS platforms.",
      content: `## Multi-Tenancy Architecture Choices\n\nArchitecting multi-tenant B2B applications requires balancing operational cost with strict regulatory isolation standards.\n\n### Key Architectural Models\n\n1. **Shared Database, Shared Schema with RLS**: Cost-effective scaling with Postgres Row-Level Security.\n2. **Shared Database, Separate Schemas**: Enhanced namespace isolation per organization.\n3. **Database-Per-Tenant**: Complete physical data partitioning for enterprise compliance.\n\nDiscover our full spectrum of [SaaS Engineering Solutions](/services/saas-products) or connect with the Rahnoxa engineering team to evaluate your data architecture.`,
      tags: ["Database", "SaaS", "PostgreSQL", "Security", "Cloud"],
      reading_time: "5 min read",
      ai_seo_score: 91,
    }),
  },
];

export async function onRequestPost(context) {
  const auth = await requireAuth(context);
  if (!auth.authenticated) {
    return auth.response;
  }

  const db = await getDB(context);
  const startTime = new Date().toISOString();

  try {
    const jobs = await db.getAutomationJobs();
    const job = jobs[0] || { auto_publish: 0 };
    const autoPublish = Boolean(job.auto_publish);

    // Pick topic from repository based on rotation
    const runs = await db.getAutomationRuns(10);
    const usedTopics = new Set(runs.map(r => r.topic));
    const availableTopic = TOPIC_REPOSITORY.find(t => !usedTopics.has(t.topic)) || TOPIC_REPOSITORY[0];

    const generated = availableTopic.generateContent();
    const status = autoPublish ? 'PUBLISHED' : 'DRAFT';

    // Create the blog post
    const post = await db.createBlogPost({
      title: generated.title,
      slug: generated.slug,
      excerpt: generated.excerpt,
      content: generated.content,
      featured_image: availableTopic.image,
      category: availableTopic.category,
      tags: generated.tags,
      author: 'Rahnoxa AI Engine',
      reading_time: generated.reading_time,
      status,
      is_ai_generated: 1,
      ai_topic: availableTopic.topic,
      ai_keyword: availableTopic.keyword,
      ai_seo_score: generated.ai_seo_score,
      seo_title: `${generated.title} – Rahnoxa`,
      seo_description: generated.excerpt,
      canonical_url: `https://rahnoxa.pages.dev/blog/${generated.slug}`,
      og_image: availableTopic.image,
      published_at: status === 'PUBLISHED' ? new Date().toISOString() : null,
    });

    // Record execution run log
    const run = await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: 'SUCCESS',
      topic: availableTopic.topic,
      keyword: availableTopic.keyword,
      output_title: post.title,
      output_post_id: post.id,
      error: null,
    });

    // Update job last/next run
    await db.updateAutomationJob('job-daily-seo', {
      last_run: new Date().toISOString(),
      next_run: new Date(Date.now() + 24 * 3600000).toISOString(),
      status: 'IDLE',
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated article '${post.title}' as ${status}.`,
        post,
        run,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: 'FAILED',
      topic: 'Automated SEO Blog Generation',
      keyword: 'Software Engineering',
      output_title: null,
      output_post_id: null,
      error: err.message,
    });

    return new Response(
      JSON.stringify({ error: 'Automation execution failed', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
