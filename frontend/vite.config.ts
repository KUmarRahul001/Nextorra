import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import robots from 'vite-plugin-robots-txt';
import { createHtmlPlugin } from 'vite-plugin-html';
import { resolve } from 'path';
import { copyFileSync, existsSync, createReadStream } from 'fs';

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

    // ✅ Serve static PDF directly in Vite dev server without SPA fallback
    {
      name: 'serve-pdf-directly',
      configureServer(server) {
        server.middlewares.stack.unshift({
          route: '',
          handle: (req, res, next) => {
            const url = req.url || '';
            if (url === '/Rahnoxa_Corporate_Brochure.pdf' || url.startsWith('/Rahnoxa_Corporate_Brochure.pdf?')) {
              const pdfPath = resolve(__dirname, 'public/Rahnoxa_Corporate_Brochure.pdf');
              if (existsSync(pdfPath)) {
                res.writeHead(200, {
                  'Content-Type': 'application/pdf',
                  'Content-Disposition': 'inline; filename="Rahnoxa_Corporate_Brochure.pdf"',
                });
                createReadStream(pdfPath).pipe(res);
                return;
              }
            }
            next();
          }
        });
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

