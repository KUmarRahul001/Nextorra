import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://nextorra.netlify.app',
      changefreq: 'monthly',
      priority: 0.8,
      dynamicRoutes: [
        '/',                         // homepage
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
    })
  ],
  build: {
    outDir: 'dist',
  },
});
