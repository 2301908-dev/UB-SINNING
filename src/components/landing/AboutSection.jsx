import { useEffect, useRef } from "react";

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
    <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9.5" }}>
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
        <div className="lg:col-span-6" style={{ paddingTop: "20px", marginLeft: "-30px" }}>
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
              About UB-SINING
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
              <span style={{ color: "#D4AF37" }}>.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.13}>
            <p className="text-base leading-[1.85] text-gray-600 mb-10 max-w-xl" style={{ fontFamily: "'Poppins', sans-serif", textAlign: "justify" }}>
UB-SINING is a streaming, showcasing, and archiving platform for student produced films and creative works built to discover, archive, and elevate every project our students create.            </p>
          </Reveal>

        </div>

        {/* Right visual - Film reels with videos */}
        <Reveal delay={0.2} className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden p-3" style={{ ...glassCard, marginRight: "-80px" }}>
            <div className="grid grid-cols-2 gap-3">
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

    </section>
  );
}