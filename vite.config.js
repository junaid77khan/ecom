import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000
  },
  build: {
    
    chunkSizeWarningLimit: 1000, // Optional: Increase the warning limit to 1000 kB
  }
});