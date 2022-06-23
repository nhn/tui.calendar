import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  root: 'src',
  mode: 'development',
  build: {
    outDir: '../dist',
  },
});
