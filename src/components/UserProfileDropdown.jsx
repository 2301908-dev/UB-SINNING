import { useState, useEffect, useRef } from "react";
import {
  User,
  Settings,
  Image,
  Clock,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserProfileDropdown({ onOpenSettings }) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  // Mock user data - replace with actual user context/data
  const user = {
    name: "Alex Rivera",
    studentId: "2024-12345",
    directorLevel: "Senior Auteur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
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

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement theme switching logic
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#8B0000] hover:border-opacity-70 transition-all hover:shadow-md focus:outline-none"
        aria-label="Open user profile menu"
        aria-expanded={isOpen}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu - Glassmorphism Effect */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-72 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl animate-fade-in-up z-50 overflow-hidden">
          {/* Header - User Identity */}
          <div className="px-5 py-4 border-b border-white/20 bg-gradient-to-r from-[#8B0000]/5 to-transparent">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-[#8B0000]"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-600">{user.studentId}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#8B0000] text-white text-xs font-semibold rounded">
                  {user.directorLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Tools */}
          <div className="px-3 py-3 border-b border-white/20">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">
              Tools
            </p>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-900 hover:bg-[#8B0000]/10 transition group">
              <Settings className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Edit Profile</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            <button 
              onClick={() => {
                setIsOpen(false);
                onOpenSettings?.();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-900 hover:bg-[#8B0000]/10 transition group">
              <Settings className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Account Settings</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-900 hover:bg-[#8B0000]/10 transition group">
              <Image className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">My Portfolio</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>
          </div>

          {/* Utility Tools */}
          <div className="px-3 py-3 border-b border-white/20">
            <p className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">
              Utilities
            </p>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-900 hover:bg-[#8B0000]/10 transition group">
              <Clock className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Upload History</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-900 hover:bg-[#8B0000]/10 transition group"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              ) : (
                <Moon className="w-4 h-4 text-[#8B0000] group-hover:scale-110 transition" />
              )}
              <span className="flex-1 text-left">
                {isDarkMode ? "Official Light" : "Cinematic Dark"}
              </span>
              <span className="text-xs text-gray-500">
                {isDarkMode ? "Dark" : "Light"}
              </span>
            </button>
          </div>

          {/* Exit - Logout Button */}
          <div className="px-3 py-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#8B0000] hover:bg-[#8B0000]/10 transition group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition" />
              <span className="flex-1 text-left">Logout</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
            </button>
          </div>

          {/* Subtle Footer */}
          <div className="px-3 py-2 border-t border-white/20 bg-slate-50/50">
            <p className="text-xs text-gray-500 text-center">
              UB Sining • Director Platform
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
