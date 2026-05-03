const fs = require('fs');
const glob = require('glob'); // Not available? I'll just use my previous getAllFiles function
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles('./src').concat(getAllFiles('./app'));
allFiles.forEach(file => {
  if (!file.match(/\.(tsx|ts)$/)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('/Types"')) {
    content = content.replace(/\/Types"/g, '/types"');
    fs.writeFileSync(file, content, 'utf8');
  }
});
