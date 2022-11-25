const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelLoader = require('babel-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './build'),
  },
  mode: 'development',
  module: {
    rules: [
      // babel js parsing
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      // ts parsing
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      // html parsing
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true },
        }],
      },
      // image parsing
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader',]
      },
      // css parser
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // scss parser
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js, .jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
};