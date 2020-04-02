import { toKebabCase, getFileName } from "./loader-utils";

describe("toKebabCase", () => {
	it.each`
		value                 | result
		${""}                 | ${""}
		${"PascalCaseValue"}  | ${"pascal-case-value"}
		${"kebab-case-value"} | ${"kebab-case-value"}
		${"camelCaseValue"}   | ${"camel-case-value"}
		${"lowercasevalue"}   | ${"lowercasevalue"}
		${"snake_case_value"} | ${"snake-case-value"}
	`("should return $result from $value", ({ value, result }) => {
		expect(toKebabCase(value)).toBe(result);
	});
});

describe("getFileName", () => {
	it.each`
		value                   | result
		${""}                   | ${""}
		${"file"}               | ${"file"}
		${"file.vue"}           | ${"file"}
		${"test/file.vue"}      | ${"file"}
		${"test/test/file.vue"} | ${"file"}
	`("should return $result from $value", ({ value, result }) => {
		expect(getFileName(value)).toBe(result);
	});
});
