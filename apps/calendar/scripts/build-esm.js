/* eslint-disable @typescript-eslint/no-var-requires,no-console */
const path = require('path');
const { build } = require('esbuild');

const { version, author, license } = require('../package.json');

const banner = `
/*!
 * TOAST UI Calendar 2nd Edition
 * @version ${version} | ${new Date().toDateString()}
 * @author ${author}
 * @license ${license}
 */
`.trim();

(async () => {
  try {
    const startTime = performance.now();

    await build({
      entryPoints: [path.resolve(__dirname, '../src/index.ts')],
      bundle: true,
      outfile: path.resolve(__dirname, '../dist/esm/index.mjs'),
      format: 'esm',
      target: 'es2015',
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
      banner: {
        js: banner,
      },
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      // TODO: separate bundle without default popups
      // it always needs external modules in runtime.
      // external: ['tui-date-picker', 'tui-time-picker'],
    });

    const endTime = performance.now();
    console.log('✨ Build success in %dms', Math.floor(endTime - startTime));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
