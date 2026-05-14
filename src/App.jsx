import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import AuthCallback from "./pages/AuthCallback";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const { user, role, loading } = useAuth();
  const [view, setView] = useState("landing"); // "landing" | "signin"

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
        <p style={{ color: "#4B5563", fontSize: "16px" }}>Loading your dashboard…</p>
      </div>
    );
  }

  // If authenticated, send all valid roles to the admin dashboard.
  if (user) return <AdminDashboard />;

  if (window.location.pathname === "/auth/callback") {
    return <AuthCallback />;
  }

  // Not logged in — show landing or sign in page
  if (view === "signin") return <SignInPage onBack={() => setView("landing")} />;
  return <LoginPage onNavigateSignIn={() => setView("signin")} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}