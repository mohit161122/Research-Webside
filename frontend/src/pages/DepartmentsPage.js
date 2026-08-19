import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Loader2, BookOpen } from 'lucide-react';

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  
  return (
    <div className="archive-page home-width">
      
      {/* Header */}
      <div className="page-hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot rose" />
          <Building2 className="w-4 h-4" />
          <span>Academic Faculties</span>
        </div>
        <h1>Departments & <em>research wings.</em></h1>
        <p>
          Explore research output, patents, and faculty contributions categorized by university department.
        </p>
      </div>

      {loading ? (
        <div className="empty-state">
          <Loader2 className="spin-icon large" />
          <p className="text-sm">Loading departments...</p>
        </div>
      ) : (
        <div className="archive-grid department-grid">
          {departments.map((dept) => (
            <Link
              key={dept.key}
              to={`/papers?department=${encodeURIComponent(dept.key)}`}
              className="archive-card department-card"
            >
              <div>
                <div className="department-card-top">
                  <span className="department-mark">{dept.icon || '·'}</span>
                  <span className="key-tag">
                    {dept.key}
                  </span>
                </div>

                <h3>
                  {dept.name}
                </h3>
              </div>

              <div className="department-card-footer">
                <span>
                  <BookOpen />
                  <span>{dept.count} Publications</span>
                </span>
                <span className="text-link">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}

export default DepartmentsPage;
