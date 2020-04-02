/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("glob");
const path = require("path");
// ? replace `require('../../lib');` with `require('html-validate-vue-webpack-plugin');
const { HtmlValidateVueWebpackPlugin } = require("../../lib");

module.exports = {
	mode: "production",
	entry: glob.sync("./**/*.vue"),
	output: {
		path: path.resolve(__dirname, "elements"),
		filename: "index.js",
	},
	plugins: [new HtmlValidateVueWebpackPlugin()],
};
