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
        exclude: /.*node_modules((?!pie-control-panel|pie-player|pie-client-side-controller).)*$/,
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

