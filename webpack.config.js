const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ES6 = 'es6';
const ES5 = 'es5';
const isMinify = process.argv.indexOf('--minify') >= 0;
const isDevServer = process.env.DEV_SERVER === 'true';
const target = process.env.TARGET || ES5;
const isES6 = target === ES6;
const tsConfigFileName = target === ES6 ? 'tsconfig.es6.json' : 'tsconfig.json';
const JS_FILENAME = pkg.name + (isES6 ? `.${ES6}` : '') + (isMinify ? '.min' : '');
const CSS_FILENAME = pkg.name + (isMinify ? '.min' : '');
const BANNER = [
  'TOAST UI Calendar',
  '@version ' + pkg.version + ' | ' + new Date().toDateString(),
  '@author ' + pkg.author,
  '@license ' + pkg.license
].join('\n');
const CSS_PREFIX = 'tui-calendar-';

module.exports = (env, { mode = 'development' }) => {
  const isProduction = mode === 'production';
  const config = {
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
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
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
                sassOptions: {
                  outputStyle: 'expanded'
                }
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
    optimization: {
      minimize: false
    }
  };

  if (Boolean(isMinify)) {
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin()]
    };
  }

  if (mode === 'development') {
    config.devServer = {
      historyApiFallback: false,
      host: '0.0.0.0',
      disableHostCheck: true
    };
  }

  return config;
};
