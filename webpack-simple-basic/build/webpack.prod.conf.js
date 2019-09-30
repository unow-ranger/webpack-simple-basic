'use strict'
var webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: '#source-map',
  plugins: (baseWebpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]) 
})

module.exports = webpackConfig