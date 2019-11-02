const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

let conf = {
  entry: `${PAGES_DIR}/index.pug`,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
    publicPath: "/dist",
  },
  
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devServer: {
    overlay: true,
    port: 3000,
  },

  plugins: [
  new CleanWebpackPlugin(),

  ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`
  }))
  ],

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    },
       {
         test: /\.css$/,
         use: [
          'style-loader',
          'css-loader'
        ]
     },
       {
         test: /\.pug$/,
         loader: 'pug-loader'
      },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader',
         ],
       },
       {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: [
           'file-loader',
         ],
       },
    ]
  }
};

module.exports = (env, options) => {
  let production = options.mode === 'production'  ;
  
  conf.devtool = production
                  ? false  
                  : 'eval-sourcemap';
  return conf;
}
