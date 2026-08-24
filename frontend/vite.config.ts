import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import robots from 'vite-plugin-robots-txt';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

const SITE_URL = process.env.VITE_SITE_URL || 'https://rahnoxa.rahnoxa-tech.workers.dev';

export default defineConfig({
  plugins: [
    react(),

    // ✅ Auto Inject Meta Tags
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Rahnoxa – Software Development & Technology Engineering',
          description:
            'Rahnoxa builds custom web applications, mobile apps, enterprise ERP modules, SaaS platforms, and API integrations for modern businesses.',
          keywords:
            'Rahnoxa, software development, web applications, mobile apps, custom ERP, SaaS engineering, enterprise software, API integration',
          ogTitle: 'Rahnoxa – Software Development & Technology Engineering',
          ogDescription:
            'Software engineering company building web applications, mobile apps, ERP systems, and custom software.',
          ogUrl: SITE_URL,
          ogImage: `${SITE_URL}/og-image.png`,
          twitterCard: 'summary_large_image',
          twitterCreator: '@RahnoxaOfficial',
        },
      },
    }),

    // ✅ Cloudflare Pages SPA fallback — copy index.html → 404.html
    {
      name: 'cloudflare-spa-fallback',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        copyFileSync(
          resolve(distDir, 'index.html'),
          resolve(distDir, '404.html')
        );
        console.log('✅ Copied index.html → 404.html (Cloudflare SPA fallback)');
      },
    },
  ],

  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
      },
    },
  },
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

