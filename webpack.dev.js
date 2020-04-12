const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: "./build",
    compress: true,
    port: 3000,
  },
  devtool: "inline-source-map",
});
