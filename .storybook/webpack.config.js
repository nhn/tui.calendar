const path = require('path');

module.exports = ({ config, mode, defaultConfig }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    },
    {
      test: /\.tsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }
  );
  config.resolve.extensions.push('.ts', '.tsx', '.js');
  Object.assign(config.resolve.alias, {
    '@stories': path.resolve(__dirname, '../stories')
  });

  return config;
};
