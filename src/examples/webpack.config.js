const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "EButton.vue"),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: path.resolve(
          __dirname,
          "../../lib/html-validate-vue-webpack-loader.js"
        )
      }
    ]
  }
};
