import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

const commonConfig = {
  plugins: [createVuePlugin()],
};

export default defineConfig(({ command, mode }) => {
  // dev config
  if (command === 'serve') {
    return {
      ...commonConfig,
      resolve: {
        alias: {
          vue: 'vue/dist/vue',
        },
      },
      server: {
        open: '/example/index.html',
      },
    };
  }

  // build config
  const shouldMinify = mode.includes('minify');
  const isESM = mode.includes('esm');
  const isIE11 = mode.includes('ie11');

  const filenameBase = `toastui-vue-calendar${isIE11 ? '.ie11' : ''}${shouldMinify ? '.min' : ''}`;

  const buildConfig = {
    ...commonConfig,
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/Calendar.js'),
        name: 'tui.VueCalendar',
        formats: isESM ? ['es'] : ['umd'],
        fileName: (format) => `${filenameBase}${format === 'es' ? '.m' : '.'}js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      minify: shouldMinify,
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
  }

  return buildConfig;
});
