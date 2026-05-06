import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const { role } = useAuth();



  if (!role) return <LoginPage />;
  if (role === "student") return <StudentDashboard />;
  if (role === "admin") return <AdminDashboard />;

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
