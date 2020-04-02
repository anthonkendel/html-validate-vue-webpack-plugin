export function toKebabCase(value: string): string {
	return value
		.replace(/([A-Z])([A-Z])/g, "$1-$2")
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

export function getFileName(filePath: string): string {
	const lastIndexOfSlash = filePath.lastIndexOf("/");
	const lastIndexOfDot = filePath.lastIndexOf(".");
	const fileName = filePath.slice(
		lastIndexOfSlash + 1,
		lastIndexOfDot === -1 ? undefined : lastIndexOfDot
	);
	return fileName;
}

export function prettify(value: unknown): string {
	return JSON.stringify(value, null, 2);
}

export function getHtmlValidateRules(source: string): string {
	const startTag = "<htmlvalidate>";
	const endTag = "</htmlvalidate>";

	const regexp = new RegExp(`${startTag}([\\n\\t\\r]|.)+${endTag}`);
	const result = regexp.exec(source) ?? [];

	const [block = "{}"] = result;
	const final = block.replace(startTag, "").replace(endTag, "");

	return final;
}

export function getComponentName(source: string): string {
	const regexp = new RegExp("name:\\s*[\"']?(\\w+)[\"']?");
	const result = regexp.exec(source) ?? [];
	const [, componentName = ""] = result;
	return componentName;
}
