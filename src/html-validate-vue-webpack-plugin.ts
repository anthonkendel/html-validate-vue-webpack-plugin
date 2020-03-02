import { Compiler } from "webpack";
import { JSONSchema7 } from "json-schema";
import validateOptions from "schema-utils";

import HtmlValidateVueWebpackConfig from "./html-validate-vue-webpack-config";

const schema: JSONSchema7 = {
  type: 'object',
  properties: {}
};

export class HtmlValidateVueWebpackPlugin {
  constructor(options = {}) {
    validateOptions(schema, options, { name: 'HtmlValidateVueWebpackPlugin' })
  }

  apply(compiler: Compiler) {
    compiler.options.module?.rules.push(...HtmlValidateVueWebpackConfig.module?.rules ?? [])
  }
}

export default HtmlValidateVueWebpackPlugin;
