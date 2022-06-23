import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

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
  return commonConfig;
});
