import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(ROOT, 'generated');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function copyTemplates() {
  const files = fs.readdirSync(DOCS).filter(f => f.endsWith('.template.json'));
  const outFiles = [];
  for (const f of files) {
    const src = path.join(DOCS, f);
    const dst = path.join(OUT, f.replace('.template', ''));
    fs.copyFileSync(src, dst);
    outFiles.push(dst);
  }
  return outFiles;
}

function generateFromSchemas() {
  const schemasPath = path.join(DOCS, 'schemas.json');
  if (!fs.existsSync(schemasPath)) return [];
  const raw = JSON.parse(fs.readFileSync(schemasPath, 'utf8'));
  const outFiles = [];
  if (raw.schemas) {
    for (const key of Object.keys(raw.schemas)) {
      const dst = path.join(OUT, `schema_${key}.json`);
      const sample = { [key]: raw.schemas[key] };
      fs.writeFileSync(dst, JSON.stringify(sample, null, 2), 'utf8');
      outFiles.push(dst);
    }
  }
  return outFiles;
}

function main() {
  ensureDir(OUT);
  const copied = copyTemplates();
  const generated = generateFromSchemas();
  console.log('Generated files:');
  for (const f of [...copied, ...generated]) console.log('-', path.relative(ROOT, f));
}

main();
