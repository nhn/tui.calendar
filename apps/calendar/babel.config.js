module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        shippedProposals: true,
        targets: 'defaults',
      },
    ],
    ['@babel/preset-typescript', { jsxPragma: 'h' }],
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
  ],
};
