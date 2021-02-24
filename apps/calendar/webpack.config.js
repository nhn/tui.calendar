/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const { minify } = argv;
  const prefix = 'toastui-calendar-';
  const filename = `toastui-calendar${minify ? '.min' : ''}.css`;

  const config = {
    mode: 'production',
    entry: ['./src/sass/index.scss', './src/index.ts'],
    module: {
      rules: [
        // transpile libraries to es5
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: [postcssPrefixer({ prefix })] },
            },
            {
              loader: 'sass-loader',
              options: { sassOptions: { outputStyle: 'expanded' } },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          use: 'url-loader',
        },
      ],
    },
    plugins: [new StyleLintPlugin(), new MiniCssExtractPlugin({ filename })],
  };

  return merge(common(env, argv), config);
};
