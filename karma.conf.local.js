/*eslint-disable*/
var istanbul = require('browserify-istanbul');
var hbsfy = require('hbsfy');

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
            'src/**/*.js': ['browserify'],
            'src/js/view/template/helper.js': ['browserify']
        },

        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform:[hbsfy, istanbul({
                ignore: [
                    'index.js', 
                    '**/test/**',
                    '**/template/**'
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
            outputDir: 'report/junit',
            suite: ''
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Firefox'],

        singleRun: false,

        browserNoActivityTimeout: 30000
    });
};
