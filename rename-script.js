const fs = require('fs');
const path = require('path');

// Helper to convert to camelCase
function toCamelCase(str) {
  return str.replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4-$2$3$5').toLowerCase().replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// Helper to rename a file and update imports in all files
function renameAndUpdate(oldPath, newPath) {
  if (oldPath === newPath) return;
  
  console.log(`Renaming: ${oldPath} -> ${newPath}`);
  fs.renameSync(oldPath, newPath);

  const oldBase = path.parse(oldPath).name;
  const newBase = path.parse(newPath).name;

  if (oldBase === newBase) return; // Only extension changed

  const files = getAllFiles('./src').concat(getAllFiles('./app'));
  files.forEach(file => {
    if (!file.match(/\.(tsx|ts|js|jsx)$/)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    // Replace imports
    // e.g., import { SafeArea } from "@/components/utility/SafeArea.component";
    const oldImport = new RegExp(`(from\\s+['"](?:@|\\.\\.|\\.)[/a-zA-Z0-9_-]+)/${oldBase}(['"])`, 'g');
    if (oldImport.test(content)) {
      content = content.replace(oldImport, `$1/${newBase}$2`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated imports in ${file}`);
    }
  });
}

function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
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

const allFiles = getAllFiles('./src');

allFiles.forEach(file => {
  const parsed = path.parse(file);
  const ext = parsed.ext;
  let name = parsed.name;
  
  // Remove .component and .service and .context suffixes from name
  name = name.replace(/\.component$/, '').replace(/\.service$/, '').replace(/\.context$/, '').replace(/\.styles$/, '');
  
  let newName = name;
  
  if (ext === '.tsx') {
    if (file.includes('context')) {
        // context is logic
        newName = name.charAt(0).toLowerCase() + name.slice(1) + 'Context';
    } else {
        // React component
        newName = name.charAt(0).toUpperCase() + name.slice(1);
    }
  } else if (ext === '.ts') {
    if (name === 'Types' || name === 'Declarations' || name === 'Styled') {
        newName = name.toLowerCase();
    } else if (file.includes('service')) {
        newName = name.charAt(0).toLowerCase() + name.slice(1) + 'Service';
    } else if (file.includes('styles')) {
        newName = name.charAt(0).toUpperCase() + name.slice(1) + 'Styles';
    } else {
        // Logic/Utility camelCase
        newName = name.charAt(0).toLowerCase() + name.slice(1);
    }
  }

  const newPath = path.join(parsed.dir, newName + ext);
  if (file !== newPath) {
    renameAndUpdate(file, newPath);
  }
});
