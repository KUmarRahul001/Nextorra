import cron from 'node-cron';
import { db } from '../database/supabase.js';
import { aiGateway } from '../ai/core/gateway.js';
import { config } from '../config/env.js';
import { NewsService } from '../src/services/news.service.js';

export async function executeDailySEOAutomation() {
  const startTime = new Date().toISOString();
  console.log(`[Automation] Starting daily SEO blog generation pipeline at ${startTime}...`);

  try {
    const jobs = await db.getAutomationJobs();
    const job = jobs[0] || { auto_publish: config.autoPublishBlogs ? 1 : 0 };
    const autoPublish = Boolean(job.auto_publish);

    // 1. Fetch real-time trending news across Tech, IT, AI, Science
    const newsTopic = await NewsService.getTrendingTechNews();

    // 2. Generate Article via Custom AI Gateway
    const generated = await aiGateway.generateBlogArticle({
      topic: newsTopic.title,
      keyword: newsTopic.keyword || newsTopic.title,
      category: newsTopic.category || 'Tech & IT Innovation',
      summary: newsTopic.summary,
    });

    const status = autoPublish ? 'PUBLISHED' : 'DRAFT';
    const now = new Date().toISOString();
    const slug = `${generated.slug}-${Date.now().toString(36).slice(-4)}`;
    const siteUrl = config.siteUrl.replace(/\/+$/, '');

    const post = await db.createBlogPost({
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content: generated.content,
      featured_image: newsTopic.featured_image || '/assets/image.png',
      category: generated.category,
      tags: generated.tags,
      author: 'Rahnoxa AI Intelligence',
      reading_time: generated.reading_time || '6 min read',
      status,
      is_ai_generated: 1,
      ai_topic: newsTopic.title,
      ai_keyword: newsTopic.keyword,
      ai_seo_score: generated.ai_seo_score || 95,
      seo_title: `${generated.title} | ${config.siteName || 'Rahnoxa'}`,
      seo_description: generated.excerpt,
      canonical_url: `${siteUrl}/blog/${slug}`,
      published_at: status === 'PUBLISHED' ? now : null,
    });

    // Record Execution Audit Log
    const run = await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: 'SUCCESS',
      topic: newsTopic.title,
      keyword: newsTopic.keyword,
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
 * Runs automated live news blogging pipeline daily at 6:00 PM IST (12:30 UTC)
 * and auto-publishes SEO-optimized articles directly to Supabase & Live Website.
 */
export function initSeoScheduler() {
  // 30 12 * * * is 12:30 UTC = 18:00 (6:00 PM) IST
  cron.schedule('30 12 * * *', async () => {
    console.log('[Scheduler] ⏰ Triggering Daily 6:00 PM IST News Topic & SEO Blog Auto-Publisher...');
    try {
      await executeDailySEOAutomation();
    } catch (err) {
      console.error('[Scheduler] 6:00 PM Scheduled execution error:', err.message);
    }
  });

  console.log('⏰ Daily 6:00 PM IST Live News & SEO Blog Auto-Publisher registered (30 12 * * *)');
}
