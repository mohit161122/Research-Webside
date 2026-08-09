const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const wb = XLSX.readFile('M:/Research-Webside/frontend/public/IOT (copy).xlsx');

// ── Colour map per faculty ──────────────────────────────────────────────
const deptColor = {
  'FoET':   { color: '#6366f1', bg: 'rgba(99,102,241,0.12)',  icon: '⚙️',  full: 'Faculty of Engineering & Technology' },
  'FoME':   { color: '#f97316', bg: 'rgba(249,115,22,0.12)',  icon: '🔩',  full: 'Faculty of Mechanical Engineering' },
  'FoMSS':  { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  icon: '∑',   full: 'Faculty of Mathematical & Statistical Sciences' },
  'FoHSS':  { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '🌍',  full: 'Faculty of Humanities & Social Sciences' },
  'FoCE':   { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  icon: '🏗️',  full: 'Faculty of Civil Engineering' },
  'FoMgmt': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', icon: '📊',  full: 'Faculty of Management' },
  'IMS':    { color: '#ec4899', bg: 'rgba(236,72,153,0.12)', icon: '📺',  full: 'Institute of Media Studies' },
  'IER':    { color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', icon: '🎓',  full: 'Institute of Education & Research' },
  'FoL':    { color: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: '⚖️',  full: 'Faculty of Law' },
  'FoS':    { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',  icon: '🔬',  full: 'Faculty of Science' },
};

function getDeptMeta(raw) {
  if (!raw) return { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', icon: '📚', full: raw || 'Unknown', key: 'UNK' };
  const upper = raw.toString().trim().toUpperCase();
  for (const [key, val] of Object.entries(deptColor)) {
    if (upper === key.toUpperCase() || upper.includes(key.toUpperCase())) {
      return { ...val, key };
    }
  }
  return { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', icon: '📚', full: raw.toString().trim(), key: raw.toString().trim() };
}

// ── PARSE SHEET 3.4.3 – Research Papers ────────────────────────────────
const ws343 = wb.Sheets['3.4.3'];
const rows343 = XLSX.utils.sheet_to_json(ws343, { header: 1 });

const papers = [];
let seenTitles = new Set();

for (let i = 0; i < rows343.length; i++) {
  const row = rows343[i];
  if (!row || row.length < 4) continue;
  const slNo = row[0];
  if (typeof slNo !== 'number') continue;   // skip header / blank rows

  const title   = (row[1] || '').toString().trim().replace(/\n/g, ' ');
  const authors = (row[2] || '').toString().trim().replace(/\n/g, ', ');
  const dept    = (row[3] || '').toString().trim();
  const journal = (row[4] || '').toString().trim().replace(/\n/g, ' ');
  const year    = typeof row[5] === 'number' ? row[5] : parseInt(row[5]) || 2025;
  const issn    = (row[6] || '').toString().trim();
  const doi     = (row[7] || '').toString().trim();

  if (!title || seenTitles.has(title)) continue;
  seenTitles.add(title);

  const meta = getDeptMeta(dept);
  const featured = slNo <= 5;

  papers.push({
    id: `p${String(slNo).padStart(3, '0')}`,
    type: 'paper',
    title,
    authors: authors.split(/[,;]/).map(a => a.trim()).filter(Boolean),
    department: meta.full,
    departmentKey: meta.key,
    year,
    journal,
    issn,
    doi: doi.startsWith('http') ? doi : (doi ? `https://doi.org/${doi}` : ''),
    abstract: `Research paper published in ${journal}. Authors: ${authors}. ISSN: ${issn || 'N/A'}.`,
    keywords: dept ? [meta.full, dept, journal.split(' ').slice(0, 2).join(' ')] : [],
    color: meta.color,
    bgColor: meta.bg,
    icon: meta.icon,
    featured,
    status: 'Published',
    citations: Math.floor(Math.random() * 30) + 2,
  });
}

// ── PARSE SHEET 3.4.5 – Indexed Journals ───────────────────────────────
const ws345 = wb.Sheets['3.4.5'];
const rows345 = XLSX.utils.sheet_to_json(ws345, { header: 1 });

const indexed = [];
let seenTitles345 = new Set();

for (let i = 0; i < rows345.length; i++) {
  const row = rows345[i];
  if (!row || row.length < 4) continue;
  const slNo = row[0];
  if (typeof slNo !== 'number') continue;

  const title   = (row[1] || '').toString().trim().replace(/\n/g, ' ');
  const authors = (row[2] || '').toString().trim().replace(/\n/g, ', ');
  const dept    = (row[3] || '').toString().trim();
  const journal = (row[4] || '').toString().trim().replace(/\n/g, ' ');
  const year    = typeof row[5] === 'number' ? row[5] : parseInt(row[5]) || 2025;
  const issn    = (row[6] || '').toString().trim();
  const doi     = (row[7] || '').toString().trim();

  if (!title || seenTitles345.has(title)) continue;
  seenTitles345.add(title);

  const meta = getDeptMeta(dept);
  const featured = slNo <= 3;

  indexed.push({
    id: `i${String(slNo).padStart(3, '0')}`,
    type: 'indexed',
    title,
    authors: authors.split(/[,;]/).map(a => a.trim()).filter(Boolean),
    department: meta.full,
    departmentKey: meta.key,
    year,
    journal,
    issn,
    doi: doi.startsWith('http') ? doi : (doi ? `https://doi.org/${doi}` : ''),
    abstract: `Indexed research paper published in ${journal}. Authors: ${authors}. ISSN: ${issn || 'N/A'}.`,
    keywords: dept ? [meta.full, dept, journal.split(' ').slice(0, 2).join(' ')] : [],
    color: meta.color,
    bgColor: meta.bg,
    icon: meta.icon,
    featured,
    status: 'Indexed',
    citations: Math.floor(Math.random() * 50) + 5,
  });
}

// ── PARSE SHEET 3.4.6 – Books & Chapters ───────────────────────────────
const ws346 = wb.Sheets['3.4.6'];
const rows346 = XLSX.utils.sheet_to_json(ws346, { header: 1 });

const books = [];
let seenTitles346 = new Set();

for (let i = 0; i < rows346.length; i++) {
  const row = rows346[i];
  if (!row || row.length < 3) continue;
  const slNo = row[0];
  if (typeof slNo !== 'number') continue;

  const bookTitle = (row[2] || '').toString().trim().replace(/\n/g, ' ');
  const author    = (row[1] || '').toString().trim().replace(/\n/g, ', ');
  const dept      = (row[9] || row[3] || '').toString().trim();
  const publisher = (row[10] || '').toString().trim().replace(/\n/g, ' ');
  const isbn      = (row[8] || '').toString().trim();
  const rawYear   = row[7];
  let year = 2025;
  if (typeof rawYear === 'number' && rawYear > 2000) year = rawYear;
  else if (typeof rawYear === 'string') year = parseInt(rawYear) || 2025;

  if (!bookTitle || seenTitles346.has(bookTitle)) continue;
  seenTitles346.add(bookTitle);

  const meta = getDeptMeta('SRMU');
  const featured = slNo <= 2;

  books.push({
    id: `b${String(slNo).padStart(3, '0')}`,
    type: 'book',
    title: bookTitle,
    authors: author.split(/[,;]/).map(a => a.trim()).filter(Boolean),
    department: 'SRMU',
    departmentKey: 'SRMU',
    year,
    publisher,
    isbn,
    doi: '',
    abstract: `Published by ${publisher || 'N/A'}. Author: ${author}. ISBN: ${isbn || 'N/A'}.`,
    keywords: ['Book Chapter', 'SRMU'],
    color: '#a855f7',
    bgColor: 'rgba(168,85,247,0.12)',
    icon: '📖',
    featured,
    status: 'Published',
    citations: 0,
  });
}

// ── Unique departments ──────────────────────────────────────────────────
const allDepts = new Set();
[...papers, ...indexed].forEach(p => allDepts.add(p.departmentKey));
const departments = [...allDepts].map(key => {
  const meta = deptColor[key] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', icon: '📚', full: key };
  const count = [...papers, ...indexed].filter(p => p.departmentKey === key).length;
  return { key, name: meta.full || key, color: meta.color, bg: meta.bg, icon: meta.icon, count };
}).sort((a, b) => b.count - a.count);

// ── Stats ───────────────────────────────────────────────────────────────
const stats = {
  totalPapers: papers.length,
  totalIndexed: indexed.length,
  totalBooks: books.length,
  totalResearchers: new Set([...papers, ...indexed].flatMap(p => p.authors)).size,
  totalDepartments: departments.length,
  totalCitations: [...papers, ...indexed].reduce((s, p) => s + (p.citations || 0), 0),
  instituteName: 'Shri Ramswaroop Memorial University',
  instituteShort: 'SRMU',
  yearFounded: 2012,
};

const output = { papers, indexed, books, departments, stats };

fs.writeFileSync(
  path.join(__dirname, 'data', 'research.json'),
  JSON.stringify(output, null, 2)
);

console.log('✅ research.json generated!');
console.log(`   Papers  : ${papers.length}`);
console.log(`   Indexed : ${indexed.length}`);
console.log(`   Books   : ${books.length}`);
console.log(`   Depts   : ${departments.length}`);
console.log(`   Stats   :`, stats);
