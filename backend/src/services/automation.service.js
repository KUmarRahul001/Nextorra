import { db } from '../../database/supabase.js';
import { executeDailySEOAutomation } from '../../jobs/seoScheduler.js';

export class AutomationService {
  static async getStatus() {
    const jobs = await db.getAutomationJobs();
    const runs = await db.getAutomationRuns(30);
    return { jobs, runs };
  }

  static async updateJob(data) {
    const updated = await db.updateAutomationJob(data.id || 'job-daily-seo', data);
    return updated;
  }

  static async triggerRun() {
    return executeDailySEOAutomation();
  }
}
