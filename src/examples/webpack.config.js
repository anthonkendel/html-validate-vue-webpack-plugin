/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// ? replace `require('../../lib');` with `require('html-validate-vue-webpack-plugin');
const { HtmlValidateVueWebpackPlugin } = require('../../lib');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'EButton.vue'),
  plugins: [new HtmlValidateVueWebpackPlugin()]
};
