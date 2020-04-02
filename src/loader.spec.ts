import { HtmlValidateVueWebpackLoader } from "./loader";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loader } from "webpack";
import { prettify } from "./loader-utils";

type TestCase = {
	description: string;
	source: string;
	result: string;
	fileName: string;
};

const testCases: TestCase[] = [
	{
		description: "should handle an empty source",
		source: "",
		result: prettify({ test: {} }),
		fileName: "test.json",
	},

	{
		description: "should handle empty html validate rules",
		source: "<htmlvalidate>{}</htmlvalidate>",
		result: prettify({ test: {} }),
		fileName: "test.json",
	},

	{
		description: "should handle basic html validate rules",
		source: '<htmlvalidate>{ "inherit": "button" }</htmlvalidate>',
		result: prettify({ test: { inherit: "button" } }),
		fileName: "test.json",
	},

	{
		description: "should handle basic html validate rules with name property",
		source: `
    <script>
    export default { name: "TestComponent" };
    </script>

    <htmlvalidate>
    {
      "inherit": "button"
    }
    </htmlvalidate>
    `,
		result: prettify({ "test-component": { inherit: "button" } }),
		fileName: "test-component.json",
	},

	{
		description:
			"should handle html validate rules with slot rules that used `:` as slot indicator",
		source: `
    <script>
    export default { name: "TestComponent" };
    </script>

    <htmlvalidate>
    {
      "inherit": "button",
      "slots": ["before-default", "default"],
      ":before-default": { "permittedContent": ["@phrasing"] },
      ":default": { "permittedContent": ["@phrasing"] }
    }
    </htmlvalidate>
    `,
		result: prettify({
			"test-component": {
				inherit: "button",
				slots: ["before-default", "default"],
			},
			"test-component:before-default": { permittedContent: ["@phrasing"] },
			"test-component:default": { permittedContent: ["@phrasing"] },
		}),
		fileName: "test-component.json",
	},

	{
		description:
			"should handle html validate rules with slot rules that used `#` as slot indicator",
		source: `
    <script>
    export default { name: "TestComponent" };
    </script>

    <htmlvalidate>
    {
      "inherit": "button",
      "slots": ["before-default", "default"],
      "#before-default": { "permittedContent": ["@phrasing"] },
      "#default": { "permittedContent": ["@phrasing"] }
    }
    </htmlvalidate>
    `,
		result: prettify({
			"test-component": {
				inherit: "button",
				slots: ["before-default", "default"],
			},
			"test-component#before-default": { permittedContent: ["@phrasing"] },
			"test-component#default": { permittedContent: ["@phrasing"] },
		}),
		fileName: "test-component.json",
	},
];

describe("HtmlValidateVueWebpackLoader", () => {
	testCases.forEach(({ source, result, fileName, description }) => {
		it(`${description}`, () => {
			const testThis = ({
				emitFile: jest.fn(),
				resource: "components/Test.vue",
			} as unknown) as loader.LoaderContext;
			const loader = HtmlValidateVueWebpackLoader.bind(testThis);

			expect(loader(source)).toBe(result);
			expect(testThis.emitFile).toBeCalledWith(fileName, result, undefined);
		});
	});
});
