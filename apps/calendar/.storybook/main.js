const path = require('path');
const isBuildingDocs = process.env.STORYBOOK_ENV === 'docs';

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: isBuildingDocs ? ['../**/docs/*.stories.mdx'] : ['../**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../docs/assets/'],
  babel: async (config) => {
    // Replace storybook babel preset & plugins with custom ones
    config.presets.splice(config.presets.length - 1, 1, [
      require.resolve('@babel/preset-typescript'),
      { jsxPragma: 'h', jsxPragmaFrag: 'Fragment' },
    ]);
    config.plugins.splice(config.plugins.length - 1, 1, [
      require.resolve('@babel/plugin-transform-react-jsx'),
      { pragma: 'h', pragmaFrag: 'Fragment' },
      'preset',
    ]);

    return config;
  },
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules
      .filter((rule) => !(rule?.test?.test('.css') ?? false))
      .concat([
        {
          test: /\.css$/,
          include: /(node_modules|storybook-styles)/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|storybook-styles)/,
          sideEffects: true,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            require.resolve('postcss-loader'),
          ],
        },
      ]);

    Object.assign(config.resolve.alias, {
      'core-js/modules': path.resolve(__dirname, '../../../node_modules/core-js/modules'),
      '@src': path.resolve(__dirname, '../src/'),
      '@t': path.resolve(__dirname, '../src/types/'),
      '@stories': path.resolve(__dirname, '../stories/'),
    });

    return config;
  },
};
