/* eslint-env es6 */
/* eslint strict: 0, no-process-env: 0 */

var path = require('path');
var stylus = require('stylus');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';

var context = JSON.stringify({
    CSS_PREFIX: 'dooray-calendar-',
    BUNDLE_TYPE: (isProduction ? 'Release' : 'Debug')
});

var stylusLoader = ExtractTextPlugin.extract('style', `css!preprocess?${context}!stylus`);

var jsLoader = `preprocess?${context}`;

var plugins = [new ExtractTextPlugin('bundle.css')];

var devtool = isProduction ? null : '#cheap-module-eval-source-map';

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/public'
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
    plugins
};
