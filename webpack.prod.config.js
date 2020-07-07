/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  pages: path.join(__dirname, './src/pages'),
  favicons: path.join(__dirname, './src/favicons'),
};

const entries = {
  index: `${PATHS.src}`,
};

const UI_PAGES = fs.readdirSync(`${PATHS.pages}/UI_Kit/`);
UI_PAGES.forEach((item) => entries[item] = `${PATHS.pages}/UI_Kit/${item}/${item}`);

const websitePages = fs.readdirSync(`${PATHS.src}/pages/Website_pages/`);
websitePages.forEach((item) => entries[item] = `${PATHS.pages}/Website_pages/${item}/${item}`);

//  потом буду копировать картинки, лежащие в блоках
const blocks = fs.readdirSync(`${PATHS.src}/assets/blocks`);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    filename: '[name].js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), //  по-моему, он беспололезен или уже вшит, уточнить при review
      new OptimizeCSSAssetsPlugin({}), //  то же самое.
    ],
  },

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
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: { path: 'src/postcss.config.js' },
          },
        },
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            url: false, //  супер строка, решила проблемы с поиском assets от корня сайта
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
      template: `${PATHS.src}/pages/UI_Kit/${page}/${page}.pug`,
      filename: `./${page}.html`,
      chunks: [`${page}`],
    })),

    ...websitePages.map((page) => new HtmlWebpackPlugin({
      template: `${PATHS.src}/pages/Website_pages/${page}/${page}.pug`,
      filename: `./${page}.html`,
      chunks: [`${page}`],
    })),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new CopyPlugin([
      { from: `${PATHS.src}/assets/fonts/`, to: `${PATHS.dist}/assets/fonts/` },
      { from: `${PATHS.favicons}/`, to: `${PATHS.dist}/favicons/` },
      { from: `${PATHS.src}/assets/images/`, to: `${PATHS.dist}/assets/images` },

      // вместо этого
      // { from: `${PATHS.src}/assets/blocks/`, to: `${PATHS.dist}/assets/blocks/` },
      // сэкономим 100 кб и спрячем реализацию наших блоков.
      ...blocks.map((block) => ({
        from: `${PATHS.src}/assets/blocks/${block}/images/`,
        to: `${PATHS.dist}/assets/blocks/${block}/images/`,
      })),
      // будут выскакивать ошибки, типа не можем найти файл <block>/images, т.к. не во всех блоках
      // есть папка images. Просто игнорировать.

    ]),
  ],
};
