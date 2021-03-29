/* eslint @typescript-eslint/no-var-requires: "off" */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const { minify } = argv;
  const prefix = 'toastui-calendar-';
  const filename = `toastui-calendar${minify ? '.min' : ''}.css`;

  const config = {
    mode: 'production',
    entry: ['./src/css/index.css', './src/index.ts'],
    module: {
      rules: [
        // transpile libraries to es5
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
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
    plugins: [
      new StyleLintPlugin(),
      new MiniCssExtractPlugin({ filename }),
      new ESLintPlugin({ extensions: ['.tsx', '.ts', '.js'] }),
    ],
  };

  return merge(common(env, argv), config);
};
