const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    filename: "main.js",
    publicPath: "/dist",
  },

  devServer: {
    overlay: true,
    port: 3000
  },

  plugins: [

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
      }
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
