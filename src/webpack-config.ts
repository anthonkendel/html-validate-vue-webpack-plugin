import * as path from "path";
import { Configuration } from "webpack";

export const webpackConfig: Configuration = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loaders: ["json-loader", path.resolve(__dirname, "loader")],
			},
		],
	},
};

export default webpackConfig;
