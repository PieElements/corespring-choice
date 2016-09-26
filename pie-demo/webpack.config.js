var path = require("path");

module.exports = {
  entry: {
    demo: './entry.js'
  },
  output: {
    path: ".",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /.*node_modules((?!pie-control-panel|pie-player|pie-client-side-controller|corespring-multiple-choice-react).)*$/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
         test: /\.less$/,
         loader: "style!css!less"
      },
      {
        test: /\.json/,
        loader: "json"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  generateControllerLoader: {
    pieControllers: {
      "corespring-multiple-choice-react": "../controller.js"
    }
  }
};

