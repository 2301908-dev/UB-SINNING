import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const { user, role, loading } = useAuth();

  useEffect(() => {
    // If the auth state is already loaded and user is authenticated
    // you can navigate them to the appropriate dashboard
    if (!loading && user) {
      // The AuthContext handles role assignment
      // Navigation will happen in App.jsx based on the role
      console.log("User authenticated:", user.email, "Role:", role);
    }
  }, [user, role, loading]);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#F3F4F6",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "3px solid #E5E7EB",
          borderTopColor: "#8B0000",
          animation: "spin 1s linear infinite",
          margin: "0 auto 24px",
        }} />
        <h1 style={{
          fontSize: "24px",
          fontWeight: 600,
          color: "#111827",
          marginBottom: "8px",
        }}>
          Completing sign in...
        </h1>
        <p style={{
          fontSize: "14px",
          color: "#6B7280",
        }}>
          Please wait while we verify your credentials.
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}