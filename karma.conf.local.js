/*eslint-disable*/
var istanbul = require('browserify-istanbul');

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: [
            'browserify',
            'jasmine'
        ],

        files: [
            'node_modules/moment/moment.js',
            'index.js',
            'src/**/*.js',
            'test/**/*.spec.js'
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

        browsers: [
            'PhantomJS'
        ],

        singleRun: false,

        browserNoActivityTimeout: 30000
    });
};
