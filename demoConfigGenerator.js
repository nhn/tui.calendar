const fs = require('fs');
const exec = require('child_process').exec;

console.log('\n * [START] Create a demo.json file for the storybook example on the TOAST UI brand site.\n');
exec(`find ./examples -name '*.html'`, (error, stdout, stderr) => {
  const htmlFileList = stdout.split('\n');
  console.log('- Total number of examples : ', htmlFileList.length);

  const files = [];
  const fileNameReg = /example[\w-]+.html/g;

  htmlFileList.sort();

  htmlFileList.forEach(filePath => {
    let fileName = filePath.match(fileNameReg);

    if (fileName) {
      fileName = fileName[0];

      const file = generateFileData(fileName);
      files.push(file);
    }

  });

  console.log('- Example Titles : ')
  console.log(files.map((file, idx) => `    => ${file.title}`).join('\n'));

  const demoConfig = {
    files,
    staticDir: ['css', 'fonts', 'images', 'js']
  }
  /*
  console.log('stderr : %s', stderr);
  */
  fs.writeFile('examples/demo.json', JSON.stringify(demoConfig), 'utf8', err => {
    console.log('\n * [COMPLETED] Check the "examples/demo.json" file.\n');
  });

  if (error !== null) {
    console.log('error: %s', error);
  }
})


function getTitle(fileName) {
  const titleReg = /(?![\.html])[^example0-9][\w-]+/g;
  let title = fileName.match(titleReg)[0];
  title = title.substr(1);
  title = title.replace('-n-', '-&-'); // n을 & 치환
  const titleWordArr = title.split('-');

  title = titleWordArr
          .map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
          .join(' ');

  return title === 'Basic' ? 'Calendar App' : title;
}

function generateFileData(filename) {
  const depJsFile = filename.indexOf('example00') > -1 ? 'js/app.js' : 'js/default.css';
  const jsFilePaths = ['js/data/calendars.js', 'js/data/schedules.js', depJsFile];
  const cssFilePaths = ['css/default.css', 'css/icons.css'];
  const title = getTitle(filename);

  return {
    filename,
    title,
    jsFilePaths,
    cssFilePaths
  }
}
