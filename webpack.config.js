const webpack = require('webpack');
const Path = require('path');

module.exports = {
  entry: './app/js/index.js',
  output: {
    path: Path.resolve(__dirname, 'dist/public/js'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader?presets[]=es2015'}
    ]
  },
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin(),
//   ]
};