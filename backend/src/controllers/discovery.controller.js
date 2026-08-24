import { discoveryManager } from '../services/discovery/providers.js';
import { db } from '../../database/supabase.js';
import { generateDraftOutreach } from '../services/discovery/opportunityEngine.js';
import { analyzePublicBusinessUrl } from '../services/discovery/urlParser.js';

export const DiscoveryController = {
  // 0. Free Direct URL Discovery (Google Maps / Website URL)
  async discoverFromUrl(req, res) {
    try {
      const { url, businessName, location = 'Jamshedpur', category = 'Coaching Institute' } = req.body;
      if (!url) {
        return res.status(400).json({ success: false, error: 'Target URL is required' });
      }

      const analyzed = await analyzePublicBusinessUrl(url, businessName, location, category);
      return res.json({ success: true, data: analyzed });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // 1. Get Providers & Configured Status
  async getProviders(req, res) {
    try {
      const providers = discoveryManager.getAvailableProviders();
      return res.json({ success: true, data: providers });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // 2. Get Target Locations
  async getLocations(req, res) {
    try {
      const locations = [
        { id: 'loc-1', name: 'Jamshedpur', state: 'Jharkhand', priority: 'HIGH', status: 'ACTIVE' },
        { id: 'loc-2', name: 'Adityapur', state: 'Jharkhand', priority: 'HIGH', status: 'ACTIVE' },
        { id: 'loc-3', name: 'Gamharia', state: 'Jharkhand', priority: 'HIGH', status: 'ACTIVE' },
        { id: 'loc-4', name: 'Ranchi', state: 'Jharkhand', priority: 'HIGH', status: 'ACTIVE' },
        { id: 'loc-5', name: 'Bokaro', state: 'Jharkhand', priority: 'MEDIUM', status: 'ACTIVE' },
        { id: 'loc-6', name: 'Dhanbad', state: 'Jharkhand', priority: 'MEDIUM', status: 'ACTIVE' },
        { id: 'loc-7', name: 'Kolkata', state: 'West Bengal', priority: 'HIGH', status: 'ACTIVE' },
      ];
      return res.json({ success: true, data: locations });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // 3. Execute Discovery Job with Real Provider
  async startJob(req, res) {
    try {
      const { location = 'Jamshedpur', category = 'Coaching Institute', limit = 50, providerId } = req.body;
      const provider = discoveryManager.getProvider(providerId);

      if (!provider.isConfigured()) {
        return res.status(422).json({
          success: false,
          code: 'PROVIDER_NOT_CONFIGURED',
          error: `Provider '${provider.providerName}' is not configured. Please supply GOOGLE_PLACES_API_KEY in Render environment.`
        });
      }

      const jobId = `job-${Date.now()}`;
      const result = await provider.discover({ location, category, limit });

      const jobRecord = {
        id: jobId,
        location_name: location,
        category,
        source_provider: provider.providerName,
        requested_count: limit,
        discovered_count: result.discoveredCount,
        valid_count: result.validCount,
        duplicate_count: result.duplicateCount,
        status: result.discoveredCount >= limit ? 'COMPLETED' : 'PARTIAL',
        progress_percentage: 100,
        businesses: result.businesses,
        created_at: new Date().toISOString(),
      };

      return res.json({ success: true, data: jobRecord });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // 4. Convert Discovered Business to CONTACT_READY Lead (Zero Auto-Launch)
  async convertToLead(req, res) {
    try {
      const { business } = req.body;
      if (!business || !business.businessName) {
        return res.status(400).json({ success: false, error: 'Invalid business payload' });
      }

      const draftMessage = business.customPitch || generateDraftOutreach({
        businessName: business.businessName,
        city: business.city,
        category: business.category,
        opportunityClass: business.opportunityClass,
        recommendedOffer: business.recommendedOffer,
        recommendedPrice: business.recommendedPrice
      });

      // Strict integrity: Null values remain null, never fabricated
      const leadData = {
        name: business.businessName,
        business_name: business.businessName,
        company: business.businessName,
        industry: business.category || null,
        city: business.city || 'Jamshedpur',
        phone: business.phone || null,
        whatsapp: business.whatsapp || business.phone || null,
        email: business.email || null, // NULL if not found - never fake
        website_url: business.websiteUrl || null,
        source: business.source || 'LOCATION_DISCOVERY',
        service_opportunity: business.opportunityClass || 'UNVERIFIED',
        lead_score: business.opportunityScore || 85,
        temperature: (business.opportunityScore || 85) >= 75 ? 'HOT' : 'WARM',
        status: 'CONTACT_READY',
        recommended_offer: business.recommendedOffer || 'Admission & Course Catalog Website (Plan B)',
        recommended_price: business.recommendedPrice || 5000,
        project_description: draftMessage,
      };

      const created = await db.createLead(leadData);

      return res.json({
        success: true,
        data: {
          lead: created,
          draftMessage,
          whatsAppLink: leadData.whatsapp ? `https://wa.me/${leadData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(draftMessage)}` : null
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // 5. Export Complete 7-Sheet Sales Intelligence Database to XLSX
  async exportXlsx(req, res) {
    try {
      const { generateSalesXlsxWorkbook } = await import('../services/discovery/excelExporter.js');
      const workbook = await generateSalesXlsxWorkbook();
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `RAHNOXA_Jamshedpur_Sales_${dateStr}.xlsx`;

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};
