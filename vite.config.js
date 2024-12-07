import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        // target: '0.0.0.0',
        target: 'http://localhost:4000',
        // target: 'https://todo-list.sfo1.zeabur.app/',
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
