import HtmlValidateVueWebpackLoader, {
	toKebabCase,
	getFileName,
} from "./loader";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loader } from "webpack";

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

describe("HtmlValidateVueWebpackLoader", () => {
	it.each`
		source                                                    | result
		${""}                                                     | ${JSON.stringify({ file: {} }, null, 2)}
		${"<htmlvalidate>{}</htmlvalidate>"}                      | ${JSON.stringify({ file: {} }, null, 2)}
		${'<htmlvalidate>{ "inherit": "button" }</htmlvalidate>'} | ${JSON.stringify({ file: { inherit: "button" } }, null, 2)}
	`("should return and emit $result from $source", ({ source, result }) => {
		const testThis = ({
			emitFile: jest.fn(),
			resource: "test/file.vue",
		} as unknown) as loader.LoaderContext;
		const loader = HtmlValidateVueWebpackLoader.bind(testThis);

		expect(loader(source)).toBe(result);
		expect(testThis.emitFile).toBeCalledWith("file.json", result, undefined);
	});
});
