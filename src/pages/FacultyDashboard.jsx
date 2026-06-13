import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import bryanPhoto from "../assets/teampics/bryan.png";
import { mockFilms } from "../data/mockFilms";
import CategoryRow from "../components/student/CategoryRow";
import {
  Search, LogOut, CheckCircle, XCircle, Play, Eye,
  TrendingUp, UserPlus, Film as FilmIcon, Star, StarHalf, UserCircle, MoreVertical,
  Palette, User, HelpCircle, ClipboardList, GraduationCap,
  Users, BookOpen, ChevronRight, ChevronDown, Trash2,
} from "lucide-react";

const ICON_SETTING = "/src/assets/icons/FacultyIcons/settingFaculty.png";
const ICON_NOTIFICATION = "/src/assets/icons/FacultyIcons/notificationFaculty.png";

const mockPendingFilms = [
  { id: 1, title: "Liwanag sa Dilim", student: "Maria Santos", date: "2026-05-15", duration: "12:34", status: "Pending", url: "/liwanag.mp4" },
  { id: 2, title: "Habang Buhay", student: "Juan dela Cruz", date: "2026-05-14", duration: "8:22", status: "Under Review", url: "/liwanag.mp4" },
  { id: 3, title: "Sa Aking Puso", student: "Ana Reyes", date: "2026-05-13", duration: "15:10", status: "Pending", url: "/liwanag.mp4" },
  { id: 4, title: "Pagbabalik", student: "Carlos Mendoza", date: "2026-05-12", duration: "6:45", status: "Pending", url: "/liwanag.mp4" },
];

const mockStudents = [
  { id: 1, name: "Tristan Mirano", studentNo: "2301495", course: "BS Multimedia Arts", section: "3-2" },
  { id: 2, name: "Vin Perez", studentNo: "2301945", course: "BS Multimedia Arts", section: "3-2" },
  { id: 3, name: "John Ashley Alday", studentNo: "2301924", course: "BS Multimedia Arts", section: "3-1" },
  { id: 4, name: "JM Policarpio", studentNo: "2301923", course: "BS Multimedia Arts", section: "3-2" },
];

const mockAllFilms = [
  ...mockPendingFilms,
  { id: 5, title: "Bagong Umaga", student: "Lea Fernandez", date: "2026-05-10", duration: "10:05", status: "Approved", url: "/liwanag.mp4" },
  { id: 6, title: "Hanap-buhay", student: "Maria Santos", date: "2026-05-08", duration: "7:18", status: "Approved", url: "/liwanag.mp4" },
  { id: 7, title: "Lupa at Langit", student: "Juan dela Cruz", date: "2026-05-05", duration: "9:55", status: "Rejected", url: "/liwanag.mp4" },
];

const mockNotifications = [
  { id: 1, text: "Tristan Mirano Requested a Film Approval", time: "2h ago" },
  { id: 2, text: "Maria Santos Requested a Film Approval", time: "4h ago" },
  { id: 3, text: "Juan dela Cruz Requested a Film Approval", time: "6h ago" },
  { id: 4, text: "Ana Reyes Requested a Film Approval", time: "1d ago" },
  { id: 5, text: "Carlos Mendoza Requested a Film Approval", time: "2d ago" },
];

const THUMBNAIL_COLORS = ["#5C1A1A", "#1A3A5C", "#1A5C2E", "#4A1A5C", "#5C4A1A", "#1A5C5C", "#5C3A1A"];

