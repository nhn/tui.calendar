const {readdirSync, writeFileSync} = require('fs');
const {resolve} = require('path');
const config = require(resolve(process.cwd(), 'tuidoc.config.json'));
const examples = config.examples || {};
const {filePath, globalErrorLogVariable} = examples;

/**
 * Get Examples Url
 */
function getTestUrls() {
  if (!filePath) {
    throw Error('not exist examples path at tuidoc.config.json');
  }

  const urlPrefix = 'http://nhn.github.io/tui.image-editor/latest';

  const testUrls = readdirSync(filePath).reduce((urls, fileName) => {
    if (/html$/.test(fileName)) {
      urls.push(`${urlPrefix}/${filePath}/${fileName}`);
    }

    return urls;
  }, []);

  writeFileSync('url.txt', testUrls.join(', '));
}

function getGlobalVariable() {
  if (!globalErrorLogVariable) {
    throw Error('not exist examples path at tuidoc.config.json');
  }

  writeFileSync('errorVariable.txt', globalErrorLogVariable);
}

getTestUrls();
getGlobalVariable();
