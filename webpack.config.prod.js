const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// const GLOBALS = {
//   'process.env.NODE_ENV': JSON.stringify('production')
// };

module.exports = () => {
  return {
    context: resolve('client'),
    entry: ['core-js/fn/promise', 'core-js/fn/object/assign', './index.jsx'],
    devtool: 'cheap-eval-source-map',
    output: {
      path: resolve('dist'),
      filename: 'bundle.[hash].js',
      publicPath: '/dist/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    stats: {
      colors: true,
      errors: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'NPI - ChangeControl',
        template: 'index.html'
      }),
      new ProgressBarPlugin(),
      new ExtractTextPlugin('styles.[hash].css')
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