function StatusBadge({ status }) {
  const styles = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Under Review": "bg-blue-100 text-blue-800",
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${checked ? "bg-[#8B0000]" : "bg-gray-300"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function ConfirmModal({ title, message, confirmLabel, confirmClass, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm space-y-5 text-center">
        <h2 className="text-xl font-bold text-[#8B0000]">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#8B0000] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-lg text-sm font-medium text-white transition cursor-pointer ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>  
  );
}

const tabs = [
  { id: "overview",   label: "Overview" },
  { id: "workspace",  label: "Student Films" },
  { id: "filmReview", label: "Film Review" },
  { id: "students",   label: "Student Class" },
];

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const profName = "Bry";

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openSettings = () => {
    setShowProfile(false);
    setSection("settings");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      {/* Navbar */}
      <nav className="bg-white text-slate-900 flex flex-col gap-6 px-4 py-6 border-b border-gray-200 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <UBLogo titleClass="text-[#8B0000]" subtitleClass="text-gray-500" />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`text-sm font-medium pb-1 transition cursor-pointer ${
                section === tab.id
                  ? "text-[#8B0000] border-b-2 border-[#8B0000]"
                  : "text-black hover:text-[#8B0000]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + Notifications + Profile */}
        <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          <div className="relative w-full sm:w-44">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-gray-100 pl-9 pr-3 py-2 rounded-lg border border-gray-300 w-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setShowNotifications((v) => !v)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                <img src={ICON_NOTIFICATION} alt="Notifications" className="w-4 h-4 object-contain" />
                {mockNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8B0000] text-white text-[9px] flex items-center justify-center font-semibold">
                    {mockNotifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-xl shadow-lg border border-slate-200 bg-white p-3 z-50">
                  <h3 className="text-sm font-semibold mb-2 text-[#8B0000]">Notifications</h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-lg border border-slate-100 hover:border-[#8B0000]/30 transition">
                        <p className="text-sm text-slate-700">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowProfile((v) => !v)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#8B0000] cursor-pointer"
              >
                <img src={bryanPhoto} alt="Profile" className="w-full h-full object-cover" />
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-lg border border-slate-200 bg-white p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Welcome, {profName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || ""}</p>
                  </div>
                  <button
                    onClick={openSettings}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <img src={ICON_SETTING} alt="" className="w-4 h-4 object-contain opacity-60" /> Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8B0000] hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="px-4 py-10 sm:px-6 lg:px-10">
        {section === "overview" && <OverviewSection profName={profName} />}
        {section === "filmReview" && <FilmReviewSection />}
        {section === "students" && <StudentsSection />}
        {section === "workspace" && <WorkspaceSection />}
        {section === "settings" && <SettingsSection logout={logout} />}
      </main>
    </div>
  );
}

/* ── Bar Chart ── */
const CHART_DATA = [
  { month: "Jan", value: 3 },
  { month: "Feb", value: 5 },
  { month: "Mar", value: 4 },
  { month: "Apr", value: 8 },
  { month: "May", value: 12 },
  { month: "Jun", value: 7 },
  { month: "Jul", value: 9 },
  { month: "Aug", value: 6 },
  { month: "Sep", value: 10 },
  { month: "Oct", value: 5 },
];
const CHART_MAX = Math.max(...CHART_DATA.map((d) => d.value));
const Y_LABELS = [12, 9, 6, 3, 0];

function BarChart() {
  return (
    <div className="flex gap-3">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between pb-6 text-right shrink-0">
        {Y_LABELS.map((v) => (
          <span key={v} className="text-[11px] text-slate-400 leading-none">{v}</span>
        ))}
      </div>

      {/* Chart area */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Grid lines + bars */}
        <div className="relative flex-1" style={{ height: 160 }}>
          {/* Horizontal grid lines */}
          {Y_LABELS.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-slate-100"
              style={{ top: `${(i / (Y_LABELS.length - 1)) * 100}%` }}
            />
          ))}
          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-1.5 px-0.5">
            {CHART_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex items-end">
                <div
                  className="w-full bg-slate-800 rounded-sm hover:bg-[#8B0000] transition-colors cursor-pointer"
                  style={{ height: `${(d.value / CHART_MAX) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex gap-1.5 px-0.5">
          {CHART_DATA.map((d) => (
            <div key={d.month} className="flex-1 text-center">
              <span className="text-[11px] text-slate-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Overview ── */
function OverviewSection({ profName }) {
  const stats = [
    { label: "Pending Reviews",    value: 3,  delta: "+1 from last week",    Icon: ClipboardList },
    { label: "Approved Films",     value: 34, delta: "+3 from last week",    Icon: CheckCircle   },
    { label: "Active Submissions", value: 12, delta: "+2 from last week",    Icon: TrendingUp    },
    { label: "Total Students",     value: 4,  delta: "+0 from last week",    Icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <s.Icon className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
            </div>
            <p className="text-2xl font-bold text-[#8B0000]">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Bar chart — left */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-800">Overview</h2>
            <p className="text-xs text-slate-400 mt-0.5">Film submissions this year</p>
          </div>
          <BarChart />
        </div>

        {/* Info cards — right */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4 flex-1">
            <div className="p-2.5 bg-red-50 rounded-lg shrink-0">
              <Eye className="w-5 h-5 text-[#8B0000]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Most Viewed Film</p>
              <p className="text-base font-bold text-slate-800 mt-1">Liwanag sa Dilim</p>
              <p className="text-xs text-slate-400 mt-0.5">1,248 views</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4 flex-1">
            <div className="p-2.5 bg-red-50 rounded-lg shrink-0">
              <Star className="w-5 h-5 text-[#8B0000]" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Best Genre</p>
              <p className="text-base font-bold text-slate-800 mt-1">Short Film</p>
              <p className="text-xs text-slate-400 mt-0.5">Top category this semester</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-800">Pending Films</h2>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{mockPendingFilms.length} films</span>
        </div>
        <div className="space-y-3">
          {mockPendingFilms.map((film, idx) => (
            <div key={film.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition">
              <div
                className="w-16 h-10 rounded-lg shrink-0 flex items-center justify-center"
                style={{ background: THUMBNAIL_COLORS[idx % THUMBNAIL_COLORS.length] }}
              >
                <FilmIcon className="w-4 h-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-slate-700">{film.title}</p>
                <p className="text-xs text-slate-400">{film.student} · {film.date} · {film.duration}</p>
              </div>
              <StatusBadge status={film.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Film Review ── */
function FilmReviewSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [confirm, setConfirm] = useState(null);
  const filters = ["All", "Pending", "Approved", "Rejected"];

  const filtered = activeFilter === "All"
    ? mockAllFilms
    : mockAllFilms.filter((f) => f.status === activeFilter || (activeFilter === "Pending" && f.status === "Under Review"));

  const handleWatch = (film) => {
    if (film.url) window.open(film.url, "_blank");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#8B0000]">Film Review</h1>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${activeFilter === f ? "bg-[#8B0000] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#8B0000]"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.map((film, idx) => (
          <div key={film.id} className={`flex items-center gap-4 p-4 ${idx !== filtered.length - 1 ? "border-b border-slate-100" : ""} hover:bg-slate-50 transition`}>
            <div
              className="w-20 h-12 rounded-lg shrink-0 flex items-center justify-center"
              style={{ background: THUMBNAIL_COLORS[idx % THUMBNAIL_COLORS.length] }}
            >
              <FilmIcon className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-700">{film.title}</p>
              <p className="text-xs text-slate-400">{film.student} · {film.date} · {film.duration}</p>
            </div>
            <StatusBadge status={film.status} />
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleWatch(film)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition cursor-pointer"
              >
                <Play className="w-3 h-3" /> Watch
              </button>
              <button
                onClick={() => setConfirm({ type: "approve", film })}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition cursor-pointer"
              >
                <CheckCircle className="w-3 h-3" /> Approve
              </button>
              <button
                onClick={() => setConfirm({ type: "reject", film })}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition cursor-pointer"
              >
                <XCircle className="w-3 h-3" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {confirm && (
        <ConfirmModal
          title={confirm.type === "approve" ? "Accept Film?" : "Reject Film?"}
          message={
            confirm.type === "approve"
              ? `Are you sure you want to approve "${confirm.film.title}"?`
              : `Are you sure you want to reject "${confirm.film.title}"?`
          }
          confirmLabel={confirm.type === "approve" ? "Accept" : "Reject"}
          confirmClass={confirm.type === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          onConfirm={() => setConfirm(null)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

/* ── Custom Dropdown ── */
function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between gap-3 min-w-[160px] bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium shadow-sm hover:border-slate-300 transition cursor-pointer"
      >
        <span>{options.find((o) => o.value === value)?.label ?? value}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 min-w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-30">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition cursor-pointer ${
                opt.value === value
                  ? "bg-slate-100 text-slate-900 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Students ── */
function InitialsAvatar({ name }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const hue = (name.charCodeAt(0) * 37 + (name.charCodeAt(1) || 0) * 17) % 360;
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm"
      style={{ background: `hsl(${hue}, 55%, 40%)` }}
    >
      {initials}
    </div>
  );
}

function StudentsSection() {
  const [students, setStudents] = useState(mockStudents);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", studentNo: "", course: "", section: "" });
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [confirmRemove, setConfirmRemove] = useState(null);

  const sections = ["All", ...Array.from(new Set(students.map((s) => s.section))).sort()];

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q) || s.studentNo.includes(q) || s.course.toLowerCase().includes(q);
    const matchSection = sectionFilter === "All" || s.section === sectionFilter;
    return matchSearch && matchSection;
  });

  const handleRemove = () => {
    setStudents((prev) => prev.filter((s) => s.id !== confirmRemove.id));
    setConfirmRemove(null);
  };

  const handleAddStudent = () => {
    if (!newStudent.name.trim()) return;
    setStudents((prev) => [...prev, { ...newStudent, id: Date.now() }]);
    setNewStudent({ name: "", studentNo: "", course: "", section: "" });
    setShowModal(false);
  };

  const sec31 = students.filter((s) => s.section === "3-1").length;
  const sec32 = students.filter((s) => s.section === "3-2").length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#8B0000]">Class List</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Students", value: students.length, Icon: Users,     iconBg: "bg-red-50",    iconColor: "text-[#8B0000]" },
          { label: "Section 3-1",    value: sec31,           Icon: BookOpen,  iconBg: "bg-blue-50",   iconColor: "text-blue-600"  },
          { label: "Section 3-2",    value: sec32,           Icon: BookOpen,  iconBg: "bg-violet-50", iconColor: "text-violet-600"},
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <div className={`p-2 rounded-xl ${s.iconBg}`}>
                <s.Icon className={`w-4 h-4 ${s.iconColor}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">enrolled students</p>
          </div>
        ))}
      </div>

      {/* Search + filter + add */}
      <div className="flex items-center justify-between gap-3">
        {/* Search — left */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, or course..."
            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
          />
        </div>

        {/* Section dropdown + Add Student — fixed far right */}
        <div className="flex items-center gap-3">
          <Dropdown
            value={sectionFilter}
            onChange={setSectionFilter}
            options={sections.map((s) => ({ value: s, label: s === "All" ? "All Sections" : `Section ${s}` }))}
          />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#8B0000] text-white rounded-xl text-sm font-semibold hover:bg-[#6b0000] transition cursor-pointer shadow-md shrink-0"
          >
            <UserPlus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Student ID</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Course</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Section</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr
                key={student.id}
                className={`${idx !== filtered.length - 1 ? "border-b border-slate-100" : ""} hover:bg-slate-50 transition`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={student.name} />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{student.name}</p>
                      <p className="text-xs text-slate-400 truncate">{student.studentNo}@student.ub.edu.ph</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{student.studentNo}</td>
                <td className="px-5 py-4 text-slate-500 text-sm">{student.course}</td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                    {student.section}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#8B0000] hover:underline cursor-pointer">
                      View <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmRemove(student)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center">
                  <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm font-medium">No students found</p>
                  <p className="text-slate-300 text-xs mt-1">Try adjusting your search or filter</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmRemove && (
        <ConfirmModal
          title="Remove Student?"
          message={`Are you sure you want to remove ${confirmRemove.name} from your class?`}
          confirmLabel="Remove"
          confirmClass="bg-red-600 hover:bg-red-700"
          onConfirm={handleRemove}
          onCancel={() => setConfirmRemove(null)}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-xl">
                <UserPlus className="w-5 h-5 text-[#8B0000]" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Add New Student</h2>
            </div>
            {[
              { key: "name",      label: "Full Name",      placeholder: "Enter full name" },
              { key: "studentNo", label: "Student Number", placeholder: "Enter student number" },
              { key: "course",    label: "Course",         placeholder: "Enter course" },
              { key: "section",   label: "Section",        placeholder: "Enter section" },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{field.label}</label>
                <input
                  type="text"
                  value={newStudent[field.key]}
                  onChange={(e) => setNewStudent({ ...newStudent, [field.key]: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-[#8B0000] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="flex-1 py-2.5 bg-[#8B0000] text-white rounded-xl text-sm font-semibold hover:bg-[#6b0000] transition cursor-pointer"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Workspace ── */
function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`f${i}`} className="w-4 h-4 text-[#FFD700]" fill="currentColor" />
      ))}
      {hasHalf && <StarHalf key="half" className="w-4 h-4 text-[#FFD700]" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`e${i}`} className="w-4 h-4 text-gray-400" />
      ))}
    </div>
  );
}

function WorkspaceSection() {
  const featured = mockFilms[0];

  return (
    <div className="space-y-8">
      {/* Cinematic hero */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl shadow-xl">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
        >
          <source src="/liwanag.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 h-full flex items-center px-8 sm:px-10">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex px-3 py-1 bg-[#8B0000] text-xs text-white rounded-lg">
              Top 10 – Highlight Film
            </span>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">{featured.title}</h1>
            <p className="text-gray-300 text-sm drop-shadow-md">{featured.creator} · 2026 · Student Film</p>
            <div className="flex items-center gap-3 text-gray-200">
              {renderRatingStars(featured.rating)}
              <span className="text-sm">{featured.rating.toFixed(1)} / 5</span>
            </div>
            <p className="text-gray-200 text-sm max-w-xl drop-shadow-lg">{featured.description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 cursor-pointer shadow-sm">
                Play Now
              </button>
              <button className="bg-[#8B0000] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6b0000] cursor-pointer shadow-sm">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Film rows */}
      <div className="space-y-6">
        <CategoryRow title="Recommended For You" films={mockFilms} />
        <CategoryRow title="Trending Now" films={mockFilms} />
        <CategoryRow title="Top Rated" films={mockFilms} />
      </div>
    </div>
  );
}

/* ── Settings ── */
function SettingsSection({ logout }) {
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

        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 p-4 border-r border-gray-100 bg-gray-50/50">
          <div className="space-y-1">
            <TabButton id="general" icon={Palette} label="General" />
            <div className="pl-4">
              <TabButton id="account" icon={User} label="Account" />
            </div>
            <div className="pl-4">
              <TabButton id="help" icon={HelpCircle} label="Help Center" />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-6">
          {activeTab === 'general' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">General Settings</h2>
              <p className="text-gray-600 text-sm">Manage your overall preferences here.</p>
            </div>
          )}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h2>
              <p className="text-gray-600 text-sm">Manage your profile, email, and security details.</p>
            </div>
          )}
          {activeTab === 'help' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Help Center</h2>
              <p className="text-gray-600 text-sm">Find guides, FAQs, and contact support.</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 pb-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-medium hover:bg-[#6b0000] transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
