/**
 * Wrapper for `JSON.stringify(value, null, 2);`.
 * @param value - the value to prettify
 */
export function prettify(value: unknown): string {
	return JSON.stringify(value, null, 2);
}

/**
 * Takes a value and converts it to kebab-case format.
 * @param value - the value to convert
 */
export function toKebabCase(value: string): string {
	return value
		.replace(/([A-Z])([A-Z])/g, "$1-$2")
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

/**
 * Takes a file path and returns the file name from the end of the file path.
 * @param filePath - the file path, i.e. example/file.vue or file.vue
 */
export function getFileName(filePath: string): string {
	const lastIndexOfSlash = filePath.lastIndexOf("/");
	const lastIndexOfDot = filePath.lastIndexOf(".");
	const fileName = filePath.slice(
		lastIndexOfSlash + 1,
		lastIndexOfDot === -1 ? undefined : lastIndexOfDot
	);
	return fileName;
}

/**
 * Takes a source and returns the value of the name property.
 * If no name property is found it will return an empty string.
 * @param source - the content with a Vue SFC, i.e.
 *   ```js
 *   <script>
 *   export default { name: 'Example' };
 *   </script>
 *   ```
 */
export function getComponentName(source: string): string {
	const regexp = new RegExp("name:\\s*[\"']?(\\w+)[\"']?");
	const result = regexp.exec(source) ?? [];
	const [, componentName = ""] = result;
	return componentName;
}

/**
 * Takes a source and returns the content of the `<htmlvalidate>{}</htmlvalidate>` block.
 * If no content is found it will return an empty string object `"{}"`.
 * @param source - the content with a htmlvalidate block, i.e.
 *   ```js
 *   <htmlvalidate>
 *   {}
 *   </htmlvalidate>
 *   ```
 */
export function getHtmlValidateContent(source: string): string {
	const startTag = "<htmlvalidate>";
	const endTag = "</htmlvalidate>";

	const regexp = new RegExp(`${startTag}([\\n\\t\\r]|.)+${endTag}`);
	const result = regexp.exec(source) ?? [];

	const [block = "{}"] = result;
	const final = block.replace(startTag, "").replace(endTag, "");

	return final;
}

/**
 * Takes html validate content and returns all slot names.
 * Slot names are prefixed with either `#` or `:`.
 * If no slot names are found it will return an empty array.
 * @param htmlValidateContent - @see getHtmlValidateContent
 */
export function getHtmlValidateSlotNames(
	htmlValidateContent: string
): string[] {
	const regexp = new RegExp("(#|:)([\\w-]+)", "g");
	return htmlValidateContent.match(regexp) ?? [];
}

/**
 * Takes html validate content and returns all the rules that should be in the root, i.e. no slot rules.
 * @param htmlValidateContent - @see getHtmlValidateContent
 * @param componentName - the name of the component
 */
export function getHtmlValidateRootRules(
	htmlValidateContent: string,
	componentName: string
): object {
	const htmlValidateContentParsed = JSON.parse(htmlValidateContent);
	const slotNames = getHtmlValidateSlotNames(htmlValidateContent);

	slotNames?.forEach((slotName) => delete htmlValidateContentParsed[slotName]);

	const rootRules: Record<string, object> = {};
	rootRules[componentName] = htmlValidateContentParsed;

	return rootRules;
}

/**
 * Takes html validate content and returns all the rules that are considered as slot rules.
 * @param htmlValidateContent - @see getHtmlValidateContent
 * @param componentName - the name of the component
 */
export function getHtmlValidateSlotRules(
	htmlValidateContent: string,
	componentName: string
): object {
	const htmlValidateContentParsed = JSON.parse(htmlValidateContent);
	const slotNames = getHtmlValidateSlotNames(htmlValidateContent);

	const slotRules: Record<string, object> = {};

	slotNames?.forEach((slotName) => {
		slotRules[`${componentName}${slotName}`] =
			htmlValidateContentParsed[slotName] ?? {};
	});

	return slotRules;
}
