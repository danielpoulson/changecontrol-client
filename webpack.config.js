/* eslint-disable */
const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = () => {
  return {
    context: resolve('client'),
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.jsx'
    ],
    devtool: 'cheap-eval-source-map',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js'
    },

    devServer: {
      hot: true,
      historyApiFallback: true,
      quiet: true
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    stats: {
      colors: true,
      none: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'NPI - ChangeControl',
        template: 'index.html'
      }),
      new ProgressBarPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin('styles.css')
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    }
  };
};
