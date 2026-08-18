import cron from 'node-cron';
import { db } from '../database/supabase.js';
import { aiGateway } from '../ai/core/gateway.js';
import { config } from '../config/env.js';

// Pre-defined rotating technical topic matrix
const TOPIC_REPOSITORY = [
  {
    topic: 'Enterprise API Integration Strategies for High-Throughput Microservices',
    category: 'Software Architecture',
    keyword: 'enterprise api integration services',
  },
  {
    topic: 'Why Custom Software Outperforms Generic SaaS for Complex Business Workflows',
    category: 'Software Engineering',
    keyword: 'custom software development vs saas',
  },
  {
    topic: 'Designing Secure Multi-Tenant Databases for Cloud SaaS Applications',
    category: 'Database & Cloud',
    keyword: 'multi-tenant database architecture',
  },
  {
    topic: 'Microservices vs Modular Monolith: Modern Architectural Trade-offs',
    category: 'Software Architecture',
    keyword: 'modular monolith architecture',
  },
  {
    topic: 'Automated CI/CD Pipelines & Zero-Downtime Deployment on Edge Cloud',
    category: 'DevOps & Cloud',
    keyword: 'edge cloud deployment strategies',
  },
];

export async function executeDailySEOAutomation() {
  const startTime = new Date().toISOString();
  console.log(`[Automation] Starting daily SEO blog generation pipeline at ${startTime}...`);

  try {
    const jobs = await db.getAutomationJobs();
    const job = jobs[0] || { auto_publish: config.autoPublishBlogs ? 1 : 0 };
    const autoPublish = Boolean(job.auto_publish);

    // Topic Selection & Deduplication
    const runs = await db.getAutomationRuns(15);
    const usedTopics = new Set(runs.map((r) => r.topic));
    const selectedTopic = TOPIC_REPOSITORY.find((t) => !usedTopics.has(t.topic)) || TOPIC_REPOSITORY[0];

    // Generate Article via Custom AI Gateway
    const generated = await aiGateway.generateBlogArticle({
      topic: selectedTopic.topic,
      keyword: selectedTopic.keyword,
      category: selectedTopic.category,
    });

    const status = autoPublish ? 'PUBLISHED' : 'DRAFT';
    const now = new Date().toISOString();

    const post = await db.createBlogPost({
      title: generated.title,
      slug: `${generated.slug}-${Date.now().toString(36).slice(-4)}`,
      excerpt: generated.excerpt,
      content: generated.content,
      featured_image: '/assets/image.png',
      category: generated.category,
      tags: generated.tags,
      author: 'Rahnoxa AI Engine',
      reading_time: generated.reading_time || '6 min read',
      status,
      is_ai_generated: 1,
      ai_topic: selectedTopic.topic,
      ai_keyword: selectedTopic.keyword,
      ai_seo_score: generated.ai_seo_score || 92,
      seo_title: `${generated.title} – Rahnoxa`,
      seo_description: generated.excerpt,
      canonical_url: `https://rahnoxa.pages.dev/blog/${generated.slug}`,
      published_at: status === 'PUBLISHED' ? now : null,
    });

    // Record Execution Audit Log
    const run = await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: 'SUCCESS',
      topic: selectedTopic.topic,
      keyword: selectedTopic.keyword,
      output_title: post.title,
      output_post_id: post.id,
      error: null,
    });

    console.log(`[Automation] Successfully generated article '${post.title}' (Status: ${status})`);
    return { success: true, post, run };
  } catch (err) {
    console.error('[Automation] Daily SEO generation failed:', err);
    await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: 'FAILED',
      topic: 'Daily SEO Automation',
      keyword: 'Software Engineering',
      output_title: null,
      output_post_id: null,
      error: err.message,
    });
    throw err;
  }
}

/**
 * Initialize node-cron schedule:
 * 18:00 IST = 12:30 UTC -> Cron: "30 12 * * *"
 */
export function initSeoScheduler() {
  // Cron: At 12:30 UTC every day (which is 18:00 IST)
  cron.schedule('30 12 * * *', async () => {
    console.log('[Scheduler] Triggering scheduled 18:00 IST (12:30 UTC) Daily Blog Generator...');
    try {
      await executeDailySEOAutomation();
    } catch (err) {
      console.error('[Scheduler] Scheduled execution error:', err.message);
    }
  });

  console.log('⏰ Scheduled Daily SEO Blog Generator registered for 18:00 IST (12:30 UTC daily)');
}
