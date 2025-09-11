import fs from 'fs';
import path from 'path';

const exts = new Set(['.html','.css','.js','.md']);
const ignoreDirs = new Set(['.git','node_modules','.github']);
const patterns = [
  /\uFFFD/,                // replacement character
  /Р[Ѐ-џ]/u,               // mojibake (Cyrillic ER + range)
  /Ð./u, /Ñ./u             // common UTF-8->CP1251 artifacts
];

function walk(dir){
  const out=[]; for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    if(e.isDirectory()) { if(!ignoreDirs.has(e.name)) out.push(...walk(path.join(dir,e.name))); }
    else { if(exts.has(path.extname(e.name))) out.push(path.join(dir,e.name)); }
  } return out;
}

const files = walk(process.cwd());
let bad=[];
for(const f of files){
  const text = fs.readFileSync(f,'utf8');
  for(const p of patterns){ if(p.test(text)){ bad.push({file:f, pattern:p.toString()}); break; } }
}
if(bad.length){
  console.error('Mojibake detected in files:');
  for(const b of bad) console.error(` - ${b.file} (${b.pattern})`);
  process.exit(1);
} else {
  console.log('Mojibake check passed.');
}
