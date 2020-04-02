import { loader } from "webpack";
import {
	getComponentName,
	getFileName,
	getHtmlValidateContent as getHtmlValidateBlockContent,
	toKebabCase,
	prettify,
	getHtmlValidateSlotRules,
	getHtmlValidateRootRules,
} from "./loader-utils";

export function HtmlValidateVueWebpackLoader(
	this: loader.LoaderContext,
	source: string
): string {
	try {
		const nameFromComponent = getComponentName(source);
		const nameFromResource = getFileName(this.resource);
		const componentName = toKebabCase(nameFromComponent || nameFromResource);

		const blockContent = getHtmlValidateBlockContent(source);
		// ? Parse and stringify htmlvalidate content so we know it is a valid JSON.
		JSON.parse(blockContent);

		const rootRules = getHtmlValidateRootRules(blockContent, componentName);
		const slotRules = getHtmlValidateSlotRules(blockContent, componentName);

		const rules = prettify({
			...rootRules,
			...slotRules,
		});

		this.emitFile(`${componentName}.json`, rules, undefined);

		return rules;
	} catch (error) {
		console.error(
			"HtmlValidateVueWebpackLoader received the following error:",
			error
		);
		return JSON.stringify({});
	}
}

export default HtmlValidateVueWebpackLoader;
