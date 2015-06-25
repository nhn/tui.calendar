/*eslint-disable*/
module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: [
            'jasmine'
        ],

        files: [
            'node_modules/moment/moment.js',
            'dist/app.js',
            'test/**/*.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'dist/app.js': ['coverage']
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

        autoWatch: true,

        browsers: [
            'PhantomJS'
        ],

        singleRun: false,

        browserNoActivityTimeout: 30000
    });
};
