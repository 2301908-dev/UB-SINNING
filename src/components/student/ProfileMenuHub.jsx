import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  User,
  Settings,
  HelpCircle,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenuHub({ onOpenSettings, onOpenHelp }) {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const userData = {
    name: user?.email?.split("@")[0] || "Director",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "default"}`,
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (callback) => {
    setIsOpen(false);
    callback?.();
  };

  const openSettingsWorkspace = (tab = "profile") => {
    window.location.assign(`/student/settings-workspace?tab=${tab}`);
  };

  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 12,
      right: Math.max(window.innerWidth - rect.right, 16),
    });
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((current) => !current)}
        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:shadow-md focus:outline-none"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <img src={userData.avatar} alt={userData.name} className="h-full w-full object-cover" />
      </button>

      {isOpen && createPortal(
        <div
          className="fixed z-[9999] w-72 overflow-hidden rounded-[28px] border border-white/10 bg-[#171315] text-white shadow-[0_30px_120px_rgba(0,0,0,0.45)] animate-fade-in-up"
          style={{ top: menuPosition.top, right: menuPosition.right }}
        >
          <div className="border-b border-white/10 bg-white/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="h-11 w-11 rounded-full border border-[#D4AF37]/30"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-white">{userData.name}</h3>
                <p className="truncate text-xs text-white/55">{user?.email || "student@ub.edu.ph"}</p>
              </div>
            </div>
          </div>

          <div className="px-2 py-2">
            <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/10">
              <User className="h-4 w-4 text-[#D4AF37] transition group-hover:scale-110" />
              <span className="flex-1 text-left">My Profile</span>
              <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>

            <button
              onClick={() => handleMenuClick(() => openSettingsWorkspace("profile"))}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              <Settings className="h-4 w-4 text-[#D4AF37] transition group-hover:scale-110" />
              <span className="flex-1 text-left">Settings Workspace</span>
              <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>

            <button
              onClick={() => handleMenuClick(onOpenHelp)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/10"
            >
              <HelpCircle className="h-4 w-4 text-[#D4AF37] transition group-hover:scale-110" />
              <span className="flex-1 text-left">Help & Support</span>
              <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>

            <div className="px-3 py-2">
              <div className="flex items-center gap-3 rounded-xl px-0 py-2.5 text-sm text-white/85">
                <Globe className="h-4 w-4 text-[#D4AF37] transition group-hover:scale-110" />
                <span className="flex-1 text-left">Language</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#120d0e] px-2 py-1 text-xs text-white outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="en">English</option>
                  <option value="fil">Filipino</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="px-2 py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#D4AF37] transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 transition group-hover:scale-110" />
              <span className="flex-1 text-left">Log Out</span>
              <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>
          </div>

          <div className="border-t border-white/10 bg-white/5 px-3 py-2">
            <p className="text-center text-xs text-white/45">UB Sining • Director Platform</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
