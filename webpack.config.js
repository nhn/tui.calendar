const pkg = require('./package.json');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const { minify } = argv;
  const prefix = 'tui-calendar-';
  const filename = `${pkg.name}${minify ? '.min' : ''}.css`;

  const config = {
    mode: 'production',
    entry: ['./src/sass/index.scss', './src/ts/index.ts'],
    module: {
      rules: [
        // transpile libraries to es5
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'node_modules/@toast-ui/date/'),
          loader: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: [postcssPrefixer({ prefix })] }
            },
            {
              loader: 'sass-loader',
              options: { sassOptions: { outputStyle: 'expanded' } }
            }
          ]
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [new StyleLintPlugin(), new MiniCssExtractPlugin({ filename })]
  };

  // lint and check type once
  if (!Boolean(minify)) {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' }
        },
        {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
            cache: false
          }
        }
      ]
    });
  } else {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
            transpileOnly: true
          }
        }
      ]
    });
  }

  return merge(common(env, argv), config);
};
