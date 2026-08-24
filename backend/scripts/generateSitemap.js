import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from '../database/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateSitemap() {
  const baseUrl = process.env.VITE_SITE_URL && !process.env.VITE_SITE_URL.includes('localhost') && !process.env.VITE_SITE_URL.includes('workers.dev') && !process.env.VITE_SITE_URL.includes('pages.dev')
    ? process.env.VITE_SITE_URL
    : 'https://rahnoxa.antideploy.com';

  const now = new Date().toISOString().split('T')[0];

  // Static core routes
  const staticRoutes = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/services`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/blog`, changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/get-started`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/internship`, changefreq: 'monthly', priority: '0.8' },
    // Software & Web Engineering
    { url: `${baseUrl}/services/web-development`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/full-stack-web-apps`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/app-development`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/custom-software-api-integration`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/erp-enterprise-applications`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/saas-products`, changefreq: 'weekly', priority: '0.9' },
    { url: `${baseUrl}/services/desktop-applications`, changefreq: 'weekly', priority: '0.8' },
    // Marketing & Growth
    { url: `${baseUrl}/services/social-media-marketing`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/lead-generation`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/sms-marketing`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/email-marketing`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/missed-call-service`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/graphic-design`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/services/voice-call-services`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.3' },
    { url: `${baseUrl}/terms-and-conditions`, changefreq: 'monthly', priority: '0.3' },
  ];

  // Dynamic blog posts from Supabase
  let blogRoutes = [];
  let projectRoutes = [];
  try {
    if (supabase) {
      const { data: dbPosts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at, created_at')
        .eq('status', 'PUBLISHED');

      if (dbPosts && dbPosts.length > 0) {
        blogRoutes = dbPosts.map((p) => ({
          url: `${baseUrl}/blog/${p.slug}`,
          lastmod: (p.updated_at || p.published_at || p.created_at || now).split('T')[0],
          changefreq: 'daily',
          priority: '0.8',
        }));
      }

      const { data: dbProjects } = await supabase
        .from('projects')
        .select('slug, updated_at, created_at')
        .eq('status', 'PUBLISHED');

      if (dbProjects && dbProjects.length > 0) {
        projectRoutes = dbProjects.map((p) => ({
          url: `${baseUrl}/projects/${p.slug}`,
          lastmod: (p.updated_at || p.created_at || now).split('T')[0],
          changefreq: 'weekly',
          priority: '0.8',
        }));
      }
    }
  } catch (err) {
    console.warn('[Sitemap] Supabase fetch error:', err.message);
  }

  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastmod || now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /v1/

Sitemap: ${baseUrl}/sitemap.xml
`;

  // Write to public & dist
  const root = path.resolve(__dirname, '../../frontend');
  fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(root, 'public/robots.txt'), robotsTxt);

  if (fs.existsSync(path.join(root, 'dist'))) {
    fs.writeFileSync(path.join(root, 'dist/sitemap.xml'), sitemapXml);
    fs.writeFileSync(path.join(root, 'dist/robots.txt'), robotsTxt);
  }

  console.log(`✅ [Sitemap] Generated ${allRoutes.length} canonical URLs for ${baseUrl}`);
  return { allRoutes, sitemapXml, robotsTxt };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
