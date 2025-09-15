#!/usr/bin/env node
// Scans repository for mojibake (replacement char U+FFFD) and suspicious bytes in text files.
// Fails the build if any occurrences are found.

const fs = require('fs');
const path = require('path');

const exts = new Set(['.html', '.css', '.js', '.ts', '.tsx', '.md', '.json', '.yml', '.yaml']);
const ignoreDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.PLAYWRIGHT']);
const root = process.cwd();

/** @type {{file:string, count:number, sample:string}[]} */
const hits = [];

function isTextFile(p){ return exts.has(path.extname(p).toLowerCase()); }
function walk(dir){
  for(const entry of fs.readdirSync(dir, { withFileTypes: true })){
    if(entry.isDirectory()){
      if(ignoreDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name));
    } else {
      const full = path.join(dir, entry.name);
      if(!isTextFile(full)) continue;
      const buf = fs.readFileSync(full);
      const text = buf.toString('utf8');
      const re = /\uFFFD/g; // replacement char
      let m, count = 0, sample = '';
      while((m = re.exec(text))){ count++; if(sample.length < 200){ sample += text.slice(Math.max(0,m.index-20), m.index+20).replace(/\n/g,' '); } }
      if(count){ hits.push({ file: path.relative(root, full), count, sample }); }
    }
  }
}

walk(root);

if(hits.length){
  console.error('Mojibake detected in files:');
  for(const h of hits){
    console.error(`- ${h.file} (count: ${h.count}) sample: ...${h.sample}...`);
  }
  process.exit(1);
} else {
  console.log('No mojibake (U+FFFD) found.');
}

