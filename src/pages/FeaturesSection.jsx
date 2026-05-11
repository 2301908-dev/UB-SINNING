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
    id: "04",
    icon: "src/assets/icons/feedback.png",
    title: "Audience Reviews",
    description:
      "Hear the voices of the viewers ratings, comments, and reactions that shape how every film is experienced.",
  },
  {
    id: "02",
    icon: "src/assets/icons/statistics.png",
    title: "View Analytics",
    description:
      "See the story behind the views track engagement, watch time, and audience reach for every film in real time.",
  },
  {
    id: "05",
    icon: "src/assets/icons/magic-book.png",
    title: "Discover Stories",
    description:
      "Explore a world of creativity find films across genres, moods, and styles that match your interest.",
  },
  {
    id: "03",
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
      className="flex rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.15)"
          : "0 4px 18px rgba(0,0,0,0.09)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Left maroon block */}
      <div
        className="flex flex-col items-center justify-center gap-3 px-5 py-6 min-w-[110px]"
        style={{ background: "#8B0000" }}
      >
        <span
          className="text-xs font-bold tracking-widest"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Poppins', sans-serif" }}
        >
          {feature.id}
        </span>
        <img
          src={feature.icon}
          alt={feature.title}
          className="w-10 h-10 object-contain"
          style={{ filter: "brightness(0)" }}
        />
      </div>

      {/* Right content block */}
      <div
        className="flex flex-col justify-center px-6 py-6 flex-1"
        style={{
          background: hovered ? "rgba(255,248,230,0.92)" : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(8px)",
          transition: "background 0.3s ease",
        }}
      >
        <h3
          className="text-base font-bold mb-2"
          style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif" }}
        >
          {feature.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#374151", fontFamily: "'Poppins', sans-serif" }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 py-24"
    >
      {/* HEADER */}
      <div className="max-w-4xl w-full mx-auto px-6 lg:px-10 text-center mb-14">
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
          From cinematic playback to faculty workflows and audience analytics — UB-SINING is the
          full creative pipeline for the next generation of MMA storytellers.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {/* Try the platform — maroon filled */}
          <a
            href="/signin"
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
            href="/about"
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

      {/* FEATURE CARDS GRID */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}