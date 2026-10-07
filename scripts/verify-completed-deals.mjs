import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { parseCsv, prepare, impliedValue, verifyNoPrivateFields } from './prepare-completed-deals.mjs';

const data = JSON.parse(readFileSync('src/content/completed-deals.json', 'utf8'));
const keys = ['id', 'purpose', 'helocByAmount', 'state', 'year', 'month', 'roundedLoanAmount', 'roundedImpliedValue'].sort();
assert.equal(data.length, 83);
assert.equal(data.filter(r => r.purpose === 'Purchase').length, 30);
assert.equal(data.filter(r => r.purpose === 'Refinance').length, 53);
assert.equal(new Set(data.map(r => r.id)).size, data.length);
for (const record of data) {
  assert.deepEqual(Object.keys(record).sort(), keys, 'Public data uses an explicit field allowlist');
  assert.match(record.id, /^deal-\d{3}$/);
  assert.equal(typeof record.helocByAmount, 'boolean');
  assert(Number.isInteger(record.month) && record.month >= 1 && record.month <= 12);
  for (const field of ['roundedLoanAmount', 'roundedImpliedValue']) {
    assert(record[field] > 0 && record[field] % 25000 === 0, 'Public figures are rounded');
  }
}
assert.equal(impliedValue(400000, 80), 500000);
assert.equal(impliedValue(400000, 100), 400000);
for (const ltv of [0, -10, 101, NaN, Infinity]) assert.throws(() => impliedValue(400000, ltv));
assert.deepEqual(parseCsv('\uFEFFA,B\r\n"value, with comma","a ""quote"""\r\n'), [{ A: 'value, with comma', B: 'a "quote"' }]);
let privateRows;
const sourceArg = process.argv.find(arg => arg.toLowerCase().endsWith('.csv'));
if (sourceArg) {
  privateRows = parseCsv(readFileSync(sourceArg, 'utf8'));
  assert.deepEqual(prepare(privateRows), data, 'Every source row reconciles to its rounded public projection');
  verifyNoPrivateFields(privateRows, JSON.stringify(data));
  // Independent numeric check of each calculation; never print raw values.
  privateRows.forEach((row, i) => {
    const amount = Number(row['Total Loan Amount'].replace(/[$,\s]/g, ''));
    const ltv = Number(row.LTV.replace(/[%\s]/g, ''));
    assert.equal(data[i].helocByAmount, amount < 150000);
    assert.equal(data[i].roundedImpliedValue, 25000 * Math.round((100 * amount / ltv) / 25000));
  });
}
console.log('PASS 83 records; 30 purchases/53 refinances; field allowlist; rounding; formula edge cases; CSV parsing and optional source reconciliation.');

if (!process.argv.includes('--data-only')) {
  const hashes = new Set(); let bytes = 0;
  assert.equal(readdirSync('public/images/deals').filter(name => name.endsWith('.webp')).length, data.length);
  for (const record of data) {
    const buffer = readFileSync(`public/images/deals/${record.id}.webp`);
    const hash = createHash('sha256').update(buffer).digest('hex');
    assert(!hashes.has(hash), 'No duplicate images'); hashes.add(hash); bytes += buffer.length;
    const meta = await sharp(buffer).metadata();
    assert.equal(meta.width, 1200); assert.equal(meta.height, 675);
    assert(!meta.exif && !meta.xmp && !meta.iptc, 'No embedded metadata');
    assert(buffer.length < 350000, `${record.id} optimized size`);
  }
  console.log(`PASS 83 unique 1200×675 WebP images, no embedded metadata, ${(bytes / 1024 / 1024).toFixed(2)} MiB total.`);
}

const baseArg = process.argv.find(arg => /^https?:/.test(arg));
if (baseArg) {
  const base = new URL(baseArg);
  assert(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Local-only verification');
  const get = async path => {
    const response = await fetch(new URL(path, base)); assert.equal(response.status, 200, path);
    const html = await response.text(); if (privateRows) verifyNoPrivateFields(privateRows, html);
    return html;
  };
  const seen = new Set();
  for (let page = 1; page <= 7; page++) {
    const html = await get(`/completed-financing?page=${page}`);
    const ids = [...html.matchAll(/<article[^>]+aria-labelledby="(deal-\d{3})-title"/g)].map(m => m[1]);
    assert.equal(ids.length, page === 7 ? 11 : 12);
    for (const id of ids) { assert(!seen.has(id)); seen.add(id); }
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert(html.includes('All images are AI-generated illustrations, not the financed properties.'));
    assert(!html.includes('AI illustration · Not the financed property'), 'No repeated image captions');
    assert.equal((html.match(/<time dateTime="\d{4}-\d{2}">/g) ?? []).length, ids.length, 'Every card shows funding month/year');
  }
  assert.equal(seen.size, 83, 'All deals reachable with no duplicate pagination records');
  for (const [purpose, total] of [['Purchase', 30], ['Refinance', 53]]) {
    const html = await get(`/completed-financing?purpose=${purpose}`);
    assert(html.includes(`of ${total} examples`));
    const ids = [...html.matchAll(/<article[^>]+aria-labelledby="(deal-\d{3})-title"/g)].map(m => m[1]);
    assert(ids.every(id => data.find(r => r.id === id)?.purpose === purpose));
  }
  const empty = await get('/completed-financing?purpose=Purchase&state=NotAState');
  assert(empty.includes('of 30 examples'), 'Unknown state safely ignored');
  for (const page of ['-1', 'NaN', '999', '2.5']) await get(`/completed-financing?page=${page}`);
  const home = await get('/');
  assert(home.includes('All images are AI-generated illustrations, not the financed properties.'));
  assert(!home.includes('AI illustration · Not the financed property'), 'Homepage uses a section-level disclosure');
  assert.equal((home.match(/<article[^>]+aria-labelledby="deal-\d{3}-title"/g) ?? []).length, 3);
  assert((await get('/sitemap.xml')).includes('/completed-financing</loc>'));
  console.log('PASS local archive, 7 pages, filters, pagination boundaries, homepage preview, sitemap and optional private-field HTML scan.');
}
