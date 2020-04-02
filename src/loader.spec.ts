import { HtmlValidateVueWebpackLoader } from "./loader";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loader } from "webpack";

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
