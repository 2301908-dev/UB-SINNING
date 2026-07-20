import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
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
  HelpCircle,
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
  { id: 8, name: "Vin Perez", email: "2201238@ub.edu.ph", created: "2025-08-22", role: "Professor", canEnter: true },
];

export default function AdminDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    firstName: "Brent Joseph",
    lastName: "Pagcaliwagan",
    email: "admin@ub.edu.ph",
    address: "M.H. Del Pilar St.",
    avatar: "src/assets/teampics/brent.jpg"
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
    { id: "content", label: "All Content", icon: Film },
    { id: "users", label: "Users", icon: Users },
  ];
  const navigateTo = (newSection) => {
    setPrevSection(section); // Save where you are right now before moving
    setSection(newSection);
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0f0e17] text-[#E8EDF2]' : 'bg-[#f7f8fb] text-[#080616]'}`}
      style={!darkMode ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      } : {}}
    >


      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className={`h-20 flex items-center justify-between px-8 border-b backdrop-blur-md z-30 transition-colors duration-300 ${darkMode ? 'bg-[#1e1b29]/80 border-white/10' : 'bg-white/70 border-gray-200'}`}>

          {/* Brand */}
          <div className="flex items-center gap-4">
            <UBLogo size={80} titleClass={darkMode ? "text-white" : "text-gray-900"} subtitleClass={darkMode ? "text-gray-300" : "text-gray-600"} />
          </div>

          {/* Action Utilities & Dynamic Actions Panel */}
          <div className="flex items-center gap-4">

            {/* Notification Trigger Wrapper */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-xl transition shadow-md relative transition-all duration-300 ease-in-out hover:-translate-y-1.5 cursor-pointer ${darkMode
                  ? 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                  : 'bg-white/10 text-slate-900 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B0000] rounded-full ring-2 ring-white/20"></span>
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className={`absolute right-0 mt-3 w-80 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-[#17141f] text-[#E8EDF2] ring-1 ring-white/10' : 'bg-white text-[#080616] ring-1 ring-black/5'
                  }`}>

                  {/* Header */}
                  <div className={`px-4 py-3 flex justify-between items-center ${darkMode ? 'border-b border-white/10 bg-[#1d1a2b]' : 'border-b border-gray-100 bg-gray-50/50'
                    }`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-[#FFFFFF]/90' : 'text-[#8B0000]'}`}>
                      Notifications
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-red-100/10 text-red-300' : 'bg-red-100 text-[#8B0000]'
                      }`}>
                      4 New
                    </span>
                  </div>

                  {/* Notification Items List Container */}
                  <div className={`max-h-80 overflow-y-auto divide-y no-scrollbar ${darkMode ? 'divide-white/10' : 'divide-gray-100'
                    }`}>

                    {/* Item 1 */}
                    <div className={`p-4 transition cursor-pointer ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        New system registration request
                      </p>
                      <p className={`text-[12px] mt-0.5 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
                        John Doe created a Student account.
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className={`p-4 transition cursor-pointer ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        We just added Dark Mode to your appearance settings!
                      </p>
                      <p className={`text-[12px] mt-0.5 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
                        Toggle it on to give your eyes a break.
                      </p>
                    </div>

                    {/* Sub Section Header Block - Formatted for list consistency */}
                    <div className={`px-4 py-2 bg-opacity-50 ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h3 className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Recent Activity & Security Alerts
                      </h3>
                    </div>

                    <div className={`p-4 transition cursor-pointer ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/90' : 'text-slate-800'}`}>
                          Successful Login
                        </span>
                      </div>
                      <p className={`text-[12px] mt-1 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
                        Your account was successfully accessed from a verified device.
                      </p>
                      <span className={`block text-[11px] mt-2 ${darkMode ? 'text-white/40' : 'text-slate-500'}`}>
                        Today at 11:35 AM
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className={`p-4 transition cursor-pointer ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                          Security Alert
                        </span>
                      </div>

                      {/* Removed line-clamp-2 here so the full text renders */}
                      <p className={`text-[12px] mt-1 ${darkMode ? 'text-white/80' : 'text-slate-600'}`}>
                        Multiple failed login attempts detected on your account. Access has been temporarily restricted for your safety.
                      </p>

                      <span className={`block text-[11px] mt-2 ${darkMode ? 'text-white/40' : 'text-slate-500'}`}>
                        Today at 11:24 AM
                      </span>
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
                  className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-[#8B0000] transition-all shadow-md group cursor-pointer hover:shadow-lg hover:-translate-y-0.5 border border-white/10 text-white"
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
                  <div className={`absolute right-0 mt-3 w-56 rounded-xl overflow-visible animate-in zoom-in-95 duration-200 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 shadow-2xl ${darkMode ? 'bg-[#17141f] text-[#E8EDF2] ring-1 ring-white/10' : 'bg-white text-[#080616] ring-1 ring-black/5'}`}>

                    <div className={`px-4 py-4 rounded-t-xl ${darkMode ? 'border-b border-white/10 bg-[#1d1a2b]' : 'border-b border-gray-100 bg-gray-50/50'}`}>
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#8B0000]'}`}>{adminData.firstName} {adminData.lastName}</p>
                      <p className={`text-xs truncate ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{adminData.email}</p>
                    </div>

                    <div className="py-1 relative">

                      {/* Edit Profile Option */}
                      <button
                        onClick={() => {
                          navigateTo("edit-profile");
                          setProfileDropdownOpen(false);
                          setLanguageMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${darkMode
                          ? 'text-white/80 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#8B0000]'
                          }`}
                      >
                        <User className={`w-4 h-4 transition-colors ${darkMode ? 'text-white/50 group-hover:text-white' : 'text-gray-500'}`} />
                        <span className="font-medium">My Profile</span>
                      </button>

                      {/* Language Selector Option */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLanguageMenuOpen(!languageMenuOpen);
                          }}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${darkMode
                            ? 'text-white/80 hover:bg-white/5 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-[#8B0000]'
                            }`}
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

                      {/* Toggle Dark Mode Button */}
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${darkMode ? 'hover:bg-white/[0.05] text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
                      >
                        {darkMode ? (
                          <>
                            <Sun className="w-4 h-4 text-amber-400" />
                            <span className="font-medium">Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon className="w-4 h-4 text-zinc-500" />
                            <span className="font-medium">Dark Mode</span>
                          </>
                        )}
                      </button>

                      {/* Settings Option */}
                      <button
                        onClick={() => { setSection("settings"); setProfileDropdownOpen(false); setLanguageMenuOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${darkMode
                          ? 'text-white/80 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#8B0000]'
                          }`}
                      >
                        <Settings className={`w-4 h-4 transition-colors ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                        <span className="font-medium">Settings</span>
                      </button>

                      {/* Help Center Option */}
                      <button
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition ${darkMode
                          ? 'text-white/80 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#8B0000]'
                          }`}
                      >
                        <HelpCircle className={`w-4 h-4 transition-colors ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                        <span className="font-medium">Help Center</span>
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
        <main className={`flex-1 p-8 overflow-y-auto ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          <div className="animate-in fade-in duration-500">

            {/* DYNAMIC SECTION RENDERING */}
            <div className="animate-in fade-in duration-500">
              {section !== "edit-profile" && (
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-3xl font-bold text-[#8B0000]">
                    {section === "overview"
                      ? "Dashboard Overview"
                      : section === "content"
                        ? "All Content"
                        : section === "users"
                          ? "User Management"
                          : section === "settings"
                            ? "Settings"
                            : "Dashboard Overview"}
                  </h1>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = section === item.id;
                      const buttonClasses = isActive
                        ? "bg-[#8B0000] text-white shadow-sm border border-[#8B0000]"
                        : darkMode
                          ? "bg-white/10 text-[#E8EDF2] border border-white/10 hover:bg-white/20"
                          : "bg-white/90 text-[#080616] border border-gray-300 shadow-sm hover:bg-white";

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            navigateTo(item.id);
                            setIsEditing(false);
                          }}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${buttonClasses}`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {section === "overview" && <AdminOverview darkMode={darkMode} />}
              {section === "content" && <AllContent darkMode={darkMode} />}
              {section === "users" && <UserManagement darkMode={darkMode} />}
              {section === "settings" && (
                <SettingsPage darkMode={darkMode} setSection={setSection} />
              )}
            </div>

            {/* Edit Profile Form View */}
            {section === "edit-profile" && (
              <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-200 text-left">

                <div
                  className={`rounded-2xl border backdrop-blur-md p-6 shadow-xl transition-all ${darkMode
                    ? "bg-[#1e1b29]/90 border-white/10"
                    : "bg-white/90 border-gray-200 text-slate-900 shadow-lg"
                    }`}
                >

                  {/* Header */}
                  <div className={`flex justify-between items-center border-b pb-4 mb-6 ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">

                      {/* BACK BUTTON */}
                      <button
                        onClick={() => setSection(prevSection)}
                        className={`p-2 rounded-xl transition ${darkMode ? 'bg-white/10 hover:bg-white/20 border border-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-900'}`}
                      >
                        <ArrowLeft className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-slate-900'}`} />
                      </button>

                      {/* TITLE */}
                      <div>
                        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          My Profile
                        </h2>

                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                          View and update your personal account information.
                        </p>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition shadow ${darkMode
                          ? 'bg-[#8B0000]/80 hover:bg-[#8B0000] border border-white/10 text-white'
                          : 'bg-[#8B0000] hover:bg-[#8B0000]/90 border border-[#8B0000] text-white'
                          }`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {/* Profile Picture Uploader Section */}
                  <div className={`flex flex-col sm:flex-row items-center gap-5 mb-6 p-4 rounded-xl transition-colors duration-300 ${darkMode ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-gray-200'}`}>

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
                      <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Brent Joseph Pagcaliwagan
                      </h3>
                      <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
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
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
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
                          className={`w-full rounded-xl p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/40 ${darkMode ? 'bg-black/20 border border-white/10 text-white' : 'bg-white border border-gray-200 text-slate-900'}`}
                        />
                      ) : (
                        <p className={`text-sm rounded-xl p-2.5 font-medium transition-colors duration-200 ${darkMode ? 'bg-black/10 border border-white/5 text-white/90' : 'bg-slate-50 border border-gray-200 text-slate-900'}`}>
                          {adminData.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
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
                          className={`w-full rounded-xl p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/40 ${darkMode ? 'bg-black/20 border border-white/10 text-white' : 'bg-white border border-gray-200 text-slate-900'}`}
                        />
                      ) : (
                        <p className={`text-sm rounded-xl p-2.5 font-medium transition-colors duration-200 ${darkMode ? 'bg-black/10 border border-white/5 text-white/90' : 'bg-slate-50 border border-gray-200 text-slate-900'}`}>
                          {adminData.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
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
                          className={`w-full rounded-xl p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/40 ${darkMode ? 'bg-black/20 border border-white/10 text-white' : 'bg-white border border-gray-200 text-slate-900'}`}
                        />
                      ) : (
                        <p className={`text-sm rounded-xl p-2.5 font-medium transition-colors duration-200 ${darkMode ? 'bg-black/10 border border-white/5 text-white/90' : 'bg-slate-50 border border-gray-200 text-slate-900'}`}>
                          {adminData.email}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/60' : 'text-slate-600'}`}>
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
                          className={`w-full rounded-xl p-2.5 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/40 ${darkMode ? 'bg-black/20 border border-white/10 text-white' : 'bg-white border border-gray-200 text-slate-900'}`}
                        />
                      ) : (
                        <p className={`text-sm rounded-xl p-2.5 font-medium transition-colors duration-200 ${darkMode ? 'bg-black/10 border border-white/5 text-white/90' : 'bg-slate-50 border border-gray-200 text-slate-900'}`}>
                          {adminData.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Form Actions Footer */}
                  {isEditing && (
                    <div className={`flex justify-end gap-3 mt-6 pt-4 transition-colors duration-200 ${darkMode ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>

                      <button
                        onClick={() => {
                          setEditForm({ ...adminData });
                          setIsEditing(false);
                        }}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${darkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 border border-gray-200 text-slate-900'}`}
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
              <div className={`${darkMode ? 'text-white/60' : 'text-slate-600'} text-sm`}>
                The section view for{" "}
                <span className={`font-semibold capitalize ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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
    <div className={`rounded-2xl p-6 border transition-all duration-300 ease-in-out hover:-translate-y-1.5 cursor-pointer ${darkMode ? 'bg-[#1a1728] border-white/10 shadow-xl shadow-black/20' : 'bg-white rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-xl'}`}>

      <div className="w-11 h-11 rounded-lg bg-[#8B0000]/10 backdrop-blur-sm flex items-center justify-center p-2.5 shadow-inner border border-white/20">
        <img
          src={iconSrc}
          alt={`${title} icon`}
          className={`w-full h-full object-contain transition duration-300 ${darkMode ? "invert brightness-200" : ""
            }`}
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
      { label: "Sun", value: 95, height: "h-[30%]" },
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
          value="332"
          change="+8"
          iconSrc={ActiveUsersIcon}
          darkMode={darkMode}
        />

        <KPI
          title="Total Users"
          value="4.7k"
          change="+0.2"
          iconSrc={AvgRatingIcon}
          darkMode={darkMode}
        />
      </div>

      {/* Dynamic Total Views Graph Section */}
      <div
        className={`backdrop-blur-md p-6 rounded-xl shadow-lg border transition-all duration-300 ease-in-out hover:-translate-y-1.5 cursor-pointer ${darkMode
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
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${timeframe === tab.id
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

          <div className={`h-64 flex-1 flex items-end gap-2 px-1 pt-4 border-b border-l ${darkMode ? "border-white/10" : "border-gray-200"}`}>
            {graphData[timeframe].map((data, index) => (
              <div key={index} className="w-35 flex flex-col items-center gap-1 h-full justify-end group min-w-0">

                <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded shadow border pointer-events-none mb-1 ${darkMode
                  ? "bg-[#2b243d] text-white border-white/10"
                  : "bg-white text-gray-500 border-gray-100"
                  }`}>
                  {data.value.toLocaleString()}
                </span>

                <div
                  className={`w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-[#8B0000] to-[#b30000] transition-all duration-500 ease-out group-hover:brightness-110 shadow-md ${data.height}`}
                ></div>

                <span className={`text-xs font-semibold mt-1 pb-2 block text-center truncate w-full ${darkMode ? "text-white/70" : "text-gray-600"
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

function AllContent({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFilms = mockFilms.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>


      {/* Styled Search Input Area */}
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or creator..."
          className={`w-full max-w-md rounded-xl px-4 py-3.5 outline-none shadow-sm focus:ring-2 focus:ring-[#8B0000]/30 transition-all ${darkMode
            ? "bg-[#1e1b29] border border-white/10 text-white placeholder-white/40 focus:border-[#8B0000]"
            : "bg-white border border-gray-200 text-[#080616] placeholder-gray-400 focus:border-[#8B0000]"
            }`}
        />
      </div>

      {/* Upgraded Modern Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className={`group flex flex-col backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${darkMode
              ? "bg-[#1e1b29]/90 border-white/10 text-white hover:border-white/20"
              : "bg-white/90 border-gray-100 text-[#080616] hover:border-gray-200"
              }`}
          >
            {/* Aspect Video Image Container with Hover Scale */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-900/10">
              <img
                src={film.thumbnail}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={film.title}
              />

              {/* Subtle overlay accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Details Layout */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-3">
              <div className="space-y-1">
                <h3 className={`font-bold text-base leading-snug line-clamp-2 group-hover:text-[#8B0000] transition-colors duration-200 ${darkMode ? "text-white" : "text-[#080616]"
                  }`}>
                  {film.title}
                </h3>
                <p className={`text-sm font-medium ${darkMode ? "text-white/60" : "text-gray-500"
                  }`}>
                  by {film.creator}
                </p>
              </div>

              {/* Decorative dynamic badge just to clean up footer space */}
              <div className="pt-2 border-t border-dashed border-gray-500/10 flex items-center justify-between">
                <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${darkMode ? "bg-white/5 text-white/70" : "bg-gray-100 text-gray-600"
                  }`}>
                  Media
                </span>
                <span className="text-xs font-semibold text-[#8B0000] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer hover:underline">
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback empty state layout */}
      {filteredFilms.length === 0 && (
        <div className={`text-center py-12 rounded-xl border border-dashed ${darkMode ? "border-white/10 text-white/40" : "border-gray-200 text-gray-400"
          }`}>
          No content matches your search.
        </div>
      )}
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
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    role: "Student",
    created: new Date().toISOString().split("T")[0],
  });

  const getNextUserId = () => {
    const numericIds = users
      .map((user) => Number(user.id))
      .filter((id) => Number.isInteger(id));

    return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  };

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

  const handleReactivate = (userId) => {
    setActionMenuOpenId(null);
    setConfirmRequest({ userId, action: "reactivate" });
  };

  const handleDelete = (userId) => {
    setActionMenuOpenId(null);
    setConfirmRequest({ userId, action: "delete" });
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    const trimmedName = newUserForm.name.trim();
    const trimmedEmail = newUserForm.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      setScreenNotice({ type: "error", text: "Please provide both a name and email." });
      return;
    }

    const newUser = {
      id: getNextUserId(),
      name: trimmedName,
      email: trimmedEmail,
      created: newUserForm.created || new Date().toISOString().split("T")[0],
      role: newUserForm.role,
      canEnter: true,
    };

    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setScreenNotice({ type: "success", text: `"${trimmedName}" has been added as a ${newUser.role}.` });
    setNewUserForm({
      name: "",
      email: "",
      role: "Student",
      created: new Date().toISOString().split("T")[0],
    });
    setShowAddUserForm(true);
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
    } else if (action === "reactivate") {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, canEnter: true } : u
        )
      );
      setScreenNotice({ type: "success", text: `"${identifier}" has been reactivated.` });
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
      <div className={`backdrop-blur-md p-6 rounded-xl space-y-6 transition-colors duration-300 ${darkMode ? 'bg-[#15131f]/90 border border-white/10 shadow-xl shadow-black/20' : 'bg-white/80 border border-gray-200 shadow-lg'}`}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {["students", "professors"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === t
                  ? "bg-[#8B0000] text-white"
                  : darkMode
                    ? "bg-white/5 text-white/70 hover:bg-white/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Container for search input and the new Add User button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            <div className="w-full md:w-50">
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search by ubmail..."
                className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 ${darkMode ? 'border border-white/10 bg-[#1b1728] text-white placeholder-white/40' : 'border border-gray-300 bg-white text-[#080616] placeholder-gray-400'}`}
              />
            </div>
            <button
              onClick={() => setShowAddUserForm((prev) => !prev)}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center rounded-xl bg-[#8B0000] px-5 py-3 text-sm font-bold text-white hover:bg-[#8B0000]/80 transition shadow-sm"
            >
              {showAddUserForm ? "Close Form" : "Add User"}
            </button>
          </div>
        </div>

        {showAddUserForm && (
          <form onSubmit={handleAddUser} className={`rounded-2xl p-4 space-y-4 transition-colors duration-300 ${darkMode ? 'border border-white/10 bg-[#15131f]/90 shadow-xl shadow-black/10' : 'border border-gray-200 bg-gray-50 shadow-sm'}`}>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className={`mb-1 block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 ${darkMode
                    ? 'border border-white/10 bg-[#1b1728] text-white placeholder-white/40'
                    : 'border border-gray-300 bg-white text-[#080616] placeholder-gray-400'
                    }`}
                  required
                />
              </div>
              <div>
                <label className={`mb-1 block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>UBmail</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="name@ub.edu.ph"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 ${darkMode
                    ? 'border border-white/10 bg-[#1b1728] text-white placeholder-white/40'
                    : 'border border-gray-300 bg-white text-[#080616] placeholder-gray-400'
                    }`}
                  required
                />
              </div>

              <div>
                <label className={`mb-1 block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, role: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 ${darkMode
                    ? 'border border-white/10 bg-[#1b1728] text-white'
                    : 'border border-gray-300 bg-white text-[#080616]'
                    }`}
                >
                  <option value="Student" className={darkMode ? "bg-[#1b1728] text-white" : "bg-white text-[#080616]"}>Student</option>
                  <option value="Professor" className={darkMode ? "bg-[#1b1728] text-white" : "bg-white text-[#080616]"}>Professor</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:w-48">
                <label className={`mb-1 block text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Created</label>
                <input
                  type="date"
                  value={newUserForm.created}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, created: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 ${darkMode
                    ? 'border border-white/10 bg-[#1b1728] text-white [color-scheme:dark]'
                    : 'border border-gray-300 bg-white text-[#080616]'
                    }`}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[#8B0000] px-5 py-3 text-sm font-bold text-white hover:bg-[#8B0000]/80 transition shadow-sm"
              >
                Save User
              </button>
            </div>
          </form>
        )}
        {confirmRequest && (
          <div className={`rounded-2xl border px-4 py-4 text-sm shadow-sm animate-in fade-in duration-200 ${darkMode
            ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
            : 'border-amber-200 bg-amber-50 text-amber-900'
            }`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full font-bold shrink-0 ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'
                }`}>
                <span>!</span>
              </div>
              <div className="flex-1">
                <p className={`font-bold ${darkMode ? 'text-amber-100' : 'text-amber-950'}`}>
                  {confirmRequest.action === 'delete'
                    ? 'Confirm Deletion'
                    : confirmRequest.action === 'reactivate'
                      ? 'Confirm Reactivation'
                      : 'Confirm Deactivation'}
                </p>
                <p className={`mt-1 text-xs ${darkMode ? 'text-amber-300/80' : 'text-amber-800'}`}>
                  Are you sure you want to <span className="font-bold underline">{confirmRequest.action}</span> user{" "}
                  <span className={`font-bold px-1.5 py-0.5 rounded ${darkMode ? 'text-white bg-amber-500/20' : 'text-black bg-amber-200/60'
                    }`}>{targetedUserName}</span>?{" "}
                  {confirmRequest.action === 'delete'
                    ? 'This action removes the account permanently.'
                    : confirmRequest.action === 'reactivate'
                      ? 'This restores their dashboard access.'
                      : 'This blocks their dashboard access.'}
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
                className={`inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-bold transition shadow-sm ${darkMode
                  ? 'border-white/10 bg-[#1b1728] text-white hover:bg-white/5'
                  : 'border-amber-200 bg-white text-amber-900 hover:bg-amber-100'
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {screenNotice && (
          <div className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm animate-in fade-in duration-200 ${darkMode
            ? 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400'
            : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}>
            {screenNotice.text}
          </div>
        )}
        <div className={`overflow-x-auto rounded-xl border ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
          <table className={`min-w-full text-left text-sm transition-colors duration-300 ${darkMode ? 'divide-y divide-white/10' : 'divide-y divide-gray-200'}`}>
            <thead className={`${darkMode ? 'bg-[#1d1a2b]' : 'bg-gray-100'}`}>
              <tr>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>User</th>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>Role</th>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>UBmail</th>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>Created</th>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>Status</th>
                <th className={`px-4 py-3 font-semibold ${darkMode ? 'text-white/80' : 'text-slate-700'}`}>Actions</th>
              </tr>
            </thead>

            <tbody className={`divide-y transition-colors duration-300 ${darkMode ? 'divide-white/10 bg-[#15131f]' : 'divide-gray-200 bg-white'}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group">
                  <td className={`px-4 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-[#080616]'}`}>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm">
                        {user.name ? user.name : user.email.split("@")[0].split(".").join(" ")}
                      </span>
                      <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>ID: {user.id}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-sm ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>{user.role}</td>
                  <td className={`px-4 py-4 text-sm ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>{user.email}</td>
                  <td className={`px-4 py-4 text-sm ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>{user.created}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.canEnter
                      ? darkMode
                        ? "bg-green-500/10 text-green-400"
                        : "bg-green-100 text-green-700"
                      : darkMode
                        ? "bg-red-500/10 text-red-400"
                        : "bg-red-100 text-red-700"
                      }`}>
                      {user.canEnter ? "Active" : "Blocked"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right relative">
                    <button
                      onClick={() => handleToggleMenu(user.id)}
                      className={`inline-flex items-center justify-center p-2 rounded-full transition cursor-pointer ${darkMode ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-[#8B0000]'}`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {actionMenuOpenId === user.id && (
                      <div className={`absolute right-4 top-10 z-20 w-40 rounded-xl shadow-xl text-sm transition-colors duration-300 ${darkMode ? 'border border-white/10 bg-[#17141f] text-white' : 'border border-gray-200 bg-white text-[#080616]'}`}>
                        {user.canEnter ? (
                          <button
                            onClick={() => handleDeactivate(user.id)}
                            className={`w-full px-4 py-3 text-left transition ${darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-gray-100'}`}
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(user.id)}
                            className={`w-full px-4 py-3 text-left transition ${darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-gray-100'}`}
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className={`w-full px-4 py-3 text-left transition rounded-b-xl ${darkMode ? 'text-red-400 hover:bg-white/5' : 'text-red-600 hover:bg-gray-100'}`}
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
                  <td colSpan="6" className={`px-4 py-8 text-center text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
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

function SettingsPage({ darkMode, setSection }) {
  const [activeTab, setActiveTab] = useState('general');
  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === id ? 'bg-[#8B0000] text-white shadow-md' : darkMode ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-8 min-h-[500px] overflow-hidden rounded-xl transition-colors duration-300 ${darkMode ? 'bg-[#17141f] border border-white/10 shadow-xl shadow-black/20' : 'bg-white rounded-xl shadow-xl border border-gray-100'}`}>

        {/* SIDEBAR NAVIGATION */}
        <div className={`w-full md:w-64 p-4 transition-colors duration-300 ${darkMode ? 'border-r border-white/10 bg-[#1a1728]/80' : 'border-r border-gray-100 bg-gray-50/50'}`}>
          <div className="space-y-1">
            {/* Main General Tab */}
            <TabButton
              id="general"
              icon={Palette}
              label="General"
              isActive={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />

            {/* Nested Account Tab under General */}
            <div className="pl-4">
              <TabButton
                id="account"
                icon={User}
                label="Account"
                isActive={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
              />
            </div>

            {/* Nested Notification Tab under General */}
            <div className="pl-4">
              <TabButton
                id="notification"
                icon={Bell}
                label="Notification"
                isActive={activeTab === 'notification'}
                onClick={() => setActiveTab('notification')}
              />
            </div>

            {/* Nested Help Center Tab under General */}
            <div className="pl-4">
              <TabButton
                id="help"
                icon={HelpCircle}
                label="Help Center"
                isActive={activeTab === 'help'}
                onClick={() => setActiveTab('help')}
              />
            </div>

            {/* System Tab */}
            <TabButton
              id="workflow"
              icon={FileVideo}
              label="System"
              isActive={activeTab === 'workflow'}
              onClick={() => setActiveTab('workflow')}
            />
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-6">

          {/* Placeholder for General Tab Content */}
          {activeTab === 'general' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>General Settings</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Manage your overall preferences here.</p>

              <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
            </div>
          )}

          {/* Placeholder for Account Tab Content */}
          {activeTab === 'account' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Account Settings</h2>
              <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Manage your profile, email, and security details.</p>

              <hr className={`my-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

              {/* Security Access Section is now nested inside the 'account' block */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Security Access</h3>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button className="mt-2 px-4 py-2 bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-medium rounded-md transition-colors text-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for Notification Tab Content */}

          {activeTab === 'notification' && (
            <div>
              {/* Header */}
              <div className="mb-6">
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Notification Settings
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Manage your notification preferences and monitor recent account activity here.
                </p>
              </div>

              <hr className={`my-6 ${darkMode ? 'border-white/10' : 'border-gray-200'}`} />

              {/* Notification Preferences Section */}
              <div className="max-w-3xl mb-8">
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {/* Preference 1 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${darkMode
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-slate-50 border-gray-200 hover:bg-slate-100/70'
                    }`}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 mt-1 rounded text-[#8B0000] focus:ring-[#8B0000] border-gray-300"
                    />
                    <div>
                      <span className={`block text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Email Alerts
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                        Receive an email summary of major account modifications and general system updates.
                      </span>
                    </div>
                  </label>

                  {/* Preference 2 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${darkMode
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-slate-50 border-gray-200 hover:bg-slate-100/70'
                    }`}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 mt-1 rounded text-[#8B0000] focus:ring-[#8B0000] border-gray-300"
                    />
                    <div>
                      <span className={`block text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Push Notifications
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                        Get instant, real-time desktop notifications about user logs and system changes.
                      </span>
                    </div>
                  </label>

                  {/* Preference 3 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${darkMode
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-slate-50 border-gray-200 hover:bg-slate-100/70'
                    }`}>
                    <input
                      type="checkbox"
                      defaultChecked
                      disabled
                      className="w-4 h-4 mt-1 rounded text-[#8B0000] focus:ring-[#8B0000] border-gray-300 cursor-not-allowed"
                    />
                    <div>
                      <span className={`block text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Critical Security Alerts (Always Enabled)
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-slate-500'}`}>
                        Get immediate security warnings regarding suspicious activities or failed authentication attempts.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for Help Center Content */}
          {activeTab === 'help' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Help Center</h2>
              <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Find guides, FAQs, and contact support.</p>
            </div>
          )}

          {/* Placeholder for System Content */}
          {activeTab === 'workflow' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>System Settings</h2>
              <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Configure background configurations and system logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}