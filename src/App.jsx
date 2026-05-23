import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import AuthCallback from "./pages/AuthCallback";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import NotFoundPage from "./pages/NotFoundPage";
function AppContent() {
  const { user, role, loading, error } = useAuth();
  const [view, setView] = useState("landing"); // "landing" | "signin"

  // Wait for both session AND role before routing to a dashboard —
  // otherwise the StudentDashboard flashes for users whose role is still resolving.
  if (loading || (user && role === null)) {
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
    if (role === "admin") return <AdminDashboard />;
    if (role === "faculty") return <FacultyDashboard />;
    return <StudentDashboard />;
  }

  // If there's an auth error, force the user back onto the sign-in page.
  if (view === "signin" || error) return <SignInPage onBack={() => setView("landing")} />;
  if (view === "landing") return <LandingPage onNavigateSignIn={() => setView("signin")} />;
  return <NotFoundPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}