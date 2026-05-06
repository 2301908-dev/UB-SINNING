import { useState } from "react";

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
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-0.01em",
        }}
      >
        Features
      </h2>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}