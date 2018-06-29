/* eslint-env es6 */
/* eslint strict: 0, no-process-env: 0 */

var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizaeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var SafeUmdPlugin = require('safe-umd-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';
var FILENAME = pkg.name + (isProduction ? '.min' : '');
var BANNER = [
    'TOAST UI Calendar',
    '@version ' + pkg.version + ' | ' + new Date().toDateString(),
    '@author ' + pkg.author,
    '@license ' + pkg.license
].join('\n');
var context = JSON.stringify({
    CSS_PREFIX: 'tui-full-calendar-',
    BUNDLE_TYPE: (isProduction ? 'Release' : 'Debug')
});
var preprocessLoader = `preprocess-loader?${context}`;
var devtool = 'source-map';

module.exports = {
    entry: './src/index.js',
    output: {
        library: ['tui', 'Calendar'],
        libraryTarget: 'umd',
        path: path.join(__dirname, 'dist'),
        filename: FILENAME + '.js',
        publicPath: '/dist'
    },
    externals: {
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        },
        'tui-date-picker': {
            'commonjs': 'tui-date-picker',
            'commonjs2': 'tui-date-picker',
            'amd': 'tui-date-picker',
            'root': ['tui', 'DatePicker']
        },
        'tui-time-picker': {
            'commonjs': 'tui-time-picker',
            'commonjs2': 'tui-time-picker',
            'amd': 'tui-time-picker',
            'root': ['tui', 'TimePicker']
        }
    },
    module: {
        rules: [{
            test: /\.hbs$/,
            use: 'handlebars-template-loader'
        }, {
            test: /\.styl$/,
            use: [
                MiniCssExtractPlugin.loader,
                preprocessLoader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.js$/,
            use: [
                preprocessLoader,
                {
                    loader: 'eslint-loader',
                    options: {
                        failOnError: isProduction,
                        cache: !isProduction
                    }
                }
            ],
            exclude: /node_modules|bower_components/
        }, {
            test: /\.(gif|png|jpe?g)$/,
            use: 'url-loader'
        }]
    },
    devtool,
    plugins: [
        new MiniCssExtractPlugin({
            filename: FILENAME + '.css'
        }),
        new webpack.BannerPlugin({
            banner: BANNER,
            entryOnly: true
        }),
        new SafeUmdPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizaeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false
                    }
                }
            })
        ]
    },
    devServer: {
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
