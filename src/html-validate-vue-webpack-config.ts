import { Configuration } from "webpack";
import htmlValidateVueWebpackLoader from './html-validate-vue-webpack-loader';

export const htmlValidateVueWebpackConfig: Configuration = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: htmlValidateVueWebpackLoader,
      }
    ]
  }

};

export default htmlValidateVueWebpackConfig;