import { loader } from "webpack";
import {
	getComponentName,
	getFileName,
	getHtmlValidateRules,
	toKebabCase,
	prettify,
} from "./loader-utils";

export function HtmlValidateVueWebpackLoader(
	this: loader.LoaderContext,
	source: string
): string {
	try {
		const nameFromComponent = getComponentName(source);
		const nameFromResource = getFileName(this.resource);
		const htmlValidateRules = getHtmlValidateRules(source);

		// ? Parse and stringify htmlvalidate block so we know it is a valid JSON.
		const htmlValidateRulesParsed = JSON.parse(htmlValidateRules);

		const componentName = toKebabCase(nameFromComponent || nameFromResource);
		const finalHtmlValidateRules = prettify({
			[componentName]: htmlValidateRulesParsed,
		});

		this.emitFile(`${componentName}.json`, finalHtmlValidateRules, undefined);

		return finalHtmlValidateRules;
	} catch (error) {
		console.error(
			"HtmlValidateVueWebpackLoader received the following error:",
			error
		);
		return JSON.stringify({});
	}
}

export default HtmlValidateVueWebpackLoader;
