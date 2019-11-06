const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist")
}

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));

let conf = {
  entry: {
    main: `${PATHS.src}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    publicPath: "",
  },
  
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    overlay: true,
    port: 3000,
  },

  resolve: {
    alias: {
      "~": "src",
    }
  },

  plugins: [
  new CleanWebpackPlugin(),

  ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, ".html")}`
  })),

  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  ],

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    },
       {
         test: /\.css$/,
         use: [
          MiniCssExtractPlugin.loader,
          //"style-loader", //конфликтует с mini-css-extract-plugin )))
          "css-loader"
        ]
     },
     {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
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
  }
};

module.exports = (env, options) => {
  let production = options.mode === "production"  ;
  
  conf.devtool = production
                  ? false  
                  : "eval-sourcemap";
  return conf;
}
