/* eslint-disable consts-on-top, no-process-env, require-jsdoc */
/* eslint-disable no-process-env, require-jsdoc */
'use strict';

const path = require('path');
const webdriverConfig = {
  hostname: 'fe.nhnent.com',
  port: 4444,
  remoteHost: true
};

function setConfig(defaultConfig, server) {
  if (server === 'ne') {
    defaultConfig.customLaunchers = {
      IE9: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '9'
      },
      IE10: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '10'
      },
      IE11: {
        base: 'WebDriver',
        config: webdriverConfig,
        browserName: 'internet explorer',
        version: '11',
        platformName: 'windows'
      },
      Edge: {
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
  } else {
    defaultConfig.browsers = ['ChromeHeadless'];
    // for local safari test
    // defaultConfig.browsers = ['Safari'];

    // Not necessary to check all browser's coverage. Do it on local only.
    defaultConfig.coverageIstanbulReporter = {
      fixWebpackSourcePaths: true,
      dir: 'report/coverage/',
      reports: ['html', 'cobertura'],
      'report-config': {
        html: {
          subdir: 'report-html/'
        },
        cobertura: {
          subdir: 'report-cobertura/',
          file: 'cobertura.txt'
        }
      }
    };
  }
}

module.exports = function(config) {
  const defaultConfig = {
    basePath: '',
    frameworks: ['fixture', 'jasmine-ajax', 'jasmine'],
    files: [
      'test-ts/index.ts',
      'test/fixtures/**/*',
      'node_modules/@babel/polyfill/dist/polyfill.js'
    ],
    preprocessors: {
      'test-ts/index.ts': ['webpack', 'sourcemap'],
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
          // transpile libraries to es5
          {
            test: /\.js$/,
            include: [path.resolve(__dirname, 'node_modules/@toast-ui/date/')],
            loader: 'babel-loader'
          },
          {
            test: /\.tsx?$/,
            exclude: path.resolve(__dirname, './test-ts'),
            loader: 'istanbul-instrumenter-loader',
            options: {
              esModules: true
            }
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: [path.resolve(__dirname, './stories'), /node_modules/]
          },
          {
            test: /\.tsx?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules'],
        alias: {
          '@src': path.resolve(__dirname, './src/ts/'),
          '@test': path.resolve(__dirname, './test-ts/')
        }
      }
    },
    reporters: ['spec', 'coverage-istanbul', 'jasmine-diff'],
    specReporter: {
      suppressSkipped: true,
      suppressPassed: true
    },
    jasmineDiffReporter: {
      multiline: true,
      pretty: true
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
