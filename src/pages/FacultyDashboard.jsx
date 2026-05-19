import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import backgroundImage from "../assets/white_bg.jpg";
import {
  Search, LogOut, CheckCircle, XCircle, Play, Eye,
  TrendingUp, UserPlus, Film as FilmIcon, Star,
} from "lucide-react";

const ICON_DASHBOARD = "/src/assets/icons/FacultyIcons/dashboardFaculty.png";
const ICON_FILM = "/src/assets/icons/FacultyIcons/filmFaculty.png";
const ICON_USER = "/src/assets/icons/FacultyIcons/userFaculty.png";
const ICON_SETTING = "/src/assets/icons/FacultyIcons/settingFaculty.png";
const ICON_NOTIFICATION = "/src/assets/icons/FacultyIcons/notificationFaculty.png";

const mockPendingFilms = [
  { id: 1, title: "Liwanag sa Dilim", student: "Maria Santos", date: "2026-05-15", duration: "12:34", status: "Pending", url: "/liwanag.mp4" },
  { id: 2, title: "Habang Buhay", student: "Juan dela Cruz", date: "2026-05-14", duration: "8:22", status: "Under Review", url: "/liwanag.mp4" },
  { id: 3, title: "Sa Aking Puso", student: "Ana Reyes", date: "2026-05-13", duration: "15:10", status: "Pending", url: "/liwanag.mp4" },
  { id: 4, title: "Pagbabalik", student: "Carlos Mendoza", date: "2026-05-12", duration: "6:45", status: "Pending", url: "/liwanag.mp4" },
];

