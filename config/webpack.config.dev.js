const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const paths = require('./paths')
const webpackBaseConfig = require('./webpack.config.base')

const hostname = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

const config = webpackMerge(webpackBaseConfig, {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(paths.appSrc, 'app')
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.css$/,
      include: /node_modules/,
      use: [ 'style-loader', 'css-loader']
    },{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: [ 'style-loader', 'css-loader']
    },{
      test: /\.scss$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]',
        'sass-loader?sourceMap=true'
      ]
    }]
  },
  devServer: {
    contentBase: paths.appDist,
    hot: true,
    compress: true,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 当开启HMR时使用NamedModulesPlugin可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new OpenBrowserPlugin({ url: `http://${hostname}:${port}` })
  ]
})

module.exports = config