import { Router } from 'express';
import { db, supabase } from '../../../database/supabase.js';
import { config } from '../../../config/env.js';

const router = Router();

/**
 * Dynamic XML Sitemap generator
 * Automatically pulls all published blog posts from Supabase PostgreSQL in real-time
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const DOMAIN = host ? `${proto}://${host}` : (process.env.SITE_URL || 'https://rahnoxa.antideploy.com');
    const now = new Date().toISOString().split('T')[0];

    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/services', changefreq: 'weekly', priority: '0.9' },
      { url: '/blog', changefreq: 'daily', priority: '0.9' },
      { url: '/get-started', changefreq: 'monthly', priority: '0.9' },
      { url: '/contact', changefreq: 'monthly', priority: '0.9' },
      { url: '/internship', changefreq: 'monthly', priority: '0.8' },
      { url: '/services/web-development', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/full-stack-web-apps', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/app-development', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/custom-software-api-integration', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/erp-enterprise-applications', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/saas-products', changefreq: 'weekly', priority: '0.9' },
      { url: '/services/desktop-applications', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/social-media-marketing', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/lead-generation', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/sms-marketing', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/email-marketing', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/missed-call-service', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/graphic-design', changefreq: 'weekly', priority: '0.8' },
      { url: '/services/voice-call-services', changefreq: 'weekly', priority: '0.8' },
      { url: '/privacy-policy', changefreq: 'monthly', priority: '0.5' },
      { url: '/terms-and-conditions', changefreq: 'monthly', priority: '0.5' }
    ];

    let blogUrls = [];
    if (supabase) {
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at, status')
        .eq('status', 'PUBLISHED')
        .order('created_at', { ascending: false });

      if (posts) {
        blogUrls = posts.map(p => ({
          url: `/blog/${p.slug}`,
          lastmod: (p.updated_at || p.created_at || now).split('T')[0],
          changefreq: 'daily',
          priority: '0.8'
        }));
      }
    }

    const allUrls = [...staticRoutes, ...blogUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => `  <url>
    <loc>${DOMAIN}${item.url}</loc>
    <lastmod>${item.lastmod || now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(xml);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * Dynamic robots.txt endpoint
 */
router.get('/robots.txt', (req, res) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const baseUrl = host ? `${proto}://${host}` : (process.env.SITE_URL || 'https://rahnoxa.antideploy.com');

  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /v1/

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  return res.status(200).send(robots);
});

export default router;
