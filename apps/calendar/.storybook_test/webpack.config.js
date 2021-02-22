const path = require('path');
/*
module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }
  );

  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    ...config.resolve.alias,
    '@src': path.resolve(__dirname, '../src/'),
    '@t': path.resolve(__dirname, '../types/'),
    "@stories": path.resolve(__dirname, '../stories/'),
  };

  return config;
};
*/

module.exports = ({ config }) => {
  let custom;
  if (config.mode === 'production') {
    custom = require('../webpack.config')({}, { minify: true });
  } else {
    custom = require('../webpack.dev.config')({}, {});
  }

  return {
    ...config,
    entry: [...config.entry, ...custom.entry],
    resolve: {
      ...config.resolve,
      ...custom.resolve,
      alias: {
        ...config.resolve.alias,
        ...custom.resolve.alias,
        '@stories': path.resolve(__dirname, '../stories')
      }
    },
    module: {
      ...config.module,
      rules: custom.module.rules
    },
    plugins: [...config.plugins, ...custom.plugins]
  };
};

