const path = require('path');
const postcssPrefixer = require('postcss-prefixer');
const prefix = 'toastui-calendar-';
const custom = require('../webpack.dev.config.js')({}, {});

module.exports = {
  stories: ['@stories/**/*.stories.@(ts|tsx)'],
  webpackFinal: async (config) => {
    config.module.rules = custom.module.rules;

    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/modules': path.resolve(__dirname, '..', 'node_modules/core-js/modules'),
      '@src': path.resolve(__dirname, '../src/'),
      '@t': path.resolve(__dirname, '../types/'),
      '@stories': path.resolve(__dirname, '../stories/'),
    };

    return config;
  },
};
