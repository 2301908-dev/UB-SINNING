import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Reveal wrapper component ───
function Reveal({ children, delay = 0, className = "", style = {} }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ────
const WHY_ITEMS = [
  {
    number: "01",
    heading: "Student Films Had No Permanent Home",
    body: "Films created inside UB were screened once — at a showcase or department event — then disappeared. There was no archive, no platform, no way to revisit what students had poured their passion into. UB Sining was built to change that.",
  },
  {
    number: "02",
    heading: "Talented Creators Deserved a Real Audience",
    body: "UB students were producing remarkable films, but their reach stopped at the classroom door. UB Sining opens that door — giving every creator visibility beyond their batch, their department, and their graduation.",
  },
  {
    number: "03",
    heading: "Storytelling Is Too Powerful to Be Forgotten",
    body: "Film is among the most powerful forms of human expression. UB Sining was created to honor that power, and to ensure the stories born inside UB's walls are never lost to time.",
  },
];

// ─── Video Reel Component ───
function VideoReel({ video, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-video">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <span
        className="absolute bottom-6 left-6 text-white text-xl uppercase tracking-widest"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
      >
        {title}
      </span>
    </div>
  );
}

const glassCard = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(139,0,0,0.09)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.08)",
};

// ─── About Intro ────
function AboutIntro() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 pt-28 pb-16">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <div className="lg:col-span-6">
          <Reveal>
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
              About UB SINING
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="text-[clamp(36px,5vw,60px)] font-black leading-[1.08] mb-7 max-w-2xl"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827", letterSpacing: "-1px" }}
            >
              A cinematic stage for{" "}
              <span style={{ backgroundImage: "linear-gradient(90deg,#8B0000 30%,#D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                student stories
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="text-lg leading-[1.85] text-gray-600 mb-10 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif", textAlign: "justify" }}>
              UB-SINING is  streaming and showcase platform of the Multimedia Arts program at the University of Batangas — built to celebrate, archive, and elevate every film our students create.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <button
              onClick={() => {
                const teamSection = document.getElementById("team");
                if (teamSection) teamSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{
                background: "#8B0000",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 4px 18px rgba(139,0,0,0.32)",
                transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
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
              Meet the team
            </button>
          </Reveal>
        </div>

        {/* Right visual - Film reels with videos */}
        <Reveal delay={0.2} className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden p-6" style={glassCard}>
            <div className="grid grid-cols-2 gap-5">
              <VideoReel video="/canvas.mp4" title="Canvas" />
              <VideoReel video="/kahitsandali.mp4" title="Kahit Sandali" />
              <VideoReel video="/liwanag.mp4" title="Liwanag" />
              <VideoReel video="/pulse.mp4" title="Pulse" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Why Section ────
function WhySection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-10 py-16 pb-36">
      <Reveal>
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-3" style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
            The Origin Story
          </p>
          <h3
            className="text-[clamp(24px,3vw,38px)] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827", letterSpacing: "-0.3px" }}
          >
            Why Was{" "}
            <span style={{ backgroundImage: "linear-gradient(90deg,#8B0000 30%,#D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              UB Sining
            </span>{" "}
            Created?
          </h3>
        </div>
      </Reveal>

      <div className="relative flex flex-col">
        {/* Decorative Timeline Line */}
        <div
          className="absolute left-[27px] top-7 bottom-16 w-[2px] hidden md:block pointer-events-none"
          style={{ background: "linear-gradient(180deg,#8B0000 0%,#D4AF37 60%,rgba(212,175,55,0.05) 100%)" }}
        />

        {WHY_ITEMS.map((item, i) => {
          const badgeBg =
            i === 0
              ? "#8B0000"
              : i === 1
              ? "linear-gradient(135deg,#8B0000 0%,#B86A2A 100%)"
              : "linear-gradient(135deg,#8B0000 0%,#D4AF37 100%)";

          return (
          <Reveal key={item.number} delay={i * 0.13}>
            <div className="flex gap-6 items-start mb-20 last:mb-0">
              <div
                className="relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm z-10"
                style={{
                  background: badgeBg,
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: "0 0 0 5px rgba(139,0,0,0.10), 0 4px 14px rgba(139,0,0,0.25)",
                }}
              >
                {item.number}
              </div>

              <div className="flex-1 rounded-2xl px-7 py-6" style={glassCard}>
                <h4 className="text-[15px] font-bold mb-2" style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif" }}>{item.heading}</h4>
                <p className="text-[13.5px] leading-[1.85] text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.body}</p>
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 w-full flex flex-col items-center">
      {/* Top divider */}
      <div
        className="relative z-10 w-full max-w-5xl h-px mx-auto"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,0,0,0.15),transparent)" }}
      />

      <div className="relative z-10 w-full">
        <AboutIntro />
      </div>

      {/* Center divider between Intro and Origin Story */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-10 h-px" style={{ background: "rgba(139,0,0,0.08)" }} />

      <div className="relative z-10 w-full">
        <WhySection />
      </div>

    </section>
  );
}