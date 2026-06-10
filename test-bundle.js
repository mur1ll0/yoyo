import fs from 'fs';
import path from 'path';

function findMapInBundle() {
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
  
  // Find matches of ".map(" or similar array mappings
  const regex = /[^a-zA-Z0-9_$]([a-zA-Z0-9_$]+)\.map\(/g;
  let match;
  const matches = [];
  while ((match = regex.exec(content)) !== null) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(content.length, match.index + 100);
    matches.push({
      variable: match[1],
      snippet: content.slice(start, end)
    });
  }
  
  console.log(`Found ${matches.length} occurrences of .map() in minified bundle:`);
  matches.forEach((m, i) => {
    console.log(`\nOccurrence ${i + 1}: Variable: ${m.variable}`);
    console.log(`Snippet: ${m.snippet}`);
  });
}

findMapInBundle();
