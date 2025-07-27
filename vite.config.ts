// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: '/otis-kit-pro/',
  build: {
    outDir: 'dist'
  },
  server: {
    // host: true,
    // port: 8080,
    // open: true
  }
});
