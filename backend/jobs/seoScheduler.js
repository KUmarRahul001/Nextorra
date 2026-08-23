import cron from 'node-cron';
import { db } from '../database/supabase.js';
import { aiGateway } from '../ai/core/gateway.js';
import { config } from '../config/env.js';
import { NewsService } from '../src/services/news.service.js';
import { generateCommercialCTA } from '../src/services/blogLeadEngine.js';

export async function executeDailySEOAutomation() {
  const startTime = new Date().toISOString();
  console.log(`[Automation] Starting daily SEO blog generation pipeline at ${startTime}...`);

  try {
    const jobs = await db.getAutomationJobs();
    const job = jobs[0] || { auto_publish: config.autoPublishBlogs ? 1 : 0 };
    const autoPublish = Boolean(job.auto_publish);

    // 1. Fetch real-time trending news across Tech, IT, AI, Science (Locked Topic Object)
    const selectedTopic = await NewsService.getTrendingTechNews();

    // 2. Generate Article strictly grounded on the selectedTopic
    const generated = await aiGateway.generateBlogArticle({
      topic: selectedTopic.title,
      keyword: selectedTopic.keyword || selectedTopic.title,
      category: selectedTopic.category || 'Tech & IT Innovation',
      summary: selectedTopic.summary,
    });

    // 3. Grounding & Entity Consistency Validation Gate
    const { validateContentGrounding, generateEventFingerprint } = await import('../src/services/groundingValidator.js');
    const groundingResult = validateContentGrounding({
      selectedTopic,
      generatedArticle: {
        ...generated,
        sourceName: selectedTopic.source,
        sourceUrl: selectedTopic.sourceUrl,
      }
    });

    const eventFingerprint = generateEventFingerprint(selectedTopic.source, selectedTopic.title, selectedTopic.sourceUrl);

    // 4. Contextual Commercial CTA Injection
    const cta = generateCommercialCTA({
      category: generated.category || selectedTopic.category,
      title: generated.title,
      targetLocation: 'Jamshedpur'
    });

    // Append Source Reference block to article content
    const sourceBlock = selectedTopic.sourceUrl ? `\n\n---\n\n**Source Reference**: *[${selectedTopic.source || 'Original News Source'}](${selectedTopic.sourceUrl})*` : '';
    const fullContent = `${generated.content}\n\n${cta.htmlCTA}${sourceBlock}`;

    // Grounding Gate: Publish ONLY if grounding is valid and autoPublish is true
    let status = 'DRAFT';
    let publishBlockReason = null;

    if (!groundingResult.isValid) {
      status = 'DRAFT';
      publishBlockReason = groundingResult.reason;
      console.warn(`⚠️ [Automation] Auto-publish blocked: ${groundingResult.reason} (Score: ${groundingResult.groundingScore}/100)`);
    } else if (autoPublish) {
      status = 'PUBLISHED';
    }

    const now = new Date().toISOString();
    const slug = `${generated.slug}-${Date.now().toString(36).slice(-4)}`;
    const siteUrl = config.siteUrl.replace(/\/+$/, '');

    const post = await db.createBlogPost({
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content: fullContent,
      featured_image: selectedTopic.featured_image || '/assets/image.png',
      category: generated.category,
      tags: generated.tags,
      author: 'Rahnoxa AI Intelligence',
      reading_time: generated.reading_time || '6 min read',
      status,
      is_ai_generated: 1,
      ai_topic: selectedTopic.title,
      ai_keyword: selectedTopic.keyword,
      ai_seo_score: groundingResult.groundingScore,
      seo_title: `${generated.title} | ${config.siteName || 'Rahnoxa'}`,
      seo_description: generated.excerpt,
      canonical_url: `${siteUrl}/blog/${slug}`,
      published_at: status === 'PUBLISHED' ? now : null,
    });

    // Record Execution Audit Log with Grounding Metrics
    const run = await db.recordAutomationRun({
      job_id: 'job-daily-seo',
      started_at: startTime,
      completed_at: new Date().toISOString(),
      status: status === 'PUBLISHED' ? 'SUCCESS' : 'DRAFT_HEURISTIC',
      topic: selectedTopic.title,
      keyword: selectedTopic.keyword,
      output_title: post.title,
      output_post_id: post.id,
      error: publishBlockReason,
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
