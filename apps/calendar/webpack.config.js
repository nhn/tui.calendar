/* eslint @typescript-eslint/no-var-requires: "off" */
const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InjectPlugin = require('webpack-inject-plugin')['default'];

const banner = [
  'TOAST UI Calendar 2nd Edition',
  `@version ${pkg.version} | ${new Date().toDateString()}`,
  `@author ${pkg.author}`,
  `@license ${pkg.license}`,
].join('\n');

function getBabelConfig(isIE11) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.22',
          targets: `defaults${isIE11 ? ', ie 11' : ''}`,
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

  const plugins = [
    new webpack.BannerPlugin({
      banner,
      entryOnly: true,
    }),
    new MiniCssExtractPlugin({ filename: `${filenameBase}.css` }),
  ];

  if (ie11) {
    plugins.unshift(new InjectPlugin(() => `import { enableES5 } from 'immer';enableES5();`));
  }

  return {
    mode: 'production',
    output: {
      library: {
        name: ['tui', 'Calendar'],
        type: 'umd',
        export: 'default',
      },
      path: path.join(__dirname, 'dist'),
      filename: `${filenameBase}.js`,
      publicPath: '/dist',
      globalObject: 'this',
    },
    externals: {
      'tui-date-picker': {
        commonjs: 'tui-date-picker',
        commonjs2: 'tui-date-picker',
        import: 'tui-date-picker',
        amd: 'tui-date-picker',
        root: ['tui', 'DatePicker'],
      },
      'tui-time-picker': {
        commonjs: 'tui-time-picker',
        commonjs2: 'tui-time-picker',
        import: 'tui-time-picker',
        amd: 'tui-time-picker',
        root: ['tui', 'TimePicker'],
      },
    },
    entry: isIE11 ? ['./src/index.ts'] : ['./src/css/index.css', './src/index.ts'],
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
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@src': path.resolve(__dirname, './src/'),
        '@t': path.resolve(__dirname, './src/types/'),
      },
    },
    plugins,
    optimization: shouldMinify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()],
        }
      : {
          minimize: false,
        },
  };
};
