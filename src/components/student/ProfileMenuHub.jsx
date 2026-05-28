import { useState, useEffect, useRef } from "react";
import {
  User,
  Settings,
  HelpCircle,
  Globe,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenuHub({ onOpenSettings, onOpenHelp }) {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const dropdownRef = useRef(null);

  // Mock user data
  const userData = {
    name: user?.email?.split("@")[0] || "Director",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "default"}`,
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (action, callback) => {
    setIsOpen(false);
    if (callback) callback();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#8B0000] hover:border-[#D4AF37] transition-colors hover:shadow-md focus:outline-none"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-64 rounded-xl bg-white shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade-in-up">
          {/* Header - User Identity */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-10 h-10 rounded-full border border-[#8B0000]"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {userData.name}
                </h3>
                <p className="text-xs text-gray-600 truncate">{user?.email || "student@ub.edu.ph"}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 px-1">
            {/* My Profile */}
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-gray-100 transition group">
              <User className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">My Profile</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            {/* Settings */}
            <button
              onClick={() => handleMenuClick("settings", onOpenSettings)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-gray-100 transition group"
            >
              <Settings className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Settings Workspace</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            {/* Help & Support */}
            <button
              onClick={() => handleMenuClick("help", onOpenHelp)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-900 hover:bg-gray-100 transition group"
            >
              <HelpCircle className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Help & Support</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            {/* Language Preference */}
            <div className="px-3 py-2">
              <button className="w-full flex items-center gap-3 rounded-lg text-sm text-slate-900 hover:bg-gray-100 transition group">
                <Globe className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
                <span className="flex-1 text-left">Language</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-transparent border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="en">English</option>
                  <option value="fil">Filipino</option>
                </select>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Logout */}
          <div className="py-2 px-1">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-[#8B0000] hover:bg-red-50 transition group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
