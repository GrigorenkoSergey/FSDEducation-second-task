/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

let entries = {
  index: './index',
};

// Далее я сознательно не автоматизировал создание точек входа,
// и работу html-webpack-plugin, т.к. при отладке это сильно запутывает.

const UIKitEntries = {
  'UI-Kit-common': './pages/UI-Kit/UI-Kit-common/UI-Kit-common',
  'colors-and-type': './pages/UI-Kit/colors-and-type/colors-and-type',
  cards: './pages/UI-Kit/cards/cards',
  'form-elements': './pages/UI-Kit/form-elements/form-elements',
  'headers-and-footers': './pages/UI-Kit/headers-and-footers/headers-and-footers',
};

const WebsitePages = {
  'Website-pages-common': './pages/Website-pages/Website-pages-common/Website-pages-common',
  'landing-page': './pages/Website-pages/landing-page/landing-page',
  'sign-in': './pages/Website-pages/sign-in/sign-in',
  'registration-page': './pages/Website-pages/registration-page/registration-page',
  'room-details': './pages/Website-pages/room-details/room-details',
  'search-room': './pages/Website-pages/search-room/search-room',
};

entries = { ...entries, ...UIKitEntries, ...WebsitePages };

module.exports = (env, options) => ({
  context: path.resolve(__dirname, 'src'),
  entry: entries,

  output: {
    filename: (pathData) => `${entries[pathData.chunk.name]}.js`,
  },

  devServer: {
    overlay: true,
    port: 3002,
  },

  devtool: options.mode === 'development' ? 'inline-source-map' : false,

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
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, ctx) => `${path.relative(path.dirname(resourcePath), ctx)}/`,
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
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
      test: /\.(png|svg|jpg|gif|webmanifest)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: (pathFromRoot) => `../../../${pathFromRoot}`,
            esModule: false,
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: (pathFromRoot) => `../../../${pathFromRoot}`,
          },
        },
      ],
    },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.pug',
      filename: 'index.html',
      chunks: ['index'],
    }),

    ...Object.entries(UIKitEntries).map(([key, value]) => new HtmlWebpackPlugin({
      template: `${value}.pug`,
      filename: `${value}.html`,
      chunks: [`${key}`, 'UI-Kit-common'],
    })),

    ...Object.entries(WebsitePages).map(([key, value]) => new HtmlWebpackPlugin({
      template: `${value}.pug`,
      filename: `${value}.html`,
      chunks: [`${key}`, 'Website-pages-common'],
    })),

    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => `${entries[name]}.css`,
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
  ],
});
