import { GraduationCap, Globe, Target, Sparkles, CheckCircle2 } from 'lucide-react';

function Aboutpage() {
  return (
    <div className="about-page home-width">
      
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="announce-pill">
          <GraduationCap className="w-4 h-4" />
          <span>Shri Ramswaroop Memorial University</span>
        </div>
        <h1>About the <em>research archive.</em></h1>
        <p>
          Dedicated to fostering groundbreaking research, innovation, and scholarly excellence across engineering, technology, sciences, humanities, and management.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="about-grid">
        
        <div className="about-card mint-surface">
          <div className="about-icon">
            <Target className="w-6 h-6" />
          </div>
          <h2>Our mission</h2>
          <p>
            To create an empowering ecosystem for faculty and student researchers, enabling high-impact research, patent filings, international journal publications, and multidisciplinary collaborations.
          </p>
        </div>

        <div className="about-card blush-surface">
          <div className="about-icon navy">
            <Globe className="w-6 h-6" />
          </div>
          <h2>Our vision</h2>
          <p>
            To be globally recognized as a premier center for research and technological innovation that addresses real-world industrial and societal challenges.
          </p>
        </div>

      </div>

      {/* Key Highlights */}
      <div className="highlights-panel">
        <h3><Sparkles />
          <span>Research Excellence Highlights</span>
        </h3>
        
        <div className="highlight-grid">
          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Patents & Designs</strong>
              <span>Multiple Indian and International patents filed & published.</span>
            </div>
          </div>

          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Indexed Publications</strong>
              <span>Scopus, Web of Science, and UGC CARE recognized articles.</span>
            </div>
          </div>

          <div className="highlight-item">
            <CheckCircle2 />
            <div>
              <strong>Books & Monograph</strong>
              <span>Authored book chapters and textbooks published globally.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Aboutpage;
