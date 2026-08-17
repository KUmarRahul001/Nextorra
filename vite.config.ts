import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import robots from 'vite-plugin-robots-txt';
import { createHtmlPlugin } from 'vite-plugin-html'; // ✅ new plugin

export default defineConfig({
  plugins: [
    react(),

    // ✅ Sitemap Generator
    sitemap({
      hostname: 'https://nextorra.netlify.app',
      dynamicRoutes: [
        '/',
        '/get-started',
        '/internship',
        '/services',
        // ── Tier 1: Software & Engineering (canonical routes) ──
        '/services/web-development',
        '/services/full-stack-web-apps',
        '/services/app-development',
        '/services/custom-software-api-integration',
        '/services/erp-enterprise-applications',
        '/services/saas-products',
        '/services/desktop-applications',
        // ── Tier 2: Marketing & Business Support ──
        '/services/social-media-marketing',
        '/services/lead-generation',
        '/services/sms-marketing',
        '/services/email-marketing',
        '/services/missed-call-service',
        '/services/graphic-design',
        '/services/voice-call-services',
        '/privacy-policy',
        '/terms-and-conditions',
      ],
    }),

    // ✅ Robots.txt Generator
    robots({
      policies: [
        { userAgent: '*', allow: ['/'] },
        { userAgent: '*', disallow: ['/admin', '/api', '/private'] },
      ],
      sitemaps: ['https://nextorra.netlify.app/sitemap.xml'],
    }),

    // ✅ Auto Inject Meta Tags
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Nextorra – Software Development & Technology Engineering',
          description:
            'Nextorra builds custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses.',
          keywords:
            'Nextorra, software development, web applications, mobile apps, custom ERP, SaaS engineering, enterprise software, API integration',
          ogTitle: 'Nextorra – Software Development & Technology Engineering',
          ogDescription:
            'Software engineering company building web applications, mobile apps, ERP systems, and custom software.',
          ogUrl: 'https://nextorra.netlify.app',
          ogImage: 'https://nextorra.netlify.app/og-image.png',
          twitterCard: 'summary_large_image',
          twitterCreator: '@NextorraOfficial',
        },
      },
    }),
  ],

  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
        },
      },
    },
  },
});
