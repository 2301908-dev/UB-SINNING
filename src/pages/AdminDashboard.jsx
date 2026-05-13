import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import { mockFilms } from "../data/mockFilms";
import backgroundImage from "../assets/white_bg.jpg";
import {
  BarChart3,
  CheckCircle,
  FolderOpen,
  Users,
  Settings,
  HardDrive,
  MessageSquare,
  Film,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

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
    <div
      className="flex min-h-screen text-[#E8EDF2]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      {/* Sidebar */}
      <aside
        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}
        className={`relative bg-[#8B0000] p-4 rounded-r-lg space-y-8  duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="overflow-hidden transition-all duration-300">
          <UBLogo />
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                sidebarOpen ? "justify-start" : "justify-center"
              } ${
                section === item.id
                  ? "text-[#E8EDF2] hover:bg-[#FFFFFF] hover:text-[#080616]"
                  : "text-[#E8EDF2] hover:bg-[#FFFFFF] hover:text-[#080616]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  sidebarOpen ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        {sidebarOpen && (
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full p-2 bg-[#FFFFFF] text-[#8B0000] rounded-lg hover:bg-[#D4AF37] hover:text-[#080616]"
          >
            <LogOut className="w-5 h-5" />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        )}
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 text-[#080616] md:grid-cols-4 gap-6 ">
        <KPI title="Total Uploads" value="1,247" change="+12%" color="blue" />
        <KPI title="Pending Review" value="12" change="+3" color="yellow" />
        <KPI title="Active Users" value="3,892" change="+8%" color="green" />
        <KPI title="Avg. Rating" value="4.6" change="+0.2" color="red" />
      </div>
    </div>
  );
}

function KPI({ title, value, change, color }) {
  const colorClasses = {
    blue: "bg-blue-800",
    yellow: "bg-yellow-700",
    green: "bg-green-700",
    red: "bg-red-700",
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Pending Approvals</h1>

      <div className="glass p-6 rounded-xl space-y-4">
        {mockFilms.map((film) => (
          <div
            key={film.id}
            className="flex items-center justify-between border-b border-gray-800 pb-4"
          >
            <div>
              <p className="font-semibold text-[#080616]">{film.title}</p>
              <p className="text-sm text-gray-400">{film.studentId}</p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-2 bg-green-700 rounded text-sm">
                Approve
              </button>
              <button className="px-3 py-2 bg-red-700 rounded text-sm">
                Deny
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Storage Management</h1>
      <p className="text-gray-400">Monitor server storage and usage.</p>

      <div className="glass mt-6 text-[#080616] p-6 rounded-xl">
        <p>Storage Graph / Usage Bars (to be implemented)</p>
      </div>
    </div>
  );
}

function FeedbackAnalytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Feedback Analytics</h1>

      <div className="glass p-6 text-[#080616] rounded-xl">
        <p>Charts and student feedback analysis coming soon.</p>
      </div>
    </div>
  );
}

function AllContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFilms = mockFilms.filter((film) => {
    const query = searchTerm.toLowerCase();
    return (
      film.title.toLowerCase().includes(query) ||
      film.creator.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">All Content</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#080616] mb-2" htmlFor="content-search">
          Search videos
        </label>
        <input
          id="content-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or creator..."
          className="w-80 rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-[#080616] outline-none transition focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20"
        />
      </div>

      {filteredFilms.length === 0 ? (
        <div className="glass p-6 rounded-xl text-[#080616]">
          No videos found for "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFilms.map((film) => (
            <div key={film.id} className="glass p-4 rounded-xl">
              <img
                src={film.thumbnail}
                className="rounded-lg mb-3 h-40 w-full object-cover"
              />
              <p className="font-semibold text-[#080616]">{film.title}</p>
              <p className="text-gray-400 text-sm">{film.creator}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserManagement() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">User Management</h1>

      <div className="glass text-[#080616] p-6 rounded-xl">
        <p >Table of users (students, admins) to be added.</p>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Settings</h1>

      <div className="glass text-[#080616] p-6 rounded-xl space-y-4">
        <p>Theme settings, permissions, admin preferences.</p>
      </div>
    </div>
  );
}
