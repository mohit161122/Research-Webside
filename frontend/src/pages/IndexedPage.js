import React, { useState, useEffect } from 'react';
import { Bookmark, Search, RefreshCw, Loader2 } from 'lucide-react';
import PaperCard from '../components/PaperCard';

function IndexedPage() {
  const [papers, setPapers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchIndexed() {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (selectedDept && selectedDept !== 'All') query.append('department', selectedDept);
        if (selectedYear) query.append('year', selectedYear);

        const res = await fetch(`/api/indexed?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPapers(data.papers);
          setCount(data.count);
        }
      } catch (err) {
        console.error('Error fetching indexed journals:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchIndexed, 300);
    return () => clearTimeout(timer);
  }, [search, selectedDept, selectedYear]);

  const resetFilters = () => {
    setSearch('');
    setSelectedDept('All');
    setSelectedYear('');
  };

  return (
    <div className="archive-page home-width">
      
      {/* Header */}
      <div className="page-hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot rose" />
          <Bookmark className="w-4 h-4" />
          <span>Scopus / Web of Science</span>
        </div>
        <h1>Indexed <em>journal publications.</em></h1>
        <p>
          High-impact papers indexed in international journals (Sheet 3.4.5).
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar indexed-filter-bar">
        
        {/* Search Field */}
        <div className="filter-search">
          <Search />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indexed paper title, author, journal..."
            className="archive-input"
          />
        </div>

        {/* Department Filter */}
        <div className="filter-select department-select">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="archive-input"
          >
            <option value="All">All Faculties</option>
            {departments.map((dept) => (
              <option key={dept.key} value={dept.key}>
                {dept.name} ({dept.count})
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-select">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="archive-input"
          >
            <option value="">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Reset */}
        {(search || selectedDept !== 'All' || selectedYear) && (
          <button
            onClick={resetFilters}
            className="btn-ghost reset-button"
          >
            <RefreshCw className="w-4 h-4 text-red-500" />
            <span>Reset</span>
          </button>
        )}

      </div>

      {/* Count */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>Showing <strong className="text-white">{count}</strong> indexed publications</span>
        {loading && <Loader2 className="w-4 h-4 text-red-500 animate-spin" />}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-zinc-400">
          <Loader2 className="w-8 h-8 mx-auto mb-2 text-red-500 animate-spin" />
          <p className="text-sm">Loading indexed journals...</p>
        </div>
      ) : papers.length === 0 ? (
        <div className="glass-panel py-16 text-center text-zinc-400 rounded-2xl border border-zinc-900">
          <Bookmark className="w-12 h-12 mx-auto mb-3 text-zinc-700 stroke-[1.5]" />
          <p className="text-base font-semibold text-zinc-300">No matching indexed journals found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}

    </div>
  );
}

export default IndexedPage;
