const path = require("path");
const {
  HtmlValidateVueWebpackPlugin
} = require("../../lib/html-validate-vue-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "EButton.vue"),
  plugins: [new HtmlValidateVueWebpackPlugin()]
};
