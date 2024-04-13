import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      utils: '/src/utils',
      styles: '/src/styles',
      schemas: '/src/schemas',
      pages: '/src/pages',
      constants: '/src/constants'
    }
  }
});
