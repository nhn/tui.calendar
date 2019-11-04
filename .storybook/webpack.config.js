const path = require('path');
const custom = require('../webpack.config');

module.exports = ({ config, mode, defaultConfig }) => {
  return {
    ...config,
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
      rules: custom.module.rules
    }
  };
};
