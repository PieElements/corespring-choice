const webpack = require('webpack');
module.exports = {
  entry: './dist/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOMServer',
    'react/lib/ReactTransitionGroup': 'React.addons.TransitionGroup',
    'react/lib/ReactCSSTransitionGroup': 'React.addons.CSSTransitionGroup'
  },
  plugins: [
    //new webpack.IgnorePlugin(/^react$/)
  ]
};