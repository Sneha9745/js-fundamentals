import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.resolve('dist/assets');
const MAX_SIZE_KB = 250;

if (!fs.existsSync(assetsDir)) {
  console.error('Build not found. Run npm run build first.');
  process.exit(1);
}

const jsFiles = fs.readdirSync(assetsDir)
  .filter((file) => file.endsWith('.js'));

let failed = false;

for (const file of jsFiles) {
  const filePath = path.join(assetsDir, file);
  const sizeKB = fs.statSync(filePath).size / 1024;

  console.log(`${file}: ${sizeKB.toFixed(2)} KB`);

  if (sizeKB > MAX_SIZE_KB) {
    console.error(`FAILED: ${file} exceeds ${MAX_SIZE_KB} KB budget.`);
    failed = true;
  }
}

if (failed) {
  console.error('Build budget check failed!');
  process.exit(1);
}

console.log(`SUCCESS: All JS chunks are within ${MAX_SIZE_KB} KB budget.`);