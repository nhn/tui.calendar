import react from '@vitejs/plugin-react';
import * as path from 'path';
import type { UserConfigExport } from 'vite';
import { defineConfig } from 'vite';

const commonConfig: UserConfigExport = {
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  server: {
    open: '/example/index.html',
  },
};

export default defineConfig(({ command }) => {
  // for dev config
  if (command === 'serve') {
    return commonConfig;
  }

  // for build config
  return {
    ...commonConfig,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/calendar.tsx'),
        name: 'toastui.ReactCalendar',
        type: ['es', 'umd'],
        fileName: (format) => `toastui-react-calendar.${format === 'es' ? 'm' : ''}js`,
      },
    },
  };
});
