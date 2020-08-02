/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  favicons: path.join(__dirname, './src/favicons'),
  pages: path.join(__dirname, './src/pages'),
};

const entries = {
  index: `${PATHS.src}`,
};

const UI_PAGES = fs.readdirSync(`${PATHS.pages}/UI-Kit/`);
UI_PAGES.forEach((item) => entries[item] = `${PATHS.pages}/UI-Kit/${item}/${item}`);

const websitePages = fs.readdirSync(`${PATHS.src}/pages/Website-pages/`);
websitePages.forEach((item) => entries[item] = `${PATHS.pages}/Website-pages/${item}/${item}`);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].js',
  },

  devServer: {
    overlay: true,
    port: 3000,
  },

  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false, // супер строка, решила проблемы с поиском assets от корня сайта
            // эксперименты с resolve-url-loader ни к чему не привели. Потерял целый день.
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: 'src/postcss.config.js' },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader',
        },
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
      filename: './index.html',
      chunks: ['index'],
    }),

    ...UI_PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/UI-Kit/${page}/${page}.pug`,
      filename: `./${page}.html`,
      chunks: [`${page}`],
    })),

    ...websitePages.map((page) => new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/Website-pages/${page}/${page}.pug`,
      filename: `./${page}.html`,
      chunks: [`${page}`],
    })),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),

    new CopyPlugin([
      { from: `${PATHS.src}/assets/blocks/`, to: `${PATHS.dist}/assets/blocks/` },
      { from: `${PATHS.src}/assets/fonts/`, to: `${PATHS.dist}/assets/fonts/` },
      { from: `${PATHS.src}/assets/images/`, to: `${PATHS.dist}/assets/images` },
      { from: `${PATHS.favicons}/`, to: `${PATHS.dist}/favicons/` },
    ]),
  ],
};
