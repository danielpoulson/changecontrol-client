const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    plugins: [
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
