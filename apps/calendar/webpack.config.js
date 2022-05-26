/* eslint @typescript-eslint/no-var-requires: "off" */
const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { merge } = require('webpack-merge');

function getBabelConfig(isIE11) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.22',
          targets: `defaults${isIE11 ? '' : ', not ie 11'}`,
        },
      ],
      ['@babel/preset-typescript', { jsxPragma: 'h' }],
    ],
    plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }]],
  };
}

module.exports = ({ minify, ie11 }) => {
  const shouldMinify = !!minify;
  const isIE11 = !!ie11;

  const filenameBase = `toastui-calendar${isIE11 ? '.ie11' : ''}${shouldMinify ? '.min' : ''}`;
  const banner = [
    'TOAST UI Calendar 2nd Edition',
    `@version ${pkg.version} | ${new Date().toDateString()}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`,
  ].join('\n');

  const commonConfig = {
    output: {
      library: ['toastui', 'Calendar'],
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.join(__dirname, 'dist'),
      filename: `${filenameBase}.js`,
      publicPath: '/dist',
      globalObject: 'this',
    },
    externals: {
      'tui-date-picker': {
        commonjs: 'tui-date-picker',
        commonjs2: 'tui-date-picker',
        amd: 'tui-date-picker',
        root: ['tui', 'DatePicker'],
      },
      'tui-time-picker': {
        commonjs: 'tui-time-picker',
        commonjs2: 'tui-time-picker',
        amd: 'tui-time-picker',
        root: ['tui', 'TimePicker'],
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@src': path.resolve(__dirname, './src/'),
        '@t': path.resolve(__dirname, 'types/'),
      },
    },
    plugins: [
      new webpack.BannerPlugin({
        banner,
        entryOnly: true,
      }),
      new ESLintPlugin({ extensions: ['.tsx', '.ts', '.js'] }),
    ],
    optimization: shouldMinify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
        }
      : {
          minimize: false,
        },
  };

  const config = {
    mode: 'production',
    entry: ['./src/css/index.css', './src/index.ts'],
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: getBabelConfig(isIE11),
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
            'postcss-loader',
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [new StyleLintPlugin(), new MiniCssExtractPlugin({ filename: `${filenameBase}.css` })],
  };

  return merge(commonConfig, config);
};
