import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DATA_FILE = join(__dirname, '..', 'src', 'data', 'projects.json');

const content = await readFile(DATA_FILE, 'utf8');

// Replace all converted paths: .gif → .webp, .png → .webp, .jpg/.jpeg → .webp
// Only for /assets/projects/ paths (don't touch placeholder.svg)
const updated = content.replace(
  /"(\/assets\/projects\/[^"]+)\.(gif|png|jpg|jpeg)"/g,
  (match, path, ext) => {
    // Skip SVG files (they stay as-is)
    if (match.includes('.svg')) return match;
    return `"${path}.webp"`;
  }
);

if (updated === content) {
  console.log('No paths needed updating.');
} else {
  await writeFile(DATA_FILE, updated, 'utf8');
  const count = (content.match(/"\/assets\/projects\/[^"]+\.(gif|png|jpg|jpeg)"/g) || []).length;
  console.log(`Updated ${count} paths in projects.json (.gif/.png/.jpg → .webp)`);
}
