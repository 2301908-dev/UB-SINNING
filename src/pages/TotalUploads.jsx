import { useState, useMemo } from "react";
import {
  Search,
  Upload,
  Film,
  Edit2,
  Archive,
  Trash2,
  X,
  ChevronDown,
  Eye,
  ArrowLeft,
} from "lucide-react";

const MAROON = "#8B0000";
const MAROON_DARK = "#6B0000";
const GOLD = "#C9A227";

const GENRE_COLORS = {
  Drama: "#8B0000",
  Horror: "#26221F",
  Comedy: "#C9A227",
  Documentary: "#1F5C56",
  Romance: "#A85C6B",
  Thriller: "#2D3B4E",
  Experimental: "#5B3B6B",
};

const INITIAL_FILMS = [
  {
    id: 1,
    title: "Kahit Sandali",
    creator: "Juan Dela Cruz",
    studentId: "UB-21-0442",
    genre: "Drama",
    date: "Oct 12, 2025",
    views: 124,
    status: "Published",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    title: "Liwanag sa Dilim",
    creator: "Maria Santos",
    studentId: "UB-22-0117",
    genre: "Horror",
    date: "Sep 28, 2025",
    views: 89,
    status: "Published",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    title: "Pulse of The City",
    creator: "Ana Garcia",
    studentId: "UB-20-0298",
    genre: "Documentary",
    date: "Jan 20, 2026",
    views: 45,
    status: "Draft",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    title: "Canvas of Dreams",
    creator: "Leah Cruz",
    studentId: "UB-21-0561",
    genre: "Thriller",
    date: "Aug 15, 2025",
    views: 210,
    status: "Published",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  
];

const GENRES = ["All Genres", "Drama", "Horror", "Comedy", "Documentary", "Romance", "Thriller", "Experimental"];
const SEMESTERS = ["All Semesters", "1st Sem 2025–2026", "2nd Sem 2024–2025", "1st Sem 2024–2025"];
const STATUSES = ["All Status", "Published", "Draft", "Archived"];

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-green-50 text-green-700 border-green-200",
    Draft: "bg-amber-50 text-amber-700 border-amber-200",
    Archived: "bg-stone-100 text-stone-500 border-stone-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}

function Thumbnail({ genre }) {
  const color = GENRE_COLORS[genre] || MAROON;
  const dots = [0, 1, 2, 3];
  return (
    <div className="relative w-20 h-14 rounded-md overflow-hidden shrink-0 shadow-sm">
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Film className="w-4 h-4 text-white/70" strokeWidth={1.5} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col justify-around py-1 bg-black/10">
        {dots.map((d) => (
          <span key={d} className="w-1 h-1 rounded-full bg-black/40 mx-auto" />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col justify-around py-1 bg-black/10">
        {dots.map((d) => (
          <span key={d} className="w-1 h-1 rounded-full bg-black/40 mx-auto" />
        ))}
      </div>
    </div>
  );
}

export default function TotalUploads({ onBack }) {
  const [films, setFilms] = useState(INITIAL_FILMS);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [semester, setSemester] = useState("All Semesters");
  const [status, setStatus] = useState("All Status");
  const [drawerFilm, setDrawerFilm] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = useMemo(() => {
    return films.filter((f) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.creator.toLowerCase().includes(q) ||
        f.studentId.toLowerCase().includes(q);
      const matchesGenre = genre === "All Genres" || f.genre === genre;
      const matchesStatus = status === "All Status" || f.status === status;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [films, search, genre, status]);

  function updateFilm(updated) {
    setFilms((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  }

  function toggleArchive(f) {
    updateFilm({ ...f, status: f.status === "Archived" ? "Published" : "Archived" });
  }

  function deleteFilm(id) {
    setFilms((prev) => prev.filter((f) => f.id !== id));
    setConfirmDeleteId(null);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]" style={{ backgroundColor: "#FAF9F7" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');`}</style>
      <div className="max-w-6xl mx-auto px-6 py-10 font-['Inter',sans-serif]">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="mb-3 inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-1"
              style={{ color: MAROON }}
            >
              Film Library
            </p>
            <h1
              className="text-3xl text-stone-900 flex items-baseline gap-2"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Total Uploads
              <span className="text-lg font-normal text-stone-400">({films.length})</span>
            </h1>
          </div>
        </div>

        {/* Film strip divider */}
        <div
          className="h-1.5 rounded-full mb-6"
          style={{
            background: `repeating-linear-gradient(90deg, ${MAROON} 0px, ${MAROON} 10px, ${GOLD} 10px, ${GOLD} 14px, transparent 14px, transparent 24px)`,
            opacity: 0.85,
          }}
        />

        {/* Search bar and Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, student name, or ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900"
            />
          </div>

          <FilterSelect value={genre} onChange={setGenre} options={GENRES} />
          <FilterSelect value={semester} onChange={setSemester} options={SEMESTERS} />
          <FilterSelect value={status} onChange={setStatus} options={STATUSES} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Film className="w-8 h-8 text-stone-300 mb-3" strokeWidth={1.5} />
              <p className="text-stone-600 font-medium text-sm">No films match your filters</p>
              <p className="text-stone-400 text-xs mt-1">Try a different search term or reset the filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wide">
                    <th className="text-left font-medium px-5 py-3 text-[#8B0000]">Thumbnail &amp; Title</th>
                    <th className="text-left font-medium px-5 py-3 text-[#8B0000]">Creator / Student</th>
                    <th className="text-left font-medium px-5 py-3 text-[#8B0000]">Genre</th>
                    <th className="text-left font-medium px-5 py-3 text-[#8B0000]">Release Date</th>
                    <th className="text-center font-medium px-5 py-3 text-[#8B0000]">Views</th>
                    <th className="text-center font-medium px-5 py-3 text-[#8B0000]">Status</th>
                    <th className="text-center font-medium px-5 py-3 text-[#8B0000]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((f) => (
                    <tr
                      key={f.id}
                      onClick={() => setDrawerFilm(f)}
                      className="hover:bg-stone-50 cursor-pointer transition"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Thumbnail genre={f.genre} />
                          <span className="font-medium text-stone-800">{f.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-stone-600">
                        <div>{f.creator}</div>
                        <div className="text-xs text-stone-400">{f.studentId}</div>
                      </td>
                      <td className="px-5 py-3 text-stone-600">{f.genre}</td>
                      <td className="px-5 py-3 text-stone-600">{f.date}</td>
                      <td className="px-5 py-3 text-stone-600 text-center">
                        <span className="inline-flex items-center justify-center gap-1">
                          {f.views}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <StatusBadge status={f.status} />
                      </td>
                      <td className="px-5 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {confirmDeleteId === f.id ? (
                          <div className="flex items-center justify-end gap-2 text-xs">
                            <span className="text-stone-500">Delete?</span>
                            <button
                              onClick={() => deleteFilm(f.id)}
                              className="text-red-700 font-medium hover:underline"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-stone-400 font-medium hover:underline"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1 text-stone-400">
                            <button
                              onClick={() => setDrawerFilm(f)}
                              title="Edit"
                              className="p-1.5 rounded-md hover:bg-stone-100 hover:text-stone-700 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleArchive(f)}
                              title={f.status === "Archived" ? "Unarchive" : "Archive"}
                              className="p-1.5 rounded-md hover:bg-stone-100 hover:text-stone-700 transition"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(f.id)}
                              title="Delete"
                              className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-700 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100 text-xs text-stone-500">
              <span>
                Showing 1–{filtered.length} of {films.length} uploads
              </span>
              <div className="flex items-center gap-2">
                <button className="px-2.5 py-1 rounded-md border border-stone-200 text-stone-400 cursor-not-allowed">
                  Prev
                </button>
                <button className="px-2.5 py-1 rounded-md border border-stone-200 hover:bg-stone-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerFilm && (
        <EditDrawer
          film={drawerFilm}
          onClose={() => setDrawerFilm(null)}
          onSave={(updated) => {
            updateFilm(updated);
            setDrawerFilm(null);
          }}
        />
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

function EditDrawer({ film, onClose, onSave }) {
  const [form, setForm] = useState({ ...film });

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400 mb-0.5">Edit Film</p>
            <h2 className="text-lg font-semibold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              {film.title}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-600">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div className="flex items-center gap-4">
            <Thumbnail genre={form.genre} />
            <button
              type="button"
              className="text-xs font-medium px-3 py-1.5 rounded-md border border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              Change thumbnail
            </button>
          </div>

          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900 resize-none"
            />
          </Field>

          <Field label="Cast / Credits">
            <input
              value={form.cast}
              onChange={(e) => set("cast", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900"
            />
          </Field>

          <Field label="Genre">
            <select
              value={form.genre}
              onChange={(e) => set("genre", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900"
            >
              {GENRES.filter((g) => g !== "All Genres").map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Visibility Status">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/40 focus:border-red-900"
            >
              {STATUSES.filter((s) => s !== "All Status").map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-500 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white shadow-sm hover:opacity-90"
            style={{ backgroundColor: MAROON }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-stone-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}