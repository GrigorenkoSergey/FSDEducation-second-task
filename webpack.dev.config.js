const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  favicons: path.join(__dirname, "./src/favicons"),
}

module.exports = {
  entry: `${PATHS.src}/index`,
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    filename: '[name].js',
  },

  devServer: {
    overlay: true,
    port: 3000,
  },

  devtool: "inline-source-map",

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            url: false, // супер строка, решила проблемы с поиском assets от корня сайта
            // эксперименты с resolve-url-loader ни к чему не привели. Потерял целый день.
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {path: 'src/postcss.config.js'},
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
          }
        }
      ],
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: "pug-loader",
        }
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: "file-loader",
        },
      ],
    },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
      filename: './index.html',
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    new CopyPlugin([
      {from: `${PATHS.src}/assets/blocks/`, to: `${PATHS.dist}/assets/blocks/`},
      {from: `${PATHS.src}/assets/fonts/`, to: `${PATHS.dist}/assets/fonts/`},
      {from: `${PATHS.src}/assets/images/`, to: `${PATHS.dist}/assets/images`},
      {from: `${PATHS.favicons}/`, to: `${PATHS.dist}/favicons/`},
    ]),
  ],
};
