const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')
const webpackBaseConfig = require('./webpack.config.base')

const commonExtractCss = new ExtractTextPlugin('styles.common.css')
const venderExtractCss = new ExtractTextPlugin('styles.antd.css')

const config = webpackMerge(webpackBaseConfig, {
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'antd']
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, '../node_modules/antd'),
      use: venderExtractCss.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: { minimize: true }
        }]
      })
    },{
      test: /\.css$/,
      include: path.resolve(paths.appSrc, './styles'),
      use: commonExtractCss.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    },{
      test: /\.scss$/,
      exclude: path.resolve(paths.appSrc, './styles'),
      use: commonExtractCss.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules&localIdentName=[name]__[local]',
          'sass-loader?sourceMap=true'
        ]
      })
    }]
  },
  plugins: [
    venderExtractCss,
    commonExtractCss,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false,
        },
        mangle: {
          keep_fnames: true
        },
        compress: {
          warnings: false,
          drop_console: true
        },
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      minChunks: function(module){
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash].js',
      minChunks: ['vendor']
    })
  ]
})

module.exports = config