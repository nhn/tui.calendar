module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          shippedProposals: true,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread'
    ],
  };
};
