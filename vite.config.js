import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Add other large dependencies here
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Optional: Increase the warning limit to 1000 kB
  }
});