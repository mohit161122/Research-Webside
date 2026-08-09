import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink } from 'lucide-react';

function Footer() {
  return (
    <footer style={{ background: 'var(--color-card-mint)', borderTop: '1px solid var(--color-sea-foam)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px' }} className="mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--color-deep-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 16, color: 'var(--color-charcoal-navy)' }}>
                SRMU Research
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-slate-body)', lineHeight: 1.6 }}>
              Shri Ramswaroop Memorial University Research Showcase Portal. Showcasing faculty publications, patents, indexed journals, and books.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12 }}>Explore</div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Research Papers', to: '/papers' },
                { label: 'Indexed Journals', to: '/indexed' },
                { label: 'Books & Chapters', to: '/books' },
                { label: 'Departments', to: '/departments' },
              ].map(l => (
                <Link key={l.to} to={l.to} style={{ fontSize: 14, color: 'var(--color-charcoal-navy)', textDecoration: 'none' }}
                  className="hover:text-deep-teal transition-colors"
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Faculties */}
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12 }}>Faculties</div>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--color-slate-body)' }}>
              <span>Engineering & Technology</span>
              <span>Mechanical Engineering</span>
              <span>Mathematical Sciences</span>
              <span>Management & Humanities</span>
            </div>
          </div>

          {/* API */}
          <div className="flex flex-col gap-4">
            <div className="eyebrow" style={{ fontSize: 12 }}>API & Data</div>
            <p style={{ fontSize: 13, color: 'var(--color-slate-body)', lineHeight: 1.55 }}>
              Powered by Node.js & Express, parsing live Excel datasets.
            </p>
            <a
              href="http://localhost:5000/api/health"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ fontSize: 12, padding: '7px 14px', width: 'fit-content' }}
            >
              API Status <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-sea-foam)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--color-slate-body)' }}>
            © {new Date().getFullYear()} SRMU Research Portal. All rights reserved.
          </span>
          <span className="eyebrow" style={{ fontSize: 11, color: 'var(--color-sage)' }}>
            Built with Node.js · Express · React
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
