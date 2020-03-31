import HtmlValidateVueWebpackPlugin from "./plugin";
import { Compiler, RuleSetRule } from "webpack";
import webpackConfig from "./webpack-config";

it("should have a constructor", () => {
	const plugin = new HtmlValidateVueWebpackPlugin();
	expect(plugin).toBeInstanceOf(HtmlValidateVueWebpackPlugin);
});

it("should have an apply function", () => {
	const plugin = new HtmlValidateVueWebpackPlugin();
	expect(plugin.apply).toBeInstanceOf(Function);
});

it("should add webpack config to the compiler", () => {
	const plugin = new HtmlValidateVueWebpackPlugin();
	const testCompiler = {
		options: { module: { rules: [] as RuleSetRule[] } },
	} as Compiler;
	plugin.apply(testCompiler);

	expect(testCompiler.options).toMatchObject(webpackConfig);
});
