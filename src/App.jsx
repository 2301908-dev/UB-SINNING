import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const { role } = useAuth();
  const [view, setView] = useState("landing"); // "landing" | "signin"

  // Once logged in, show the correct dashboard
  if (role === "student") return <StudentDashboard />;
  if (role === "admin") return <AdminDashboard />;

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