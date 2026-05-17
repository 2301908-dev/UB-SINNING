import { useState, useEffect, useRef } from "react";
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
  MoreVertical,
  Globe
} from "lucide-react";

// Added clean 'name' properties to the mock entries
const mockUsers = [
  { id: 1, name: "John Manuel Policarpio III", email: "2301565@ub.edu.ph", created: "2025-08-12", role: "Professor", canEnter: true },
  { id: 2, name: "Brent Joseph M. Pagcaliwagan", email: "2301687@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true },
  { id: 3, name: "John Ashley Alday", email: "2204421@ub.edu.ph", created: "2025-07-29", role: "Professor", canEnter: true },
  { id: 5, name: "Kenn Philip Nathaniel B. Silang", email: "2301908@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true },
  { id: 6, name: "Bryan James N. Villalon", email: "2301947@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true },
  { id: 7, name: "Tristan Jay Mirano", email: "2300524@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true },
  { id: 8, name: "Vin Perez", email: "2201238@ub.edu.ph", created: "2025-08-22", role: "Student", canEnter: true },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState({ label: "English (US)", code: "EN" });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  // Reference container to detect clicks outside the profile dropdown area
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
        setLanguageMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "storage", label: "Storage", icon: HardDrive },
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
      <aside className="relative bg-[#8B0000] p-4 rounded-r-lg flex flex-col justify-between w-52 shadow-xl">
        <div className="space-y-3">
          <div className="overflow-hidden">
            <UBLogo />
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-2 w-full p-2 rounded-lg transition justify-start ${
                  section === item.id ? "bg-white text-[#8B0000]" : "text-[#E8EDF2] hover:bg-white/20"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
 
      {/* Main Content Area - Tweaked padding to move content upwards */}
      <main className="flex-1 p-8 pt-4 text-white overflow-y-auto">
        
        {/* Profile Dropdown Header - Reduced bottom margin to pull down view tabs upward */}
        <div className="relative flex justify-end mb-4 z-50" ref={dropdownRef}> 
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                if (profileDropdownOpen) setLanguageMenuOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/10 transition-all shadow-md group"
            >
              <div className="relative">
                <img 
                  src="src/assets/teampics/brent.jpg" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:border-white/60 transition-all" 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></span>
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-white/90 hidden sm:inline"></span>
              <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white text-[#080616] shadow-2xl ring-1 ring-black/5 overflow-visible animate-in zoom-in-95 duration-200">
                <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                  <p className="text-sm font-bold text-[#8B0000]">Administrator</p>
                  <p className="text-xs text-gray-500 truncate">admin@ub.edu.ph</p>
                </div>
                
                <div className="py-1 relative">
                  {/* Language Selector Option */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguageMenuOpen(!languageMenuOpen);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${languageMenuOpen ? 'bg-gray-50 text-[#8B0000]' : 'hover:bg-gray-100'}`}
                    >
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Language</span>
                      <span className="ml-auto text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-bold">{language.code}</span>
                    </button>

                    {languageMenuOpen && (
                      <div className="absolute right-full top-0 mr-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-1 animate-in slide-in-from-right-2 duration-150">
                        {[
                          { label: "English (US)", code: "EN" },
                          { label: "Filipino", code: "TL" },
                          { label: "Spanish", code: "ES" },
                          { label: "Chinese", code: "ZH" },
                        ].map((option) => (
                          <button
                            key={option.code}
                            onClick={() => {
                              setLanguage(option);
                              setLanguageMenuOpen(false);
                            }}
                            className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm transition hover:bg-gray-100 ${language.code === option.code ? 'text-[#8B0000] font-bold' : 'text-gray-600'}`}
                          >
                            <span>{option.label}</span>
                            <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{option.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => { setSection("settings"); setProfileDropdownOpen(false); setLanguageMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Settings</span>
                  </button>
                  
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Help Center</span>
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Dashboard Overview</h1>
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">Storage Management</h1>
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">Feedback Analytics</h1>
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">All Content</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title or creator..."
        className="w-80 rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-[#080616] outline-none mb-4 focus:ring-2 focus:ring-[#8B0000]/20"
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
  const [confirmRequest, setConfirmRequest] = useState(null);
  const [screenNotice, setScreenNotice] = useState(null);

  // Safely find the targeted user record data to render custom dynamic alerts
  const targetedUser = confirmRequest ? users.find((u) => u.id === confirmRequest.userId) : null;
  const targetedUserName = targetedUser ? (targetedUser.name || targetedUser.email) : "";

  const handleToggleMenu = (userId) => {
    setActionMenuOpenId((prev) => (prev === userId ? null : userId));
  };

  const handleDeactivate = (userId) => {
    setActionMenuOpenId(null);
    setConfirmRequest({ userId, action: "deactivate" });
  };

  const handleDelete = (userId) => {
    setActionMenuOpenId(null);
    setConfirmRequest({ userId, action: "delete" });
  };

  const handleConfirmAction = () => {
    if (!confirmRequest) return;

    const { userId, action } = confirmRequest;
    const user = users.find((u) => u.id === userId);
    const identifier = user ? (user.name || user.email) : "User";

    if (action === "deactivate") {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, canEnter: false } : u
        )
      );
      setScreenNotice({ type: "success", text: `"${identifier}" has been deactivated.` });
    } else if (action === "delete") {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      setScreenNotice({ type: "success", text: `"${identifier}" has been deleted.` });
    }

    setConfirmRequest(null);
  };

  useEffect(() => {
    if (!screenNotice) return;
    const timer = setTimeout(() => setScreenNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [screenNotice]);

  const filteredUsers = users.filter((user) => {
    const matchesTab = activeTab === "students"
      ? user.role.toLowerCase() === "student"
      : user.role.toLowerCase() !== "student";

    const matchesSearch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">User Management</h1>
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

        {confirmRequest && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold shrink-0">
                <span>!</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-amber-950">
                  {confirmRequest.action === 'delete' ? 'Confirm Deletion' : 'Confirm Deactivation'}
                </p>
                <p className="mt-1 text-xs text-amber-800">
                  Are you sure you want to <span className="font-bold underline">{confirmRequest.action}</span> user{" "}
                  <span className="font-bold text-black bg-amber-200/60 px-1.5 py-0.5 rounded">{targetedUserName}</span>?{" "}
                  {confirmRequest.action === 'delete' ? 'This action removes the account permanently.' : 'This blocks their dashboard access access.'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-start">
              <button
                onClick={handleConfirmAction}
                className="inline-flex items-center justify-center rounded-xl bg-[#8B0000] px-4 py-2 text-xs font-bold text-white hover:bg-[#8B0000]/80 transition shadow-sm"
              >
                Confirm Action
              </button>
              <button
                onClick={() => setConfirmRequest(null)}
                className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {screenNotice && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 font-medium shadow-sm animate-in fade-in duration-200">
            {screenNotice.text}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-left text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
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
                      <span className="font-semibold text-sm">
                        {user.name ? user.name : user.email.split("@")[0].split(".").join(" ")}
                      </span>
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
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">Settings</h1>
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