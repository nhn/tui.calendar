/* eslint-disable prefer-template */
const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const BANNER = [
  'TOAST UI Date',
  '@version ' + pkg.version + ' | ' + new Date().toDateString(),
  '@author ' + pkg.author,
  '@license ' + pkg.license,
].join('\n');

module.exports = (env, args) => {
  const { minify } = env;
  const { mode = 'development' } = args;
  const config = {
    entry: './src/index.js',
    output: {
      library: ['toastui', 'Date'],
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.join(__dirname, 'dist'),
      filename: 'toastui-date' + (minify ? '.min' : '') + '.js',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: BANNER,
        entryOnly: true,
      }),
      new ESLintPlugin(),
    ],
    devtool: 'source-map',
  };

  if (mode === 'production') {
    config.optimization = {
      minimize: Boolean(minify),
    };
  }

  return config;
};
