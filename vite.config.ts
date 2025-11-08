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
        '/services/social-media-marketing',
        '/services/lead-generation',
        '/services/sms-marketing',
        '/services/website-design',
        '/services/full-stack-web-app',
        '/services/email-marketing',
        '/services/missed-call-service',
        '/services/graphic-design',
        '/services/voice-call-services',
        '/services/app-development',
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
          title: 'Nextorra – Affordable & Scalable Digital Solutions',
          description:
            'Nextorra provides AI-driven marketing, web development, and business automation solutions to help startups scale efficiently.',
          keywords:
            'Nextorra, digital marketing, web development, AI automation, business growth, affordable marketing, India startup agency',
          ogTitle: 'Nextorra – Digital Marketing & Automation',
          ogDescription:
            'Empowering startups with AI-driven marketing, web, and automation services.',
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
  },
});
