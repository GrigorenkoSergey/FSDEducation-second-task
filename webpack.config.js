const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
}

const PAGES_DIR = `${PATHS.src}/pages/colors_&_type/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

let conf = {
  entry: {
    "index": `${PATHS.src}`,
    "colors_&_type": `${PATHS.src}/pages/colors_&_type/colors_&_type.js`
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: (chunkData) => {
      return chunkData.chunk.name === "index" ? "[name].js" : "pages/[name]/[name].js"
    },
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    overlay: true,
    port: 8081,
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: "pug-loader",
        },
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          }
        }
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]/[name].[ext]",
          }
        }
      ],
    },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
      filename: './index.html'
    }),

    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./pages/${page.replace(/\.pug/,'/$`.html')}`
    })),
 
    new MiniCssExtractPlugin({
      //filename: "[name].css",
      moduleFilename: ({name}) => name === "index" ? "[name].css" : "pages/[name]/[name].css",
      chunkFilename: "[id].css"
    }),

    new CopyPlugin([
      { from: `${PATHS.src}/assets/images/`, to: `${PATHS.dist}/assets/images/` },
      { from: `${PATHS.src}/assets/fonts/`, to: `${PATHS.dist}/assets/fonts/` },
    ]),
  ],
};

module.exports = (env, options) => {
  let production = options.mode === "production";

  conf.devtool = production
    ? false
    : "eval-sourcemap";
  return conf;
}
