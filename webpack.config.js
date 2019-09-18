const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');

const ES6 = 'es6';
const ES5 = 'es5';
const isProduction = process.env.NODE_ENV === 'production';
const isDevServer = process.env.DEV_SERVER === 'true';
const target = process.env.TARGET || ES5;
const isES6 = target === ES6;
const tsConfigFileName = target === ES6 ? 'tsconfig.es6.json' : 'tsconfig.json';
const JS_FILENAME = pkg.name + (isES6 ? `.${ES6}` : '') + (isProduction ? '.min' : '');
const CSS_FILENAME = pkg.name + (isProduction ? '.min' : '');
const BANNER = [
  'TOAST UI Calendar',
  '@version ' + pkg.version + ' | ' + new Date().toDateString(),
  '@author ' + pkg.author,
  '@license ' + pkg.license
].join('\n');
const CSS_PREFIX = 'tui-full-calendar-';

module.exports = {
  entry: ['./src/sass/index.scss', './src/ts/index.ts'],
  output: {
    library: ['tui', 'Calendar'],
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.join(__dirname, 'dist'),
    filename: JS_FILENAME + '.js',
    publicPath: '/dist'
  },
  externals: {
    'tui-date-picker': {
      commonjs: 'tui-date-picker',
      commonjs2: 'tui-date-picker',
      amd: 'tui-date-picker',
      root: ['tui', 'DatePicker']
    },
    'tui-time-picker': {
      commonjs: 'tui-time-picker',
      commonjs2: 'tui-time-picker',
      amd: 'tui-time-picker',
      root: ['tui', 'TimePicker']
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, './src/ts/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: tsConfigFileName
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: isProduction,
              cache: !isProduction
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDevServer ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                postcssPrefixer({
                  prefix: CSS_PREFIX
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new SafeUmdPlugin(),
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: CSS_FILENAME + '.css'
    }),
    new webpack.BannerPlugin({
      banner: BANNER,
      entryOnly: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: false,
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
