/*eslint-disable*/
var istanbul = require('browserify-istanbul');
var hbsfy = require('hbsfy');

module.exports = function(config) {
    var webdriverConfig = {
        hostname: 'fe.nhnent.com',
        port: 4444,
        remoteHost: true
    };

    config.set({
        basePath: '',

        frameworks: [
            'jasmine-jquery',
            'browserify',
            'jasmine'
        ],

        files: [
            'src/css/calendar.css',
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
            'dots',
            'coverage',
            'junit'
        ],

        coverageReporter: {
            dir: 'report/',
            reporters: [{
                type: 'cobertura',
                subdir: 'cobertura',
                file: 'cobertura.xml'
            }]
        },

        junitReporter: {
            outputDir: 'report/junit',
            suite: ''
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [
            'IE9',
            'IE10',
            'IE11',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
        ],

        customLaunchers: {
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 9
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 10
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: 11
            },
            'Chrome-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'chrome'
            },
            'Firefox-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'firefox'
            }
        },

        singleRun: true,

        browserNoActivityTimeout: 30000
    });
};
