/* eslint-disable consts-on-top, no-process-env, require-jsdoc */
/* eslint-disable no-process-env, require-jsdoc */
'use strict';

var path = require('path');
var webdriverConfig = {
    hostname: 'fe.nhnent.com',
    port: 4444,
    remoteHost: true
};

var context = JSON.stringify({
    CSS_PREFIX: 'tui-full-calendar-',
    BUNDLE_TYPE: 'Debug'
});

function setConfig(defaultConfig, server) {
    if (server === 'ne') {
        defaultConfig.customLaunchers = {
            'IE9': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '9'
            },
            'IE10': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '10'
            },
            'IE11': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'internet explorer',
                version: '11',
                platformName: 'windows'
            },
            'Edge': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'MicrosoftEdge'
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
            },
            'Safari-WebDriver': {
                base: 'WebDriver',
                config: webdriverConfig,
                browserName: 'safari'
            }
        };
        defaultConfig.browsers = [
            'IE9',
            'IE10',
            'IE11',
            'Edge',
            'Chrome-WebDriver',
            'Firefox-WebDriver'
            // 'Safari-WebDriver'
        ];
        defaultConfig.concurrency = 1;
        defaultConfig.reporters.push('coverage');
        // defaultConfig.reporters.push('junit');
        defaultConfig.coverageReporter = {
            dir: 'report/coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir: function(browser) {
                        return 'report-html/' + browser;
                    }
                },
                {
                    type: 'cobertura',
                    subdir: function(browser) {
                        return 'report-cobertura/' + browser;
                    },
                    file: 'cobertura.txt'
                }
            ]
        };
        // defaultConfig.junitReporter = {
        //     outputDir: 'report',
        //     suite: ''
        // };
    } else {
        defaultConfig.browsers = [
            'ChromeHeadless'
        ];
    }
}

module.exports = function(config) {
    var defaultConfig = {
        basePath: '',
        // plugins: [
        //     'karma-fixture',
        //     'karma-html2js-preprocessor',
        //     'karma-json-fixtures-preprocessor',
        //     'karma-jasmine',
        //     'karma-jasmine-ajax',
        //     'karma-webpack',
        //     'karma-sourcemap-loader',
        //     'karma-chrome-launcher',
        //     'karma-spec-reporter',
        //     'karma-coverage',
        //     'istanbul-instrumenter-loader'
        // ],
        frameworks: [
            'fixture',
            'jasmine-ajax',
            'jasmine'
        ],
        files: [
            'node_modules/tui-code-snippet/dist/tui-code-snippet.js',
            'test/fixtures/**/*',
            'test/index.js'
        ],
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
            mode: 'development',
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.hbs$/,
                        loader: 'handlebars-template-loader',
                        exclude: /node_modules|bower_components/
                    },
                    {
                        test: /\.js$/,
                        loader: 'istanbul-instrumenter-loader',
                        enforce: 'pre',
                        exclude: /test|node_modules|bower_components/
                    },
                    {
                        test: /\.js$/,
                        loader: 'preprocess-loader?' + context,
                        exclude: /node_modules|bower_components/
                    }
                ]
            },
            resolve: {
                modules: [path.resolve('./src/js'), 'node_modules']
            }
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
        singleRun: true
    };

    /* eslint-disable */
    setConfig(defaultConfig, process.env.KARMA_SERVER);
    config.set(defaultConfig);
};
