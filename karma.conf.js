module.exports = function(config) {
    var webdriverConfig = {
        hostname: 'fe.nhnent.com',
        port: 4444,
        remoteHost: true
    };

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'src/**/*.js',
            'test/**/*.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        reporters: [
            'mocha',
            'coverage',
            'junit'
        ],

        coverageReporter: {
            type: 'html',
            dir: 'report/'
        },

        junitReporter: {
            outputFile: 'report/junit-result.xml',
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
                browserName: 'IE9' 
            },
            'IE10': {
                base: 'WebDriver', 
                config: webdriverConfig, 
                browserName: 'IE10' 
            },
            'IE11': {
                base: 'WebDriver', 
                config: webdriverConfig, 
                browserName: 'IE11' 
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
