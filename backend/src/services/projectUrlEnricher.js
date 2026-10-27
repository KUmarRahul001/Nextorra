/**
 * Project URL Enricher & Web Metadata Extractor
 * Fetches OpenGraph tags, title, meta description, and repository info (GitHub)
 * to automatically prefill project showcase fields in the admin panel.
 */

export class ProjectUrlEnricher {
  static async extractFromUrl(targetUrl) {
    if (!targetUrl || typeof targetUrl !== 'string') {
      throw new Error('Valid URL is required');
    }

    const trimmedUrl = targetUrl.trim();
    let urlObj;
    try {
      urlObj = new URL(trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`);
    } catch {
      throw new Error('Invalid URL format');
    }
    const normalizedUrl = urlObj.toString();

    // Defense against SSRF: block requests to loopback, private ranges, and cloud metadata
    const host = urlObj.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '0.0.0.0' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)
    ) {
      throw new Error('Access to local, internal, or cloud metadata network addresses is prohibited.');
    }

    // Check if it's a GitHub repository URL
    if (urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com') {
      return await this.extractFromGithub(urlObj, normalizedUrl);
    }

    // Default: Generic web page / demo link metadata extraction
    return await this.extractFromWebpage(normalizedUrl);
  }

  static async extractFromGithub(urlObj, rawUrl) {
    const parts = urlObj.pathname.split('/').filter(Boolean);
    const owner = parts[0];
    const repo = parts[1];

    if (!owner || !repo) {
      return await this.extractFromWebpage(rawUrl);
    }

    let repoData = null;
    let languages = [];

    // Attempt GitHub public REST API (rate limited to 60 req/hr unauthenticated, gracefully fall back if needed)
    try {
      const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RahnoxaProjectEnricher/1.0; +https://rahnoxa.com)',
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (apiRes.ok) {
        repoData = await apiRes.json();
      }
    } catch {
      // Ignore API failure, proceed with HTML scraping or fallback
    }

    if (repoData) {
      // Attempt to get languages
      try {
        const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RahnoxaProjectEnricher/1.0; +https://rahnoxa.com)',
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (langRes.ok) {
          const langObj = await langRes.json();
          languages = Object.keys(langObj).slice(0, 8);
        }
      } catch {
        // Ignore language API errors
      }

      const formattedName = repoData.name
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const topics = Array.isArray(repoData.topics) ? repoData.topics : [];
      const techList = Array.from(new Set([...languages, ...topics]))
        .slice(0, 10)
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1));

      return {
        title: formattedName,
        slug: repoData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_description: repoData.description || `Open-source engineering repository ${owner}/${repo}.`,
        full_description: `${formattedName} is an engineering project built with ${techList.join(', ') || 'modern web technologies'}. ${repoData.description ? repoData.description + '\n\n' : ''}Includes production architecture, automated CI/CD workflows, and developer documentation.`,
        technologies: techList.length > 0 ? techList : ['TypeScript', 'React', 'Node.js'],
        category: this.detectCategory(repoData.name, repoData.description, techList),
        demo_url: repoData.homepage || '',
        github_url: repoData.html_url || rawUrl,
        thumbnail: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
        images: [`https://opengraph.githubassets.com/1/${owner}/${repo}`],
        seo_title: `${formattedName} – Architecture & Engineering Showcase`,
        seo_description: repoData.description ? repoData.description.slice(0, 155) : `Technical case study and architecture overview for ${formattedName}.`,
      };
    }

    // If GitHub API was rate limited or inaccessible, fall back to scraping raw HTML metadata
    return await this.extractFromWebpage(rawUrl);
  }

