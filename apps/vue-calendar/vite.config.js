import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';

const commonConfig = {
  plugins: [createVuePlugin()],
  server: {
    open: '/example/index.html',
  },
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // dev config
    return {
      ...commonConfig,
      resolve: {
        alias: {
          vue: 'vue/dist/vue',
        },
      },
    };
  }

  // build config
  return {
    ...commonConfig,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/Calendar.js'),
        name: 'toastui.VueCalendar',
        type: ['es', 'umd'],
        fileName: (format) => `toastui-vue-calendar.${format === 'es' ? 'm' : ''}js`,
      },
      // TODO: minify, ie11
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
});
