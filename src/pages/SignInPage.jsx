import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    key: "student",
    label: "Student",
    desc: "Access films & your watchlist",
    icon: "/src/assets/icons/student.png",
  },
  {
    key: "faculty",
    label: "Faculty",
    desc: "Manage submissions & reviews",
    icon: "/src/assets/icons/teacher.png",
  },
];

const ACCENT       = "#8B0000";
const ACCENT_LIGHT = "rgba(139,0,0,0.10)";
const GOLD         = "#ffc400";

// ─── Left Panel ───────────────────────────────────────────────────────────────

function LeftPanel({ selectedRole, onSelectRole, onBack }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background: "linear-gradient(160deg, #6b0000 0%, #8B0000 50%, #5a0000 100%)",
        minHeight: "100vh",
        width: "28%",
        flexShrink: 0,
        padding: "24px 48px 44px 48px",
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: "-80px", left: "-80px",
        width: "320px", height: "320px", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", right: "-100px",
        width: "380px", height: "380px", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* Back button */}
        <div style={{ height: "60px", display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "-10px" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "12px 20px", marginLeft: "-12px",
              fontSize: "16px", fontWeight: 600,
              color: "rgba(246, 246, 246, 0.7)",
              fontFamily: "'Poppins', sans-serif",
              background: "rgba(255, 0, 0, 0.05)",
              borderRadius: "12px", border: "none", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateX(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <img
              src="/src/assets/icons/left-arrow.png"
              alt="Back"
              style={{ width: "22px", height: "22px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
            Back to Home
          </button>
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0,
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)",
          }}>
            <img
              src="/src/assets/ublogo.png"
              alt="UB Sining"
              style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", transform: "scale(1.7)" }}
            />
          </div>
          <div>
            <p style={{
              color: "#ffffff", fontSize: "27px", fontWeight: 700,
              fontFamily: "'Poppins', sans-serif", letterSpacing: "0.04em", lineHeight: 1, margin: 0,
            }}>
              UB SINING
            </p>
            <p style={{
              color: GOLD, fontSize: "13px", textTransform: "uppercase",
              letterSpacing: "0.12em", fontFamily: "'Poppins', sans-serif", marginTop: "4px",
            }}>
              Student Film Portal
            </p>
          </div>
        </div>

        <div style={{ margin: "28px 0", height: "1px", background: "rgba(255,255,255,0.15)" }} />

        <p style={{
          fontSize: "22px", fontWeight: 700,
          color: "rgb(255, 255, 255)", fontFamily: "'Poppins', sans-serif", marginBottom: "16px",
        }}>
          Sign in as
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {ROLES.map((r) => {
            const isActive = selectedRole === r.key;
            return (
              <button
                key={r.key}
                onClick={() => onSelectRole(r.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "15px 16px", borderRadius: "14px", textAlign: "left",
                  width: "100%", cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.2s ease",
                  background: isActive ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.95)",
                  border: isActive ? "1.5px solid rgb(255, 255, 254)" : "1.5px solid rgba(255,255,255,0.6)",
                  boxShadow: isActive ? "0 4px 16px rgba(139,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#ffc553";
                    e.currentTarget.style.borderColor = "#ffc553";
                  }
                  const label = e.currentTarget.querySelector(".role-label");
                  const desc  = e.currentTarget.querySelector(".role-desc");
                  const img   = e.currentTarget.querySelector(".role-icon");
                  if (label) label.style.color = isActive ? ACCENT : "#000000";
                  if (desc)  desc.style.color  = isActive ? "#888" : "rgba(0,0,0,0.75)";
                  if (img && !isActive) img.style.filter = "brightness(0) invert(1)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                  }
                  const label = e.currentTarget.querySelector(".role-label");
                  const desc  = e.currentTarget.querySelector(".role-desc");
                  const img   = e.currentTarget.querySelector(".role-icon");
                  if (label) label.style.color = ACCENT;
                  if (desc)  desc.style.color  = "#888";
                  if (img)   img.style.filter  = "none";
                }}
              >
                <div style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  background: isActive ? "rgba(139,0,0,0.10)" : "rgba(139,0,0,0.06)",
                }}>
                  <img
                    className="role-icon"
                    src={r.icon}
                    alt={r.label}
                    style={{ width: "22px", height: "22px", objectFit: "contain" }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="role-label" style={{
                    fontSize: "14px", fontWeight: 600, color: ACCENT,
                    margin: 0, lineHeight: 1, marginBottom: "4px",
                  }}>
                    {r.label}
                  </p>
                  <p className="role-desc" style={{
                    fontSize: "11px", color: "#888888", margin: 0, lineHeight: 1.4,
                  }}>
                    {r.desc}
                  </p>
                </div>

                {isActive && (
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: GOLD, flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{
        position: "relative", zIndex: 10,
        fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'Poppins', sans-serif",
      }}>
        © {new Date().getFullYear()} UB Sining — University of Batangas
      </p>
    </div>
  );
}

// ─── Right Panel (SSO only) ───────────────────────────────────────────────────

function RightPanel({ selectedRole }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = ROLES.find((r) => r.key === selectedRole) || ROLES[0];

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { state: selectedRole },
      },
    });

    if (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const portalLabels   = { student: "Student Portal",  faculty: "Faculty Portal" };
  const welcomeLabels  = { student: "Welcome back",    faculty: "Welcome back" };
  const subtitles      = {
    student: "Sign in with your UB Mail to access films and your watchlist",
    faculty: "Sign in with your UB Mail to manage courses & submissions",
  };
  const gmailHints     = {
    student: "Use your UB student Gmail (e.g. yourname@ub.edu.ph)",
    faculty: "Use your UB faculty Gmail (e.g. yourname@ub.edu.ph)",
  };

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "#F3F4F6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          background: "#ffffff",
          padding: "54px",
          borderRadius: "32px",
          boxShadow: "0 20px 50px -12px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* Role badge */}
        <div style={{ marginBottom: "28px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "8px 18px", borderRadius: "999px",
            fontSize: "12px", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.2em",
            background: ACCENT_LIGHT, color: ACCENT,
            border: `1px solid rgba(139,0,0,0.15)`,
            fontFamily: "'Poppins', sans-serif",
          }}>
            <img src={role.icon} alt={role.label} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
            {portalLabels[selectedRole]}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800, fontSize: "36px",
          color: "#111827", letterSpacing: "-1px",
          marginBottom: "8px", lineHeight: 1.1,
        }}>
          {welcomeLabels[selectedRole]}
        </h1>
        <p style={{
          fontSize: "15px", color: "#9CA3AF",
          fontFamily: "'Poppins', sans-serif", marginBottom: "48px",
        }}>
          {subtitles[selectedRole]}
        </p>

        {/* Info hint */}
        <div style={{
          background: "#FFF8F0",
          border: "1px solid rgba(139,0,0,0.12)",
          borderRadius: "14px", padding: "14px 18px",
          marginBottom: "28px",
          display: "flex", alignItems: "flex-start", gap: "12px",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: ACCENT_LIGHT,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: "1px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p style={{
            fontSize: "13px", color: "#6B4040",
            fontFamily: "'Poppins', sans-serif",
            margin: 0, lineHeight: 1.6,
          }}>
            {gmailHints[selectedRole]}
          </p>
        </div>

        {/* SSO Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "18px 24px",
            borderRadius: "16px", fontSize: "16px", fontWeight: 600,
            color: "#111827", border: "1.5px solid #E5E7EB",
            background: loading ? "#F9FAFB" : "#ffffff",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", justifyContent: "center", alignItems: "center", gap: "14px",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#F9FAFB";
              e.currentTarget.style.borderColor = "#D1D5DB";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
            }
          }}
        >
          {loading ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Signing in…
            </>
          ) : (
            <>
              <img src="/src/assets/icons/google.png" alt="Google" style={{ width: "22px", height: "22px" }} />
              Continue with UB Mail
            </>
          )}
        </button>

        {error && (
          <p style={{
            marginTop: "16px", fontSize: "13px", color: "#ef4444",
            fontWeight: 500, fontFamily: "'Poppins', sans-serif", textAlign: "center",
          }}>
            {error}
          </p>
        )}

        {/* Footer */}
        <div style={{ margin: "36px 0 0", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
          <span style={{ fontSize: "12px", color: "#D1D5DB", fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
            Secured by Supabase Auth
          </span>
          <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
        </div>

        <p style={{
          marginTop: "24px", textAlign: "center",
          fontSize: "14px", color: "#9CA3AF",
          fontFamily: "'Poppins', sans-serif",
        }}>
          Need help?{" "}
          <button
            style={{ background: "none", border: "none", color: ACCENT, fontWeight: 600, cursor: "pointer", padding: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Contact IT Support
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function SignInPage({ onBack }) {
  const [selectedRole, setSelectedRole] = useState("student");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <LeftPanel selectedRole={selectedRole} onSelectRole={setSelectedRole} onBack={onBack} />
      <RightPanel selectedRole={selectedRole} />
    </div>
  );
}