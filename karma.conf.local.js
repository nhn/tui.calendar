/*eslint-disable*/
var istanbul = require('browserify-istanbul');

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: [
            'jasmine-jquery',
            'browserify',
            'jasmine'
        ],

        files: [
            'node_modules/underscore/underscore.js',
            'index.js',
            'src/**/*.js',
            'test/prepare.js',
            'test/**/*.spec.js',
            'test/fixtures/**/*'
        ],

        exclude: [
        ],

        preprocessors: {
            'index.js': ['browserify'],
            'src/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform:[istanbul({
                ignore: [
                    'index.js', 
                    '**/test/**'
                ]
            })]
        },

        reporters: [
            'mocha',
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
            outputFile: 'report/junit-result.xml',
            suite: ''
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        browserNoActivityTimeout: 30000
    });
};
