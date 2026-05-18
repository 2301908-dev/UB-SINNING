import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FeaturesSection from "../components/landing/FeaturesSection";
import AboutSection from "../components/landing/AboutSection";
import TeamSection from "../components/landing/TeamSection";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function WaveBackground() {
  return (
    <img
      src="/LandingPageBG.jpg"
      alt="Background Image"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full object-cover -z-10"
    />
  );
}

function LogoIcon() {
  return (
    <img
      src="/src/assets/ublogo.png"
      alt="UB Sining Logo"
      className="w-10 h-10 rounded-full object-cover scale-[1.7]"
    />
  );
}

const DEMO_FILMS = [
  {
    title: "Salinlahi",
    genre: "DOCUMENTARY",
    year: null,
    rating: 4.6,
    gradient: "linear-gradient(155deg, #cc5500 0%, #8B1500 40%, #3d0600 100%)",
    poster: "/src/assets/icons/Poster1.jpg",
    w: 245, h: 350,
  },
  {
    title: "Nightfall",
    genre: "SHORT FILM",
    year: "2025",
    rating: 4.9,
    gradient: "linear-gradient(155deg, #560808 0%, #2a0303 55%, #130101 100%)",
    poster: "/src/assets/icons/Poster2.jpg",
    w: 245, h: 350,
  },
  {
    title: "Mga Tala",
    genre: "ANIMATION",
    year: "2025",
    rating: 4.7,
    gradient: "linear-gradient(155deg, #f2b200 0%, #c97c00 48%, #7a4500 100%)",
    poster: "/src/assets/icons/Poster3.jpeg",
    w: 245, h: 350,
  },
];

