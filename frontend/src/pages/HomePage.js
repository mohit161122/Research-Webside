import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
} from "lucide-react";
import PaperCard from "../components/PaperCard";
import Stack from "../Effects/Stack";
import Topography from "../Effects/Topography";

const images = [
    
];


function HomePage({ onSearchOpen }) {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState({
    papers: [],
    indexed: [],
    books: [],
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProfile, setActiveProfile] = useState("message");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileData = [
    {
      key: "message",
      label: "R&C Cell Message",
      title: "Research & Consultancy Cell",
      designation: "R&C Cell",
      image: "Images/CEO-1.jpg",
      excerpt:
        "At Shri Ramswaroop Memorial University (SRMU) Barabanki, we believe that research and innovation are fundamental drivers of academic excellence, technological advancement, and societal progress.",
      fullContent: [
        <h1 className="text-2xl font-bold text-charcoal-navy">Welcomes you all!</h1>,
        "At Shri Ramswaroop Memorial University (SRMU) Barabanki, we believe that research and innovation are fundamental drivers of academic excellence, technological advancement, and societal progress. Our commitment is to cultivate a dynamic research ecosystem that empowers students, faculty members, and research scholars to transform ideas into impactful solutions.",
        "The University has established state-of-the-art research and innovation facilities, including the AI Center of Excellence, Virtual Instrumentation Laboratory, Cadence Design Laboratory, PCB design Lab, Centre of Excellence (EV Lab), and the Innovation & Incubation Hub, which provide a robust platform for experimentation, product development, entrepreneurship, and interdisciplinary research. These facilities enable our researchers to engage with emerging technologies and address real-world challenges through innovative approaches.",
        "A distinctive feature of SRMU's research framework is its emphasis on Experiment-Based Research. By integrating research-oriented projects into the learning process, we encourage researchers to develop critical thinking, problem-solving abilities, teamwork, and innovation skills. This approach bridges the gap between theoretical knowledge and practical application, preparing researchers to excel in both industry and academia.",
        "The R&C cell actively promotes quality publications, industry collaborations, intellectual property creation, and startup incubation. R&C cell continuously strives to strengthen partnerships with academic institutions, research organizations, government agencies, and industry leaders to create opportunities for knowledge exchange and collaborative innovative research.",
        "As we move forward in an era defined by rapid technological transformation, our focus remains on nurturing a culture of inquiry, creativity, ethical research practices, and entrepreneurial thinking. R&C Cell encourages research scholars and faculty members to explore new frontiers of knowledge and contribute meaningfully to national development and global progress.",
        "R&C Cell invites you to explore the diverse research opportunities available at SRMU, Barabanki and become part of a community dedicated to excellence, innovation, and lifelong learning.",
        "Together, let us create knowledge, inspire innovation, and shape a better future.",
        <h1 className="text-2xl font-bold text-charcoal-navy">Research and Consultancy Cell</h1>,
        "Shri Ramswaroop Memorial University, Barabanki"
      ],
    },
  ];

  const activeProfileData = profileData.find((profile) => profile.key === activeProfile) || profileData[0];

  const isMobile = viewportWidth <= 800;
  const isSmallMobile = viewportWidth <= 480;
  const isTablet = viewportWidth > 800 && viewportWidth <= 1100;
  const styles = {
    page: { position: "relative", isolation: "isolate", overflow: "hidden", background: "var(--color-paper-white)" },
    background: { position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none", opacity: 0.5, width: "100%", height: "30%" },
    width: { width: isMobile ? "calc(100% - 36px)" : "min(var(--page-max), calc(100% - 48px))", marginInline: "auto" },
    hero: { minHeight: isMobile ? 0 : 540, display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "minmax(0, 1fr) minmax(300px, .8fr)" : "minmax(0, 1.05fr) minmax(360px, .95fr)", alignItems: "center", gap: isMobile ? (isSmallMobile ? 26 : 34) : isTablet ? 24 : 40, padding: isMobile ? "30px 0 38px" : "56px 0 48px" },
    heroCopy: { minWidth: 0 },
    title: { maxWidth: 650, fontFamily: "var(--font-serif)", lineHeight: 1.12, fontSize: isSmallMobile ? 32 : 36, fontWeight: 700, letterSpacing: "-0.025em", color: "#111827" },
    lede: { maxWidth: 550, margin: "0 0 30px", fontSize: isMobile || isTablet ? 16 : 18, lineHeight: 1.55, color: "var(--color-slate)" },
    heroVisual: { minWidth: 0, display: "grid", placeItems: "center" },
    stackFrame: { width: `min(100%, ${isSmallMobile ? 280 : isMobile ? 320 : isTablet ? 320 : 380}px)`, height: isSmallMobile ? 350 : isMobile ? 400 : isTablet ? 400 : 480 },
    actions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, flexDirection: isSmallMobile ? "column" : "row", alignItems: isSmallMobile ? "stretch" : "initial" },
    statStrip: { display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: isMobile ? "flex-start" : "space-around", gap: 20, padding: isSmallMobile ? "22px 16px" : "22px 24px", borderBlock: "1px solid var(--color-mint-mist)", background: "rgba(255,255,255,.35)", flexWrap: isMobile ? "wrap" : "nowrap" },
    stat: { display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "center" : "baseline", gap: 10, width: isMobile ? (isSmallMobile ? "100%" : "calc(50% - 10px)") : "auto", textAlign: "center", fontFamily: "var(--font-mono)" },
    statValue: { color: "var(--color-deep-teal)", fontSize: isSmallMobile ? 20 : 23, fontWeight: 600 },
    statLabel: { color: "var(--color-charcoal-navy)", fontSize: isSmallMobile ? 10 : 11, letterSpacing: ".05em" },
    divider: { display: isMobile ? "none" : "block", width: 1, height: 24, background: "var(--color-mint-mist)" },
    peopleSection: { marginTop: 50 },
    sectionTitle: { margin: 0, textAlign: "center", fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, letterSpacing: "-0.025em" },
    peopleContainer: { maxWidth: 1200, margin: "64px auto 0", paddingInline: 12 },
    peopleGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: isMobile ? "24px 14px" : "32px 16px", marginTop: 50 },
    person: { color: "#6b7280", textAlign: "center" },
    personImage: { display: "block", width: isSmallMobile ? 140 : isMobile ? 160 : 224, height: isSmallMobile ? 140 : isMobile ? 160 : 224, objectFit: "cover", borderRadius: "50%", marginInline: "auto" },
    personName: { margin: "8px 0 0", fontSize: 16, fontWeight: 500 },
    personRole: { margin: 0, fontSize: 14 },
    section: { paddingTop: 96 },
    heading: { display: isMobile ? "block" : "flex", alignItems: "center", justifyContent: "space-between", gap: 40, marginBottom: 24 },
    headingTitle: { margin: "13px 0 0", color: "var(--color-charcoal-navy)", fontFamily: "var(--font-serif)", fontSize: isMobile ? 35 : 38, fontWeight: 400, lineHeight: 1.12 },
    publicationGrid: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 },
    departmentsBand: { marginTop: 96, padding: "72px 0 88px", background: "var(--color-blush-sand)", borderTop: "1px solid var(--color-dusty-rose)" },
    departmentList: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 12 },
    departmentLink: { minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 20, color: "var(--color-charcoal-navy)", background: "rgba(242,248,247,.55)", border: "1px solid var(--color-dusty-rose)", borderRadius: "var(--radius-card)", textDecoration: "none" },
    departmentMark: { color: "var(--color-deep-teal)", font: "25px var(--font-serif)" },
    departmentName: { display: "block", font: "19px/1.25 var(--font-serif)" },
    departmentCount: { display: "block", marginTop: 7, color: "var(--color-slate)", fontSize: 12 },
  };

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

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

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (loading)
    return (
      <div style={{ minHeight: "60vh", display: "grid", placeContent: "center", gap: 12, color: "var(--color-pine-shadow)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".05em", textTransform: "uppercase" }}>
        <span style={{ width: 10, height: 10, margin: "auto", display: "block", borderRadius: "50%", background: "var(--color-deep-teal)" }} /> Loading the research archive
      </div>
    );

  return (
    <div style={styles.page}>
      <div
        aria-hidden="true"
        style={styles.background}
      >
        <Topography
          lowColor="#5227FF"
          midColor="#FF9FFC"
          highColor="#FFFFFF"
          speed={0.35}
          morphAmount={3}
          morphSpeed={0.05}
          bands={2}
          thickness={0.01}
          scale={2}
          pixelSize={1}
          glow={0.5}
          colorMode="elevation"
          contrast={3}
          brightness={1}
          fillBands={false}
          opacity={0.35}
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseRadius={0.3}
          mouseStrength={0.4}
        />
      </div>
      <div style={{ ...styles.hero, ...styles.width }}>
        <div style={styles.heroCopy}>
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: ".059em", textTransform: "uppercase", color: "var(--color-pine-shadow)" }}>
            <span style={{ width: 7, height: 7, flex: "0 0 auto", display: "inline-block", borderRadius: "50%", background: "var(--color-sage)" }} /> Message
          </p>
          <br />

          <div style={styles.title}>
            The Research and Consultancy <br />
            Cell <em style={{ color: "var(--color-deep-teal)", fontStyle: "italic" }}> (R&C)</em>
          </div>
          <br />

          <p style={{ ...styles.lede, ...styles.statStrip, width: "100%" }}>
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
             <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{ marginTop: 0, padding: 0, border: 0, background: "transparent", color: "var(--color-deep-teal)", fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            VIEW MORE →
          </button>
          </p>
         
          <div style={styles.actions}>
            <button onClick={onSearchOpen} style={{ display: "inline-flex", alignItems: "center", justifyContent: isSmallMobile ? "center" : "initial", gap: 8, background: "var(--color-deep-teal)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, padding: "12px 24px", border: 0, borderRadius: "var(--radius-btn)", cursor: "pointer" }}>
              <Search size={17} /> Search the archive
            </button>
            <Link to="/papers" style={{ display: "inline-flex", alignItems: "center", justifyContent: isSmallMobile ? "center" : "initial", gap: 8, background: "transparent", color: "var(--color-pine-shadow)", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, padding: "11px 23px", border: "1px solid var(--color-pine-shadow)", borderRadius: "var(--radius-btn)", textDecoration: "none" }}>
              Browse publications <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.stackFrame}>
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

     

      {isModalOpen && (
        <div
          className="view-more-overlay"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="view-more-title"
        >
          <div
            className="view-more-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="view-more-close"
              aria-label="Close modal"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <div className="view-more-header">
              <h3 id="view-more-title">{activeProfileData.title}</h3>
              <p>{activeProfileData.designation}</p>
            </div>

            <div className="view-more-body">
              {activeProfileData.fullContent.map((paragraph, index) => (
                <p key={`${activeProfileData.key}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      <section style={{ ...styles.statStrip, ...styles.width }}>
        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalPapers || 0}
          </strong>
          <span style={styles.statLabel}>
            RESEARCH PAPERS
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalIndexed || 0}
          </strong>
          <span style={styles.statLabel}>
            INDEXED JOURNALS
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalBooks || 0}
          </strong>
          <span style={styles.statLabel}>
            BOOKS & CHAPTERS
          </span>
        </div>

        <i style={styles.divider} />

        <div style={styles.stat}>
          <strong style={styles.statValue}>
            {stats?.totalResearchers || 0}+
          </strong>
          <span style={styles.statLabel}>
            RESEARCHERS
          </span>
        </div>
      </section>


      <div style={styles.peopleSection}>
        <h1 style={styles.sectionTitle}>
          Pobons
        </h1>
        <div style={styles.peopleContainer}>
          <div style={styles.peopleGrid}>
            <div style={styles.person}>
              <img
                src="Images\pankaj-DsE5rnwQ.webp"
                alt="Er. Pankaj Agarwal"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Er. Pankaj Agarwal</h5>
              <p style={styles.personRole}>Chancellor</p>
            </div>
            <div style={styles.person}>
              <img
                src="Images\pooja-B1uI8fBS.webp"
                alt="Er. Pooja Agarwal"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Er. Pooja Agarwal</h5>
              <p style={styles.personRole}>Pro Chancellor</p>
            </div>
            <div style={{ ...styles.person, gridColumn: isMobile ? "1 / -1" : "auto", justifySelf: isMobile ? "center" : "auto" }}>
              <img
                src="Images\vijaytiwari-DtLhXa4L.webp"
                alt="Prof. (Dr.) Vijay Tiwari"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Prof. (Dr.) Vijay Tiwari</h5>
              <p style={styles.personRole}>Vice Chancellor</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.peopleSection}>
        <h1 style={styles.sectionTitle}>
          Pobons
        </h1>
        <div style={styles.peopleContainer}>
          <div style={styles.peopleGrid}>
            <div style={styles.person}>
              <img
                src="Images\Hemendra-NSaxOOgS.webp"
                alt="Prof. (Dr.) Hemendra Sharma"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Prof. (Dr.) Hemendra Sharma</h5>
              <p style={styles.personRole}>Registrar</p>
            </div>
            <div style={styles.person}>
              <img
                src="Images/CEO-1.jpg"
                alt="Nithin Kamath"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Nithin Kamath</h5>
              <p style={styles.personRole}>Founder, CEO</p>
            </div>
            <div style={{ ...styles.person, gridColumn: isMobile ? "1 / -1" : "auto", justifySelf: isMobile ? "center" : "auto" }}>
              <img
                src="Images\Alkesh_Agrawal.webp"
                alt="Prof. (Dr.) Alkesh Agrawal"
                style={styles.personImage}
              />
              <h5 style={styles.personName}>Prof. (Dr.) Alkesh Agrawal</h5>
              <p style={styles.personRole}>Deputy Director</p>
            </div>
          </div>
        </div>
      </div>

      <section style={{ ...styles.section, ...styles.width }}>
        <div style={styles.heading}>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: ".059em", textTransform: "uppercase", color: "var(--color-pine-shadow)" }}>
              <span style={{ display: "inline-block", width: 7, height: 7, marginRight: 8, borderRadius: "50%", background: "var(--color-sage)" }} /> RECENT NOTES
            </p>
            <h2 style={styles.headingTitle}>
              Research Publication / patents/ <rm style={{ color: "var(--color-deep-teal)" }}>Books & chapters from...</rm>
            </h2>
          </div>
          <Link to="/papers" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--color-pine-shadow)", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            View all papers <ArrowRight size={15} />
          </Link>
        </div>
        <div style={styles.publicationGrid}>
          {featured.papers?.slice(0, 3).map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </section>

      <section style={styles.departmentsBand}>
        <div style={styles.width}>
          <div style={styles.heading}>
            <div>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: ".059em", textTransform: "uppercase", color: "var(--color-pine-shadow)" }}>
                <span style={{ display: "inline-block", width: 7, height: 7, marginRight: 8, borderRadius: "50%", background: "var(--color-dusty-rose)" }} /> THE PEOPLE & PLACES
              </p>
              <h2 style={styles.headingTitle}>Research across faculties</h2>
            </div>
            <Link to="/departments" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--color-ink-navy)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, padding: "12px 24px", borderRadius: "var(--radius-btn)", textDecoration: "none" }}>
              See all faculties <ArrowRight size={15} />
            </Link>
          </div>
          <div style={styles.departmentList}>
            {departments.slice(0, 4).map((dept) => (
              <Link
                key={dept.key}
                to={`/papers?department=${encodeURIComponent(dept.key)}`}
              style={styles.departmentLink}
              >
                <span style={styles.departmentMark}>{dept.icon || "·"}</span>
                <span>
                  <strong style={styles.departmentName}>{dept.name}</strong>
                  <small style={styles.departmentCount}>{dept.count} publications</small>
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
