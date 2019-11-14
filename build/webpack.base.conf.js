const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
}

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));

module.exports = {
  
  externals: {
    paths: PATHS,
  },

  entry: {
    app: `${PATHS.src}`,
    //colors_and_type: `${PATHS.src}/colors_and_type.js`,
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[hash].js`,
    publicPath: "/"
  },
  
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  resolve: {
    alias: {
      "~": "src",
    }
  },


  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: "/node_modules/"
    },
     {
        test: /\.css$/,
        use: [
          "style-loader", 
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: "src/js/postcss.config.js" } }
          },
        ],
     },
     {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader", 
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true, config: { path: "src/js/postcss.config.js" } }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
     },
       {
         test: /\.pug$/,
         loader: "pug-loader"
      },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
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
              name: "[name].[ext]",
              outputPath: "assets/fonts"
            }
          }
         ],
       },
    ]
  },

  plugins: [
  new CleanWebpackPlugin(),

  ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, ".html")}`
      //filename: `./${page.replace(/\.pug/, "/$`.html")}`
  })),

  new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
  }),

/*
*/
  ],
};
