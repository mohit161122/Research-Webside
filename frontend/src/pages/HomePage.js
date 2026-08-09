import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Search, ScanSearch } from 'lucide-react';
import PaperCard from '../components/PaperCard';

function HomePage({ onSearchOpen }) {
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState({ papers: [], indexed: [], books: [] });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, featRes, deptRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/featured'),
          fetch('/api/departments')
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (featRes.ok) setFeatured(await featRes.json());
        if (deptRes.ok) setDepartments(await deptRes.json());
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="loading-state"><span className="loading-dot" /> Loading the research archive</div>;

  return (
    <div className="home-page">
      <section className="hero-shell"><div className="hero-copy"><div className="announce-pill"><Sparkles size={14} /> <span>AI-ASSISTED, HUMAN LED:</span> Trusted insights, delivered faster.</div><p className="eyebrow"><span className="eyebrow-dot" /> SRMU RESEARCH ARCHIVE</p><h1>Research that starts with a <em>question.</em></h1><p className="hero-lede">A living catalogue of papers, indexed journals, books, and the people shaping new knowledge at Shri Ramswaroop Memorial University.</p><div className="hero-actions"><button onClick={onSearchOpen} className="btn-primary"><Search size={17} /> Search the archive</button><Link to="/papers" className="btn-ghost">Browse publications <ArrowRight size={16} /></Link></div></div><div className="illustration-wrap" aria-hidden="true"><div className="sketch-note note-one">field note<br /><strong>04 / 12</strong></div><div className="browser-sketch"><div className="browser-top"><i /><i /><i /><span>research.srmu / archive</span></div><div className="browser-body"><div className="person-head" /><div className="person-body" /><div className="speech-lines"><b /><b /><b /></div></div></div><div className="sketch-spark">✦</div><div className="sketch-circle" /></div></section>
      <section className="stat-strip home-width"><div><strong>{stats?.totalPapers || 0}</strong><span>RESEARCH PAPERS</span></div><i /><div><strong>{stats?.totalIndexed || 0}</strong><span>INDEXED JOURNALS</span></div><i /><div><strong>{stats?.totalBooks || 0}</strong><span>BOOKS & CHAPTERS</span></div><i /><div><strong>{stats?.totalResearchers || 0}+</strong><span>RESEARCHERS</span></div></section>
      <section className="home-section home-width"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dot rose" /> THE COLLECTION</p><h2>Find the work<br /><em>behind the idea.</em></h2></div><p className="section-intro">Browse a carefully organised record of the university's research output, from first experiments to published impact.</p></div><div className="feature-grid"><div className="feature-card mint-surface"><div className="feature-icon"><ScanSearch size={20} /></div><p className="eyebrow">01 / DISCOVER</p><h3>Search with context.</h3><p>Find publications by author, department, journal, year, or the question they set out to answer.</p><Link to="/papers" className="text-link">Explore research <ArrowRight size={15} /></Link></div><div className="feature-card blush-surface"><div className="feature-icon navy"><BookOpen size={20} /></div><p className="eyebrow">02 / FOLLOW</p><h3>Trace the thread.</h3><p>Move from papers to indexed journals, books, and the departments building a richer body of work.</p><Link to="/departments" className="text-link navy-link">Explore departments <ArrowRight size={15} /></Link></div></div></section>
      <section className="home-section home-width publications-section"><div className="section-heading compact"><div><p className="eyebrow"><span className="eyebrow-dot" /> RECENT NOTES</p><h2>Selected publications</h2></div><Link to="/papers" className="text-link">View all papers <ArrowRight size={15} /></Link></div><div className="publication-grid">{featured.papers?.slice(0, 3).map((paper) => <PaperCard key={paper.id} paper={paper} />)}</div></section>
      <section className="departments-band"><div className="home-width"><div className="section-heading compact"><div><p className="eyebrow"><span className="eyebrow-dot rose" /> THE PEOPLE & PLACES</p><h2>Research across faculties</h2></div><Link to="/departments" className="btn-navy">See all faculties <ArrowRight size={15} /></Link></div><div className="department-list">{departments.slice(0, 4).map((dept) => <Link key={dept.key} to={`/papers?department=${encodeURIComponent(dept.key)}`}><span className="department-mark">{dept.icon || '·'}</span><span><strong>{dept.name}</strong><small>{dept.count} publications</small></span><ArrowRight size={17} /></Link>)}</div></div></section>
    </div>
  );
}

export default HomePage;
