import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'public', 'assets', 'projects');

const WEBP_QUALITY = 75;   // 0–100, lower = smaller file
const WEBP_EFFORT  = 4;    // 0–6, higher = slower but smaller

async function findFiles(dir, exts) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...await findFiles(full, exts));
    } else if (exts.includes(extname(e.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

function kb(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }
function pct(before, after) { return (((before - after) / before) * 100).toFixed(1) + '%'; }

async function convertGif(src) {
  const dest = src.replace(/\.gif$/i, '.webp');
  const before = (await stat(src)).size;
  try {
    await sharp(src, { animated: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT, loop: 0 })
      .toFile(dest);
    const after = (await stat(dest)).size;
    if (after >= before) {
      // WebP wasn't smaller — keep original, remove WebP
      await unlink(dest);
      console.log(`  SKIP  ${basename(src)}  (WebP not smaller)`);
      return null;
    }
    console.log(`  GIF→WebP  ${basename(src)}  ${kb(before)} → ${kb(after)}  (saved ${pct(before, after)})`);
    return dest;
  } catch (err) {
    console.error(`  ERROR  ${basename(src)}: ${err.message}`);
    return null;
  }
}

async function convertImage(src) {
  const dest = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (dest === src) return null;
  const before = (await stat(src)).size;
  try {
    await sharp(src)
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toFile(dest);
    const after = (await stat(dest)).size;
    if (after >= before) {
      await unlink(dest);
      console.log(`  SKIP  ${basename(src)}  (WebP not smaller)`);
      return null;
    }
    console.log(`  IMG→WebP  ${basename(src)}  ${kb(before)} → ${kb(after)}  (saved ${pct(before, after)})`);
    return dest;
  } catch (err) {
    console.error(`  ERROR  ${basename(src)}: ${err.message}`);
    return null;
  }
}

// --- main ---
const gifs   = await findFiles(ASSETS_DIR, ['.gif']);
const images = await findFiles(ASSETS_DIR, ['.png', '.jpg', '.jpeg']);

console.log(`\nConverting ${gifs.length} GIFs and ${images.length} images to WebP...\n`);

const converted = [];

for (const f of gifs)   { const r = await convertGif(f);   if (r) converted.push({ old: f, new: r }); }
for (const f of images) { const r = await convertImage(f); if (r) converted.push({ old: f, new: r }); }

// Print a JSON mapping for use in updating projects.json
console.log('\n--- Path mapping (old → new) ---');
for (const c of converted) {
  const oldRel = c.old.replace(/.*public/, '').replace(/\\/g, '/');
  const newRel = c.new.replace(/.*public/, '').replace(/\\/g, '/');
  console.log(`${oldRel}  →  ${newRel}`);
}

console.log(`\nDone. ${converted.length} files converted.`);
console.log('Run "node scripts/update-paths.mjs" next to rewrite projects.json.');
