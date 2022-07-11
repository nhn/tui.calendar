import * as path from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

const banner = [
  '/*!',
  ' * TOAST UI Calendar 2nd Edition',
  ` * @version ${pkg.version} | ${new Date().toDateString()}`,
  ` * @author ${pkg.author}`,
  ` * @license ${pkg.license}`,
  ' */',
].join('\n');

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: () => 'toastui-calendar.mjs',
      },
      target: 'es2015',
      rollupOptions: {
        external: ['tui-date-picker', 'tui-time-picker'],
        output: {
          banner,
        },
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@t': path.resolve(__dirname, './src/types'),
      },
    },
  };
});
