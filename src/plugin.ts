import { JSONSchema7 } from "json-schema";
import validate from "schema-utils";
import { Compiler } from "webpack";
import webpackConfig from "./webpack-config";

const schema: JSONSchema7 = {
	type: "object",
	properties: {},
};

export class HtmlValidateVueWebpackPlugin {
	public constructor(options = {}) {
		validate(schema, options, { name: "HtmlValidateVueWebpackPlugin" });
	}

	public apply(compiler: Compiler): void {
		compiler.options.module?.rules?.push(
			...(webpackConfig.module?.rules ?? [])
		);
	}
}

export default HtmlValidateVueWebpackPlugin;
