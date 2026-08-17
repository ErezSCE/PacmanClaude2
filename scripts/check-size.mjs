/**
 * Bundle size budget enforcement script.
 * Fails if total dist/ assets exceed 2 MB (2,097,152 bytes).
 */
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const DIST_DIR = 'dist';

function getDirectorySize(dir) {
  let total = 0;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    console.error(`Error: "${dir}" directory not found. Run "npm run build" first.`);
    process.exit(1);
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += getDirectorySize(fullPath);
    } else {
      total += statSync(fullPath).size;
    }
  }
  return total;
}

const totalBytes = getDirectorySize(DIST_DIR);
const totalKB = (totalBytes / 1024).toFixed(2);
const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

console.log(`\nBundle Size Report`);
console.log(`==================`);
console.log(`Total dist/ size: ${totalKB} KB (${totalMB} MB)`);
console.log(`Budget:           2048.00 KB (2.00 MB)`);
console.log(`Remaining:        ${(2048 - parseFloat(totalKB)).toFixed(2)} KB`);

if (totalBytes > MAX_BYTES) {
  console.error(`\n❌ FAIL: Bundle size ${totalMB} MB exceeds 2 MB budget!`);
  process.exit(1);
} else {
  console.log(`\n✅ PASS: Bundle size is within budget.`);
}
