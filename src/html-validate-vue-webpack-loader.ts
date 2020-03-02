
const toKebabCase = (value: string) => {
  return value.replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
};

export function HtmlValidateVueWebpackLoader(this: any, source: string) {
  const startTag = '<htmlvalidate>';
  const endTag = '</htmlvalidate>';

  const htmlValidateBlockRegexp = new RegExp(`${startTag}([\\n\\t\\r]|.)+${endTag}`);
  const vueComponentNameRegExp = new RegExp(`name:\\s*["']?(\\w+)["']?`);

  const htmlValidateBlock = htmlValidateBlockRegexp.exec(source);
  const componentNameProperty = vueComponentNameRegExp.exec(source);

  try {
    const [htmlValidateBlockFound = '{}'] = htmlValidateBlock ?? [];
    const htmlValidateBlockContent = htmlValidateBlockFound.replace(startTag, '').replace(endTag, '');

    const fullFilePath = this.resource as string;
    const lastIndexOfSlash = fullFilePath.lastIndexOf('/');
    const lastIndexOfDot = fullFilePath.lastIndexOf('.');
    const nameFromFilePath = fullFilePath.slice(lastIndexOfSlash + 1, lastIndexOfDot);

    const [, namePropertyFound = ''] = componentNameProperty ?? [];

    // ? Parse and stringify htmlvalidate block so we know it is a valid JSON.
    const htmlValidateBlockParsed = JSON.parse(htmlValidateBlockContent);
    JSON.stringify(htmlValidateBlockParsed, null, 2);

    const componentName = toKebabCase(namePropertyFound || nameFromFilePath || 'NameNotFound');
    const result = { [componentName]: htmlValidateBlockParsed };
    const resultJson = JSON.stringify(result, null, 2);

    this.emitFile(`${componentName}.json`, resultJson);

    return resultJson;
  } catch (error) {
    console.error('HtmlValidateVueWebpackLoader received the following error:', error);
    return JSON.stringify({});
  }
}

export default HtmlValidateVueWebpackLoader;