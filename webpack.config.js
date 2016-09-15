const path = require("path");
const webpack = require('webpack');


module.exports = {
  entry: {
    demo: './src/demo.js'
  },
  output: {
    path: "./demo-build",
    filename: 'bundle.js',
    publicPath: '/demo-build'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
         test: /\.less$/,
         loader: "style!css!less"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

