/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

module.exports = (env) => {
  const { minify } = env;
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
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      ],
    },
  };

  return merge(common(env), config);
};
