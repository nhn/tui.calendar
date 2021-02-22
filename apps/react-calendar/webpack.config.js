const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'toastui-react-calendar.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  externals: {
    'tui-calendar': {
      commonjs: 'tui-calendar',
      commonjs2: 'tui-calendar'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = () => config;
