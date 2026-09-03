
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import GeneralSettings from "./GeneralSettings";
import { mockFilms } from "../data/mockFilms";
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
  Edit2
} from "lucide-react";

{/*list of users for the user management section*/ }
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
    MiddleName: "M.",
    lastName: "Pagcaliwagan",
    email: "admin@ub.edu.ph",
    address: "M.H. Del Pilar St.",
    avatar: "src/assets/teampics/brent.jpg"
  });

  const [editForm, setEditForm] = useState({ ...adminData });

  useEffect(() => {
    setEditForm({ ...adminData });
  }, [adminData]);
  const handleSave = () => {
    setAdminData(editForm);
    setIsEditing(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    setProfileDropdownOpen(false);
    logout();
  };

  const { logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [prevSection, setPrevSection] = useState("overview");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState({ label: "English (US)", code: "EN" });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const isDark = true;
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
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
    setPrevSection(section);
    setSection(newSection);
  };

  return (
    <div
      className="flex min-h-screen bg-[#0f0e17] text-[#E8EDF2]"
    >

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Header */}
        <header className={`h-20 flex items-center justify-between px-8 border-b backdrop-blur-md z-30 transition-colors duration-300 ${isDark ? 'bg-[#1e1b29]/80 border-white/10' : 'bg-white/70 border-gray-200'}`}>

          {/* Logo */}
          <div className="flex items-center gap-4">
            <UBLogo
              size={90}
              titleClass={isDark && "text-[#D4AF37] "}
              titleSizeClass="text-xl"
              titleWeightClass="font-bold"
              subtitleClass={isDark && "text-gray-300"}
              subtitleSizeClass="text-xs"
              subtitleWeightClass="font-normal"
            />
          </div>

          <div className="flex items-center gap-4">

            {/* Notification Trigger Wrapper */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2.5 rounded-lg transition shadow-lg relative transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer group ${isDark
                  ? 'bg-white/8 text-white border border-[#D4AF37]/20 hover:bg-white/12 hover:border-[#D4AF37]/40'
                  : 'bg-white/10 text-slate-900 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Bell className="w-4 h-4 group-hover:text-[#D4AF37] transition" />
                {/*Notification dot indicator*/}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF0000] rounded-full ring-2 ring-[#FF0000]/40 animate-pulse"></span>
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className={`absolute right-0 mt-3 w-80 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${isDark ? 'bg-[#15131f]/98 text-[#E8EDF2] ring-1 ring-[#D4AF37]/20 backdrop-blur-xl' : 'bg-white text-[#080616] ring-1 ring-black/5'
                  }`}>

                  {/* Header */}
                  <div className={`px-4 py-3 flex justify-between items-center ${isDark ? 'border-b border-[#D4AF37]/10 bg-[#1a1728]/60' : 'border-b border-gray-100 bg-gray-50/50'
                    }`}>
                    <p className={`text-xs font-extrabold uppercase tracking-widest ${isDark ? 'text-[#D4AF37]' : 'text-[#FF0000]'}`}>
                      Notifications
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-red-100/10 text-red-300' : 'bg-red-100 text-[#8B0000]'
                      }`}>
                      4 New
                    </span>
                  </div>

                  {/* Notification Items List Container */}
                  <div className={`max-h-80 overflow-y-auto divide-y no-scrollbar ${isDark ? 'divide-white/10' : 'divide-gray-100'
                    }`}>

                    {/* Item 1 */}
                    <div className={`p-4 transition cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        New system registration request
                      </p>
                      <p className={`text-[12px] mt-0.5 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                        John Doe created a Student account.
                      </p>
                      <span className={`block text-[11px] mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                        Today at 11:49 AM
                      </span>
                    </div>

                    {/* Item 2 */}
                    <div className={`p-4 transition cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        We just added a new appearance update to your settings!
                      </p>
                      <p className={`text-[12px] mt-0.5 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                        Toggle it on to give your eyes a break.
                      </p>
                    </div>

                    {/* Sub Section Header Block - Formatted for list consistency */}
                    <div className={`px-4 py-2 bg-opacity-50 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <h3 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                        Recent Activity & Security Alerts
                      </h3>
                    </div>

                    <div className={`p-4 transition cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/90' : 'text-slate-800'}`}>
                          Successful Login
                        </span>
                      </div>
                      <p className={`text-[12px] mt-1 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                        Your account was successfully accessed from a verified device.
                      </p>
                      <span className={`block text-[11px] mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                        Today at 11:35 AM
                      </span>
                    </div>

                    {/* Item 3 */}
                    <div className={`p-4 transition cursor-pointer ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                          Security Alert
                        </span>
                      </div>

                      {/* Removed line-clamp-2 here so the full text renders */}
                      <p className={`text-[12px] mt-1 ${isDark ? 'text-white/80' : 'text-slate-600'}`}>
                        Multiple failed login attempts detected on your account. Access has been temporarily restricted for your safety.
                      </p>

                      <span className={`block text-[11px] mt-2 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
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
                {/*Language Selection*/}
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    if (profileDropdownOpen) setLanguageMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-full transition-colors duration-200 group cursor-pointer hover:bg-white/10"
                >
                  <div className="relative">
                    <img
                      src={adminData.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover:border-white/60 transition-all"
                    />
                  </div>
                </button>

                {/* Admin Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-3 w-56 rounded-xl overflow-visible cursor-pointer transition-all shadow-2xl ${isDark ? 'bg-[#15131f]/98 text-[#E8EDF2] ring-1 ring-[#D4AF37]/20 backdrop-blur-xl' : 'bg-white text-[#080616] ring-1 ring-black/5'}`}>

                    <div className={`px-5 py-4 rounded-t-xl ${isDark ? 'border-b border-[#D4AF37]/10 bg-[#1a1728]/60' : 'border-b border-gray-100 bg-gray-50/50'}`}>
                      <p className={`text-sm font-bold tracking-tight ${isDark && 'text-[#D4AF37]'}`}>{adminData.firstName} {adminData.lastName}</p>
                      <p className={`text-xs truncate ${isDark && 'text-white/60'}`}>{adminData.email}</p>
                    </div>

                    <div className="py-1 relative">

                      {/* Edit Profile Option */}
                      <button
                        onClick={() => {
                          navigateTo("edit-profile");
                          setProfileDropdownOpen(false);
                          setLanguageMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition text-white/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] font-medium"
                      >
                        <User className="w-4 h-4 transition-colors text-[#D4AF37]/70" />
                        <span>My Profile</span>
                      </button>

                      {/* Language Selector Option */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLanguageMenuOpen(!languageMenuOpen);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm transition text-white/80 hover:bg-white/5 hover:text-[#FFFFFF]"
                        >
                          <Globe className="w-4 h-4 text-white/50" />
                          <span className="font-medium">Language</span>
                          <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/90 font-bold border border-white/10">
                            {language.code}
                          </span>
                        </button>

                        {languageMenuOpen && (
                          <div className="absolute right-full top-0 mr-2 w-48 rounded-xl border border-[#D4AF37]/20 bg-[#15131f]/98 shadow-2xl py-1 animate-in slide-in-from-right-2 duration-150 z-50 backdrop-blur-xl">
                            {[
                              { label: "English (US)", code: "EN" },
                              { label: "Filipino", code: "TL" },
                            ].map((option) => {
                              const isSelected = language.code === option.code;
                              return (
                                <button
                                  key={option.code}
                                  onClick={() => {
                                    setLanguage(option);
                                    setLanguageMenuOpen(false);
                                  }}
                                  className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-sm transition hover:bg-[#D4AF37]/10 ${isSelected ? "text-[#D4AF37] font-bold bg-[#D4AF37]/5" : "text-white/80 hover:text-[#D4AF37]"
                                    }`}
                                >
                                  <span className="flex items-center gap-2">
                                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                                    {option.label}
                                  </span>
                                  <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${isSelected
                                      ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30"
                                      : "bg-white/5 text-white/50 border-white/10"
                                      }`}
                                  >
                                    {option.code}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Settings Option */}
                      <button
                        onClick={() => { setSection("settings"); setProfileDropdownOpen(false); setLanguageMenuOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition font-medium ${isDark
                          ? 'text-white/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-[#FF0000]'
                          }`}
                      >
                        <Settings className={`w-4 h-4 transition-colors ${isDark ? 'text-[#D4AF37]/70' : 'text-gray-500'}`} />
                        <span>Settings</span>
                      </button>

                      {/* Help Center Option */}
                      <button
                        className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm transition font-medium ${isDark
                          && 'text-white/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                          }`}
                      >
                        <HelpCircle className={`w-4 h-4 transition-colors ${isDark && 'text-[#D4AF37]/70'}`} />
                        <span>Help Center</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>

                      {/* Confirmation Logout Notice */}
                      {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                          <div className="w-full max-w-xs sm:max-w-sm rounded-xl bg-white p-5 shadow-xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              Confirm Logout
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                              Are you sure you want to end your current session?
                            </p>

                            {/* Stacked Full-Width Buttons Layout */}
                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
                              <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-center"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={handleConfirmLogout}
                                className="w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 transition shadow-sm text-center"
                              >
                                Yes, Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Section Content Viewport */}
        <main className="flex-1 p-8 overflow-y-auto text-white bg-gradient-to-br from-[#0d0c15] via-[#0f0e17]/50 to-[#0d0c15]">
          <div className="animate-in fade-in duration-500">

            {/* DYNAMIC SECTION RENDERING */}
            <div className="animate-in fade-in duration-500">
              {section !== "edit-profile" && (
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-4xl font-black bg-gradient-to-r from-[#D4AF37] to-[#EAB308] bg-clip-text text-transparent">
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
                        ? "bg-[#D4AF37] text-[#080616] shadow-sm border border-[#D4AF37]"
                        : "bg-white/10 text-[#E8EDF2] border border-white/10 hover:bg-white/20";

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

              {section === "overview" && <AdminOverview isDark={isDark} navigateTo={navigateTo} />}
              {section === "content" && <AllContent isDark={isDark} />}
              {section === "users" && <UserManagement isDark={isDark} />}
              {section === "settings" && (
                <SettingsPage isDark={isDark} setSection={setSection} />
              )}
            </div>

            {/* Edit Profile Form View */}
            {section === "edit-profile" && (
              <div className="max-w-3xl mx-auto animate-in fade-in-50 duration-300 text-left">
                <div
                  className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ${isDark
                    ? "bg-[#181524]/90 border-white/10 text-white"
                    : "bg-white/95 border-slate-200/80 text-slate-900 shadow-slate-200/50"
                    }`}
                >

                  {/* Header Bar */}
                  <div
                    className={`relative z-10 flex flex-wrap justify-between items-center gap-4 border-b pb-5 mb-6 ${isDark ? "border-white/10" : "border-slate-100"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => setSection("overview")}
                        className={`p-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${isDark
                          ? "bg-white/5 hover:bg-white/10 border border-white/10 text-white shadow-inner"
                          : "bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-800"
                          }`}
                        aria-label="Go back"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                          My Profile
                        </h2>
                        <p
                          className={`text-xs sm:text-sm ${isDark ? "text-white/60" : "text-slate-500"
                            }`}
                        >
                          View and update your personal account information.
                        </p>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080616] shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-200 active:scale-95"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {/* Profile Header Banner */}
                  <div
                    className={`relative z-10 flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 rounded-2xl border transition-all duration-300 ${isDark
                      ? "bg-gradient-to-r from-white/[0.04] to-white/[0.01] border-white/10"
                      : "bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200/80 shadow-sm"
                      }`}
                  >
                    {/* Avatar Uploader Wrapper */}
                    <div className="relative group shrink-0">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-[#F59E0B] shadow-xl">
                        <img
                          src={isEditing ? editForm.avatar : adminData.avatar}
                          alt="User Avatar"
                          className="w-full h-full rounded-full object-cover bg-slate-800"
                        />
                      </div>

                      {/* Active Status Indicator */}

                      {isEditing && (
                        <label className="absolute inset-1 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 text-white">
                          <Upload className="w-5 h-5 mb-1 animate-bounce" />
                          <span className="text-[10px] font-extrabold uppercase tracking-widest">
                            Upload
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const localUrl = URL.createObjectURL(file);
                                setEditForm((prev) => ({ ...prev, avatar: localUrl }));
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>

                    {/* User Identity Details */}
                    <div className="text-center sm:text-left space-y-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">

                        <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[#48A111]/10 text-[#48A111] border border-[#48A111]/20 dark:bg-[#48A111]/20 dark:text-[#48A111]">
                          Admin
                        </span>
                      </div>

                      <p
                        className={`text-xs font-medium ${isDark ? "text-white/60" : "text-slate-500"
                          }`}
                      >
                        UB-SINING Administrator
                      </p>

                      <p
                        className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"
                          }`}
                      >
                        Manage your personal profile and account credentials.
                      </p>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-white/70" : "text-slate-600"
                          }`}
                      >
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          value={editForm.firstName || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, firstName: e.target.value }))
                          }
                          className={`w-full rounded-2xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-[#8B0000]/50 ${isDark
                            ? "bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:border-[#8B0000]"
                            : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#8B0000]"
                            }`}
                        />
                      ) : (
                        <div
                          className={`text-sm rounded-2xl px-4 py-3 font-semibold transition-all ${isDark
                            ? "bg-white/[0.03] border border-white/5 text-white/90"
                            : "bg-slate-50/80 border border-slate-200/70 text-slate-800"
                            }`}
                        >
                          {adminData.firstName || "—"}
                        </div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-white/70" : "text-slate-600"
                          }`}
                      >
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          value={editForm.lastName || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, lastName: e.target.value }))
                          }
                          className={`w-full rounded-2xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-[#8B0000]/50 ${isDark
                            ? "bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:border-[#8B0000]"
                            : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#8B0000]"
                            }`}
                        />
                      ) : (
                        <div
                          className={`text-sm rounded-2xl px-4 py-3 font-semibold transition-all ${isDark
                            ? "bg-white/[0.03] border border-white/5 text-white/90"
                            : "bg-slate-50/80 border border-slate-200/70 text-slate-800"
                            }`}
                        >
                          {adminData.lastName || "—"}
                        </div>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="email"
                        className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-white/70" : "text-slate-600"
                          }`}
                      >
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          id="email"
                          type="email"
                          placeholder="name@domain.com"
                          value={editForm.email || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className={`w-full rounded-2xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-[#8B0000]/50 ${isDark
                            ? "bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:border-[#8B0000]"
                            : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#8B0000]"
                            }`}
                        />
                      ) : (
                        <div
                          className={`text-sm rounded-2xl px-4 py-3 font-semibold transition-all ${isDark
                            ? "bg-white/[0.03] border border-white/5 text-white/90"
                            : "bg-slate-50/80 border border-slate-200/70 text-slate-800"
                            }`}
                        >
                          {adminData.email || "—"}
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="address"
                        className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-white/70" : "text-slate-600"
                          }`}
                      >
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          id="address"
                          type="text"
                          placeholder="Enter complete address"
                          value={editForm.address || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, address: e.target.value }))
                          }
                          className={`w-full rounded-2xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200 focus:ring-2 focus:ring-[#8B0000]/50 ${isDark
                            ? "bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:border-[#8B0000]"
                            : "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#8B0000]"
                            }`}
                        />
                      ) : (
                        <div
                          className={`text-sm rounded-2xl px-4 py-3 font-semibold transition-all ${isDark
                            ? "bg-white/[0.03] border border-white/5 text-white/90"
                            : "bg-slate-50/80 border border-slate-200/70 text-slate-800"
                            }`}
                        >
                          {adminData.address || "—"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  {isEditing && (
                    <div
                      className={`relative z-10 flex justify-end gap-3 mt-8 pt-5 border-t transition-colors duration-200 ${isDark ? "border-white/10" : "border-slate-100"
                        }`}
                    >
                      <button
                        onClick={() => {
                          setEditForm({ ...adminData });
                          setIsEditing(false);
                        }}
                        className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all duration-200 active:scale-95 ${isDark
                          ? "bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white"
                          : "bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700"
                          }`}
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 text-xs font-medium rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#080616] shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-200 active:scale-95"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------ SUB-PAGES (INTEGRATED) ------------------ */
function KPI({ title, value, change, iconSrc, isDark, titleClassName = "" }) {
  return (
    <div className={`rounded-2xl p-7 border transition-all duration-300 ease-in-out hover:-translate-y-2 cursor-pointer group ${isDark ? 'bg-gradient-to-br from-[#1a1728]/60 to-[#15131f]/40 border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/20' : 'bg-white rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-xl'}`}>

      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 backdrop-blur-sm flex items-center justify-center p-2.5 shadow-lg border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition">
        <img
          src={iconSrc}
          alt={`${title} icon`}
          className={`w-full h-full object-contain transition duration-300 ${isDark ? "invert brightness-200" : ""}`}
        />
      </div>

      <p className={`text-sm font-semibold tracking-wide mt-3 ${titleClassName || (isDark ? "text-white/70" : "text-gray-600")}`}>
        {title}
      </p>

      <p className={`text-4xl font-black mt-2 ${isDark ? "text-white" : "text-[#080616]"}`}>
        {value}
      </p>

      <p className="text-green-500/80 text-xs font-bold tracking-widest mt-2 uppercase">{change}</p>
    </div>
  );
}

function AdminOverview({ isDark, navigateTo }) {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">


        <button
          type="button"
          onClick={() => navigateTo("overview")}
          className="text-left"
        >
          <KPI
            title="Total Uploads"
            value="38"
            change="+12 this Month"
            iconSrc={TotalUploadsIcon}
            isDark={isDark}
          />
        </button>

        <button
          type="button"
          onClick={() => navigateTo("overview")}
          className="text-left"
        >
          <KPI
            title="Pending Review"
            value="12"
            change="+3 this week"
            iconSrc={PendingReviewsIcon}
            isDark={isDark}
          />
        </button>

        <KPI
          title="Total Views"
          value="9,600"
          change="+8 this day"
          iconSrc={ActiveUsersIcon}
          isDark={isDark}
        />

        <KPI
          title="Total Users"
          value="4.7k"
          change="+4 This Month"
          iconSrc={AvgRatingIcon}
          isDark={isDark}
        />
      </div>

      {/* Total Views Analytics */}
      <div
        className={`backdrop-blur-md p-7 rounded-2xl shadow-2xl border transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer ${isDark
          && "bg-gradient-to-br from-[#1a1728]/60 to-[#15131f]/40 border-[#D4AF37]/20 text-white hover:border-[#D4AF37]/40 shadow-[#D4AF37]/10"
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#EAB308] bg-clip-text text-transparent">Total Views Analytics</h2>
            <p className={`font-sans text-sm ${isDark ? "text-white/70" : "text-gray-500"} mt-1`}>
              Track presentation audience engagement cycles
            </p>
          </div>

          <div className="flex p-1.5 rounded-lg border self-start sm:self-auto bg-[#15131f]/50 border-[#D4AF37]/20 backdrop-blur-sm">
            {[
              { id: "days", label: "Days" },
              { id: "week", label: "Weeks" },
              { id: "month", label: "Months" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition duration-300 ${timeframe === tab.id
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#EAB308] text-[#080616] shadow-lg shadow-[#D4AF37]/30 font-black"
                  : "text-white/70 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-stretch gap-4">
          <div className={`flex flex-col justify-between text-right text-[11px] font-bold w-12 pr-1 pb-8 pt-4 ${isDark ? "text-white/50" : "text-gray-400"}`}>
            {yAxisTicks[timeframe].map((tick, i) => (
              <span key={i}>{tick}</span>
            ))}
          </div>

          <div className="relative h-64 flex-1 flex items-end gap-2 px-1 pt-4 border-b border-l border-white/10">
            {/*Horizontal Grid Lines*/}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-dashed border-white w-full" />
              <div className="border-b border-dashed border-white w-full" />
              <div className="border-b border-dashed border-white w-full" />
              <div className="border-b border-dashed border-white w-full" />
            </div>

            {graphData[timeframe].map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group min-w-0 z-10">

                {/*Floating Value Badge*/}
                <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 px-2 py-0.5 rounded shadow-lg border pointer-events-none mb-1 bg-[#1e1b29] text-[#EAB308] border-[#D4AF37]/30 transform -translate-y-1 group-hover:translate-y-0">
                  {data.value.toLocaleString()}
                </span>

                {/*Bar Element*/}
                <div
                  className={`w-full max-w-[30px] rounded-t-lg bg-gradient-to-t from-[#D4AF37]/80 via-[#D4AF37]/60 to-[#EAB308] transition-all duration-300 ease-out group-hover:brightness-125 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] ${data.height}`}
                ></div>

                {/*Label*/}
                <span className="text-xs font-semibold mt-2 pb-1 block text-center truncate w-full text-white/60 group-hover:text-white transition-colors">
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

function AllContent({ isDark }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);

  const filteredFilms = mockFilms.filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    film.creator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Styled Search Input Area */}
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or creator..."
          className="w-80 h-12 max-w-md rounded-xl px-4 py-3.5 outline-none shadow-sm focus:ring-2 focus:ring-[#FFFFFF]/30 transition-all bg-[#1e1b29] border border-white/10 text-white placeholder-white/80 focus:border-[#FFFFFF]"
        />
      </div>

      {/* Modern Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            onClick={() => setSelectedFilm(film)}
            className="group flex flex-col backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-[#1e1b29]/90 border-white/10 text-white hover:border-white/20"
          >
            {/* Aspect Video Image Container */}
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
                <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-200 text-white">
                  {film.title}
                </h3>
                <p className="text-sm font-medium text-white/60">
                  by {film.creator}
                </p>
              </div>

              {/* Decorative dynamic badge & action trigger */}
              <div className="pt-2 border-t border-dashed border-gray-500/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-white/70">
                  Media
                </span>

                <span className="text-xs font-semibold text-[#D4AF37] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 hover:underline">
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILM DETAIL MODAL */}
      {selectedFilm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedFilm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl transition-all bg-[#1a1728] text-white border border-white/10"
          >
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white transition hover:bg-black/40"
            >
              X
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={selectedFilm.thumbnail}
                alt={selectedFilm.title}
                className="h-full w-full object-cover opacity-80"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-2 border-b border-gray-500/10 pb-4 text-[#D4AF37]">
              <div>
                <h2 className="text-2xl font-bold">{selectedFilm.title}</h2>
                <p className="text-sm text-white/60">
                  Created by <span className="font-semibold text-[#FFFFFF]">{selectedFilm.creator}</span>
                </p>
              </div>

              <span className="rounded-full bg-[#FFFFFF]/15 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                {selectedFilm.genre || "Student Short Film"}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#FFFFFF]/70">
                Synopsis
              </h4>

              <p className="text-sm leading-relaxed text-white/80">
                {selectedFilm.synopsis ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl p-4 text-xs font-medium bg-white/5">
              <div>
                <span className="block text-gray-400">Duration</span>
                <span>{selectedFilm.duration || "15 mins"}</span>
              </div>

              <div>
                <span className="block text-gray-400">Academic Year</span>
                <span>{selectedFilm.year || "2026"}</span>
              </div>

              <div>
                <span className="block text-gray-400">Course / Section</span>
                <span>{selectedFilm.course || "Film Production II"}</span>
              </div>

              <div>
                <span className="block text-gray-400">Rating</span>
                <span>{selectedFilm.rating || "4.9"} / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredFilms.length === 0 && (
        <div className={`text-center py-12 rounded-xl border border-dashed ${isDark ? "border-white/10 text-white/40" : "border-gray-200 text-gray-400"}`}>
          No content matches your search.
        </div>
      )}
    </div>
  );
}

function UserManagement({ isDark }) {

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
      <div className="backdrop-blur-md p-6 rounded-xl space-y-6 transition-colors duration-300 bg-[#15131f]/90 border border-white/10 shadow-xl shadow-black/20">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="flex gap-2">
              {["students", "professors"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === t
                    ? "bg-[#D4AF37] text-[#080616]"
                    : "bg-white/5 text-[#FFFFFF] hover:bg-white/10"
                    }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="w-full md:w-80">
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search by ubmail..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none border border-white/20 bg-[#1b1728] text-white placeholder-white/80 focus:ring-2 focus:ring-[#FFFFFF]/70"
              />
            </div>
          </div>

          <div className="flex items-center md:self-start">
            <button
              onClick={() => setShowAddUserForm((prev) => !prev)}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-2 text-sm font-medium text-[#080616] hover:bg-[#D4AF37]/80 transition shadow-sm"
            >
              {showAddUserForm ? "Close Form" : "Add User"}
            </button>
          </div>
        </div>

        {showAddUserForm && (
          <form onSubmit={handleAddUser} className="rounded-2xl p-4 space-y-4 transition-colors duration-300 border border-white/10 bg-[#15131f]/90 shadow-xl shadow-black/10">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#FFFFFF]/70 border border-white/20 bg-[#1b1728] text-white placeholder-white/80"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">UBmail</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="1234567@ub.edu.ph"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#FFFFFF]/70 border border-white/20 bg-[#1b1728] text-white placeholder-white/80"
                  required
                />
              </div>

              <div>
                {/*Role Selection Dropdown for adding student/professor*/}
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#FFFFFF]/70 border border-white/20 bg-[#1b1728] text-white"
                >
                  <option value="Student" className="bg-[#1b1728] text-white">Student</option>
                  <option value="Professor" className="bg-[#1b1728] text-white">Professor</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:w-48">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/80">Created</label>
                <input
                  type="date"
                  value={newUserForm.created}
                  onChange={(e) => setNewUserForm((prev) => ({ ...prev, created: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#8B0000]/20 border border-white/20 bg-[#1b1728] text-white [color-scheme:dark]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-2 text-sm font-medium text-[#080616] hover:bg-[#D4AF37]/80 transition shadow-sm"
              >
                Save User
              </button>
            </div>
          </form>
        )}

        {confirmRequest && (
          <div className="rounded-2xl border px-4 py-4 text-sm shadow-sm animate-in fade-in duration-200 border-amber-500/30 bg-amber-950/20 text-amber-200">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full font-bold shrink-0 bg-amber-500/20 text-amber-400">
                <span>!</span>
              </div>

              <div className="flex-1">
                <p className="font-bold text-amber-100">
                  {confirmRequest.action === 'delete'
                    ? 'Confirm Deletion'
                    : confirmRequest.action === 'reactivate'
                      ? 'Confirm Reactivation'
                      : 'Confirm Deactivation'}
                </p>

                <p className="mt-1 text-xs text-amber-300/80">
                  Are you sure you want to <span className="font-bold underline">{confirmRequest.action}</span> user{" "}
                  <span className="font-bold px-1.5 py-0.5 rounded text-white bg-amber-500/20">{targetedUserName}</span>?{" "}
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
                className="inline-flex items-center justify-center rounded-xl bg-[#FF0000] px-4 py-2 text-xs font-bold text-white hover:bg-[#FF0000]/80 transition shadow-sm"
              >
                Confirm Action
              </button>

              <button
                onClick={() => setConfirmRequest(null)}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-bold transition shadow-sm border-white/10 bg-[#1b1728] text-white hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {screenNotice && (
          <div className="rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm animate-in fade-in duration-200 border-emerald-500/20 bg-emerald-950/20 text-emerald-400">
            {screenNotice.text}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-left text-sm transition-colors duration-300 divide-y divide-white/10">
            <thead className="bg-[#1d1a2b]">
              <tr>
                <th className="px-4 py-3 font-semibold text-white/80">User</th>
                <th className="px-4 py-3 font-semibold text-white/80">Role</th>
                <th className="px-4 py-3 font-semibold text-white/80">UBmail</th>
                <th className="px-4 py-3 font-semibold text-white/80">Created</th>
                <th className="px-4 py-3 font-semibold text-white/80">Status</th>
                <th className="px-4 py-3 font-semibold text-white/80">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y transition-colors duration-300 divide-white/10 bg-[#15131f]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group">
                  <td className="px-4 py-4 text-sm font-medium text-white">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm">
                        {user.name ? user.name : user.email.split("@")[0].split(".").join(" ")}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-white/50">ID: {user.id}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-white/80">{user.role}</td>
                  <td className="px-4 py-4 text-sm text-white/80">{user.email}</td>
                  <td className="px-4 py-4 text-sm text-white/80">{user.created}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.canEnter
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                      }`}>
                      {user.canEnter ? "Active" : "Blocked"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right relative">
                    <button
                      onClick={() => handleToggleMenu(user.id)}
                      className="inline-flex items-center justify-center p-2 rounded-full transition cursor-pointer text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {actionMenuOpenId === user.id && (
                      <div className="absolute right-4 top-10 z-20 w-40 rounded-xl shadow-xl text-sm transition-colors duration-300 border border-white/10 bg-[#17141f] text-white">
                        {user.canEnter ? (
                          <button
                            onClick={() => handleDeactivate(user.id)}
                            className="w-full px-4 py-3 text-left transition hover:bg-white/5 text-white"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReactivate(user.id)}
                            className="w-full px-4 py-3 text-left transition hover:bg-white/5 text-white"
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-full px-4 py-3 text-left transition rounded-b-xl text-red-400 hover:bg-white/5"
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
                  <td colSpan="6" className="px-4 py-8 text-center text-sm text-white/50">
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

function SettingsPage({ isDark, setSection }) {
  const [activeTab, setActiveTab] = useState('general');
  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === id ? 'bg-[#8B0000] text-white shadow-md' : isDark ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div>
      <div className={`flex flex-col md:flex-row gap-8 min-h-[500px] overflow-hidden rounded-xl transition-colors duration-300 ${isDark ? 'bg-[#17141f] border border-white/10 shadow-xl shadow-black/20' : 'bg-white rounded-xl shadow-xl border border-gray-100'}`}>

        {/* SIDEBAR NAVIGATION */}
        <div className={`w-full md:w-64 p-4 transition-colors duration-300 ${isDark ? 'border-r border-white/10 bg-[#1a1728]/80' : 'border-r border-gray-100 bg-gray-50/50'}`}>
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

          {activeTab === 'general' && (
            <GeneralSettings />
          )}

          {/* Placeholder for Account Tab Content */}
          {activeTab === 'account' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Account Settings</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Manage your profile, email, and security details.</p>

              <hr className={`my-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

              {/* Security Access Section is now nested inside the 'account' block */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Security Access</h3>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-950'}`}
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
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Notification Settings
                </h2>

                <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  Manage your notification preferences and monitor recent account activity here.
                </p>
              </div>

              <hr className={`my-6 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />

              {/* Notification Preferences Section */}
              <div className="max-w-3xl mb-8">
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {/* Preference 1 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isDark
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-slate-50 border-gray-200 hover:bg-slate-100/70'
                    }`}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 mt-1 rounded text-[#8B0000] focus:ring-[#8B0000] border-gray-300"
                    />
                    <div>
                      <span className={`block text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Email Alerts
                      </span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                        Receive an email summary of major account modifications and general system updates.
                      </span>
                    </div>
                  </label>

                  {/* Preference 2 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isDark
                    ? 'bg-white/5 border-white/5 hover:bg-white/10'
                    : 'bg-slate-50 border-gray-200 hover:bg-slate-100/70'
                    }`}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 mt-1 rounded text-[#8B0000] focus:ring-[#8B0000] border-gray-300"
                    />
                    <div>
                      <span className={`block text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Push Notifications
                      </span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
                        Get instant, real-time desktop notifications about user logs and system changes.
                      </span>
                    </div>
                  </label>

                  {/* Preference 3 */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isDark
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
                      <span className={`block text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Critical Security Alerts (Always Enabled)
                      </span>

                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
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
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Help Center</h2>
              <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Find guides, FAQs, and contact support.</p>
            </div>
          )}

          {/* Placeholder for System Content */}
          {activeTab === 'workflow' && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>System Settings</h2>
              <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Configure background configurations and system logs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}