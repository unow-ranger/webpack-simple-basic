'use strict'
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

const devWebpackConfig = merge(baseWebpackConfig, {
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    historyApiFallback: config.dev.historyApiFallback,
    noInfo: config.dev.noInfo,
    overlay: config.dev.overlay,
  },
  devtool: '#eval-source-map',
  plugins: baseWebpackConfig.plugins
})

module.exports = devWebpackConfig