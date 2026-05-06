import { useEffect, useRef } from "react";

// ─── Per-element reveal hook ──────────────────────────────────────────────────
// Attaches directly to each element rather than querying children,
// which is more reliable across React render cycles.

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

// ─── Reveal wrapper component ─────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const MV_CARDS = [
  {
    tag: "Our Purpose",
    title: "Mission",
    icon: "🎯",
    accent: "#8B0000",
    statement:
      "To provide a dedicated and accessible platform that empowers University of Batangas students to showcase their films, grow their craft, and connect with an audience that values their creativity.",
    points: [
      { icon: "🎬", heading: "Showcase Student Films", desc: "A permanent digital stage for UB filmmakers to present their work far beyond the classroom." },
      { icon: "📊", heading: "Empower with Analytics", desc: "Real-time insights that help creators understand their audience and grow as storytellers." },
      { icon: "🌐", heading: "Build Creative Community", desc: "Connecting students, faculty, and film enthusiasts in one shared creative space." },
    ],
  },
  {
    tag: "Our Direction",
    title: "Vision",
    icon: "🔭",
    accent: "#D4AF37",
    statement:
      "To become the most recognized student film platform in the Philippines — a digital institution that bridges university talent and the broader world of Filipino cinema.",
    points: [
      { icon: "🏆", heading: "Premier Student Film Hub", desc: "The leading destination for student-produced films in UB and across the country." },
      { icon: "💡", heading: "Inspire the Next Generation", desc: "Sparking the careers of future Filipino filmmakers through visibility and recognition." },
      { icon: "🤝", heading: "Bridge Academia & Industry", desc: "Opening doors between student creativity and the professional film industry." },
    ],
  },
];

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

// ─── Card style helper ────────────────────────────────────────────────────────

const glassCard = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(139,0,0,0.09)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.08)",
};

// ─── About Intro ──────────────────────────────────────────────────────────────