  static async extractFromWebpage(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let html = '';
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        html = await res.text();
      }
    } catch (err) {
      clearTimeout(timeout);
      // If fetch fails, return minimal default derived from URL domain
      const domain = new URL(url).hostname.replace(/^www\./, '');
      const cleanName = domain.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        title: cleanName,
        slug: cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        short_description: `Production digital solution hosted at ${domain}.`,
        full_description: `Comprehensive web application deployed for ${cleanName}, engineered with high performance, scalability, and modern UI/UX standards.`,
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        category: 'Web App',
        demo_url: url,
        github_url: '',
        thumbnail: '/assets/image.png',
        images: ['/assets/image.png'],
        seo_title: `${cleanName} – Engineering Showcase`,
        seo_description: `Technical case study and architecture overview for ${cleanName}.`,
      };
    }

    // Extract tags via RegExp without heavy DOM libraries
    const getMeta = (property) => {
      const regex = new RegExp(`<meta\\s+(?:[^>]*?\\s+)?(?:name|property)=["'](?:og:)?${property}["']\\s+content=["']([^"']*)["']`, 'i');
      const altRegex = new RegExp(`<meta\\s+content=["']([^"']*)["']\\s+(?:name|property)=["'](?:og:)?${property}["']`, 'i');
      const m = html.match(regex) || html.match(altRegex);
      return m ? m[1].trim() : '';
    };

    const decodeHtmlEntities = (str) => {
      if (!str) return '';
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–');
    };

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const rawTitle = decodeHtmlEntities(getMeta('title') || (titleMatch ? titleMatch[1].trim() : ''));
    const cleanTitle = rawTitle
      .replace(/\s*[-–—|]\s*(?:Home|Official Site|GitHub|Company|Inc|LLC).*$/i, '')
      .trim();

    const description = decodeHtmlEntities(getMeta('description'));
    const image = getMeta('image');

    // Parse detected technologies from HTML content hints
    const detectedTech = new Set();
    const lowerHtml = html.toLowerCase();
    if (lowerHtml.includes('react')) detectedTech.add('React');
    if (lowerHtml.includes('next.js') || lowerHtml.includes('nextjs') || lowerHtml.includes('/_next/')) detectedTech.add('Next.js');
    if (lowerHtml.includes('vue')) detectedTech.add('Vue.js');
    if (lowerHtml.includes('tailwind')) detectedTech.add('Tailwind CSS');
    if (lowerHtml.includes('typescript')) detectedTech.add('TypeScript');
    if (lowerHtml.includes('vite')) detectedTech.add('Vite');
    if (lowerHtml.includes('node')) detectedTech.add('Node.js');
    if (lowerHtml.includes('python')) detectedTech.add('Python');
    if (lowerHtml.includes('graphql')) detectedTech.add('GraphQL');
    if (lowerHtml.includes('supabase')) detectedTech.add('Supabase');
    if (lowerHtml.includes('postgresql') || lowerHtml.includes('postgres')) detectedTech.add('PostgreSQL');

    const techList = detectedTech.size > 0
      ? Array.from(detectedTech)
      : ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'];

    const domain = new URL(url).hostname.replace(/^www\./, '');
    const finalTitle = cleanTitle || domain.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const slug = finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Resolve relative image URLs
    let resolvedImage = image;
    if (resolvedImage && !resolvedImage.startsWith('http')) {
      try {
        resolvedImage = new URL(resolvedImage, url).toString();
      } catch {
        resolvedImage = '/assets/image.png';
      }
    }

    return {
      title: finalTitle,
      slug,
      short_description: description || `Production digital platform and web architecture deployed at ${domain}.`,
      full_description: `${finalTitle} is a modern enterprise web application built to solve key business requirements. It utilizes ${techList.join(', ')} to deliver low-latency performance, robust data isolation, and responsive UI design.\n\n${description || ''}`,
      technologies: techList,
      category: this.detectCategory(finalTitle, description, techList),
      demo_url: url,
      github_url: '',
      thumbnail: resolvedImage || '/assets/image.png',
      images: resolvedImage ? [resolvedImage] : ['/assets/image.png'],
      seo_title: `${finalTitle} – Architecture & Engineering Showcase`,
      seo_description: (description || `Technical case study and architecture overview for ${finalTitle}.`).slice(0, 155),
    };
  }

  static detectCategory(title = '', desc = '', tech = []) {
    const text = `${title} ${desc} ${tech.join(' ')}`.toLowerCase();
    if (text.includes('mobile') || text.includes('react native') || text.includes('flutter') || text.includes('android') || text.includes('ios')) {
      return 'Mobile App';
    }
    if (text.includes('erp') || text.includes('inventory') || text.includes('billing') || text.includes('accounting') || text.includes('crm')) {
      return 'ERP';
    }
    if (text.includes('saas') || text.includes('subscription') || text.includes('b2b') || text.includes('platform')) {
      return 'SaaS';
    }
    if (text.includes('design') || text.includes('figma') || text.includes('ui/ux') || text.includes('branding')) {
      return 'Design';
    }
    if (text.includes('ai') || text.includes('machine learning') || text.includes('llm') || text.includes('model') || text.includes('neural')) {
      return 'AI / ML';
    }
    if (text.includes('cloud') || text.includes('docker') || text.includes('kubernetes') || text.includes('aws') || text.includes('devops')) {
      return 'Cloud Architecture';
    }
    if (text.includes('website') || text.includes('landing') || text.includes('portfolio') || text.includes('corporate')) {
      return 'Website';
    }
    return 'Web App';
  }
}
