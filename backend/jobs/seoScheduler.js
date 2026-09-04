import { db, supabase } from '../database/supabase.js';
import { aiGateway } from '../ai/core/gateway.js';
import { config } from '../config/env.js';
import { NewsService } from '../src/services/news.service.js';
import { generateCommercialCTA } from '../src/services/blogLeadEngine.js';
import { 
  validateContentGrounding, 
  extractSourceFacts, 
  validateClaimSupport, 
  generateEventFingerprint 
} from '../src/services/groundingValidator.js';

export async function executeDailySEOAutomation(options = {}) {
  const isDryRun = Boolean(options.dryRun || process.env.SEO_AUTOMATION_DRY_RUN === 'true');
  const startTime = new Date().toISOString();
  const runId = `seo-run-${Date.now().toString(36)}`;
  
  console.log(`[Automation] Starting daily SEO blog pipeline (${runId}) [${isDryRun ? 'DRY-RUN' : 'PRODUCTION'}]...`);

  // 1. Concurrency Run Lock (Check if an automation job is currently running)
  if (!isDryRun && supabase) {
    try {
      const { data: activeRuns } = await supabase
        .from('seo_automation_runs')
        .select('*')
        .eq('status', 'RUNNING')
        .limit(1);

      if (activeRuns && activeRuns.length > 0) {
        const lastRun = activeRuns[0];
        const ageMinutes = (Date.now() - new Date(lastRun.started_at).getTime()) / (1000 * 60);
        
        if (ageMinutes < 15) {
          console.warn(`⚠️ [Automation] Concurrency Lock: Another job is currently running (${lastRun.id}). Aborting.`);
          return { status: 'ALREADY_RUNNING', runId: lastRun.id };
        } else {
          // Mark stale
          await supabase.from('seo_automation_runs').update({ status: 'STALE' }).eq('id', lastRun.id);
        }
      }

      // Record initial RUNNING status
      await supabase.from('seo_automation_runs').insert({
        id: runId,
        job_type: 'DAILY_SEO_BLOG',
        started_at: startTime,
        status: 'RUNNING',
        environment: config.nodeEnv || 'production'
      });
    } catch {
      // Non-blocking log if runs table is not reachable
    }
  }

  try {
    const jobs = await db.getAutomationJobs();
    const job = jobs[0] || { auto_publish: config.autoPublishBlogs ? 1 : 0 };
    const autoPublish = Boolean(job.auto_publish);

    // 2. Fetch Live Real-Time Trending News (Locked Topic Object with Scope Preference)
    const selectedTopic = await NewsService.getTrendingTechNews({ scope: options.scope });

    // 3. Duplicate Event Fingerprint Check
    const eventFingerprint = generateEventFingerprint(selectedTopic.source, selectedTopic.title, selectedTopic.sourceUrl);
    
    if (supabase && !isDryRun) {
      const { data: existingDupes } = await supabase
        .from('seo_automation_runs')
        .select('id, article_id, status')
        .eq('event_fingerprint', eventFingerprint)
        .eq('status', 'SUCCESS')
        .limit(1);

      if (existingDupes && existingDupes.length > 0) {
        console.log(`ℹ️ [Automation] Idempotency Gate: Event already covered (Fingerprint: ${eventFingerprint}). Skipping duplicate.`);
        await supabase.from('seo_automation_runs').update({
          finished_at: new Date().toISOString(),
          status: 'SKIPPED_DUPLICATE',
          selected_topic: selectedTopic.title,
          source_name: selectedTopic.source,
          source_url: selectedTopic.sourceUrl,
          event_fingerprint: eventFingerprint,
          duration_ms: Date.now() - new Date(startTime).getTime()
        }).eq('id', runId);

        return { status: 'SKIPPED_DUPLICATE', eventFingerprint };
      }
    }

    // 4. Source Fact Extraction
    const sourceFacts = extractSourceFacts(selectedTopic);

    // 5. Generate Grounded Article
    const generated = await aiGateway.generateBlogArticle({
      topic: selectedTopic.title,
      keyword: selectedTopic.keyword || selectedTopic.title,
      category: selectedTopic.category || 'Tech & IT Innovation',
      summary: selectedTopic.summary,
    });

    // 6. Grounding & Entity Consistency Validation
    const groundingResult = validateContentGrounding({
      selectedTopic,
      generatedArticle: {
        ...generated,
        sourceName: selectedTopic.source,
        sourceUrl: selectedTopic.sourceUrl,
      }
    });

    // 7. Fact-Support Validation
    const factCheckResult = validateClaimSupport({ sourceFacts, generatedArticle: generated });

    // 8. Contextual Commercial CTA Injection
    const cta = generateCommercialCTA({
      category: generated.category || selectedTopic.category,
      title: generated.title,
      targetLocation: selectedTopic.location || (selectedTopic.scope === 'National' ? 'Jamshedpur' : 'India')
    });

    // Append Source Reference block
    const sourceBlock = selectedTopic.sourceUrl ? `\n\n---\n\n**Source Reference**: *[${selectedTopic.source || 'Original News Source'}](${selectedTopic.sourceUrl})*` : '';
    const fullContent = `${generated.content}\n\n${cta.htmlCTA}${sourceBlock}`;

    // 9. Hard Publishing Gate Evaluation
    let status = 'DRAFT';
    let publishBlockReason = null;
    let runFinalStatus = 'SUCCESS';

    if (!groundingResult.isValid) {
      status = 'DRAFT';
      runFinalStatus = 'BLOCKED_GROUNDING';
      publishBlockReason = groundingResult.reason;
      console.warn(`⚠️ [Automation] Auto-publish blocked: ${groundingResult.reason}`);
    } else if (!factCheckResult.claimValidationPass) {
      status = 'DRAFT';
      runFinalStatus = 'BLOCKED_FACTS';
      publishBlockReason = 'FACT_VALIDATION_FAILED: Claims diverged from source';
      console.warn(`⚠️ [Automation] Auto-publish blocked: Factual claims unverified`);
    } else if (autoPublish && !isDryRun) {
      status = 'PUBLISHED';
    }

    if (isDryRun) {
      console.log('✅ [Automation] Dry-Run completed with 100% gate verification. No database insertion.');
      return {
        status: 'DRY_RUN_SUCCESS',
        groundingScore: groundingResult.groundingScore,
        factSupportScore: factCheckResult.factSupportScore,
        topic: selectedTopic.title,
        source: selectedTopic.source,
        scope: selectedTopic.scope,
        location: selectedTopic.location
      };
    }

    const now = new Date().toISOString();
    const slug = `${generated.slug}-${Date.now().toString(36).slice(-4)}`;
    const siteUrl = config.siteUrl.replace(/\/+$/, '');

    // 10. Persist Article into Supabase PostgreSQL
    const post = await db.createBlogPost({
      title: generated.title,
      slug,
      excerpt: generated.excerpt,
      content: fullContent,
      featured_image: selectedTopic.featured_image || '/assets/image.png',
      category: generated.category,
      tags: Array.from(new Set([...(selectedTopic.tags || []), ...(generated.tags || [])])),
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

    const finishedTime = new Date().toISOString();
    const durationMs = new Date(finishedTime).getTime() - new Date(startTime).getTime();

    // 11. Update Audit Run Log in Supabase
    if (supabase) {
      await supabase.from('seo_automation_runs').update({
        finished_at: finishedTime,
        status: runFinalStatus,
        selected_topic: selectedTopic.title,
        source_name: selectedTopic.source,
        source_url: selectedTopic.sourceUrl,
        article_id: post.id,
        grounding_score: groundingResult.groundingScore,
        fact_support_score: factCheckResult.factSupportScore,
        event_fingerprint: eventFingerprint,
        error_message: publishBlockReason,
        duration_ms: durationMs
      }).eq('id', runId);
    }

    console.log(`[Automation] Successfully processed article '${post.title}' (Status: ${status}, Score: ${groundingResult.groundingScore}/100)`);
    return { success: true, post, status: runFinalStatus };
  } catch (err) {
    console.error('[Automation] Daily SEO generation failed:', err);
    if (supabase && !isDryRun) {
      await supabase.from('seo_automation_runs').update({
        finished_at: new Date().toISOString(),
        status: 'FAILED',
        error_message: err.message,
        duration_ms: Date.now() - new Date(startTime).getTime()
      }).eq('id', runId);
    }
    throw err;
  }
}

/**
 * In-process scheduler for LOCAL development ONLY (NODE_ENV !== 'production')
 * In Production on Render, the dedicated Render Cron Job service is the single authority.
 */
export function initSeoScheduler() {
  if (process.env.NODE_ENV === 'production') {
    console.log('🛡️ [Scheduler] Production detected: In-process node-cron disabled. Authoritative Render Cron Job handles scheduling (30 12 * * * UTC).');
    return;
  }
  
  console.log('⏰ [Local Dev] In-process SEO job runner available for local testing.');
}
