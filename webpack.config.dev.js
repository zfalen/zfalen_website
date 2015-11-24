var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {bundle: [
    'webpack-hot-middleware/client',
    './public/client/index'
    ] 
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/',
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '/public/client')
    }]
  }
};