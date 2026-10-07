import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Read the private export in place. Never copy it into the repository.
export function parseCsv(text) {
  const rows = []; let row = [], field = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (c === ',' && !quoted) { row.push(field); field = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = '';
    } else field += c;
  }
  assert(!quoted, 'Unterminated CSV field');
  row.push(field); if (row.some(Boolean)) rows.push(row);
  const headers = rows.shift();
  assert(headers && new Set(headers).size === headers.length, 'Invalid CSV headers');
  return rows.map((values, index) => {
    assert.equal(values.length, headers.length, `Column count at row ${index + 2}`);
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

export function impliedValue(amount, ltvPercent) {
  assert(Number.isFinite(amount) && amount > 0, 'Invalid loan amount');
  assert(Number.isFinite(ltvPercent) && ltvPercent > 0 && ltvPercent <= 100, 'Invalid LTV');
  return amount / (ltvPercent / 100);
}
const STATES = new Set(['Arizona', 'California', 'Colorado', 'Florida', 'Illinois', 'Oregon', 'Washington']);
export function prepare(rows) {
  const seen = new Set();
  return rows.map((row, index) => {
    const purpose = row['Loan Purpose'];
    assert(['Purchase', 'Refinance'].includes(purpose), `Unknown purpose at row ${index + 2}`);
    const state = row['Subject State'];
    assert(STATES.has(state), `Unreviewed state at row ${index + 2}`);
    const amount = Number(row['Total Loan Amount'].replace(/[$,\s]/g, ''));
    const ltv = Number(row.LTV.replace(/[%\s]/g, ''));
    const value = impliedValue(amount, ltv);
    const date = new Date(row['Loan Funded']);
    assert(Number.isFinite(date.getTime()), `Missing funding date at row ${index + 2}`);
    assert(date.getTime() <= Date.now(), `Future funding date at row ${index + 2}`);
    const year = date.getUTCFullYear();
    assert(year >= 2000 && year <= new Date().getUTCFullYear(), `Review funding year at row ${index + 2}`);
    const key = JSON.stringify([row['Subject Property'], row['Primary Borrower'], amount, row['Loan Funded']]);
    assert(!seen.has(key), `Duplicate source loan at row ${index + 2}`); seen.add(key);
    // Calculate from original inputs BEFORE rounding. Do not ship exact LTV, funding days or source identifiers.
    const roundedLoanAmount = Math.round(amount / 25000) * 25000;
    const roundedImpliedValue = Math.round(value / 25000) * 25000;
    assert(roundedLoanAmount > 0 && roundedImpliedValue > 0, `Amount too small for public rounding at row ${index + 2}`);
    // Owner-provided display classification; preserve the source purpose separately.
    return { id: `deal-${String(index + 1).padStart(3, '0')}`, purpose, helocByAmount: amount < 150000, state, year, month: date.getUTCMonth() + 1, roundedLoanAmount, roundedImpliedValue };
  });
}

export function verifyNoPrivateFields(rows, publicText) {
  const normalized = publicText.toLowerCase();
  for (const row of rows) {
    for (const key of ['Primary Borrower', 'Co-Borrower', 'Subject Property']) {
      const value = row[key]?.trim().toLowerCase();
      assert(!value || !normalized.includes(value), `Private source field found: ${key}`);
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  assert(process.argv[2], 'Pass the private CSV path; it stays outside the repository.');
  const rows = parseCsv(readFileSync(process.argv[2], 'utf8'));
  const records = prepare(rows);
  const output = JSON.stringify(records, null, 2) + '\n';
  verifyNoPrivateFields(rows, output);
  const destination = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/completed-deals.json');
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, output);
  console.log(JSON.stringify({ count: records.length, purchases: records.filter(r => r.purpose === 'Purchase').length, refinances: records.filter(r => r.purpose === 'Refinance').length, privateFieldsRetained: false, locationPrecision: 'state', firstState: records[0]?.state }));
}
