import { Compiler } from "webpack";
import { JSONSchema7 } from "json-schema";
import validateOptions from "schema-utils";

import webpackConfig from "./webpack-config";

const schema: JSONSchema7 = {
  type: 'object',
  properties: {}
};

export class plugin {
  constructor(options = {}) {
    validateOptions(schema, options, { name: 'HtmlValidateVueWebpackPlugin' })
  }

  apply(compiler: Compiler) {
    compiler.options.module?.rules?.push(...webpackConfig.module?.rules ?? [])
  }
}

export default plugin;
