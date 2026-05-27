import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import bryanPhoto from "../assets/teampics/bryan.png";
import {
  Search, ArrowRight, LogOut, CheckCircle, XCircle, Play, Eye,
  TrendingUp, UserPlus, Film as FilmIcon, Star, UserCircle, MoreVertical,
  Palette, User, HelpCircle,
} from "lucide-react";

const ICON_DASHBOARD = "/src/assets/icons/FacultyIcons/dashboardFaculty.png";
const ICON_FILM = "/src/assets/icons/FacultyIcons/filmFaculty.png";
const ICON_USER = "/src/assets/icons/FacultyIcons/userFaculty.png";
const ICON_SETTING = "/src/assets/icons/FacultyIcons/settingFaculty.png";
const ICON_NOTIFICATION = "/src/assets/icons/FacultyIcons/notificationFaculty.png";
const ICON_VIDEO = "/src/assets/icons/FacultyIcons/videoFaculty.png";

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

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: ICON_DASHBOARD },
    { id: "filmReview", label: "Films", icon: ICON_FILM },
    { id: "students", label: "Students", icon: ICON_USER },
    { id: "workspace", label: "Review Workspace", icon: ICON_VIDEO },
  ];

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
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside className="relative bg-[#8B0000] p-4 rounded-r-lg flex flex-col justify-between w-52 shadow-xl z-20">
        <div className="space-y-3">
          <div className="-ml-2">
            <UBLogo hideSubtitle titleClass="text-white" size={64} />
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-2 w-full p-2 rounded-lg transition justify-start ${section === item.id ? "bg-white text-[#8B0000]" : "text-[#E8EDF2] hover:bg-white/20"}`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-5 h-5 shrink-0 object-contain"
                  style={section === item.id ? { filter: "brightness(0)" } : { filter: "brightness(0) invert(1)" }}
                />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              aria-label="Search films and students"
              placeholder="Search films, students..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
            <button
              type="button"
              aria-label="Submit search"
              className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-[#8B0000] transition hover:text-[#6e0000]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
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
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {section === "overview" && <OverviewSection profName={profName} />}
          {section === "filmReview" && <FilmReviewSection />}
          {section === "students" && <StudentsSection />}
          {section === "workspace" && <WorkspaceSection />}
          {section === "settings" && <SettingsSection logout={logout} />}
        </main>
      </div>
    </div>
  );
}

/* ── Overview ── */
function OverviewSection({ profName }) {
  const stats = [
    { label: "Pending Reviews", value: 3 },
    { label: "Approved Films", value: 34 },
    { label: "Active Submissions", value: 12 },
    { label: "Total Students", value: 4 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Welcome, {profName}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-[#8B0000]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <Eye className="w-6 h-6 text-[#8B0000]" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Most Viewed Film</p>
            <p className="text-xl font-bold text-slate-800 mt-1">Liwanag sa Dilim</p>
            <p className="text-xs text-slate-400 mt-1">1,248 views</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <Star className="w-6 h-6 text-[#8B0000]" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Best Genre</p>
            <p className="text-xl font-bold text-slate-800 mt-1">Short Film</p>
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

/* ── Students ── */
function StudentsSection() {
  const [students, setStudents] = useState(mockStudents);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", studentNo: "", course: "", section: "" });
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.studentNo.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q) ||
      s.section.toLowerCase().includes(q)
    );
  });

  const handleRemove = () => {
    setStudents((prev) => prev.filter((s) => s.id !== confirmRemove.id));
    setConfirmRemove(null);
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#8B0000]">Student Management</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearchQuery(searchInput)}
          placeholder="Search by name, student number, course, or section..."
          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
        />
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="w-10 px-3 py-3"></th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Number</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Section</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr key={student.id} className={`${idx !== filtered.length - 1 ? "border-b border-slate-100" : ""} hover:bg-slate-50 transition`}>
                <td className="px-3 py-3 relative" ref={openMenuId === student.id ? menuRef : null}>
                  <button
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === student.id ? null : student.id)}
                    className="p-1 rounded hover:bg-slate-100 cursor-pointer"
                    aria-label="Row options"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  {openMenuId === student.id && (
                    <div className="absolute left-2 top-10 z-20 min-w-[140px] bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setConfirmRemove(student)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <UserCircle className="w-5 h-5 text-slate-400" />
                    </div>
                    <span className="font-medium text-slate-700">{student.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-500">{student.studentNo}</td>
                <td className="px-5 py-3 text-slate-500">{student.course}</td>
                <td className="px-5 py-3 text-slate-500">{student.section}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-400 text-sm">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmRemove && (
        <ConfirmModal
          title="Remove Student?"
          message={`Are you sure you want to remove ${confirmRemove.name}?`}
          confirmLabel="Remove"
          confirmClass="bg-red-600 hover:bg-red-700"
          onConfirm={handleRemove}
          onCancel={() => setConfirmRemove(null)}
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5">
            <h2 className="text-xl font-bold text-[#8B0000]">Add New Student</h2>
            {[
              { key: "name", label: "Full Name" },
              { key: "studentNo", label: "Student Number" },
              { key: "course", label: "Course" },
              { key: "section", label: "Section" },
            ].map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  value={newStudent[field.key]}
                  onChange={(e) => setNewStudent({ ...newStudent, [field.key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#8B0000] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition cursor-pointer"
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
function WorkspaceSection() {
  const featuredFilms = [
    { title: "Liwanag sa Dilim", genre: "Drama", rating: 4.8, color: "#5C1A1A" },
    { title: "Bagong Umaga", genre: "Documentary", rating: 4.6, color: "#1A3A5C" },
    { title: "Sa Aming Lahi", genre: "Short Film", rating: 4.9, color: "#1A5C2E" },
    { title: "Habang Buhay", genre: "Romance", rating: 4.5, color: "#4A1A5C" },
  ];

  const topRated = [
    { title: "Sa Aming Lahi", student: "Class 3A Ensemble", genre: "Short Film", rating: 4.9, color: "#1A5C2E" },
    { title: "Liwanag sa Dilim", student: "Maria Santos", genre: "Drama", rating: 4.8, color: "#5C1A1A" },
    { title: "Bagong Umaga", student: "Lea Fernandez", genre: "Documentary", rating: 4.6, color: "#1A3A5C" },
    { title: "Pagbabalik", student: "Carlos Mendoza", genre: "Short Film", rating: 4.4, color: "#4A1A5C" },
  ];

  const recommended = [
    { title: "Habang Buhay", student: "Juan dela Cruz", genre: "Romance", rating: 4.5, color: "#4A1A5C" },
    { title: "Hanap-buhay", student: "Maria Santos", genre: "Drama", rating: 4.3, color: "#5C4A1A" },
    { title: "Lupa at Langit", student: "Juan dela Cruz", genre: "Drama", rating: 4.2, color: "#1A5C5C" },
    { title: "Sa Aking Puso", student: "Ana Reyes", genre: "Romance", rating: 4.1, color: "#5C3A1A" },
  ];

  return (
    <div className="space-y-10">
      <div className="relative rounded-2xl overflow-hidden h-72 bg-gradient-to-br from-[#5C1A1A] to-[#8B0000]">
        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 to-transparent">
          <span className="inline-flex w-fit px-3 py-1 bg-[#8B0000] text-xs text-white rounded-lg">
            Top 10 – Highlight Film
          </span>
          <h1 className="text-4xl font-bold text-white mt-3">Liwanag sa Dilim</h1>
          <p className="text-gray-200 text-sm mt-1">Maria Santos · 2026 · Student Film</p>
          <div className="flex items-center gap-2 mt-2 text-yellow-300 text-sm">
            <Star className="w-4 h-4" fill="currentColor" />
            <span>4.8 / 5</span>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 cursor-pointer">
              <Play className="w-4 h-4" /> Play Now
            </button>
            <button className="bg-[#8B0000] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#6b0000] cursor-pointer">
              More Info
            </button>
          </div>
        </div>
      </div>

      <FilmRow title="Top Rated" films={topRated} />
      <FilmRow title="Trending Now" films={featuredFilms} />
      <FilmRow title="Recommended For You" films={recommended} />
    </div>
  );
}

function FilmRow({ title, films }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#8B0000] mb-4">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {films.map((film) => (
          <div
            key={film.title}
            className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
            style={{ background: film.color, height: 200 }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">{film.genre}</span>
              <p className="text-white font-bold text-sm">{film.title}</p>
              {film.student && <p className="text-white/70 text-xs mt-0.5">{film.student}</p>}
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-300">{film.rating}</span>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
              <Play className="w-10 h-10 text-white" />
            </div>
          </div>
        ))}
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
