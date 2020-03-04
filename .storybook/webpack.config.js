const path = require('path');

module.exports = ({ config }) => {
  let custom;
  if (config.mode === 'production') {
    custom = require('../webpack.config')({}, { minify: true });
  } else {
    custom = require('../webpack.dev.config')({}, {});
  }

  return {
    ...config,
    entry: [...config.entry, ...custom.entry],
    resolve: {
      ...config.resolve,
      ...custom.resolve,
      alias: {
        ...config.resolve.alias,
        ...custom.resolve.alias,
        '@stories': path.resolve(__dirname, '../stories')
      }
    },
    module: {
      ...config.module,
      rules: [...config.module.rules, ...custom.module.rules]
    },
    plugins: [...config.plugins, ...custom.plugins]
  };
};
