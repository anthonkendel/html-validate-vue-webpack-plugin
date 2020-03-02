import { Configuration } from "webpack";
import * as path from 'path';

export const HtmlValidateVueWebpackConfig: Configuration = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: ['json-loader', path.resolve(__dirname, 'html-validate-vue-webpack-loader')],
      }
    ]
  }

};

export default HtmlValidateVueWebpackConfig;