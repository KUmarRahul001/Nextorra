import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';

export default defineConfig({
  plugins: [
    react(),

    // ✅ Auto-generate Sitemap
    sitemap({
      hostname: 'https://nextorra.netlify.app',
      changefreq: 'monthly',
      priority: 0.8,
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
        '/terms-and-conditions'
      ],
    }),

    // ✅ Auto-generate Robots.txt
    robots({
      // this plugin copies a pre-built robots file from the specified directory
      robotsDir: 'public',
      outputRobotsFileName: 'robots.txt',
      enableDebug: true,
    }),
  ],

  build: {
    outDir: 'dist',
  },
});
