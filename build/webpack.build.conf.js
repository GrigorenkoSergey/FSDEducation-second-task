const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let path = baseWebpackConfig.externals.paths;

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production", 
  plugins: [
  new CopyWebpackPlugin([
      { from: `${path.src}/${path.assets}images`, to: `${path.assets}images` },
      { from: `${path.src}/${path.assets}fonts`, to: `${path.assets}fonts` },
    ]
  ),

  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
});

