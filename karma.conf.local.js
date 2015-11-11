/*eslint-disable*/
var istanbul = require('browserify-istanbul');
var hbsfy = require('hbsfy');

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
            'src/css/*.css',
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
            'index.js': ['browserify'],
            'src/**/*.js': ['browserify'],
            'src/js/view/template/helper.js': ['browserify']
        },
        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform:[hbsfy, istanbul({
                ignore: [
                    '**/*.hbs',
                    'index.js', 
                    '**/test/**',
                    '**/template/**'
                ]
            })]
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
