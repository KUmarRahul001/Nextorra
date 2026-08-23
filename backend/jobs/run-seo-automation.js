/**
 * RAHNOXA Production Render Cron Entrypoint
 * Dedicated executable standalone worker for daily live news scraping,
 * fact-grounding, duplicate-safety, and automated SEO article publishing.
 */

import { executeDailySEOAutomation } from './seoScheduler.js';
import { validateProductionConfig } from '../config/env.js';

async function main() {
  const isDryRun = process.env.SEO_AUTOMATION_DRY_RUN === 'true';
  const startedAt = new Date();
  
  console.log('==================================================');
  console.log(`RAHNOXA SEO AUTOMATION RUN [${isDryRun ? 'DRY-RUN' : 'PRODUCTION'}]`);
  console.log('==================================================');
  console.log(`Started: ${startedAt.toISOString()}`);
  console.log(`Node Runtime: ${process.version}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`Authority: Render Cron Job (Scheduled: 30 12 * * * UTC = 18:00 IST)`);
  console.log('--------------------------------------------------\n');

  try {
    // 1. Validate Environment Secrets
    validateProductionConfig();

    // 2. Execute Full End-to-End Grounded Publishing Pipeline
    const result = await executeDailySEOAutomation({ dryRun: isDryRun });

    const finishedAt = new Date();
    const durationMs = finishedAt.getTime() - startedAt.getTime();

    console.log('\n==================================================');
    console.log('AUTOMATION EXECUTION COMPLETED');
    console.log('==================================================');
    console.log(`Result Status: ${result.status || (result.post?.status === 'PUBLISHED' ? 'SUCCESS' : 'DRAFT_SAVED')}`);
    if (result.post) {
      console.log(`Article ID: ${result.post.id}`);
      console.log(`Title: ${result.post.title}`);
      console.log(`Slug: /blog/${result.post.slug}`);
      console.log(`Publication State: ${result.post.status}`);
    }
    console.log(`Execution Duration: ${durationMs}ms (${(durationMs / 1000).toFixed(2)}s)`);
    console.log('==================================================');

    process.exit(0);
  } catch (err) {
    console.error('\n❌ [FATAL] SEO Automation Execution Failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
