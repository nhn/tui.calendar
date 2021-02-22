/* eslint-disable prefer-template */
const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');

const BANNER = [
  'TOAST UI Date',
  '@version ' + pkg.version + ' | ' + new Date().toDateString(),
  '@author ' + pkg.author,
  '@license ' + pkg.license
].join('\n');

module.exports = (env, { mode = 'development', minify }) => {
  const config = {
    entry: './src/index.js',
    output: {
      library: ['toastui', 'Date'],
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.join(__dirname, 'dist'),
      filename: 'toastui-date' + (minify ? '.min' : '') + '.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader']
        }
      ]
    },
    plugins: [
      new SafeUmdPlugin(),
      new webpack.BannerPlugin({
        banner: BANNER,
        entryOnly: true
      })
    ],
    devtool: 'source-map'
  };

  if (mode === 'production') {
    config.optimization = {
      minimize: Boolean(minify)
    };
  }

  return config;
};
