const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const paths = require('./paths')

const config = {
  entry: {
    app: ['babel-polyfill', path.join(paths.appSrc, 'app')]
  },
  output: {
    path: paths.appDist,
    filename: 'assets/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),    
    new HtmlWebpackPlugin({
      template: path.join(paths.appSrc, 'index.html')
    })
  ]
}

module.exports = config