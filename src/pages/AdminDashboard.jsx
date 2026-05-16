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
  HelpCircle,
  MoreVertical
} from "lucide-react";

const mockUsers = [
  { id: 1, email: "2304898@ub.edu.ph", created: "2025-08-12", role: "Professor", canEnter: true },
  { id: 2, email: "2307867@ub.edu.ph", created: "2025-09-03", role: "Student", canEnter: true },
  { id: 3, email: "2301173@ub.edu.ph", created: "2025-07-29", role: "Professor", canEnter: true },
  { id: 4, email: "2305637@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true }
];


export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
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
        <div className="space-y-3">
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
      <main className="flex-1 p-8 text-white overflow-y-auto">
        
        {/* Profile Dropdown Header - CLEAN CIRCULAR DESIGN */}
        <div className="relative flex justify-end mb-8 z-50"> 
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1 group transition-all"
            >
              <div className="relative">
                <img 
                  src="src/assets/teampics/brent.jpg" 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-white/50 transition-all shadow-md" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

    {profileDropdownOpen && (
      <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white text-[#080616] shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50">
          <p className="text-sm font-bold text-[#8B0000]">Administrator</p>
          <p className="text-xs text-gray-500 truncate">admin@ub.edu.ph</p>
        </div>
        
        <div className="py-1">
          {/* Language Option */}
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition">
            <Palette className="w-4 h-4 text-gray-500" /> {/* Reusing Palette or similar icon for Language */}
            <span>Language</span>
            <span className="ml-auto text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">EN</span>
          </button>

          <button 
            onClick={() => { setSection("settings"); setProfileDropdownOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </button>
          
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Help Center</span>
          </button>
          <div className="border-t border-gray-100 my-1"></div>

          <button
            onClick={() => { logout(); setProfileDropdownOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    )}
  </div>
</div>

        {/* DYNAMIC SECTION RENDERING */}
        <div className="animate-in fade-in duration-500">
            {section === "overview" && <AdminOverview />}
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
        <KPI title="Total Uploads" value="38" change="+12%" color="blue" />
        <KPI title="Pending Review" value="12" change="+3" color="yellow" />
        <KPI title="Active Users" value="22" change="+8" color="green" />
        <KPI title="Avg. Rating" value="4.7" change="+0.2" color="red" />
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
  const [activeTab, setActiveTab] = useState("students");
  const [users, setUsers] = useState(mockUsers);
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");

  const handleToggleMenu = (userId) => {
    setActionMenuOpenId((prev) => (prev === userId ? null : userId));
  };

  const handleDeactivate = (userId) => {
    const user = users.find((u) => u.id === userId);
    const email = user ? user.email : "this user";
    if (!window.confirm(`Deactivate ${email}? This will block their access.`)) {
      setActionMenuOpenId(null);
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, canEnter: false } : user
      )
    );
    setActionMenuOpenId(null);
  };

  const handleDelete = (userId) => {
    const user = users.find((u) => u.id === userId);
    const email = user ? user.email : "this user";
    if (!window.confirm(`Delete ${email}? This action cannot be undone.`)) {
      setActionMenuOpenId(null);
      return;
    }

    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setActionMenuOpenId(null);
  };

  // Filter logic fixed to use the "role" property from your mockUsers array
  const filteredUsers = users.filter((user) => {
    const matchesTab = activeTab === "students"
      ? user.role.toLowerCase() === "student"
      : user.role.toLowerCase() !== "student";

    const matchesSearch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">User Management</h1>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {["students", "professors"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === t ? "bg-[#8B0000] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="w-full md:w-50">
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Search by email..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#080616] outline-none transition focus:ring-2 focus:ring-[#8B0000]/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-left text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {/* Label changed from Name to User as requested */}
                <th className="px-4 py-3 font-semibold text-slate-700">User</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Role</th>
                <th className="px-4 py-3 font-semibold text-slate-700">UBmail</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Created</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group">
                  <td className="px-4 py-4 text-sm text-[#080616] font-medium">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm">{user.email.split("@")[0].split(".").join(" ")}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">ID: {user.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{user.role}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{user.created}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.canEnter ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {user.canEnter ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right relative">
                    <button
                      onClick={() => handleToggleMenu(user.id)}
                      className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#8B0000] transition"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {actionMenuOpenId === user.id && (
                      <div className="absolute right-4 top-10 z-20 w-36 rounded-xl border border-gray-200 bg-white text-sm text-[#080616] shadow-xl">
                        <button
                          onClick={() => handleDeactivate(user.id)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 transition"
                        >
                          Deactivate
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-500">
                    No users found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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