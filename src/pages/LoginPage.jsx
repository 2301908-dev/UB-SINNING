import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";
import FeaturesSection from "./FeaturesSection"; 
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";

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

// ─── Login Modal ──────────────────────────────────────────────────────────────

function LoginModal({ onClose, onLogin }) {
  const [ubid, setUbid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ubid.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    onLogin("student");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/25 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-[28px] border border-gray-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.13)] p-7 animate-fade-in-up">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-4 rounded-[20px] border border-gray-100 bg-[#FAFAFA] px-5 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B0000]/10">
            <LogoIcon />
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-[0.22em] text-[#8B0000]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              University SSO
            </p>
            <h2
              className="text-lg text-gray-900"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
            >
              UB Login Portal
            </h2>
            <p className="text-xs text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Secure access for UB students
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-sm text-gray-700"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              UB Email
            </label>
            <input
              type="text"
              value={ubid}
              onChange={(e) => { setUbid(e.target.value); setError(""); }}
              placeholder="username@ub.edu.ph"
              className="w-full rounded-2xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm text-gray-700"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full py-3 text-sm uppercase tracking-[0.18em] text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-[0_4px_14px_rgba(139,0,0,0.3)]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              background: "#8B0000",
            }}
          >
            Continue
          </button>
        </form>

        <div
          className="mt-4 flex items-center justify-between text-xs text-gray-400"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span>Secure UB SSO access</span>
          <span>Student Portal</span>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Features", "About", "Team"];

function Navbar({ onSignInClick, onAboutClick }) {
  const [activeLink, setActiveLink] = useState("Home");

  const handleNavClick = (link) => {
    setActiveLink(link);
    if (link === "About" && onAboutClick) {
      onAboutClick();
      return;
    }
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
      <div className="flex items-center gap-3 flex-shrink-0">
        <LogoIcon />
        <span
          className="text-[#8B0000] text-[23px] tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          UB SINING
        </span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
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
                fontWeight: 400,
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
      <button
        onClick={onSignInClick}
        className="
          cursor-pointer
          text-white text-[15px] rounded-full px-7 py-3
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
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ onEnterGallery, onAdminAccess }) {
  return (
    <section id="home" className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-[120px] pb-32 min-h-screen">

      <h1
        className="text-[#111] leading-[1.18] mb-5 max-w-4xl"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(36px, 5.5vw, 56px)",
          letterSpacing: "-0.5px",
        }}
      >
        Bringing Student
        <br />
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000]"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(38px, 5.8vw, 58px)",
          }}
        >
          Creativity
        </span>{" "}
        to the Spotlight
      </h1>

      <p
        className="text-[#888] leading-relaxed max-w-xl mb-10 text-[15px]"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
      >
        A platform dedicated to elevating student creativity by showcasing films,
        preserving stories, and giving every creator a voice that lasts beyond the
        classroom.
      </p>

      <button
        onClick={onEnterGallery}
        className="
          cursor-pointer
          text-white text-[15px] rounded-xl px-10 py-3.5
          transition-all duration-200
          shadow-[0_4px_18px_rgba(139,0,0,0.3)]
          hover:shadow-[0_6px_22px_rgba(139,0,0,0.42)]
          hover:-translate-y-0.5
          active:scale-95
        "
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          background: "#8B0000",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6b0000")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#8B0000")}
      >
        Enter Gallery
      </button>

      {/* ✅ Faculty/Admin — calls login("admin") directly via onAdminAccess */}
      <button
        onClick={onAdminAccess}
        className="mt-5 text-xs text-gray-400 underline underline-offset-2 hover:text-[#8B0000] transition-colors duration-200"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Faculty / Admin access →
      </button>
    </section>
  );
}

// ─── Root (LoginPage) ─────────────────────────────────────────────────────────

export default function LoginPage({ onNavigateAbout }) {
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Opens the student login modal
  const handleEnterGallery = () => setShowModal(true);

  // Bypasses modal — goes straight to admin dashboard via AuthContext
  const handleAdminAccess = () => login("admin");

  const handleLogin = (role) => {
    login(role);
    setShowModal(false);
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#f9f9f9]">

      {/* Fixed background — stays in place while page scrolls */}
      <WaveBackground />

      {/* Fixed soft overlay */}
      <div className="fixed inset-0 bg-white/35 z-[1] pointer-events-none" aria-hidden="true" />

      {/* Floating navbar */}
      <Navbar onSignInClick={handleEnterGallery} onAboutClick={onNavigateAbout} />

      {/* ── Section 1: Hero ── */}
      <HeroSection onEnterGallery={handleEnterGallery} onAdminAccess={handleAdminAccess} />

      {/* ── Section 2: Features ── */}
      <FeaturesSection />

      {/* ── Section 3: About ── */}
      <AboutSection />

      {/* ── Section 4: Team ── */}
      <TeamSection />

      {/* Login modal (student only) */}
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}