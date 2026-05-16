import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import AuthCallback from "./pages/AuthCallback";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function AppContent() {
  const { user, role, loading, error } = useAuth();
  const [view, setView] = useState("landing"); // "landing" | "signin"

  if (loading) {
    if (window.location.pathname === "/auth/callback") {
      return <AuthCallback />;
    }
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
        <p style={{ color: "#4B5563", fontSize: "16px" }}>Loading your dashboard…</p>
      </div>
    );
  }

  // Route based on role
  if (user) {
    if (role === "admin" || role === "faculty") return <AdminDashboard />;
    return <StudentDashboard />;
  }

  // If there's an auth error (e.g. faculty intent mismatch), force the user
  // back onto the sign-in page so they can see it.
  if (view === "signin" || error) return <SignInPage onBack={() => setView("landing")} />;
  return <LoginPage onNavigateSignIn={() => setView("signin")} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}