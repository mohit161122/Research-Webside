import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  ScanSearch,
} from "lucide-react";
import PaperCard from "../components/PaperCard";
import Stack from "../Effects/Stack";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];


function HomePage({ onSearchOpen }) {
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState({
    papers: [],
    indexed: [],
    books: [],
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, featRes, deptRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/featured"),
          fetch("/api/departments"),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (featRes.ok) setFeatured(await featRes.json());
        if (deptRes.ok) setDepartments(await deptRes.json());
      } catch (err) {
        console.error("Failed to load home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="loading-state">
        <span className="loading-dot" /> Loading the research archive
      </div>
    );

  return (
    <div className="home-page">
      <div className="home-hero home-width">
        <div className="home-hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> Message
            </p>
            <br />

            <div className="text-4xl font-bold tracking-tight text-gray-900">
              The Research and Consultancy <br />
              Cell <em className="text-[#1c5d5f]"> (R&C)</em>
            </div>
            <br />

            <p className="hero-lede stat-strip home-width ">
              At Shri Ramswaroop Memorial University (SRMU) Barabanki, we
              believe that research and innovation are fundamental drivers of
              academic excellence, technological advancement, and societal
              progress. Our commitment is to cultivate a dynamic research
              ecosystem that empowers students, faculty members, and research
              scholars to transform ideas into impactful solutions. The
              University has established state-of-the-art research and
              innovation facilities, including the AI Center of Excellence,
              Virtual Instrumentation Laboratory, Cadence Design Laboratory, PCB
              design Lab, Centre of Excellence (EV Lab), and the Innovation &
              Incubation Hub, which provide a robust platform for
              experimentation, product development, entrepreneurship, and
              interdisciplinary research. These facilities enable our
              researchers to engage with emerging technologies and address
              real-world challenges through innovative approaches.
            </p>
            <div className="hero-actions mb-6">
              <button onClick={onSearchOpen} className="btn-primary">
                <Search size={17} /> Search the archive
              </button>
              <Link to="/papers" className="btn-ghost">
                Browse publications <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-stack-frame">
              <Stack
                randomRotation
                sensitivity={150}
                sendToBackOnClick={true}
                cards={images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ))}
                autoplay
                autoplayDelay={4000}
                pauseOnHover
              />
            </div>
          </div>
        </div>

     <section className="stat-strip home-width grid grid-cols-2 gap-y-6 gap-x-2 sm:flex sm:items-center sm:justify-between sm:gap-0">
  <div className="flex flex-col items-center text-center">
    <strong className="text-2xl sm:text-3xl font-bold">
      {stats?.totalPapers || 0}
    </strong>
    <span className="text-[10px] sm:text-xs tracking-wide">
      RESEARCH PAPERS
    </span>
  </div>

  <i className="hidden sm:block w-px h-8 bg-gray-300 not-italic" />

  <div className="flex flex-col items-center text-center">
    <strong className="text-2xl sm:text-3xl font-bold">
      {stats?.totalIndexed || 0}
    </strong>
    <span className="text-[10px] sm:text-xs tracking-wide">
      INDEXED JOURNALS
    </span>
  </div>

  <i className="hidden sm:block w-px h-8 bg-gray-300 not-italic" />

  <div className="flex flex-col items-center text-center">
    <strong className="text-2xl sm:text-3xl font-bold">
      {stats?.totalBooks || 0}
    </strong>
    <span className="text-[10px] sm:text-xs tracking-wide">
      BOOKS & CHAPTERS
    </span>
  </div>

  <i className="hidden sm:block w-px h-8 bg-gray-300 not-italic" />

  <div className="flex flex-col items-center text-center">
    <strong className="text-2xl sm:text-3xl font-bold">
      {stats?.totalResearchers || 0}+
    </strong>
    <span className="text-[10px] sm:text-xs tracking-wide">
      RESEARCHERS
    </span>
  </div>
</section>

      {/* <section className="home-section home-width ">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot rose" /> THE COLLECTION
            </p>
            <h2>
              Find the work
              <br />
              <em>behind the idea.</em>
            </h2>
          </div>
          <p className="section-intro">
            Browse a carefully organised record of the university's research
            output, from first experiments to published impact.
          </p>
        </div>
        <div className="feature-grid">
          <div className="feature-card mint-surface">
            <div className="feature-icon">
              <ScanSearch size={20} />
            </div>
            <p className="eyebrow">01 / DISCOVER</p>
            <h3>Search with context.</h3>
            <p>
              Find publications by author, department, journal, year, or the
              question they set out to answer.
            </p>
            <Link to="/papers" className="text-link">
              Explore research <ArrowRight size={15} />
            </Link>
          </div>
          <div className="feature-card blush-surface">
            <div className="feature-icon navy">
              <BookOpen size={20} />
            </div>
            <p className="eyebrow">02 / FOLLOW</p>
            <h3>Trace the thread.</h3>
            <p>
              Move from papers to indexed journals, books, and the departments
              building a richer body of work.
            </p>
            <Link to="/departments" className="text-link navy-link">
              Explore departments <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section> */}


    <div className="home-page mt-[50px]">
  <h1 className="text-4xl font-bold tracking-tight text-center">
    Pobons
  </h1>
  <div className="container mx-auto mt-16 px-3">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 mt-[50px]">
      <div className="text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
      <div className="text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
      <div className="col-span-2 sm:col-span-1 w-1/2 sm:w-full mx-auto text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
    </div>
  </div>
</div>

      <div className="home-page mt-[50px]">
  <h1 className="text-4xl font-bold tracking-tight text-center">
    Pobons
  </h1>
  <div className="container mx-auto mt-16 px-3">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 mt-[50px]">
      <div className="text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
      <div className="text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
      <div className="col-span-2 sm:col-span-1 w-1/2 sm:w-full mx-auto text-gray-500 text-center">
        <img
          src="Images/CEO-1.jpg"
          className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 object-cover mx-auto"
        />
        <h5 className="text-base font-medium mt-2">Nithin Kamath</h5>
        <p className="text-sm">Founder, CEO</p>
      </div>
    </div>
  </div>
</div>

      <section className="home-section home-width publications-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-dot" /> RECENT NOTES
            </p>
            <h2>
              Research Publication / patents/ <rm className="text-[#1c5d5f]">Books & chapters from...</rm>
            </h2>
          </div>
          <Link to="/papers" className="text-link">
            View all papers <ArrowRight size={15} />
          </Link>
        </div>
        <div className="publication-grid">
          {featured.papers?.slice(0, 3).map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </section>

      <section className="departments-band">
        <div className="home-width">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot rose" /> THE PEOPLE & PLACES
              </p>
              <h2>Research across faculties</h2>
            </div>
            <Link to="/departments" className="btn-navy">
              See all faculties <ArrowRight size={15} />
            </Link>
          </div>
          <div className="department-list">
            {departments.slice(0, 4).map((dept) => (
              <Link
                key={dept.key}
                to={`/papers?department=${encodeURIComponent(dept.key)}`}
              >
                <span className="department-mark">{dept.icon || "·"}</span>
                <span>
                  <strong>{dept.name}</strong>
                  <small>{dept.count} publications</small>
                </span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
