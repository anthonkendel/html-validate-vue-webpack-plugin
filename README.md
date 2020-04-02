# html-validate-vue-webpack-plugin

> extract html-validate rules from Vue single file components

![html-validate-vue-webpack-plugin](https://github.com/anthonkendel/html-validate-vue-webpack-plugin/workflows/html-validate-vue-webpack-plugin/badge.svg)

## Setup

Install the package and its peer dependencies:

```bash
npm install --save-dev html-validate-vue-webpack-plugin json-loader webpack
```

Import the plugin and add it to your Webpack plugins:

```js
const {
  HtmlValidateVueWebpackPlugin,
} = require("html-validate-vue-webpack-plugin");

module.exports = {
  plugins: [new HtmlValidateVueWebpackPlugin()],
};
```

## How it works

Under the hood the package consist of 3 parts, a webpack config, a webpack loader and a webpack plugin.

The webpack config consist of rules of how the `.vue` files should be handled.

The webpack loader handles the processing `.vue` files. For each file it will look for a `<htmlvalidate>{}</htmlvalidate>` block and assumes the JSON inside the tags is the html-validate rule for that component. The plugin will look for a name for the html-validate rule. First it looks for the `name` property in the Vue file and fallbacks to the filename. The name of the rule will be converted to `kebab-case`.

The webpack plugin combines the webpack config and webpack plugin and applies the rules and processing to the webpack config.

## [Examples](./src/examples/README)

## LICENSE

MIT
