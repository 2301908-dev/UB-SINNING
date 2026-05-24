import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import { mockFilms } from "../data/mockFilms";
import backgroundImage from "../assets/white_bg.jpg";
import { ArrowLeft } from 'lucide-react';
import TotalUploadsIcon from "../assets/icons/camera.png";
import PendingReviewsIcon from "../assets/icons/review.png";
import ActiveUsersIcon from "../assets/icons/users.png";
import AvgRatingIcon from "../assets/icons/view.png";
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
  MoreVertical,
  Globe,
  Search,
  Bell,
  Sun,
  Moon,
  Edit2
} from "lucide-react";

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
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
  firstName: "Brent Joseph",
  lastName: "Pagcaliwagan",
  email: "admin@ub.edu.ph",
  address: "M.H. Del Pilar St.",
  avatar: "src/assets/teampics/brent.png" 
});

  const [editForm, setEditForm] = useState({ ...adminData });
  // Sync edit form if adminData is updated elsewhere
  useEffect(() => {
    setEditForm({ ...adminData });
  }, [adminData]);
  const handleSave = () => {
    setAdminData(editForm);
    setIsEditing(false);
  };

  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [prevSection, setPrevSection] = useState("overview");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState({ label: "English (US)", code: "EN" });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
        setLanguageMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "feedback", label: "Feedback Analytics", icon: MessageSquare },
    { id: "content", label: "All Content", icon: Film },
    { id: "users", label: "Users", icon: Users },
  ];
  const navigateTo = (newSection) => {
  setPrevSection(section); // Save where you are right now before moving
  setSection(newSection);
};

  return (
        <div
          className={`flex min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f0e17] text-[#E8EDF2]' : 'text-[#E8EDF2]'}`}
          style={!darkMode ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {}}
        >
          {/* Sidebar */}
          <aside className="relative bg-[#8B0000] p-4 rounded-r-lg flex flex-col justify-between w-52 shadow-xl z-20">
            <div className="space-y-3">
              <div className="overflow-hidden">
                <UBLogo />
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSection(item.id); setIsEditing(false); }}
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

          {/* Main Container */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden">     
         
            {/* Header */}
            <header className={`h-16 flex items-center justify-between px-8 border-b backdrop-blur-md z-30 transition-colors duration-300 ${darkMode ? 'bg-[#1e1b29]/80 border-white/10' : 'bg-black/10 border-white/10'}`}>

              {/* Header Global Search Bar */}
              <div className="relative w-62">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"/>
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full rounded-xl bg-black/20 border border-white/10 pl-9 pr-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-[#8B0000]/40 placeholder-white/50 transition-all"
                />
              </div>

              {/* Action Utilities & Dynamic Actions Panel */}
              <div className="flex items-center gap-4"> 

                {/* Toggle Dark Mode Button */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition shadow-sm border ${
                      darkMode 
                        ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white" 
                        : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700"
                    }`}
                  >
                    {darkMode ? (
                      <>
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-zinc-600" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>


                {/* Notification Trigger Wrapper */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition shadow-md text-white relative"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B0000] rounded-full ring-2 ring-white/20"></span>
                  </button>

                  {/* Notification Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-3 w-80 rounded-xl bg-white text-[#080616] shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <p className="text-xs font-bold text-[#8B0000] uppercase tracking-wider">Notifications</p>
                        <span className="text-[10px] bg-red-100 text-[#8B0000] font-bold px-2 py-0.5 rounded-full">2 New</span>
                      </div>
                      <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                        <div className="p-4 hover:bg-gray-50 transition cursor-pointer">
                          <p className="text-xs font-semibold text-gray-800">New system registration request</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">Brent Pagcaliwagan created a Student account.</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 transition cursor-pointer">
                          <p className="text-xs font-semibold text-gray-800">Storage warning limit</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">System storage architecture has filled beyond 65% capacity.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              {/* Profile Dropdown Component Container */}
              <div className="relative flex justify-end z-50" ref={dropdownRef}> 
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      if (profileDropdownOpen) setLanguageMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-[#8B0000] transition-all shadow-md group"
                  >
                    <div className="relative">
                      <img 
                        src={adminData.avatar} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:border-white/60 transition-all" 
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white text-[#080616] shadow-2xl ring-1 ring-black/5 overflow-visible animate-in zoom-in-95 duration-200">
                      <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                        <p className="text-sm font-bold text-[#8B0000]">{adminData.firstName} {adminData.lastName}</p>
                        <p className="text-xs text-gray-500 truncate">{adminData.email}</p>
                      </div>
                      
                      <div className="py-1 relative">

                        {/* Edit Profile Option */}
                        <button 
                          onClick={() => { navigateTo("edit-profile"); setProfileDropdownOpen(false); setLanguageMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition"
                        >
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">My Profile</span>
                        </button>

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
                              ].map((option) => (
                                <button
                                  key={option.code}
                                  onClick={() => {
                                    setLanguage(option);
                                    setLanguageMenuOpen(false);
                                  }}
                                  className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm transition hover:bg-gray-100 ${language.code === option.code ? 'text-[#8B0000]' : 'text-gray-600'}`}
                                >
                                  <span>{option.label}</span>
                                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{option.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Settings Option */}
                        <button 
                          onClick={() => { setSection("settings"); setProfileDropdownOpen(false); setLanguageMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 transition"
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Settings</span>
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>

                        {/* Logout Option */}
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
            </div>
          </header>

          {/* Dynamic Section Content Viewport */}
        <main className="flex-1 p-8 text-white overflow-y-auto">
      <div className="animate-in fade-in duration-500">

      {/* DYNAMIC SECTION RENDERING */}
      <div className="animate-in fade-in duration-500">
        {section === "overview" && <AdminOverview darkMode={darkMode} />}
{section === "feedback" && <FeedbackAnalytics darkMode={darkMode} />}
{section === "content" && <AllContent darkMode={darkMode} />}
{section === "users" && <UserManagement darkMode={darkMode} />}
        {section === "settings" && (
          <SettingsPage setSection={setSection} />
        )}
      </div>

      {/* Edit Profile Form View */}
      {section === "edit-profile" && (
        <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-200 text-left">

          <div
            className={`rounded-2xl border backdrop-blur-md p-6 shadow-xl transition-all ${
              darkMode
                ? "bg-[#1e1b29]/90 border-white/10"
                : "bg-black/40 border-white/20"
            }`}
          >

            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">

                {/* BACK BUTTON */}
                <button
                  onClick={() => setSection(prevSection)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>

                {/* TITLE */}
                <div>
                  <h2 className="text-xl font-bold text-white">
                    My Profile
                  </h2>

                  <p className="text-xs text-white/60">
                    View and update your personal account information.
                  </p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition shadow"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Picture Uploader Section */}
            <div className="flex flex-col sm:flex-row items-center gap-5 mb-6 bg-white/5 p-4 rounded-xl border border-white/5">

              <div className="relative group">

                <img
                  src={isEditing ? editForm.avatar : adminData.avatar}
                  alt="Uploader Profile Display"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#8B0000] shadow-md"
                />

                {isEditing && (
                  <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">

                    <Upload className="w-5 h-5 text-white mb-1" />

                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Change
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                          const localUrl = URL.createObjectURL(file);

                          setEditForm({
                            ...editForm,
                            avatar: localUrl,
                          });
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-white">
                  Brent Joseph Pagcaliwagan
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  {isEditing
                    ? ""
                    : "UB-SINING Administrator"}
                </p>
              </div>
            </div>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* First Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                  First Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black/20 border border-white/10 p-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition"
                  />
                ) : (
                  <p className="text-sm bg-black/10 border border-white/5 rounded-xl p-2.5 font-medium text-white/90">
                    {adminData.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Last Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black/20 border border-white/10 p-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition"
                  />
                ) : (
                  <p className="text-sm bg-black/10 border border-white/5 rounded-xl p-2.5 font-medium text-white/90">
                    {adminData.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black/20 border border-white/10 p-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition"
                  />
                ) : (
                  <p className="text-sm bg-black/10 border border-white/5 rounded-xl p-2.5 font-medium text-white/90">
                    {adminData.email}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        address: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black/20 border border-white/10 p-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition"
                  />
                ) : (
                  <p className="text-sm bg-black/10 border border-white/5 rounded-xl p-2.5 font-medium text-white/90">
                    {adminData.address}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions Footer */}
            {isEditing && (
              <div className="flex justify-end gap-3 border-t border-white/10 mt-6 pt-4">

                <button
                  onClick={() => {
                    setEditForm({ ...adminData });
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#8B0000] hover:bg-[#a00000] text-white transition shadow-md"
                >
                  Save Changes
                </button>

              </div>
            )}
          </div>
        </div>
      )}

        {/* Fallback View */}
          {section !== "overview" && section !== "edit-profile" && (
            <div className="text-white/60 text-sm">
              The section view for{" "}
              <span className="font-semibold capitalize text-white">
                "{section}"
                  </span>{" "}
                    is coming soon...
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      );
    }

/* ------------ SUB-PAGES (INTEGRATED) ------------------ */

function KPI({ title, value, change, iconSrc, darkMode }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-3 border border-white/10 shadow-lg">
      
      <div className="w-11 h-11 rounded-lg bg-[#8B0000]/10 backdrop-blur-sm flex items-center justify-center p-2.5 shadow-inner border border-white/20">
        <img 
          src={iconSrc} 
          alt={`${title} icon`} 
          className="w-full h-full object-contain" 
        />
      </div>

      <p className="text-gray-400 text-sm">{title}</p>

      <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-[#080616]"}`}>
        {value}
      </p>

      <p className="text-green-600 text-xs font-bold">{change}</p>
    </div>
  );
}

function AdminOverview({ darkMode }) {
  const [timeframe, setTimeframe] = useState("days");

  const yAxisTicks = {
    days: ["400", "300", "200", "100", "0"],
    week: ["3,000", "2,250", "1,500", "750", "0"],
    month: ["10,000", "7,500", "5,000", "2,500", "0"]
  };

  const graphData = {
    days: [
      { label: "Mon", value: 120, height: "h-[45%]" },
      { label: "Tue", value: 210, height: "h-[65%]" },
      { label: "Wed", value: 180, height: "h-[55%]" },
      { label: "Thu", value: 340, height: "h-[90%]" },
      { label: "Fri", value: 290, height: "h-[80%]" },
      { label: "Sat", value: 150, height: "h-[48%]" },
      { label: "Sun", value: 95,  height: "h-[30%]" },
    ],
    week: [
      { label: "Week 1", value: 1240, height: "h-[40%]" },
      { label: "Week 2", value: 1980, height: "h-[70%]" },
      { label: "Week 3", value: 2450, height: "h-[95%]" },
      { label: "Week 4", value: 1610, height: "h-[60%]" },
    ],
    month: [
      { label: "Jan", value: 4800, height: "h-[45%]" },
      { label: "Feb", value: 5900, height: "h-[55%]" },
      { label: "Mar", value: 8100, height: "h-[80%]" },
      { label: "Apr", value: 9600, height: "h-[98%]" },
      { label: "May", value: 7200, height: "h-[72%]" },
      { label: "Jun", value: 6400, height: "h-[62%]" },
    ]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#8B0000]">Dashboard Overview</h1>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <KPI 
          title="Total Uploads" 
          value="38" 
          change="+12%" 
          iconSrc={TotalUploadsIcon}
          darkMode={darkMode}
        />

        <KPI 
          title="Pending Review" 
          value="12" 
          change="+3" 
          iconSrc={PendingReviewsIcon}
          darkMode={darkMode}
        />

        <KPI 
          title="Total Views" 
          value="22" 
          change="+8" 
          iconSrc={ActiveUsersIcon}
          darkMode={darkMode}
        />

        <KPI 
          title="Total Users" 
          value="4.7" 
          change="+0.2" 
          iconSrc={AvgRatingIcon}
          darkMode={darkMode}
        />
      </div>

      {/* Dynamic Total Views Graph Section */}
      <div
        className={`backdrop-blur-md p-6 rounded-xl shadow-lg border transition-colors ${
          darkMode
            ? "bg-[#1e1b29]/90 border-white/10 text-white"
            : "bg-white/80 border-gray-200 text-[#080616]"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#8B0000]">Total Views Analytics</h2>
            <p className={`${darkMode ? "text-white/60" : "text-gray-500"} text-xs`}>
              Track presentation audience engagement cycles
            </p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 self-start sm:self-auto">
            {[
              { id: "days", label: "Days" },
              { id: "week", label: "Weeks" },
              { id: "month", label: "Months" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timeframe === tab.id
                    ? "bg-[#8B0000] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#8B0000]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-stretch gap-4">
          <div className={`flex flex-col justify-between text-right text-[11px] font-bold w-12 pr-1 pb-8 pt-4 ${darkMode ? "text-white/50" : "text-gray-400"}`}>
            {yAxisTicks[timeframe].map((tick, i) => (
              <span key={i}>{tick}</span>
            ))}
          </div>

          <div className={`h-64 flex-1 flex items-end gap-3 px-2 pt-4 border-b border-l ${darkMode ? "border-white/10" : "border-gray-200"}`}>
            {graphData[timeframe].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                
                <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded shadow border pointer-events-none mb-1 ${
                  darkMode
                    ? "bg-[#2b243d] text-white border-white/10"
                    : "bg-white text-gray-500 border-gray-100"
                }`}>
                  {data.value.toLocaleString()}
                </span>

                <div 
                  className={`w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-[#8B0000] to-[#b30000] transition-all duration-500 ease-out group-hover:brightness-110 shadow-md ${data.height}`}
                ></div>

                <span className={`text-xs font-semibold mt-1 pb-2 block text-center truncate w-full ${
                  darkMode ? "text-white/70" : "text-gray-600"
                }`}>
                  {data.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackAnalytics({ darkMode }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#8B0000] mb-4">Feedback Analytics</h1>

      <div
        className={`backdrop-blur-md p-6 rounded-xl shadow-lg border ${
          darkMode
            ? "bg-[#1e1b29]/90 border-white/10 text-white"
            : "bg-white/80 border-gray-200 text-[#080616]"
        }`}
      >
        <p>Charts and student feedback analysis coming soon.</p>
      </div>
    </div>
  );
}

function AllContent({ darkMode }) {
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
        className={`w-80 rounded-xl px-4 py-3 outline-none mb-4 focus:ring-2 focus:ring-[#8B0000]/20 transition ${
          darkMode
            ? "bg-[#1e1b29] border border-white/10 text-white placeholder-white/40"
            : "bg-white/90 border border-gray-300 text-[#080616]"
        }`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className={`backdrop-blur-md p-4 rounded-xl shadow-md border ${
              darkMode
                ? "bg-[#1e1b29]/90 border-white/10 text-white"
                : "bg-white/80 border-gray-200 text-[#080616]"
            }`}
          >
            <img
              src={film.thumbnail}
              className="rounded-lg mb-3 h-40 w-full object-cover"
              alt={film.title}
            />

            <p className={`font-semibold ${darkMode ? "text-white" : "text-[#080616]"}`}>
              {film.title}
            </p>

            <p className={`${darkMode ? "text-white/60" : "text-gray-500"} text-sm`}>
              {film.creator}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserManagement({ darkMode }) {

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
    setActionMenuOpenId=(null);
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
              placeholder="Search by ubmail..."
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