import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import { mockFilms } from "../data/mockFilms";
import backgroundImage from "../assets/white_bg.jpg";
import {
  BarChart3,
  CheckCircle,
  Users,
  Settings,
  HardDrive,
  MessageSquare,
  Film,
  LogOut,
  Palette,
  FileVideo,
  ShieldCheck,
  Database,
  Upload,
  User,
  ChevronDown,
  HelpCircle
} from "lucide-react";

const mockUsers = [
  { id: 1, directory: "Faculty LDAP", groups: ["Administrators", "Curators"], fullName: "Avery Johnson", role: "Administrator", userType: "Admin", canEnter: true },
  { id: 2, directory: "Student SSO", groups: ["Students", "Editors"], fullName: "Maya Chen", role: "Student", userType: "Student", canEnter: true },
  { id: 3, directory: "Faculty LDAP", groups: ["Instructors", "Reviewers"], fullName: "Dr. Elias Martin", role: "Faculty", userType: "Instructor", canEnter: true },
  { id: 4, directory: "Guest Access", groups: ["Guests"], fullName: "Jordan Lee", role: "Guest", userType: "External", canEnter: true },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "pending", label: "Pending Approvals", icon: CheckCircle },
    { id: "storage", label: "Storage Management", icon: HardDrive },
    { id: "feedback", label: "Feedback Analytics", icon: MessageSquare },
    { id: "content", label: "All Content", icon: Film },
    { id: "users", label: "Users", icon: Users },
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
      <aside className="relative bg-[#8B0000] p-4 rounded-r-lg flex flex-col justify-between w-64 shadow-xl">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <UBLogo />
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition justify-start ${
                  section === item.id ? "bg-white text-[#8B0000]" : "text-[#E8EDF2] hover:bg-white/20"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 text-white overflow-y-auto">
        
        {/* Profile Dropdown Header - FIXED POSITIONING & VISIBILITY */}
        <div className="relative flex justify-end mb-8 z-50"> 
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 rounded-full bg-[#8B0000] border border-white/20 px-4 py-2 text-[#E8EDF2] shadow-lg backdrop-blur-sm"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white text-[#080616] shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <div className="px-4 py-3 border-gray-100 bg-gray-50">
                  <p className="text-sm font-bold text-[#8B0000]">Administrator</p>
                  <p className="text-xs text-gray-500">admin@ub.edu.ph</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { setSection("settings"); setProfileDropdownOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition border-t border-gray-50">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span>Help</span>
                  </button>
                  <button
                    onClick={() => { logout(); setProfileDropdownOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DYNAMIC SECTION RENDERING */}
        <div className="animate-in fade-in duration-500">
            {section === "overview" && <AdminOverview />}
            {section === "pending" && <PendingApprovals />}
            {section === "storage" && <StorageManagement />}
            {section === "feedback" && <FeedbackAnalytics />}
            {section === "content" && <AllContent />}
            {section === "users" && <UserManagement />}
            {section === "settings" && <SettingsPage setSection={setSection} />}
        </div>
      </main>
    </div>
  );
}

/* ------------ SUB-PAGES (INTEGRATED) ------------------ */

function KPI({ title, value, change, color }) {
  const colorClasses = {
    blue: "bg-blue-800", yellow: "bg-yellow-700", green: "bg-green-700", red: "bg-red-700",
  }[color];
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-3 border border-white/10 shadow-lg">
      <div className={`w-14 h-14 rounded-lg ${colorClasses}`}></div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-[#080616]">{value}</p>
      <p className="text-green-600 text-xs font-bold">{change}</p>
    </div>
  );
}

function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI title="Total Uploads" value="1,247" change="+12%" color="blue" />
        <KPI title="Pending Review" value="12" change="+3" color="yellow" />
        <KPI title="Active Users" value="3,892" change="+8%" color="green" />
        <KPI title="Avg. Rating" value="4.6" change="+0.2" color="red" />
      </div>
    </div>
  );
}

function PendingApprovals() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Pending Approvals</h1>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl space-y-4 shadow-lg border border-gray-200">
        {mockFilms.map((film) => (
          <div key={film.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
            <div>
              <p className="font-semibold text-[#080616]">{film.title}</p>
              <p className="text-sm text-gray-500">{film.studentId}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 transition">Approve</button>
              <button className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm hover:bg-red-800 transition">Deny</button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-800 transition">Feedback</button>
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
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-[#080616] border border-gray-200">
        <p className="text-gray-600 mb-4">Monitor server storage and usage.</p>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#8B0000]" style={{ width: '65%' }}></div>
        </div>
        <p className="mt-2 text-sm font-semibold">65% Capacity Used (325GB / 500GB)</p>
      </div>
    </div>
  );
}

function FeedbackAnalytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Feedback Analytics</h1>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-[#080616] border border-gray-200">
        <p>Charts and student feedback analysis coming soon.</p>
      </div>
    </div>
  );
}

function AllContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFilms = mockFilms.filter((film) => 
    film.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    film.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">All Content</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title or creator..."
        className="w-80 rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-[#080616] outline-none mb-6 focus:ring-2 focus:ring-[#8B0000]/20"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div key={film.id} className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-200">
            <img src={film.thumbnail} className="rounded-lg mb-3 h-40 w-full object-cover" alt={film.title} />
            <p className="font-semibold text-[#080616]">{film.title}</p>
            <p className="text-gray-500 text-sm">{film.creator}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(mockUsers);
  const activeUsers = users.filter((user) => user.canEnter);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">User Management</h1>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
        <div className="flex gap-2">
          {["users", "roles", "directories"].map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === t ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-[#8B0000] text-white">
                <tr>
                  <th className="px-4 py-3 font-medium">Access</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Full Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-[#080616]">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-4">
                      <input type="checkbox" checked={user.canEnter} onChange={() => {
                        setUsers(users.map(u => u.id === user.id ? {...u, canEnter: !u.canEnter} : u));
                      }} className="accent-[#8B0000]" />
                    </td>
                    <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${user.canEnter ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.canEnter ? "Active" : "Inactive"}</span></td>
                    <td className="px-4 py-4">{user.fullName}</td>
                    <td className="px-4 py-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPage({ setSection }) {
  const [activeTab, setActiveTab] = useState('general');
  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === id ? 'bg-[#8B0000] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-xl border border-gray-100 min-h-[500px] overflow-hidden">
        <div className="w-full md:w-64 p-4 border-r border-gray-100 bg-gray-50/50">
          <div className="space-y-1">
            <TabButton id="general" icon={Palette} label="General & Theme" />
            <TabButton id="workflow" icon={FileVideo} label="Submission Rules" />
            <TabButton id="permissions" icon={ShieldCheck} label="Access Control" />
            <TabButton id="storage" icon={Database} label="Storage & API" />
          </div>
        </div>
        <div className="flex-1 p-8 text-[#080616]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#8B0000]">Visual Identity</h3>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Showcase Title</label>
                <input type="text" className="border rounded-md p-2 outline-none focus:ring-1 focus:ring-[#8B0000]" placeholder="UB Sining 2026" />
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#8B0000]">
                <Upload className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload Hero Banner</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}