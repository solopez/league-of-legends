import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/league-of-legends/',
  plugins: [react(), tailwindcss()],
  envDir: './src/environments',
});
