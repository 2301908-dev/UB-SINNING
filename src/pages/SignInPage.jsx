import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const ACCENT       = "#8B0000";
const ACCENT_LIGHT = "rgba(139,0,0,0.10)";

export default function SignInPage({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const { error: authError, devLoginAsFaculty } = useAuth();

  const isFaculty = selectedRole === "faculty";
  const visibleError = error || authError;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  // TEMPORARY: faculty button bypasses auth and lands on the admin dashboard.
  const handleSignIn = () => {
    if (isFaculty) {
      devLoginAsFaculty("admin@ub.edu.ph");
      return;
    }
    handleGoogleLogin();
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        background: "#f9f9f9",
      }}
    >
      {/* Soft overlay (matches homepage) */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.35)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Yellow + red ambient blobs (same as homepage) */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
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
          position: "absolute", top: "55%", left: "-8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,0,0,0.25) 0%, transparent 70%)",
          animation: "floatSlow 9s ease-in-out infinite",
          animationDelay: "1.5s",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-5%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,197,83,0.30) 0%, transparent 70%)",
          animation: "floatFast 7s ease-in-out infinite",
          animationDelay: "2s",
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

      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          background: "#ffffff",
          padding: "54px",
          borderRadius: "32px",
          boxShadow: "0 20px 50px -12px rgba(0,0,0,0.25)",
          border: "1px solid rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              background: "transparent",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_LIGHT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <img
              src="/src/assets/icons/left-arrow.png"
              alt="Back"
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
          </button>
        )}

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "24px" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            background: ACCENT_LIGHT, border: `1px solid rgba(139,0,0,0.15)`,
          }}>
            <img
              src="/src/assets/ublogo.png"
              alt="UB Sining"
              style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", transform: "scale(1.7)" }}
            />
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800, fontSize: "28px",
          color: "#111827", letterSpacing: "-0.5px",
          marginBottom: "8px", lineHeight: 1.1, textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          Welcome to UB Sining
        </h1>
        <p style={{
          fontSize: "15px", color: "#9CA3AF",
          fontFamily: "'Poppins', sans-serif",
          marginBottom: "24px", textAlign: "center",
        }}>
          Sign in with your UB Mail to continue
        </p>

        {/* Role tabs: Student / Faculty */}
        <div style={{
          display: "flex",
          background: "#F3F4F6",
          borderRadius: "14px",
          padding: "5px",
          marginBottom: "24px",
          gap: "4px",
        }}>
          {[
            { id: "student", label: "Student" },
            { id: "faculty", label: "Faculty" },
          ].map((r) => {
            const active = selectedRole === r.id;
            const activeColor = r.id === "faculty" ? "#B8860B" : ACCENT;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                style={{
                  flex: 1,
                  padding: "11px 16px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: active ? "#ffffff" : "transparent",
                  color: active ? activeColor : "#6B7280",
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

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
            Use your official UB Gmail (e.g. yourname@ub.edu.ph)
          </p>
        </div>

        <button
          onClick={handleSignIn}
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
              {isFaculty ? "Sign in as Faculty" : "Sign in as Student"}
            </>
          )}
        </button>

        {visibleError && (
          <p style={{
            marginTop: "16px", fontSize: "13px", color: "#ef4444",
            fontWeight: 500, fontFamily: "'Poppins', sans-serif", textAlign: "center",
          }}>
            {visibleError}
          </p>
        )}

      </div>
    </div>
  );
}
