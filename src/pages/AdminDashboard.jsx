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
  // New Icons for the Settings Layout
  Palette,
  FileVideo,
  ShieldCheck,
  Database,
  Save,
  Upload,
  // Profile Dropdown Icons
  User,
  ChevronDown,
  Globe,
  HelpCircle
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    directory: "Faculty LDAP",
    groups: ["Administrators", "Curators"],
    fullName: "Avery Johnson",
    role: "Administrator",
    userType: "Admin",
    canEnter: true,
  },
  {
    id: 2,
    directory: "Student SSO",
    groups: ["Students", "Editors"],
    fullName: "Maya Chen",
    role: "Student",
    userType: "Student",
    canEnter: true,
  },
  {
    id: 3,
    directory: "Faculty LDAP",
    groups: ["Instructors", "Reviewers"],
    fullName: "Dr. Elias Martin",
    role: "Faculty",
    userType: "Instructor",
    canEnter: true,
  },
  {
    id: 4,
    directory: "Guest Access",
    groups: ["Guests"],
    fullName: "Jordan Lee",
    role: "Guest",
    userType: "External",
    canEnter: true,
  },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);



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
      <aside className="relative bg-[#8B0000] p-4 rounded-r-lg space-y-8 w-64">
        <div className="overflow-hidden transition-all duration-300">
          <UBLogo />
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center justify-between w-full p-3 rounded-lg text-[#E8EDF2] hover:bg-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5" />
              <span className="font-medium">Admin Profile</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white text-[#080616] rounded-lg shadow-lg mt-1 z-10">
              <button
                onClick={() => {
                  setSection('settings');
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-100 transition"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-100 transition">
                <Globe className="w-4 h-4" />
                <span>Language</span>
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-100 transition">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-100 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition justify-start ${
                section === item.id
                  ? "bg-white text-[#8B0000]"
                  : "text-[#E8EDF2] hover:bg-white/20"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="overflow-hidden whitespace-nowrap transition-all duration-300 max-w-[180px] opacity-100">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full p-2 bg-[#FFFFFF] text-[#8B0000] rounded-lg hover:bg-[#D4AF37] hover:text-[#080616]"
          >
            <LogOut className="w-5 h-5" />
            <span className="whitespace-nowrap">Logout</span>
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
        {section === "settings" && <SettingsPage setSection={setSection} />}
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
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(mockUsers);

  const tabs = [
    { id: "users", label: "User and Groups" },
    { id: "roles", label: "Roles" },
    { id: "directories", label: "User Directories" },
  ];

  const userTableHeaders = [
    " ",
    "Status",
    "User Directory",
    "User and Groups",
    "Full Name",
    "Role",
    "User Type",
  ];

  const activeUsers = users.filter((user) => user.canEnter);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">User Management</h1>

      <div className="glass text-[#080616] p-6 rounded-xl space-y-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-[#8B0000] text-white"
                  : "bg-white/10 text-[#080616] hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-300/20 bg-white/80 p-4 text-[#080616] shadow-sm">
              <h2 className="font-semibold text-xl text-[#8B0000] mb-2">User and Groups</h2>
              <p className="text-sm text-gray-600">
                All users who can enter the system, including directory, assigned groups, role, and user type.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-300/20 bg-white/90 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-[#8B0000] text-white">
                  <tr>
                    {userTableHeaders.map((header) => (
                      <th key={header} className="px-4 py-3 font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-[#080616]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[#f7f7f7]">
                      <td className="px-4 py-4 align-top">
                        <input
                          type="checkbox"
                          checked={user.canEnter}
                          onChange={() => {
                            setUsers((currentUsers) =>
                              currentUsers.map((item) =>
                                item.id === user.id
                                  ? { ...item, canEnter: !item.canEnter }
                                  : item
                              )
                            );
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-[#8B0000] focus:ring-[#8B0000]"
                          aria-label={`Toggle access for ${user.fullName}`}
                        />
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.canEnter
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.canEnter ? "Accepted" : "Declined"}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top">{user.directory}</td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {user.groups.map((group) => (
                            <span key={group} className="rounded-full bg-[#8B0000] px-3 py-1 text-xs text-white">
                              {group}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">{user.fullName}</td>
                      <td className="px-4 py-4 align-top">{user.role}</td>
                      <td className="px-4 py-4 align-top">{user.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "roles" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-300/20 bg-white/80 p-4 text-[#080616] shadow-sm">
              <h2 className="font-semibold text-xl text-[#8B0000] mb-2">Roles Overview</h2>
              <p className="text-sm text-gray-600">Review role definitions and active user counts for each role.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {Array.from(
                activeUsers.reduce((map, user) => {
                  map.set(user.role, (map.get(user.role) || 0) + 1);
                  return map;
                }, new Map())
              ).map(([role, count]) => (
                <div key={role} className="rounded-3xl border border-gray-300/20 bg-white/90 p-4 text-[#080616] shadow-sm">
                  <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Role</p>
                  <p className="mt-2 text-2xl font-semibold text-[#8B0000]">{role}</p>
                  <p className="mt-2 text-sm text-gray-600">{count} active user{count === 1 ? "" : "s"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "directories" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-300/20 bg-white/80 p-4 text-[#080616] shadow-sm">
              <h2 className="font-semibold text-xl text-[#8B0000] mb-2">User Directories</h2>
              <p className="text-sm text-gray-600">Directory sources that grant access to users in the system.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Array.from(
                activeUsers.reduce((map, user) => {
                  map.set(user.directory, (map.get(user.directory) || 0) + 1);
                  return map;
                }, new Map())
              ).map(([directory, count]) => (
                <div key={directory} className="rounded-3xl border border-gray-300/20 bg-white/90 p-4 text-[#080616] shadow-sm">
                  <p className="text-sm text-gray-500">{directory}</p>
                  <p className="mt-2 text-2xl font-semibold text-[#8B0000]">{count} user{count === 1 ? "" : "s"}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Replaced the old SettingsPage with the new Tabbed Logic
function SettingsPage({ setSection }) {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-[#8B0000] text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-[#8B0000] mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-xl border border-gray-100 min-h-[600px] overflow-hidden">
        
        {/* Left Navigation (Internal to Settings) */}
        <div className="w-full md:w-64 p-4 border-r border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">System Settings</h2>
          <div className="space-y-1">
            <TabButton id="general" icon={Palette} label="General & Theme" />
            <TabButton id="workflow" icon={FileVideo} label="Submission Rules" />
            <TabButton id="permissions" icon={ShieldCheck} label="Access Control" />
            <TabButton id="storage" icon={Database} label="Storage & Integration" />
          </div>
        </div>

        {/* Right Content Area (Forms) */}
        <div className="flex-1 p-8 text-[#080616]">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-[#8B0000]">Visual Identity</h3>
                <p className="text-sm text-gray-500">Customize how the showcase appears to the public.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Showcase Title</label>
                  <input type="text" className="border rounded-md p-2 focus:ring-2 focus:ring-red-100 outline-none" placeholder="UB Sining 2026" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Active Semester/Year</label>
                  <select className="border rounded-md p-2 bg-white">
                    <option>AY 2025-2026 (Current)</option>
                    <option>AY 2024-2025</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#8B0000] hover:bg-gray-50 transition-colors" onClick={() => document.getElementById('hero-banner-upload').click()}>
                  <Upload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag & drop new File</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended size: 1920x1080px</p>
                  <input 
                    id="hero-banner-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Handle file upload here
                        console.log('Selected file:', file);
                        // You can add upload logic or redirect to file management
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-[#8B0000]">Film Submission Rules</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Open Submissions</span>
                  <input type="checkbox" defaultChecked className="w-10 h-5" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Max File Size</label>
                    <select className="border rounded-md p-2">
                      <option>500 MB</option>
                      <option>1 GB</option>
                      <option>2 GB</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Submission Deadline</label>
                    <input type="date" className="border rounded-md p-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Supported Formats</label>
                  <div className="flex space-x-4">
                    {['MP4', 'MOV', 'MKV'].map(ext => (
                      <label key={ext} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm text-gray-600">{ext}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-[#8B0000]">Access Control</h3>
              
              <div className="p-4 border border-red-100 bg-red-50/30 rounded-lg space-y-4">
                <p className="text-sm font-bold text-gray-700">Approval Workflow</p>
                <div className="flex gap-4">
                  <label className="flex items-center p-3 bg-white border rounded-md flex-1 cursor-pointer hover:border-[#8B0000]">
                    <input type="radio" name="approval" className="mr-2" />
                    <span className="text-sm">Auto-Approve</span>
                  </label>
                  <label className="flex items-center p-3 bg-white border border-[#8B0000] rounded-md flex-1 cursor-pointer">
                    <input type="radio" name="approval" className="mr-2" defaultChecked />
                    <span className="text-sm">Manual Review</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-700">Email Notifications</p>
                <div className="flex items-center justify-between text-sm py-2">
                  <span>Notify Admin on new submission</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-[#8B0000]">Storage & Integration</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Cloud Storage API Key</label>
                  <input type="password" password="true" className="border rounded-md p-2" placeholder="Connect Google Drive/Vimeo API" />
                </div>
                
                <div className="pt-6 border-t mt-4">
                  <p className="text-sm font-bold text-red-600 mb-2">Danger Zone</p>
                  <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors">
                    Run Database Cleanup (Purge Old Films)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}