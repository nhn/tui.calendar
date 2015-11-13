/*eslint-disable*/
var istanbul = require('browserify-istanbul');
var hbsfy = require('hbsfy');
var preprocessify = require('preprocessify');
var CONTEXT = {
    BUNDLE_TYPE: 'Release',
    CSS_PREFIX: 'dooray-calendar-'
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine-jquery',
            'browserify',
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
            transform:[hbsfy, preprocessify(CONTEXT), istanbul({
                ignore: [
                    '**/*.hbs',
                    'index.js', 
                    '**/test/**',
                    '**/template/**'
                ]
            })]
        },
        preprocessPreprocessor: {
            context: CONTEXT
        },
        reporters: [
            'dots',
            'coverage',
            'junit'
        ],
        coverageReporter: {
            dir: 'report/',
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'html'
            }]
        },
        junitReporter: {
            outputDir: 'report/junit',
            suite: ''
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        autoWatchBatchDelay: 1000,
        browsers: ['Chrome'],
        singleRun: false,
        browserNoActivityTimeout: 30000
    });
};
