import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import backgroundImage from "../assets/white_bg.jpg";
import {
  LayoutDashboard, Film, Users, Monitor, BarChart3, Settings,
  Bell, Search, LogOut, CheckCircle, XCircle, Play, Eye,
  TrendingUp, Clock, ThumbsUp, MessageCircle, UserPlus, RotateCcw,
  ChevronRight, Award, Upload, Shield, Sliders, Volume2
} from "lucide-react";

const mockPendingFilms = [
  { id: 1, title: "Liwanag sa Dilim", student: "Maria Santos", date: "2026-05-15", duration: "12:34", status: "Pending", thumbnail: null },
  { id: 2, title: "Habang Buhay", student: "Juan dela Cruz", date: "2026-05-14", duration: "8:22", status: "Under Review", thumbnail: null },
  { id: 3, title: "Sa Aking Puso", student: "Ana Reyes", date: "2026-05-13", duration: "15:10", status: "Pending", thumbnail: null },
  { id: 4, title: "Pagbabalik", student: "Carlos Mendoza", date: "2026-05-12", duration: "6:45", status: "Pending", thumbnail: null },
];

const mockStudents = [
  { id: 1, name: "Maria Santos", course: "BS Film", section: "3A", films: 3, awards: 1, active: true },
  { id: 2, name: "Juan dela Cruz", course: "BS Multimedia Arts", section: "2B", films: 5, awards: 2, active: true },
  { id: 3, name: "Ana Reyes", course: "BS Film", section: "3A", films: 2, awards: 0, active: true },
  { id: 4, name: "Carlos Mendoza", course: "BS Broadcasting", section: "4C", films: 1, awards: 0, active: false },
  { id: 5, name: "Lea Fernandez", course: "BS Multimedia Arts", section: "1A", films: 0, awards: 0, active: false },
];

