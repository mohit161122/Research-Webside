const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const data = require('./data/research.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function matchesSearch(item, q) {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    (item.title || '').toLowerCase().includes(lower) ||
    (item.abstract || '').toLowerCase().includes(lower) ||
    (item.journal || item.publisher || '').toLowerCase().includes(lower) ||
    (item.department || '').toLowerCase().includes(lower) ||
    (item.authors || []).some(a => a.toLowerCase().includes(lower)) ||
    (item.keywords || []).some(k => k.toLowerCase().includes(lower))
  );
}

// ─── Routes ────────────────────────────────────────────────────────────────

app.get('/api/stats', (req, res) => res.json(data.stats));

app.get('/api/departments', (req, res) => res.json(data.departments));

// Papers (Sheet 3.4.3)
app.get('/api/papers', (req, res) => {
  let items = [...data.papers];
  const { search, department, year, featured } = req.query;
  if (search)                         items = items.filter(p => matchesSearch(p, search));
  if (department && department !== 'All') items = items.filter(p => p.departmentKey === department || p.department === department);
  if (year)                           items = items.filter(p => p.year === parseInt(year));
  if (featured === 'true')            items = items.filter(p => p.featured);
  res.json({ count: items.length, papers: items });
});

app.get('/api/papers/:id', (req, res) => {
  const item = data.papers.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Indexed (Sheet 3.4.5)
app.get('/api/indexed', (req, res) => {
  let items = [...data.indexed];
  const { search, department, year, featured } = req.query;
  if (search)                         items = items.filter(p => matchesSearch(p, search));
  if (department && department !== 'All') items = items.filter(p => p.departmentKey === department || p.department === department);
  if (year)                           items = items.filter(p => p.year === parseInt(year));
  if (featured === 'true')            items = items.filter(p => p.featured);
  res.json({ count: items.length, papers: items });
});

app.get('/api/indexed/:id', (req, res) => {
  const item = data.indexed.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Books & Chapters (Sheet 3.4.6)
app.get('/api/books', (req, res) => {
  let items = [...data.books];
  const { search, year } = req.query;
  if (search) items = items.filter(p => matchesSearch(p, search));
  if (year)   items = items.filter(p => p.year === parseInt(year));
  res.json({ count: items.length, books: items });
});

app.get('/api/books/:id', (req, res) => {
  const item = data.books.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Global Search
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json({ papers: [], indexed: [], books: [], total: 0 });
  const papers  = data.papers.filter(p => matchesSearch(p, q)).slice(0, 5);
  const indexed = data.indexed.filter(p => matchesSearch(p, q)).slice(0, 5);
  const books   = data.books.filter(p => matchesSearch(p, q)).slice(0, 3);
  res.json({ papers, indexed, books, total: papers.length + indexed.length + books.length });
});

// Featured
app.get('/api/featured', (req, res) => {
  res.json({
    papers:  data.papers.filter(p => p.featured),
    indexed: data.indexed.filter(p => p.featured),
    books:   data.books.filter(p => p.featured),
  });
});

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Client-side routing fallback for React Router
if (fs.existsSync(buildPath)) {
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀  SRMU Research Portal API  →  http://localhost:${PORT}`);
  console.log(`📄  Papers   : ${data.papers.length}`);
  console.log(`📑  Indexed  : ${data.indexed.length}`);
  console.log(`📖  Books    : ${data.books.length}`);
  console.log(`🏫  Depts    : ${data.departments.length}\n`);
});
