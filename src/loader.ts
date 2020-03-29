import { loader } from 'webpack';

const toKebabCase = (value: string): string => {
  return value.replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const getFileName = (filePath: string): string => {
  const lastIndexOfSlash = filePath.lastIndexOf('/');
  const lastIndexOfDot = filePath.lastIndexOf('.');
  const fileName = filePath.slice(lastIndexOfSlash + 1, lastIndexOfDot);
  return fileName;
};

export function HtmlValidateVueWebpackLoader(this: loader.LoaderContext, source: string): string {
  const startTag = '<htmlvalidate>';
  const endTag = '</htmlvalidate>';

  const htmlValidateBlockRegexp = new RegExp(`${startTag}([\\n\\t\\r]|.)+${endTag}`);
  const vueComponentNameRegExp = new RegExp('name:\\s*["\']?(\\w+)["\']?');

  const htmlValidateBlock = htmlValidateBlockRegexp.exec(source);
  const componentNameProperty = vueComponentNameRegExp.exec(source);

  try {
    const [htmlValidateBlockFound = '{}'] = htmlValidateBlock ?? [];
    const htmlValidateBlockContent = htmlValidateBlockFound.replace(startTag, '').replace(endTag, '');

    const nameFromResource = getFileName(this.resource);

    const [, nameFromComponent = ''] = componentNameProperty ?? [];

    // ? Parse and stringify htmlvalidate block so we know it is a valid JSON.
    const htmlValidateBlockParsed = JSON.parse(htmlValidateBlockContent);

    const componentName = toKebabCase(nameFromComponent || nameFromResource || 'NameNotFound');
    const result = {
      [componentName]: htmlValidateBlockParsed
    };
    const resultJson = JSON.stringify(result, null, 2);

    this.emitFile(`${componentName}.json`, resultJson, undefined);

    return resultJson;
  } catch (error) {
    console.error('HtmlValidateVueWebpackLoader received the following error:', error);
    return JSON.stringify({});
  }
}

export default HtmlValidateVueWebpackLoader;