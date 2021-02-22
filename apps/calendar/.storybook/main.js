const path = require('path');
const postcssPrefixer = require('postcss-prefixer');
const prefix = 'toastui-calendar-';

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{
          loader: require.resolve('ts-loader'),
      }],
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { plugins: [postcssPrefixer({ prefix })] }
        },
        'sass-loader'
      ]
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/modules': path.resolve(
        __dirname,
        '..',
        'node_modules/core-js/modules'
      ),
      '@src': path.resolve(__dirname, '../src/'),
      '@t': path.resolve(__dirname, '../types/'),
      "@stories": path.resolve(__dirname, '../stories/'),
    };

    // Return the altered config
    return config;
  },
}
