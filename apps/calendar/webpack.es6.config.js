/* eslint-disable */
const pkg = require('./package.json');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const { minify } = argv;
  const filename = `${pkg.name}.es6${minify ? '.min' : ''}.js`;

  const config = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
      filename
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.es6.json',
                transpileOnly: true
              }
            }
          ]
        }
      ]
    }
  };

  return merge(common(env, argv), config);
};
