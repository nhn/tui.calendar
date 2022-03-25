const path = require('path');
const custom = require('../webpack.dev.config.js')({}, {});

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    config.module.rules = custom.module.rules;

    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/modules': path.resolve(__dirname, '../../../node_modules/core-js/modules'),
      '@src': path.resolve(__dirname, '../src/'),
      '@t': path.resolve(__dirname, '../types/'),
      '@stories': path.resolve(__dirname, '../stories/'),
    };

    return config;
  },
};
