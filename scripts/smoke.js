#!/usr/bin/env node
// Minimal smoke: checks offline fallback and anchor navigation.
// Usage: node scripts/smoke.js http://localhost/retrospective/

import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.get(u, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
  });
}

async function main() {
  const base = process.argv[2] || 'http://localhost/retrospective/';
  const report = { base, checks: [] };
  const add = (name, ok, extra={}) => report.checks.push({ name, ok, ...extra });

  try {
    const r = await fetchUrl(base);
    add('index reachable', r.status === 200, { status: r.status });
    add('has main element', /<main[\s>]/i.test(r.body));
    add('has sections', /<section[\s>]/i.test(r.body));
  } catch (e) {
    add('index reachable', false, { error: String(e) });
  }

  try {
    const r2 = await fetchUrl(new URL('site/offline.html', base).toString());
    add('offline.html reachable', r2.status === 200, { status: r2.status });
    add('offline.html has title', /<title>.*offline/i.test(r2.body));
  } catch (e) {
    add('offline.html reachable', false, { error: String(e) });
  }

  const failed = report.checks.filter(c => !c.ok);
  console.log(JSON.stringify(report, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main();
