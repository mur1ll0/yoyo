import fs from 'fs';
import path from 'path';

function checkColumn() {
  const assetsDir = path.join('dist', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('dist/assets does not exist');
    return;
  }
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.endsWith('.js'));
  if (!jsFile) {
    console.error('No JS file found in dist/assets');
    return;
  }
  
  const filePath = path.join(assetsDir, jsFile);
  console.log(`Reading bundle file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Split content by lines
  const lines = content.split('\n');
  console.log(`Total lines: ${lines.length}`);
  
  // We want to check line 102 (1-based, index 101) or if there's only 1 line, line 1
  const lineIndex = lines.length > 101 ? 101 : 0;
  const line = lines[lineIndex];
  
  // Extract snippet around column 674 (0-based: 673)
  const colIndex = 674; // Let's check around 674
  const start = Math.max(0, colIndex - 100);
  const end = Math.min(line.length, colIndex + 100);
  
  console.log(`Line ${lineIndex + 1} length: ${line.length}`);
  console.log(`Code around column ${colIndex}:`);
  console.log(`... ${line.slice(start, end)} ...`);
}

checkColumn();
