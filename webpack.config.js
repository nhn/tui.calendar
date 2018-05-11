/* eslint-env es6 */
/* eslint strict: 0, no-process-env: 0 */

var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var stylus = require('stylus');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
var stylusLoader = ExtractTextPlugin.extract('style', `preprocess?${context}!css?sourceMap!stylus?sourceMap!`);
var jsLoader = `preprocess?${context}`;
var devtool = '#source-map';

module.exports = {
    eslint: {
        failOnError: isProduction
    },
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
        loaders: [{
            test: /\.hbs$/,
            loader: 'handlebars-template'
        }, {
            test: /\.styl$/,
            loader: stylusLoader
        }, {
            test: /\.js$/,
            loader: jsLoader,
            exclude: /node_modules|bower_components/
        }, {
            test: /\.css$/,
            loader: stylusLoader,
            include: path.join(__dirname, 'src/css/main.styl')
        }]
    },
    stylus: {
        define: {
            url: stylus.url({paths: [path.join(__dirname, 'src/css/image')]})
        }
    },
    devtool,
    plugins: [
        new ExtractTextPlugin(FILENAME + '.css'),
        new webpack.BannerPlugin(BANNER, {entryOnly: true}),
        new SafeUmdPlugin()
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
