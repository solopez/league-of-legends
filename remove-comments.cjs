const fs = require('fs');
const path = require('path');

const removeComments = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/\/\/\s.*$/gm, '');

  content = content.replace(/\/\*[\s\S]*?\*\//g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
};

const removeCommentsFromFiles = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeCommentsFromFiles(filePath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      console.log(`removing ${filePath}`);
      removeComments(filePath);
    }
  });
};

removeCommentsFromFiles('src');