const mockAllFilms = [
  ...mockPendingFilms,
  { id: 5, title: "Bagong Umaga", student: "Lea Fernandez", date: "2026-05-10", duration: "10:05", status: "Approved", thumbnail: null },
  { id: 6, title: "Hanap-buhay", student: "Maria Santos", date: "2026-05-08", duration: "7:18", status: "Approved", thumbnail: null },
  { id: 7, title: "Lupa at Langit", student: "Juan dela Cruz", date: "2026-05-05", duration: "9:55", status: "Rejected", thumbnail: null },
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

export default function FacultyDashboard() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState(5);

  const sidebarItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "filmReview", label: "Film Review & Approval", icon: Film },
    { id: "students", label: "Student Management", icon: Users },
    { id: "workspace", label: "Review Workspace", icon: Monitor },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const profName = user?.email ? user.email.split("@")[0] : "Professor";

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
      {/* Sidebar */}
      <aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className={`relative bg-[#8B0000] p-4 rounded-r-lg flex flex-col gap-8 transition-all duration-300 overflow-hidden z-20 ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        <div className="overflow-hidden transition-all duration-300">
          <UBLogo />
        </div>

        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${sidebarOpen ? "justify-start" : "justify-center"} ${section === item.id ? "bg-white text-[#8B0000]" : "text-[#E8EDF2] hover:bg-white/20"}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full p-2 bg-white text-[#8B0000] rounded-lg hover:bg-[#D4AF37] hover:text-[#080616] transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="whitespace-nowrap">Logout</span>
          </button>
        )}
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
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#8B0000] transition" />
              {notifications > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#8B0000] text-white text-[10px] flex items-center justify-center font-semibold">
                  {notifications}
                </span>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-sm font-semibold uppercase">
              {profName.slice(0, 2)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {section === "overview" && <OverviewSection profName={profName} />}
          {section === "filmReview" && <FilmReviewSection />}
          {section === "students" && <StudentsSection />}
          {section === "workspace" && <WorkspaceSection />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "settings" && <SettingsSection logout={logout} />}
        </main>
      </div>
    </div>
  );
}

/* ── Overview ── */
function OverviewSection({ profName }) {
  const stats = [
    { label: "Pending Reviews", value: 8, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { label: "Approved Films", value: 34, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { label: "Active Submissions", value: 12, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Total Students", value: 47, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  ];

  const notifications = [
    { id: 1, text: "Maria Santos submitted a new film: Liwanag sa Dilim", time: "2h ago" },
    { id: 2, text: "Juan dela Cruz requested revision feedback", time: "4h ago" },
    { id: 3, text: "Ana Reyes resubmitted Sa Aking Puso after revisions", time: "1d ago" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Welcome, Prof. {profName}</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-5 space-y-2`}>
            <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Review Queue */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                  <Film className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{film.title}</p>
                  <p className="text-xs text-gray-500">{film.student} · {film.date} · {film.duration}</p>
                </div>
                <StatusBadge status={film.status} />
                <div className="flex gap-2 shrink-0">
                  <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Watch">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition" title="Approve">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col: Notifications + Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#8B0000] mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#8B0000] shrink-0 mt-1.5" />
                  <div>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-[#8B0000] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-[#8B0000] text-white rounded-lg text-sm font-medium hover:bg-[#6b0000] transition">
                <Eye className="w-4 h-4" /> Review All Pending
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-[#8B0000] hover:text-[#8B0000] transition">
                <Upload className="w-4 h-4" /> Export Report
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-[#8B0000] hover:text-[#8B0000] transition">
                <MessageCircle className="w-4 h-4" /> Send Announcement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Film Review ── */
function FilmReviewSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Pending", "Approved", "Rejected"];

  const filtered = activeFilter === "All"
    ? mockAllFilms
    : mockAllFilms.filter((f) => f.status === activeFilter || (activeFilter === "Pending" && f.status === "Under Review"));

  const features = [
    { icon: Film, label: "Frame-by-frame Preview", badge: "New" },
    { icon: CheckCircle, label: "Quality Check Indicators" },
    { icon: Shield, label: "Copyright / Music Warning Detection" },
    { icon: Clock, label: "Submission Status Tracker" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#8B0000]">Film Review & Approval</h1>
        <p className="text-gray-500 mt-1">Review, approve, or request revisions for student film submissions.</p>
      </div>

      {/* Feature callouts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((f) => (
          <div key={f.label} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <f.icon className="w-5 h-5 text-[#8B0000] shrink-0" />
            <span className="text-sm font-medium text-gray-700">{f.label}</span>
            {f.badge && <span className="ml-auto text-[10px] bg-[#8B0000] text-white px-1.5 py-0.5 rounded-full">{f.badge}</span>}
          </div>
        ))}
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
              <Film className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{film.title}</p>
              <p className="text-xs text-gray-500">{film.student} · {film.date} · {film.duration}</p>
            </div>
            <StatusBadge status={film.status} />
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition">
                <Play className="w-3 h-3" /> Watch
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition">
                <CheckCircle className="w-3 h-3" /> Approve
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                <XCircle className="w-3 h-3" /> Reject
              </button>
              <button className="flex items-center gap-1 px-2.5 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-100 transition">
                <RotateCcw className="w-3 h-3" /> Revise
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Students ── */
function StudentsSection() {
  const [subTab, setSubTab] = useState("active");
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", course: "", section: "" });

  const activeStudents = mockStudents.filter((s) => s.active);
  const inactiveStudents = mockStudents.filter((s) => !s.active);
  const displayed = subTab === "active" ? activeStudents : inactiveStudents;

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

      {/* Sub-tabs */}
      <div className="flex gap-2">
        {[{ id: "active", label: "My Students" }, { id: "inactive", label: "Inactive Students" }].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${subTab === t.id ? "bg-[#8B0000] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#8B0000]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-sm font-semibold">
                {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-sm">{student.name}</p>
                <p className="text-xs text-gray-500">{student.course} · Section {student.section}</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Film className="w-4 h-4" />
                <span>{student.films} films</span>
              </div>
              {student.awards > 0 && (
                <div className="flex items-center gap-1 text-yellow-600">
                  <Award className="w-4 h-4" />
                  <span>{student.awards} award{student.awards > 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
            <div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${student.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {student.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-5">
            <h2 className="text-xl font-bold text-[#8B0000]">Add New Student</h2>
            {["name", "course", "section"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  value={newStudent[field]}
                  onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
                  placeholder={`Enter ${field}`}
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

/* ── Workspace ── */
function WorkspaceSection() {
  const trendingFilms = [
    { title: "Liwanag sa Dilim", genre: "Drama", rating: 4.8, color: "#5C1A1A" },
    { title: "Bagong Umaga", genre: "Documentary", rating: 4.6, color: "#1A3A5C" },
    { title: "Sa Aming Lahi", genre: "Short Film", rating: 4.9, color: "#1A5C2E" },
    { title: "Habang Buhay", genre: "Romance", rating: 4.5, color: "#4A1A5C" },
  ];

  const top10 = [
    { rank: 1, title: "Sa Aming Lahi", student: "Class 3A Ensemble", genre: "Short Film" },
    { rank: 2, title: "Liwanag sa Dilim", student: "Maria Santos", genre: "Drama" },
    { rank: 3, title: "Bagong Umaga", student: "Lea Fernandez", genre: "Documentary" },
    { rank: 4, title: "Pagbabalik", student: "Carlos Mendoza", genre: "Short Film" },
    { rank: 5, title: "Habang Buhay", student: "Juan dela Cruz", genre: "Romance" },
  ];

  const features = [
    { icon: Monitor, label: "Side-by-side Video + Feedback" },
    { icon: Sliders, label: "Annotation Tools" },
    { icon: Clock, label: "Auto-Save Drafts" },
    { icon: Volume2, label: "Playback Speed Controls" },
    { icon: Eye, label: "Theater Mode" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Cinematic Review Environment</h1>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <div key={f.label} className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2">
            <f.icon className="w-4 h-4 text-[#8B0000]" />
            <span className="text-sm text-gray-700">{f.label}</span>
          </div>
        ))}
      </div>

      {/* Trending grid */}
      <div>
        <h2 className="text-xl font-semibold text-[#8B0000] mb-4">Featured Films</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingFilms.map((film) => (
            <div key={film.title} className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer" style={{ background: film.color, height: 180 }}>
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-[10px] text-white/70 uppercase tracking-wider">{film.genre}</span>
                <p className="text-white font-bold text-sm">{film.title}</p>
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

      {/* Top 10 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-[#8B0000] mb-4">Top 10 This Semester</h2>
        <div className="space-y-3">
          {top10.map((film) => (
            <div key={film.rank} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
              <span className={`text-2xl font-black w-8 ${film.rank <= 3 ? "text-[#8B0000]" : "text-gray-300"}`}>{film.rank}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">{film.title}</p>
                <p className="text-xs text-gray-500">{film.student} · {film.genre}</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition">
                <Play className="w-3 h-3" /> Watch
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Analytics ── */
function AnalyticsSection() {
  const metrics = [
    { label: "Most Viewed Film", value: "Liwanag sa Dilim", icon: Eye, color: "text-blue-600" },
    { label: "Best Genre", value: "Short Film", icon: Film, color: "text-purple-600" },
    { label: "Total Watch Time", value: "342 hrs", icon: Clock, color: "text-green-600" },
    { label: "Viewer Engagement", value: "78%", icon: TrendingUp, color: "text-orange-600" },
    { label: "Most Rated", value: "Sa Aming Lahi", icon: Award, color: "text-yellow-600" },
    { label: "Likes / Comments", value: "1.2k / 340", icon: ThumbsUp, color: "text-pink-600" },
  ];

  const weeklyData = [
    { day: "Mon", views: 65 },
    { day: "Tue", views: 85 },
    { day: "Wed", views: 50 },
    { day: "Thu", views: 95 },
    { day: "Fri", views: 70 },
    { day: "Sat", views: 40 },
    { day: "Sun", views: 30 },
  ];
  const maxViews = Math.max(...weeklyData.map((d) => d.views));

  const topFilms = [
    { rank: 1, title: "Liwanag sa Dilim", views: 1248, likes: 342 },
    { rank: 2, title: "Sa Aming Lahi", views: 1102, likes: 298 },
    { rank: 3, title: "Bagong Umaga", views: 876, likes: 210 },
    { rank: 4, title: "Pagbabalik", views: 654, likes: 187 },
    { rank: 5, title: "Habang Buhay", views: 532, likes: 155 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#8B0000]">Analytics Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <m.icon className={`w-5 h-5 ${m.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{m.label}</p>
              <p className="font-bold text-gray-800 mt-0.5">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#8B0000] mb-6">Weekly View Trend</h2>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">{d.views}</span>
              <div
                className="w-full bg-[#8B0000]/80 rounded-t-md transition-all hover:bg-[#8B0000]"
                style={{ height: `${(d.views / maxViews) * 100}%` }}
              />
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top films ranked */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-[#8B0000] mb-4">Top Films by Views</h2>
        <div className="space-y-3">
          {topFilms.map((film) => (
            <div key={film.rank} className="flex items-center gap-4">
              <span className={`text-xl font-black w-6 ${film.rank <= 3 ? "text-[#8B0000]" : "text-gray-300"}`}>{film.rank}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{film.title}</span>
                  <span className="text-gray-500">{film.views.toLocaleString()} views</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8B0000]/70 rounded-full"
                    style={{ width: `${(film.views / topFilms[0].views) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-pink-600 text-sm">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{film.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Settings ── */
function SettingsSection({ logout }) {
  const [notifToggles, setNotifToggles] = useState({
    newSubmission: true, revisionRequest: true, studentMessage: false,
    approvalNotif: true, deadlineReminder: true, emailNotif: true,
  });
  const [securityToggles, setSecurityToggles] = useState({ twoFactor: false });
  const [reviewPrefs, setReviewPrefs] = useState({
    autoPlay: false, timestampComments: true, autoSaveDrafts: true,
  });
  const [playbackPrefs, setPlaybackPrefs] = useState({
    captions: false, theaterMode: false, thumbnailHover: true,
  });

  const loginActivity = [
    { device: "Chrome on Windows", location: "Batangas City, PH", time: "Today, 9:14 AM" },
    { device: "Safari on iPhone", location: "Batangas City, PH", time: "Yesterday, 6:30 PM" },
    { device: "Firefox on macOS", location: "Manila, PH", time: "May 14, 2026" },
  ];

  const activeDevices = [
    { device: "Chrome on Windows 11", last: "Active now" },
    { device: "Safari on iPhone 15", last: "Yesterday" },
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-[#8B0000]">Settings</h1>

      {/* Account */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#8B0000]">Account</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-xl font-bold">PF</div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#8B0000] transition">
            <Upload className="w-4 h-4" /> Upload Photo
          </button>
        </div>
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

      {/* Notifications */}
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

      {/* Security */}
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
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <p className="text-sm font-medium text-gray-700">Recent Login Activity</p>
          {loginActivity.map((a, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-gray-700">{a.device}</p>
                <p className="text-xs text-gray-400">{a.location}</p>
              </div>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-gray-100 space-y-2">
          <p className="text-sm font-medium text-gray-700">Active Devices</p>
          {activeDevices.map((d, idx) => (
            <div key={idx} className="flex items-center justify-between py-1.5">
              <div>
                <p className="text-sm text-gray-700">{d.device}</p>
                <p className="text-xs text-gray-400">{d.last}</p>
              </div>
              <button className="text-xs text-red-500 hover:text-red-700 transition">Revoke</button>
            </div>
          ))}
          <button className="mt-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition">
            End All Other Sessions
          </button>
        </div>
      </section>

      {/* Review Preferences */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#8B0000]">Review Preferences</h2>
        {[
          { key: "autoPlay", label: "Auto-Play Submitted Videos" },
          { key: "timestampComments", label: "Enable Timestamp Comments" },
          { key: "autoSaveDrafts", label: "Auto-Save Feedback Drafts" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-700">{item.label}</span>
            <Toggle checked={reviewPrefs[item.key]} onChange={(val) => setReviewPrefs({ ...reviewPrefs, [item.key]: val })} />
          </div>
        ))}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Default Playback Speed</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]">
            {["0.5x", "1x", "1.25x", "1.5x", "2x"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Default Review Layout</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]">
            {["Side-by-side", "Full video", "Full feedback"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </section>

      {/* Playback & Streaming */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#8B0000]">Playback & Streaming</h2>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Default Video Quality</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]">
            {["Auto", "1080p", "720p", "480p"].map((q) => <option key={q}>{q}</option>)}
          </select>
        </div>
        {[
          { key: "captions", label: "Enable Captions" },
          { key: "theaterMode", label: "Theater Mode Default" },
          { key: "thumbnailHover", label: "Thumbnail Hover Preview" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between py-1">
            <span className="text-sm text-gray-700">{item.label}</span>
            <Toggle checked={playbackPrefs[item.key]} onChange={(val) => setPlaybackPrefs({ ...playbackPrefs, [item.key]: val })} />
          </div>
        ))}
      </section>

      {/* Logout */}
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
