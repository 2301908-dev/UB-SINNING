import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

// ─── Reveal Hook (same pattern as AboutSection) ───────────────────────────────

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

// ─── Team Data ────────────────────────────────────────────────────────────────

const TEAM = [
  {
    name: "Bryan James N. Villalon",
    role: "Backend Developer",
    img: "src/assets/teampics/bryan.png",
    description: "Crafts intuitive and beautiful interfaces that bring the UB Sining vision to life.",
    gradient: "from-[#8B0000] to-[#D4AF37]",
  },
  {
    name: "Kenn Philip Nathaniel B. Silang",
    role: "Frontend Developer" ,
    img: "src/assets/teampics/kenn.png",
    description: "Architects the systems and logic that power every feature behind the scenes.",
    gradient: "from-[#D4AF37] to-[#8B0000]",
    featured: true,
  },
  {
    name: "Brent Joseph M. Pagcaliwagan",
    role: "UI/UX Designer",
    img: "src/assets/teampics/brent.png",
    description: "Builds the interactive experiences that users see and feel every day.",
    gradient: "from-[#8B0000] to-[#D4AF37]",
  },
];

// ─── Team Card ────────────────────────────────────────────────────────────────

function TeamCard({ member, delay }) {
  return (
    <Reveal delay={delay} className="flex">
      <div
        className="group relative flex flex-col rounded-3xl overflow-hidden w-full cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.80)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(139,0,0,0.09)",
          boxShadow: "0 6px 28px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(139,0,0,0.18)";
          e.currentTarget.style.transform = "translateY(-8px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Photo container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "320px" }}>
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            style={{ transition: "transform 0.5s ease" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.style.background = "#f3f4f6";
            }}
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(0deg, rgba(139,0,0,0.82) 0%, rgba(139,0,0,0.3) 60%, transparent 100%)",
              transition: "opacity 0.35s ease",
            }}
          >
            <p
              className="text-white text-[13px] leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {member.description}
            </p>
          </div>

          {/* Role badge — slides up on hover */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100"
            style={{
              background: "rgba(139,0,0,0.85)",
              backdropFilter: "blur(6px)",
              fontFamily: "'Poppins', sans-serif",
              transition: "opacity 0.3s ease 0.05s",
            }}
          >
            {member.role}
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-5">
          {/* Gradient accent line */}
          <div
            className={`w-10 h-[3px] rounded-full mb-3 bg-gradient-to-r ${member.gradient}`}
            style={{ transition: "width 0.35s ease" }}
            ref={(el) => {
              if (!el) return;
              const card = el.closest(".group");
              card?.addEventListener("mouseenter", () => { el.style.width = "100%"; });
              card?.addEventListener("mouseleave", () => { el.style.width = "40px"; });
            }}
          />
          <h4
            className="font-bold text-[15px] leading-snug mb-1"
            style={{ color: "#111827", fontFamily: "'Poppins', sans-serif" }}
          >
            {member.name}
          </h4>
          <p
            className="text-[12px] uppercase tracking-widest"
            style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
          >
            {member.role}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function TeamSection() {
  return (
    <section id="team" className="relative z-10 w-full flex flex-col items-center">
      {/* Top divider */}
      <div
        className="relative z-10 w-full max-w-5xl h-px mx-auto"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,0,0,0.15),transparent)" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-10 pt-24 pb-36">

        {/* Header */}
        <Reveal>
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(139,0,0,0.08)",
                color: "#8B0000",
                fontFamily: "'Poppins', sans-serif",
                border: "1px solid rgba(139,0,0,0.15)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Meet The Crew
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="text-[clamp(30px,4vw,48px)] font-black text-center mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827", letterSpacing: "-0.5px" }}
          >
            Team{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #8B0000 0%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Sanctuary
            </span>
          </h2>
        </Reveal>

       
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={0.16 + i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}