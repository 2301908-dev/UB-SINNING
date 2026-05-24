import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const ACCENT       = "#8B0000";
const ACCENT_LIGHT = "rgba(139,0,0,0.10)";

export default function SignInPage({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const { error: authError } = useAuth();

  const isFaculty = selectedRole === "faculty";
  const visibleError = error || authError;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    localStorage.setItem("pending_role", selectedRole);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    handleGoogleLogin();
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Poppins', sans-serif", padding: "40px" }}>

      <div
        style={{
          maxWidth: "460px",
          width: "100%",
          background: "#ffffff",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          padding: "54px",
          borderRadius: "32px",
          boxShadow: "0 8px 40px 0px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "-48px", marginBottom: "24px" }}>
          <img
            src="/src/assets/ublogo.png"
            alt="UB Sining"
            style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800, fontSize: "28px",
          color: "rgb(0, 0, 0)", letterSpacing: "-0.5px",
          marginBottom: "8px", lineHeight: 1.1, textAlign: "center",
          position: "relative", top: "-20px",
          whiteSpace: "nowrap",
        }}>
          Sign in to UB-SINING
        </h1>

        {/* Role tabs: Student / Faculty */}
        <div style={{
          display: "flex",
          background: "rgba(0, 0, 0, 0.03)", 
          border: "1px solid rgba(0, 0, 0, 0.08)", 
          borderRadius: "999px", 
          padding: "4px",
          marginBottom: "32px", 
          gap: "2px",
        }}>
          {[
            { id: "student", label: "Student" },
            { id: "faculty", label: "Faculty" },
          ].map((r) => {
            const active = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                style={{
                  flex: 1,
                  padding: "10px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  fontFamily: "'Poppins', sans-serif",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  background: active ? ACCENT : "transparent",
                  color: active ? "#ffffff" : "#6B7280",
                  boxShadow: active ? "0 4px 12px rgba(139, 0, 0, 0.25)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(139, 0, 0, 0.06)";
                    e.currentTarget.style.color = ACCENT;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#6B7280";
                  }
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Info hint */}
        <div style={{
          background: "rgba(139, 0, 0, 0.03)", 
          border: "1px solid rgba(139, 0, 0, 0.08)",
          borderRadius: "16px", 
          padding: "12px 16px",
          marginBottom: "28px",
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
        }}>
          <div style={{
            width: "28px", 
            height: "28px", 
            borderRadius: "50%",
            background: "rgba(139, 0, 0, 0.08)",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <img 
              src="/src/assets/icons/reminder.png" 
              alt="Reminder" 
              style={{ width: "16px", height: "16px", objectFit: "contain" }} 
            />
          </div>
          <p style={{
            fontSize: "12.5px", 
            color: "#5C3A3A",
            fontFamily: "'Poppins', sans-serif",
            margin: 0, 
            lineHeight: 1.4,
          }}>
            Sign in using your official UB Gmail account.
          </p>
        </div>

        {/* Primary Sign In Button (Bigger Version) */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            width: "100%", 
            padding: "14px 24px", 
            borderRadius: "14px", 
            fontSize: "17px",
            fontWeight: 600,
            color: "#ffffff", 
            border: "none",
            background: loading ? "#6b0000" : "#8B0000",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "14px", // Wider spacing between the logo and text
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 4px 12px rgba(139, 0, 0, 0.15)", 
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#6b0000";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,0,0,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.background = "#8B0000";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 0, 0, 0.15)";
            }
          }}
        >
          {loading ? (
            <>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Signing in…
            </>
          ) : (
            <>
              <img src="/src/assets/icons/google.png" alt="Google" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
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