function AboutIntro() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-10 pt-28 pb-16">

      <Reveal>
        <p
          className="text-[11px] uppercase tracking-[0.35em] mb-4"
          style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          Who We Are
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.15] mb-6 max-w-3xl"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827", letterSpacing: "-0.5px" }}
        >
          Where Student{" "}
          <span style={{ backgroundImage: "linear-gradient(90deg,#8B0000 30%,#D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Stories
          </span>{" "}
          Find Their Stage
        </h2>
      </Reveal>

      <Reveal delay={0.13}>
        <div className="w-16 h-[3px] rounded-full mb-10" style={{ background: "linear-gradient(90deg,#8B0000,#D4AF37)" }} />
      </Reveal>

      <Reveal delay={0.18}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <p className="text-[15px] leading-[1.9] text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <strong style={{ color: "#8B0000" }}>UB Sining</strong> is the official student film showcase platform of the{" "}
            <strong style={{ color: "#111827" }}>University of Batangas</strong>. Built by students, for students — a digital cinema that never closes its doors.
          </p>
          <p className="text-[15px] leading-[1.9] text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
            From short films and documentaries to experimental narratives, UB Sining is the permanent home for every story crafted inside UB's creative programs. Every upload is a legacy. Every view is a step toward recognition.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "200+", label: "Films Uploaded" },
            { value: "1,500+", label: "Student Viewers" },
            { value: "6", label: "Core Features" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center py-7 rounded-2xl"
              style={glassCard}
            >
              <span
                className="text-[clamp(26px,3.5vw,38px)] font-bold leading-none mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif", backgroundImage: "linear-gradient(90deg,#8B0000,#D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Mission & Vision ─────────────────────────────────────────────────────────

function MissionVision() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-10 py-16">

      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.35em] mb-3 text-center" style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
          Guiding Principles
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h3 className="text-[clamp(24px,3vw,36px)] font-bold text-center mb-12" style={{ fontFamily: "'Montserrat', sans-serif", color: "#111827", letterSpacing: "-0.3px" }}>
          Mission &amp; Vision
        </h3>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MV_CARDS.map((card, ci) => (
          <Reveal key={card.title} delay={0.12 + ci * 0.1}>
            <div
              className="flex flex-col rounded-3xl overflow-hidden h-full"
              style={{ ...glassCard, border: `1px solid ${card.accent}22` }}
            >
              {/* Header */}
              <div className="px-7 pt-7 pb-5" style={{ borderBottom: `1px solid ${card.accent}14` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: `${card.accent}18` }}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>{card.tag}</p>
                    <h4 className="text-lg font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: card.accent }}>{card.title}</h4>
                  </div>
                </div>
                <p className="text-[13.5px] leading-[1.85] text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>{card.statement}</p>
              </div>

              {/* Points */}
              <div className="px-7 py-6 flex flex-col gap-5">
                {card.points.map((pt) => (
                  <div key={pt.heading} className="flex gap-4 items-start">
                    <span className="text-lg flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: `${card.accent}10` }}>
                      {pt.icon}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold mb-0.5" style={{ color: "#111827", fontFamily: "'Poppins', sans-serif" }}>{pt.heading}</p>
                      <p className="text-[12px] leading-relaxed text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── Why Section ──────────────────────────────────────────────────────────────

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

      {/* Timeline */}
      <div className="relative flex flex-col">
        {/* Vertical line — decorative, desktop only */}
        <div
          className="absolute left-[27px] top-7 bottom-16 w-[2px] hidden md:block pointer-events-none"
          style={{ background: "linear-gradient(180deg,#8B0000 0%,#D4AF37 60%,rgba(212,175,55,0.05) 100%)" }}
        />

        {WHY_ITEMS.map((item, i) => (
          <Reveal key={item.number} delay={i * 0.13}>
            <div className="flex gap-6 items-start mb-8 last:mb-0">
              {/* Bubble */}
              <div
                className="relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm z-10"
                style={{
                  background: i === WHY_ITEMS.length - 1 ? "linear-gradient(135deg,#8B0000,#D4AF37)" : "#8B0000",
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: "0 0 0 5px rgba(139,0,0,0.10), 0 4px 14px rgba(139,0,0,0.25)",
                }}
              >
                {item.number}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl px-7 py-6" style={glassCard}>
                <h4 className="text-[15px] font-bold mb-2" style={{ color: "#8B0000", fontFamily: "'Poppins', sans-serif" }}>{item.heading}</h4>
                <p className="text-[13.5px] leading-[1.85] text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Closing quote */}
      <Reveal delay={0.2}>
        <div
          className="mt-12 rounded-3xl px-8 py-8 text-center"
          style={{ background: "rgba(139,0,0,0.04)", border: "1px solid rgba(139,0,0,0.10)", backdropFilter: "blur(10px)" }}
        >
          <p className="text-[15px] leading-[1.9] text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif", fontStyle: "italic" }}>
            "UB Sining is not just a platform. It is a promise — that no student film will ever go unseen, and no student story will ever be forgotten."
          </p>
          <div className="mt-4 w-10 h-[2px] rounded-full mx-auto" style={{ background: "linear-gradient(90deg,#8B0000,#D4AF37)" }} />
          <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
            UB Sining — University of Batangas
          </p>
        </div>
      </Reveal>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 w-full flex flex-col items-center">

      {/* Top divider */}
      <div
        className="w-full max-w-5xl h-px mx-auto"
        style={{ background: "linear-gradient(90deg,transparent,rgba(139,0,0,0.15),transparent)" }}
      />

      <AboutIntro />

      <div className="w-full max-w-5xl mx-auto px-10 h-px" style={{ background: "rgba(139,0,0,0.08)" }} />

      <MissionVision />

      <div className="w-full max-w-5xl mx-auto px-10 h-px" style={{ background: "rgba(212,175,55,0.12)" }} />

      <WhySection />

    </section>
  );
}