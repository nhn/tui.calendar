/* eslint-env es6 */
/* eslint strict: 0, no-process-env: 0 */

var path = require('path');

var context = JSON.stringify({
    CSS_PREFIX: 'dooray-calendar-',
    BUNDLE_TYPE: 'Debug'
});

module.exports = function(config) {
    config.set({
        plugins: [
            'karma-fixture',
            'karma-html2js-preprocessor',
            'karma-json-fixtures-preprocessor',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-coverage',
            'istanbul-instrumenter-loader'
        ],
        basePath: '',
        frameworks: [
            'fixture',
            'jasmine-ajax',
            'jasmine'
        ],
        files: [
            'node_modules/underscore/underscore.js',
            'bower_components/tui-code-snippet/code-snippet.js',
            'test/fixtures/**/*',
            'test/index.js'
        ],
        exclude: [],
        preprocessors: {
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/index.js': ['webpack', 'sourcemap'],
            'test/fixtures/**/*.html': ['html2js'],
            'test/fixtures/**/*.json': ['json_fixtures']
        },
        jsonFixturesPreprocessor: {
            variableName: '__json__'
        },
        webpack: {
            devtool: '#inline-source-map',
            module: {
                preLoaders: [{
                    test: /\.js$/,
                    include: path.resolve('src/js/'),
                    loader: 'istanbul-instrumenter'
                }],
                loaders: [{
                    test: /\.hbs$/,
                    loader: 'handlebars-template'
                }, {
                    test: /\.js$/,
                    loader: `preprocess?${context}`,
                    exclude: /node_modules|bower_components/
                }]
            },
            resolve: {
                root: path.resolve('./src/js')
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['spec', 'coverage'],
        specReporter: {
            suppressSkipped: true,
            suppressPassed: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    });
};
