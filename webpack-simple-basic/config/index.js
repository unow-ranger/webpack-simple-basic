'use strict'
const path = require('path')

module.exports = {
  /* 通用配置项 */
    // 项目路径
  context: path.resolve(__dirname, '../'), 
  entry: './src/main.js',
  filename: 'build.js',

  // 开发环境配置变量
  dev: {
    /* devServer 配置项参数 */
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

  },
  // 生产环境配置变量
  build: {
    /* 打包路径 */
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/dist/',
    devtool: '#source-map',
  }
}