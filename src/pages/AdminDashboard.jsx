import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import { mockFilms } from "../data/mockFilms";
import {
  BarChart3,
  CheckCircle,
  FolderOpen,
  Users,
  Settings,
  HardDrive,
  MessageSquare,
  Film,
} from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "pending", label: "Pending Approvals", icon: CheckCircle },
    { id: "storage", label: "Storage Management", icon: HardDrive },
    { id: "feedback", label: "Feedback Analytics", icon: MessageSquare },
    { id: "content", label: "All Content", icon: Film },
    { id: "users", label: "User Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-cinema-black">
      {/* Sidebar */}
      <aside className="w-64 bg-cinema-dark border-r border-gray-800 p-5 space-y-8">
        <UBLogo />

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                section === item.id
                  ? "bg-ub-maroon text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full p-3 text-gray-400 hover:text-white border border-gray-700 rounded-lg"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 text-white overflow-y-auto">
        {section === "overview" && <AdminOverview />}
        {section === "pending" && <PendingApprovals />}
        {section === "storage" && <StorageManagement />}
        {section === "feedback" && <FeedbackAnalytics />}
        {section === "content" && <AllContent />}
        {section === "users" && <UserManagement />}
        {section === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

/* ------------  ADMIN SUB‑PAGES ------------------ */

function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI title="Total Uploads" value="1,247" change="+12%" color="blue" />
        <KPI title="Pending Review" value="12" change="+3 today" color="yellow" />
        <KPI title="Active Users" value="3,892" change="+8%" color="green" />
        <KPI title="Avg. Rating" value="4.6" change="+0.2" color="red" />
      </div>
    </div>
  );
}

function KPI({ title, value, change, color }) {
  const colorClasses = {
    blue: "bg-blue-900",
    yellow: "bg-yellow-900",
    green: "bg-green-900",
    red: "bg-red-900",
  }[color];

  return (
    <div className="glass p-6 rounded-xl space-y-3">
      <div className={`w-14 h-14 rounded-lg ${colorClasses}`}></div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-green-400 text-xs">{change}</p>
    </div>
  );
}

function PendingApprovals() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>

      <div className="glass p-6 rounded-xl space-y-4">
        {mockFilms.map((film) => (
          <div
            key={film.id}
            className="flex items-center justify-between border-b border-gray-800 pb-4"
          >
            <div>
              <p className="font-semibold">{film.title}</p>
              <p className="text-sm text-gray-400">{film.studentId}</p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-2 bg-green-700 rounded text-sm">
                Approve
              </button>
              <button className="px-3 py-2 bg-red-700 rounded text-sm">
                Reject
              </button>
              <button className="px-3 py-2 bg-gray-700 rounded text-sm">
                Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorageManagement() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Storage Management</h1>
      <p className="text-gray-400">Monitor server storage and usage.</p>

      <div className="glass mt-6 p-6 rounded-xl">
        <p>Storage Graph / Usage Bars (to be implemented)</p>
      </div>
    </div>
  );
}

function FeedbackAnalytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Feedback Analytics</h1>

      <div className="glass p-6 rounded-xl">
        <p>Charts and student feedback analysis coming soon.</p>
      </div>
    </div>
  );
}

function AllContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockFilms.map((film) => (
          <div key={film.id} className="glass p-4 rounded-xl">
            <img
              src={film.thumbnail}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />
            <p className="font-semibold">{film.title}</p>
            <p className="text-gray-400 text-sm">{film.creator}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="glass p-6 rounded-xl">
        <p>Table of users (students, admins) to be added.</p>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="glass p-6 rounded-xl space-y-4">
        <p>Theme settings, permissions, admin preferences.</p>
      </div>
    </div>
  );
}
