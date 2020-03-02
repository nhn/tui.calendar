const path = require('path');
const custom = require('../webpack.dev.config')({}, {});

module.exports = ({ config }) => {
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