const mockStudents = [
  { id: 1, name: "Maria Santos", course: "BS Film", section: "3A", films: 3 },
  { id: 2, name: "Juan dela Cruz", course: "BS Multimedia Arts", section: "2B", films: 5 },
  { id: 3, name: "Ana Reyes", course: "BS Film", section: "3A", films: 2 },
  { id: 4, name: "Carlos Mendoza", course: "BS Broadcasting", section: "4C", films: 1 },
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-[#8B0000]" : "bg-gray-300"}`}
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
            className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#8B0000] transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 rounded-lg text-sm font-medium text-white transition ${confirmClass}`}
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
    { id: "workspace", label: "Review Workspace", icon: ICON_FILM },
  ];

  const profName = user?.email ? user.email.split("@")[0] : "Professor";

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
    <div
      className="flex min-h-screen text-[#080616]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sidebar (fixed width, no animation) */}
      <aside className="w-56 bg-[#8B0000] p-4 rounded-r-lg flex flex-col gap-6 z-20">
        <div className="px-1 py-2">
          <UBLogo size={64} hideSubtitle titleSizeClass="text-2xl" />
        </div>

        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg ${section === item.id ? "bg-white text-[#8B0000]" : "text-[#E8EDF2] hover:bg-white/20"}`}
            >
              <img src={item.icon} alt="" className="w-4 h-4 shrink-0 object-contain" />
              <span className="whitespace-nowrap text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search films, students..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setShowNotifications((v) => !v)}
                className="relative flex items-center"
              >
                <img src={ICON_NOTIFICATION} alt="Notifications" className="w-6 h-6 object-contain" />
                {mockNotifications.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#8B0000] text-white text-[10px] flex items-center justify-center font-semibold">
                    {mockNotifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 rounded-xl shadow-xl border border-gray-200 bg-white p-3 z-50">
                  <h3 className="text-sm font-semibold mb-2 text-[#8B0000]">Notifications</h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-lg border border-gray-100 hover:border-[#8B0000]/40 transition">
                        <p className="text-sm text-gray-700">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
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
                className="w-9 h-9 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-sm font-semibold uppercase"
              >
                {profName.slice(0, 2)}
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl border border-gray-200 bg-white p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Prof. {profName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                  </div>
                  <button
                    onClick={openSettings}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <img src={ICON_SETTING} alt="" className="w-4 h-4 object-contain" /> Settings
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8B0000] hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
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
    { label: "Pending Reviews", value: 8 },
    { label: "Approved Films", value: 34 },
    { label: "Active Submissions", value: 12 },
    { label: "Total Students", value: 47 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Welcome, Prof. {profName}</h1>

      {/* Quick Stats — all same red background */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-red-50 border border-red-100 rounded-xl p-5 space-y-2">
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            <p className="text-4xl font-bold text-red-600">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Most Viewed Film + Best Genre */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <Eye className="w-6 h-6 text-[#8B0000]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Most Viewed Film</p>
            <p className="text-xl font-bold text-gray-800 mt-1">Liwanag sa Dilim</p>
            <p className="text-xs text-gray-500 mt-1">1,248 views</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <Star className="w-6 h-6 text-[#8B0000]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Best Genre</p>
            <p className="text-xl font-bold text-gray-800 mt-1">Short Film</p>
            <p className="text-xs text-gray-500 mt-1">Top-rated category this semester</p>
          </div>
        </div>
      </div>

      {/* Pending Review Queue */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#8B0000]">Pending Review Queue</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{mockPendingFilms.length} films</span>
        </div>
        <div className="space-y-3">
          {mockPendingFilms.map((film, idx) => (
            <div key={film.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:border-[#8B0000]/20 hover:bg-gray-50 transition">
              <div
                className="w-16 h-10 rounded-lg shrink-0 flex items-center justify-center"
                style={{ background: THUMBNAIL_COLORS[idx % THUMBNAIL_COLORS.length] }}
              >
                <FilmIcon className="w-4 h-4 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{film.title}</p>
                <p className="text-xs text-gray-500">{film.student} · {film.date} · {film.duration}</p>
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
  const [confirm, setConfirm] = useState(null); // { type: 'approve'|'reject', film }
  const filters = ["All", "Pending", "Approved", "Rejected"];

  const filtered = activeFilter === "All"
    ? mockAllFilms
    : mockAllFilms.filter((f) => f.status === activeFilter || (activeFilter === "Pending" && f.status === "Under Review"));

  const handleWatch = (film) => {
    if (film.url) window.open(film.url, "_blank");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#8B0000]">Film Review & Approval</h1>
        <p className="text-gray-500 mt-1">Review and approve student film submissions.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === f ? "bg-[#8B0000] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#8B0000]"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Film list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.map((film, idx) => (
          <div key={film.id} className={`flex items-center gap-4 p-4 ${idx !== filtered.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition`}>
            <div
              className="w-20 h-12 rounded-lg shrink-0 flex items-center justify-center"
              style={{ background: THUMBNAIL_COLORS[idx % THUMBNAIL_COLORS.length] }}
            >
              <FilmIcon className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{film.title}</p>
              <p className="text-xs text-gray-500">{film.student} · {film.date} · {film.duration}</p>
            </div>
            <StatusBadge status={film.status} />
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleWatch(film)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition"
              >
                <Play className="w-3 h-3" /> Watch
              </button>
              <button
                onClick={() => setConfirm({ type: "approve", film })}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition"
              >
                <CheckCircle className="w-3 h-3" /> Approve
              </button>
              <button
                onClick={() => setConfirm({ type: "reject", film })}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition"
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
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", course: "", section: "" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#8B0000]">Student Management</h1>
          <p className="text-gray-500 mt-1">Manage your enrolled students and track their submissions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition"
        >
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <img src={ICON_FILM} alt="" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="font-semibold text-sm">{student.name}</p>
                <p className="text-xs text-gray-500">{student.course} · Section {student.section}</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <FilmIcon className="w-4 h-4" />
                <span>{student.films} films</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5">
            <h2 className="text-xl font-bold text-[#8B0000]">Add New Student</h2>
            {[
              { key: "name", label: "Fullname" },
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
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#8B0000] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition"
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

/* ── Workspace (like Student Dashboard home) ── */
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
      {/* Hero */}
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
            <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
              <Play className="w-4 h-4" /> Play Now
            </button>
            <button className="bg-[#8B0000] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#6b0000]">
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

/* ── Settings (accessed via profile dropdown) ── */
function SettingsSection({ logout }) {
  const [notifToggles, setNotifToggles] = useState({
    newSubmission: true, revisionRequest: true, studentMessage: false,
    approvalNotif: true, deadlineReminder: true, emailNotif: true,
  });
  const [securityToggles, setSecurityToggles] = useState({ twoFactor: false });

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#8B0000]">Settings</h1>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#8B0000]">Account</h2>
        {[
          { label: "Full Name", placeholder: "Prof. Faculty Name", type: "text" },
          { label: "Email Address", placeholder: "faculty@ub.edu.ph", type: "email" },
          { label: "Phone Number", placeholder: "+63 9XX XXX XXXX", type: "tel" },
        ].map((f) => (
          <div key={f.label} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#8B0000]">Notifications</h2>
        {[
          { key: "newSubmission", label: "New Submission Alerts" },
          { key: "revisionRequest", label: "Revision Request Alerts" },
          { key: "studentMessage", label: "Student Message Notifications" },
          { key: "approvalNotif", label: "Approval Notifications" },
          { key: "deadlineReminder", label: "Deadline Reminders" },
          { key: "emailNotif", label: "Email Notifications" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-700">{item.label}</span>
            <Toggle
              checked={notifToggles[item.key]}
              onChange={(val) => setNotifToggles({ ...notifToggles, [item.key]: val })}
            />
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#8B0000]">Security</h2>
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Change Password</p>
          {["Current Password", "New Password", "Confirm New Password"].map((ph) => (
            <input key={ph} type="password" placeholder={ph} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]" />
          ))}
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition">Update Password</button>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
            <p className="text-xs text-gray-400">Add an extra layer of security</p>
          </div>
          <Toggle checked={securityToggles.twoFactor} onChange={(val) => setSecurityToggles({ ...securityToggles, twoFactor: val })} />
        </div>
      </section>

      <div className="pb-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-medium hover:bg-[#6b0000] transition"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
