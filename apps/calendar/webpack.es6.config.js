/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env, argv) => {
  const { minify } = argv;
  const filename = `toastui-calendar.es6${minify ? '.min' : ''}.js`;

  const config = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
      filename,
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js)$/,
          exclude: /node_modules/,
          loader: ['babel-loader'],
        },
      ],
    },
  };

  return merge(common(env, argv), config);
};
