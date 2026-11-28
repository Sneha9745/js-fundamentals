
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor';
            }

            if (
              id.includes('/react-router/') ||
              id.includes('/react-router-dom/')
            ) {
              return 'router-vendor';
            }

            if (id.includes('/@tanstack/')) {
              return 'query-vendor';
            }

            if (id.includes('/zustand/')) {
              return 'state-vendor';
            }
          }
        },
      },
    },
  },
});
