export const htmlValidateVueWebpackLoader = (source: string) => {
  const stringified = source;
  const htmlValidateBlockRegexp = new RegExp(/<htmlvalidate>([\n\t\r]|.)+<\/htmlvalidate>/);
  const htmlValidateBlock = htmlValidateBlockRegexp.exec(source)
  if (htmlValidateBlock) {
    const [first] = htmlValidateBlock;
    const content = first.replace('<htmlvalidate>', '').replace('</htmlvalidate>', '');
    console.info('found the following content:', content);
  }
  return '';
}

export default htmlValidateVueWebpackLoader;