const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssPrefixer = require('postcss-prefixer');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProduction = mode => mode === 'production';
const getTsConfigFileName = es6 => (es6 ? 'tsconfig.es6.json' : 'tsconfig.json');

module.exports = (__, argv) => {
  const { mode, es6, minify } = argv;
  const filename = `${pkg.name}${es6 ? '.es6' : ''}${minify ? '.min' : ''}.js`;
  const banner = [
    'TOAST UI Calendar',
    `@version ${pkg.version} | ${new Date().toDateString()}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`
  ].join('\n');

  const config = {
    entry: ['./src/ts/index.ts'],
    output: {
      library: ['tui', 'Calendar'],
      libraryTarget: 'umd',
      libraryExport: 'default',
      path: path.join(__dirname, 'dist'),
      filename,
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
      rules: []
    },
    plugins: [
      new SafeUmdPlugin(),
      new webpack.BannerPlugin({
        banner,
        entryOnly: true
      })
    ],
    devtool: 'source-map',
    optimization: {
      minimize: false
    }
  };

  if (!es6) {
    setConfigES5(config, argv);
  } else {
    addOnlyTsLoader(config, argv);
  }

  if (Boolean(minify)) {
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

function setConfigES5(config, argv) {
  const { mode, minify, es6 } = argv;
  const isProductionMode = isProduction(mode);
  const prefix = 'tui-calendar-';
  const filename = `${pkg.name}${minify ? '.min' : ''}.css`;

  config.entry.unshift('./src/sass/index.scss');
  config.module.rules.push(
    // transpile libraries to es5
    {
      test: /\.js$/,
      include: path.resolve(__dirname, 'node_modules/@toast-ui/date/'),
      loader: 'babel-loader'
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
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
  );

  // lint and check type once
  if (!Boolean(minify)) {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: { configFile: getTsConfigFileName(es6) }
        },
        {
          loader: 'eslint-loader',
          options: {
            failOnError: isProductionMode,
            cache: !isProductionMode
          }
        }
      ]
    });
  } else {
    addOnlyTsLoader(config, argv);
  }

  config.plugins.push(new StyleLintPlugin(), new MiniCssExtractPlugin({ filename }));
}

function addOnlyTsLoader(config, { es6 }) {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: getTsConfigFileName(es6),
          transpileOnly: true
        }
      }
    ]
  });
}
