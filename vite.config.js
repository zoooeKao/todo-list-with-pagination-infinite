import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    sourcemap: true,
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true, // Generate source maps for development
    build: {
      sourcemap: true, // Generate source maps for production
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/scss-variable.scss";
          @import "src/styles/scss-mixin.scss";
        `,
      },
    },
  },
  plugins: [react()],
});
