/*eslint-disable*/
var istanbul = require('browserify-istanbul');
var hbsfy = require('hbsfy');
var preprocessify = require('preprocessify');

var preprocessOption = {
    BUNDLE_TYPE: 'Release',
    CSS_PREFIX: 'dooray-calendar-'
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine-jquery',
            'browserify',
            'source-map-support',
            'jasmine-ajax',
            'jasmine'
        ],
        files: [
            'node_modules/underscore/underscore.js',
            'node_modules/tui-code-snippet/code-snippet.js',
            'index.js',
            'src/**/*.js',
            'test/prepare.js',
            'test/**/*.spec.js',
            'test/fixtures/**/*'
        ],
        exclude: [],
        preprocessors: {
            'test/**/*.js': ['preprocess'],
            'index.js': ['browserify'],
            'src/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform: [hbsfy, preprocessify(preprocessOption), istanbul({
                ignore: [
                    '**/*.hbs',
                    'index.js', 
                    '**/test/**',
                    '**/template/**'
                ]
            })]
        },
        preprocessPreprocessor: {
            context: preprocessOption 
        },
        coverageReporter: {
            dir: 'report/',
            reporters: [{
                type: 'html'
            }, {
                type: 'text'
            }]
        },
        reporters: [
            'coverage'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        browserNoActivityTimeout: 30000
    });
};
