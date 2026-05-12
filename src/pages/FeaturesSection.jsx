import { useState } from "react";
import { Sparkles } from "lucide-react";

const FEATURES = [
  {
    id: "01",
    icon: "src/assets/icons/clapperboard.png",
    title: "Film Showcase",
    description:
      "Experience the best of UB storytelling student films brought to the spotlight for everyone to watch, enjoy, and be inspired.",
  },
  {
    id: "02",
    icon: "src/assets/icons/feedback.png",
    title: "Audience Reviews",
    description:
      "Hear the voices of the viewers ratings, comments, and reactions that shape how every film is experienced.",
  },
  {
    id: "03",
    icon: "src/assets/icons/statistics.png",
    title: "View Analytics",
    description:
      "See the story behind the views track engagement, watch time, and audience reach for every film in real time.",
  },
  {
    id: "04",
    icon: "src/assets/icons/magic-book.png",
    title: "Discover Stories",
    description:
      "Explore a world of creativity find films across genres, moods, and styles that match your interest.",
  },
  {
    id: "05",
    icon: "src/assets/icons/trending.png",
    title: "Trend Spotlight",
    description:
      "Discover what's trending now featured films gaining attention across the platform, updated to keep you in the loop.",
  },
  {
    id: "06",
    icon: "src/assets/icons/spotlight.png",
    title: "Creator Spotlight",
    description:
      "Meet the storytellers behind the screen—highlighting talented student filmmakers and their creative journeys.",
  },
];

function FeatureCard({ feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        padding: "28px 28px 26px",
        background: "#ffffff",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: hovered ? "1px solid #8B0000" : "1px solid rgba(139,0,0,0.35)",
        boxShadow: hovered
          ? "0 20px 48px rgba(139,0,0,0.18), 0 4px 16px rgba(139,0,0,0.10)"
          : "0 4px 20px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Top gradient accent bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 3,
        background: "linear-gradient(90deg, #8B0000, #ffc553)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Icon + number row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{
          width: 52, height: 52,
          borderRadius: 14,
          background: hovered
            ? "linear-gradient(135deg, #8B0000, #c0392b)"
            : "rgba(139,0,0,0.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s ease",
        }}>
          <img
            src={feature.icon}
            alt={feature.title}
            style={{
              width: 26, height: 26, objectFit: "contain",
              filter: hovered ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.3s ease",
            }}
          />
        </div>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: hovered ? "#8B0000" : "rgba(139,0,0,0.30)",
          letterSpacing: "0.08em",
          transition: "color 0.3s ease",
        }}>
          {feature.id}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: 16,
        color: "#1a1a1a",
        marginBottom: 10,
        lineHeight: 1.3,
      }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 13.5,
        color: "#6B7280",
        lineHeight: 1.65,
        margin: 0,
      }}>
        {feature.description}
      </p>
    </div>
  );
}

export default function FeaturesSection({ onSignInClick }) {
  return (
    <section
      id="features"
      className="relative z-10 flex flex-col items-center px-4 sm:px-10 pt-20 pb-24"
    >
      {/* Top divider */}
      <div
        className="relative z-10 w-full max-w-5xl h-px mx-auto mb-20"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,0,0,0.15),transparent)" }}
      />

      {/* HEADER */}
      <div className="relative z-10 max-w-4xl w-full mx-auto px-6 lg:px-10 text-center mb-14">
        {/* Kicker badge */}
        <div
          className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(139,0,0,0.08)",
            color: "#8B0000",
            fontFamily: "'Poppins', sans-serif",
            border: "1px solid rgba(139,0,0,0.15)",
          }}
        >
          <Sparkles className="w-3 h-3" />
          Platform Features
        </div>

        {/* Headline */}
        <h1
          className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827" }}
        >
          Everything a{" "}
          <span className="gradient-text">
            student filmmaker
          </span>{" "}
          needs.
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-lg max-w-2xl mx-auto"
          style={{ color: "#4B5563", fontFamily: "'Poppins', sans-serif", lineHeight: 1.7 }}
        >
          From cinematic playback to faculty tools and audience insights, UB-SINING provides a complete creative platform for filmmakers.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {/* Try the platform — maroon filled */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onSignInClick?.(); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: "#8B0000",
              fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 4px 18px rgba(139,0,0,0.32)",
              transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
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
            Try the platform
            <img src="/src/assets/icons/next.png" alt="arrow" className="w-4 h-4 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          </a>

          {/* Why we built it — ghost */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById("about"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(255,255,255,0.82)",
              color: "#8B0000",
              fontFamily: "'Poppins', sans-serif",
              border: "1px solid rgba(139,0,0,0.18)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
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
            Why we built it
          </a>
        </div>
      </div>

      {/* FEATURE CARDS GRID - Horizontal layout */}
      <div className="relative z-10 w-full max-w-7xl px-4 overflow-x-auto pb-4">
        <div className="flex gap-5" style={{ minWidth: "max-content" }}>
          {FEATURES.map((feature) => (
            <div key={feature.id} className="w-[220px] flex-shrink-0">
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}