import legacy from '@vitejs/plugin-legacy';
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

function getIE11Config(): UserConfigExport {
  return {
    build: {
      rollupOptions: {
        input: 'src/ie11.ts',
        output: {
          entryFileNames: 'toastui-react-calendar.ie11.js',
        },
      },
      emptyOutDir: false,
      minify: 'terser',
      terserOptions: {
        ecma: 5,
      },
    },
    plugins: [
      legacy({
        targets: ['ie >= 11'],
        // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
    ],
  };
}

export default defineConfig(({ command, mode }) => {
  const isIE11 = mode === 'ie11';

  // for dev config
  if (command === 'serve') {
    return commonConfig;
  }

  // for build config
  return {
    ...commonConfig,
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'toastui.ReactCalendar',
        fileName: (format) => `toastui-react-calendar.${format === 'es' ? 'm' : ''}js`,
      },
    },
    ...(isIE11 ? getIE11Config() : {}),
  };
});