function FilmCard({ film }) {
  return (
    <div style={{
      position: "relative",
      width: film.w,
      height: film.h,
      borderRadius: 24,
      background: film.gradient,
      border: "1px solid rgba(255,255,255,0.09)",
      boxShadow: "0 30px 72px rgba(0,0,0,0.48), 0 8px 24px rgba(0,0,0,0.30)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "18px 18px 20px",
      overflow: "hidden",
    }}>

      {/* Poster image — full cover */}
      <img
        src={film.poster}
        alt={film.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 24,
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: 24,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.20) 55%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* Rating badge — top right */}
      <div style={{
        position: "absolute",
        top: 13,
        right: 13,
        zIndex: 2,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(12,4,0,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 999,
        padding: "5px 11px 5px 8px",
      }}>
        <img src="/src/assets/icons/star.png" alt="star" style={{ width: 10, height: 10 }} />
        <span style={{
          color: "#fff",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: 11,
          lineHeight: 1,
        }}>{film.rating}</span>
      </div>

      {/* Bottom meta */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <span style={{
          display: "block",
          color: "rgba(255,255,255,0.68)",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}>
          {film.genre}{film.year ? ` · ${film.year}` : ""}
        </span>
        <p style={{
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 15,
          lineHeight: 1.2,
          margin: 0,
        }}>
          {film.title}
        </p>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Features", "About", "Team"];

function Navbar({ onSignInClick }) {
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.toLowerCase()));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const link = NAV_LINKS.find((l) => l.toLowerCase() === sectionId);
          if (link) setActiveLink(link);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
    const el = document.getElementById(link.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="
        fixed top-5 left-1/2 -translate-x-1/2
        z-20 w-[calc(100%-64px)] max-w-[1100px]
        flex items-center justify-between
        rounded-[30px] px-8 py-[14px]
        border border-gray-200/65
      "
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 flex-1 ml-3 cursor-pointer" onClick={() => { setActiveLink("Home"); const el = document.getElementById("home"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}>
        <LogoIcon />
        <span
          className="text-[#8B0000] text-[26px] tracking-wide"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          UB-SINING
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link}>
             <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
              className={`
                inline-block text-[16px] no-underline
                transition-colors duration-200
                hover:text-[#8B0000]
                ${activeLink === link ? "text-[#8B0000] border-[#8B0000]" : "text-[#1a1a1a] border-transparent"}
              `}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                paddingBottom: "2px",
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Sign In */}
      <div className="flex-1 flex justify-end">
      <button
        onClick={onSignInClick}
        className="
          cursor-pointer
          text-white text-[16px] rounded-full px-7 py-3
          transition-all duration-200
          hover:scale-[1.03] active:scale-95
          shadow-[0_3px_12px_rgba(139,0,0,0.28)]
          hover:shadow-[0_5px_18px_rgba(139,0,0,0.38)]
        "
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          background: "#8B0000",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6b0000")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#8B0000")}
      >
        Sign In
      </button>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onSignInClick }) {
  return (
    <section
      id="home"
      className="relative z-10 min-h-screen overflow-hidden"
      style={{ paddingTop: 100 }}
    >
      <style>{`
        @keyframes cardFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes cardFloat2 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes cardFloat3 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
      `}</style>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
        style={{
          display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center",
          minHeight: "calc(100vh - 100px)", paddingTop: 40, paddingBottom: 80,
        }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-grid { grid-template-columns: 7fr 5fr !important; }
          }
        `}</style>

        <div
          className="hero-grid"
          style={{
            display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center",
          }}
        >
          {/* ── Left: Copy ── */}
          <div style={{ marginTop: -50 }}>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 5.5vw, 68px)",
                lineHeight: 1.05, letterSpacing: "-1px", color: "#111", margin: 0,
              }}
            >
              Bringing Student
              <br />
              <span style={{ color: "#111" }}>
                Creativity
              </span>{" "}
              to the
              <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <span className="shine-text">
                  Spotlight.
                </span>
                <svg
                  viewBox="0 0 260 14"
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: 0,
                    width: "100%",
                  }}
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C 70 0, 190 0, 258 8"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="heroGrad" x1="0" x2="1">
                      <stop offset="0" stopColor="#8B0000" />
                      <stop offset="1" stopColor="#ffc553" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p
              style={{
                marginTop: 28,
                maxWidth: 520,
                fontSize: 17,
                lineHeight: 1.7,
                color: "#555",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
              }}
            >
              Watch, Discover, and Experience Students Creativity Through the Works of Passionate Student Artists and Filmmakers.
            </p>

            <div
              style={{
                marginTop: 36,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                onClick={() => { const el = document.getElementById("features"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#8B0000",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "none",
                  borderRadius: 100,
                  padding: "13px 28px",
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(139,0,0,0.32)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#6b0000";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(139,0,0,0.42)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#8B0000";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(139,0,0,0.32)";
                }}
              >
                Learn More
                <img src="/src/assets/icons/next.png" alt="arrow" style={{ width: 16, height: 16 }} />
              </button>

              <button
                onClick={onSignInClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.82)",
                  color: "#8B0000",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  border: "1.5px solid rgba(139,0,0,0.22)",
                  borderRadius: 100,
                  padding: "13px 24px",
                  cursor: "pointer",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.96)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.82)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
                }}
              >
                <img src="/src/assets/icons/play.png" alt="play" style={{ width: 16, height: 16 }} />
                Watch Now
              </button>
            </div>
          </div>

          {/* ── Right: Floating Film Cards ── */}
          <div
            className="hidden lg:block"
            style={{ position: "relative", height: 600, width: "100%" }}
          >
            <div style={{
              position: "absolute",
              top: 0,
              right: 20,
              zIndex: 1,
              animation: "cardFloat1 7s ease-in-out infinite",
            }}>
              <FilmCard film={DEMO_FILMS[1]} />
            </div>

            <div style={{
              position: "absolute",
              top: 80,
              left: -20,
              zIndex: 2,
              animation: "cardFloat2 6s ease-in-out infinite",
              animationDelay: "0.6s",
            }}>
              <FilmCard film={DEMO_FILMS[0]} />
            </div>

            <div style={{
              position: "absolute",
              bottom: 10,
              left: "30%",
              zIndex: 3,
              animation: "cardFloat3 8s ease-in-out infinite",
              animationDelay: "1.2s",
            }}>
              <FilmCard film={DEMO_FILMS[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Root (LoginPage) ─────────────────────────────────────────────────────────

export default function LandingPage({ onNavigateSignIn }) {
  const { login } = useAuth();
  const handleGoToSignIn = () => {
    if (onNavigateSignIn) onNavigateSignIn();
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#f9f9f9]">

      {/* Fixed background */}
      <WaveBackground />

      {/* Fixed soft overlay */}
      <div className="fixed inset-0 bg-white/35 z-[1] pointer-events-none" aria-hidden="true" />

      {/* Global ambient blob lighting */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", top: "5%", left: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,0,0,0.30) 0%, transparent 70%)",
          animation: "floatSlow 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", top: "15%", right: "-5%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,197,83,0.35) 0%, transparent 70%)",
          animation: "floatFast 6s ease-in-out infinite",
          animationDelay: "0.8s",
        }} />
        <div style={{
          position: "absolute", top: "35%", left: "15%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,0,0,0.22) 0%, transparent 70%)",
          animation: "floatSlow 10s ease-in-out infinite",
          animationDelay: "1.5s",
        }} />
        <div style={{
          position: "absolute", top: "50%", right: "10%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,197,83,0.28) 0%, transparent 70%)",
          animation: "floatFast 7s ease-in-out infinite",
          animationDelay: "2s",
        }} />
        <div style={{
          position: "absolute", top: "70%", left: "-8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,0,0,0.25) 0%, transparent 70%)",
          animation: "floatSlow 9s ease-in-out infinite",
          animationDelay: "3s",
        }} />
        <div style={{
          position: "absolute", top: "85%", right: "20%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,197,83,0.30) 0%, transparent 70%)",
          animation: "floatFast 8s ease-in-out infinite",
          animationDelay: "4s",
        }} />
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }
      `}</style>

      {/* Navbar */}
      <Navbar onSignInClick={handleGoToSignIn} />

      {/* ── Section 1: Hero ── */}
      <HeroSection onSignInClick={handleGoToSignIn} />

      {/* ── Section 2: Features ── */}
      <FeaturesSection onSignInClick={handleGoToSignIn} />

      {/* ── Section 3: About ── */}
      <AboutSection />

      {/* ── Section 4: Team ── */}
      <TeamSection />

    </div>
  );
}