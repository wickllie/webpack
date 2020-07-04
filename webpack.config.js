const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const paths = {
  root: './public',
  src: './source',
  template: './source/views/index.html',
  entry: './source/views/index.js',
  output: '[name].[contenthash].js',
  postcss: `./postcss.config.js`,
  fonts: {
    src: 'assets/fonts/**/*'
  },
  images: {
    src: 'assets/images/**/*'
  },
  scripts: {
    src: 'assets/scripts/**/*.js',
    dist: './public/assets/scripts'
  },
  static: {
    src: 'assets/static/**/*'
  },
  styles: {
    common: 'assets/styles/common.min.css',
    src: 'assets/styles/**/*.sass'
  },
  views: {
    src: 'views/pages/*'
  }
};

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, paths.root),
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  entry: {
    index: paths.entry
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              config: { path: paths.postcss }
            }
          },
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              config: { path: paths.postcss }
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: paths.output,
    path: path.join(__dirname, paths.root)
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, `${paths.src}/assets/fonts`), to: path.join(__dirname, `${paths.root}/assets/fonts`) },
        { from: path.join(__dirname, `${paths.src}/assets/images`), to: path.join(__dirname, `${paths.root}/assets/images`) },
        { from: path.join(__dirname, `${paths.src}/assets/scripts`), to: path.join(__dirname, `${paths.root}/assets/scripts`) },
        { from: path.join(__dirname, `${paths.src}/assets/static`), to: path.join(__dirname, `${paths.root}/assets/static`) },
        { from: path.join(__dirname, `${paths.src}/views/pages`), to: path.join(__dirname, `${paths.root}`) }
      ]
    }),
    new HtmlWebpackPlugin({
      template: paths.template
    }),
    new MiniCssExtractPlugin({
      filename: paths.styles.common
    })
  ],
};
