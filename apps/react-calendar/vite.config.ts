import commonjs from '@rollup/plugin-commonjs';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import type { UserConfig, UserConfigExport } from 'vite';
import { defineConfig } from 'vite';

const commonConfig: UserConfigExport = {
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
};

export default defineConfig(({ command, mode }) => {
  // for dev config
  if (command === 'serve') {
    return {
      ...commonConfig,
      server: {
        open: '/example/index.html',
      },
    };
  }

  // for build config
  const shouldMinify = mode.includes('minify');
  const isESM = mode.includes('esm');
  const isIE11 = mode.includes('ie11');

  const filenameBase = `toastui-react-calendar${isIE11 ? '.ie11' : ''}${
    shouldMinify ? '.min' : ''
  }`;

  const buildConfig: UserConfig = {
    ...commonConfig,
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'toastui.ReactCalendar',
        // 'umd' doesn't work in IE11
        formats: isESM || isIE11 ? ['es'] : ['umd'],
        fileName: (format) => `${filenameBase}${format === 'es' && !isIE11 ? '.m' : '.'}js`,
      },
      minify: shouldMinify ? 'esbuild' : false,
    },
  };

  if (isIE11) {
    Object.assign(buildConfig, {
      resolve: {
        alias: {
          '@toast-ui/calendar': '@toast-ui/calendar/ie11',
        },
      },
    });
    buildConfig.plugins.push(
      commonjs({
        transformMixedEsModules: true,
      })
    );
    buildConfig.build.rollupOptions = {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    };
  }

  return buildConfig;
});
