/* eslint @typescript-eslint/no-var-requires: "off" */
const postcssPrefixer = require('postcss-prefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const prefix = 'toastui-calendar-';
  const config = {
    mode: 'development',
    entry: ['./src/css/index.css', './src/index.ts'],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: { postcssOptions: { plugins: [postcssPrefixer({ prefix })] } },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [new StyleLintPlugin()],
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: false,
      host: '0.0.0.0',
      disableHostCheck: true,
    },
  };

  return merge(common(env, argv), config);
};
