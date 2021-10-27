/* eslint @typescript-eslint/no-var-requires: "off" */
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    entry: ['./src/css/index.css', './src/index.ts'],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          loader: ['babel-loader'],
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
            'postcss-loader',
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [new StyleLintPlugin(), new ESLintPlugin({ extensions: ['tsx', 'ts', 'js'] })],
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: false,
      host: '0.0.0.0',
      disableHostCheck: true,
    },
  };

  return merge(common(env, argv), config);
};
