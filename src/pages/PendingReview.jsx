import React, { useState, useMemo } from "react";
import {
  Check,
  X,
  Clock,
  Flag,
  Play,
  Search,
  Filter,
  CheckCheck,
  Sparkles,
  SlidersHorizontal,
  Film,
} from "lucide-react";

const BRAND = "#8B0000";

const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    title: "The Lost Chapter",
    uploader: "Alex Rivera",
    role: "Student",
    category: "Documentary",
    duration: "12:45",
    submitted: "2h ago",
    urgent: true,
    thumb:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 2,
    title: "Paper Boats",
    uploader: "Prof. Miller",
    role: "Teacher",
    category: "Short Film",
    duration: "07:12",
    submitted: "5h ago",
    urgent: false,
    thumb:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 3,
    title: "Under the Acacia",
    uploader: "Mika Santos",
    role: "Student",
    category: "Documentary",
    duration: "18:30",
    submitted: "1 day ago",
    urgent: false,
    thumb:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 4,
    title: "Static Hours",
    uploader: "Jomari Cruz",
    role: "Student",
    category: "Experimental",
    duration: "04:58",
    submitted: "3 days ago",
    urgent: true,
    thumb:
      "https://images.unsplash.com/photo-1478720568477-b0839cbfd7d2?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 5,
    title: "Harborline",
    uploader: "Prof. Dizon",
    role: "Teacher",
    category: "Short Film",
    duration: "22:04",
    submitted: "3 days ago",
    urgent: false,
    thumb:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=400&q=60",
  },
];

function Thumb({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-200 cursor-pointer group"
    >
      <img
        src={item.thumb}
        alt=""
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        draggable={false}
      />
      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-white bg-black/80 tabular-nums">
        {item.duration}
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play size={16} className="text-white ml-0.5" fill="white" />
        </div>
      </div>
    </div>
  );
}

function ReviewRow({
  item,
  isSelected,
  onSelectToggle,
  onApprove,
  onReject,
  onPreview,
}) {
  return (
    <div
      className={`group flex items-center gap-4 px-6 py-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/80 transition-colors ${isSelected ? "bg-amber-50/30" : ""
        }`}
    >
      {/* Selection Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelectToggle(item.id)}
        className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400 cursor-pointer"
      />

      {/* Video Thumbnail */}
      <Thumb item={item} onClick={() => onPreview(item)} />

      {/* Content Details */}
      <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Title & Uploader */}
        <div className="min-w-0 md:col-span-1">
          <div className="flex items-center gap-2">
            <h3
              onClick={() => onPreview(item)}
              className="font-semibold text-neutral-900 truncate hover:underline cursor-pointer"
            >
              {item.title}
            </h3>
            {item.urgent && (
              <span
                className="shrink-0 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ color: BRAND, backgroundColor: `${BRAND}14` }}
                title="Close to review deadline"
              >
                Due soon
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 truncate mt-0.5">
            By <span className="font-medium text-neutral-700">{item.uploader}</span>{" "}
            <span className="text-neutral-400">({item.role})</span>
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex items-center gap-3 text-xs text-neutral-500 md:col-span-1">
          <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 font-medium border border-neutral-200/50">
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-neutral-400">
            <Clock size={13} />
            {item.submitted}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 md:col-span-1">
          <button
            onClick={() => onReject(item.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 hover:text-red-700 hover:bg-red-50 border border-neutral-200 hover:border-red-200 transition-all flex items-center gap-1"
            title="Reject or request revisions"
          >
            <X size={14} />
            Reject
          </button>
          <button
            onClick={() => onApprove(item.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center gap-1"
            title="Approve film"
          >
            <Check size={14} />
            Approve
          </button>
          <button
            onClick={() => onPreview(item)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PendingReviewsPage() {
  const [items, setItems] = useState(INITIAL_SUBMISSIONS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("pending");
  const [previewItem, setPreviewItem] = useState(null);

  // Single Actions
  const handleApprove = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleReject = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  // Bulk Actions
  const handleBulkApprove = () => {
    setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  // Selection Logic
  const handleSelectToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filtered List
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.uploader.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || item.role === roleFilter;
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesRole && matchesCategory;
    });
  }, [items, searchQuery, roleFilter, categoryFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((i) => i.id));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 1. TOP HEADER & BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Film Submissions Review
            </h1>
          </div>

          {/* Counter Status */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/60">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {items.length} Pending Approval
            </span>
          </div>
        </div>

        {/* 2. TAB NAVIGATION & BULK CONTROLS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-neutral-200/80 shadow-sm">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === "pending"
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
                }`}
            >
              Pending ({items.length})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === "approved"
                  ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60"
                  : "text-emerald-600 hover:text-emerald-700 hover:bg-neutral-200/50"
                }`}
            >
              Approved
            </button>

            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === "rejected"
                  ? "bg-rose-50 text-rose-700 shadow-sm border border-rose-200/60"
                  : "text-rose-600 hover:text-rose-700 hover:bg-neutral-200/50"
                }`}
            >
              Rejected
            </button>
          </div>

          {/* Bulk Selection Actions (Appears when checkbox selected) */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 px-2 animate-in fade-in duration-200">
              <span className="text-xs font-medium text-neutral-500 mr-2">
                {selectedIds.length} selected
              </span>
              <button
                onClick={handleBulkApprove}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <CheckCheck size={14} /> Approve Selected
              </button>
              <button
                onClick={handleBulkReject}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <X size={14} /> Reject Selected
              </button>
            </div>
          )}
        </div>

        {/* 3. FILTERS & SEARCH BAR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="relative md:col-span-6">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search title, student, or teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-400 transition-all placeholder:text-neutral-400"
            />
          </div>

          {/* Role Filter */}
          <div className="md:col-span-3 flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs">
            <SlidersHorizontal size={14} className="text-neutral-400" />
            <span className="text-neutral-500 font-medium">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent font-semibold text-neutral-900 focus:outline-none cursor-pointer w-full"
            >
              <option value="All">All Roles</option>
              <option value="Student">Students Only</option>
              <option value="Teacher">Teachers Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3 flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs">
            <Filter size={14} className="text-neutral-400" />
            <span className="text-neutral-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent font-semibold text-neutral-900 focus:outline-none cursor-pointer w-full"
            >
              <option value="All">All Categories</option>
              <option value="Documentary">Documentary</option>
              <option value="Short Film">Short Film</option>
              <option value="Experimental">Experimental</option>
            </select>
          </div>
        </div>

        {/* 4. MAIN CONTENT CONTAINER */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          {/* List Toolbar / Header */}
          {filteredItems.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-100 bg-neutral-50/50 text-xs font-semibold text-neutral-500">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    filteredItems.length > 0 &&
                    selectedIds.length === filteredItems.length
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400 cursor-pointer"
                />
                <span>Select All Films</span>
              </div>
              <span>Showing {filteredItems.length} submissions</span>
            </div>
          )}

          {/* Submissions List */}
          <div>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ReviewRow
                  key={item.id}
                  item={item}
                  isSelected={selectedIds.includes(item.id)}
                  onSelectToggle={handleSelectToggle}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onPreview={setPreviewItem}
                />
              ))
            ) : (
              <div className="px-5 py-20 text-center space-y-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: `${BRAND}10`, color: BRAND }}
                >
                  <Film size={22} />
                </div>
                <h3 className="text-base font-semibold text-neutral-900">
                  No submissions found
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                  {searchQuery || roleFilter !== "All" || categoryFilter !== "All"
                    ? "Try adjusting your filters or search query."
                    : "All film submissions have been moderated. Check back later!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. FULL PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200">
            {/* Modal Video Header */}
            <div className="relative aspect-video bg-neutral-950 flex items-center justify-center">
              <img
                src={previewItem.thumb}
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
              <button className="absolute w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                <Play size={28} className="text-white ml-1" fill="white" />
              </button>
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Details & Action Bar */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {previewItem.title}
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Submitted by{" "}
                    <strong className="text-neutral-800">
                      {previewItem.uploader}
                    </strong>{" "}
                    ({previewItem.role}) • {previewItem.category}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-neutral-100 rounded-md font-medium text-neutral-600">
                  {previewItem.duration}
                </span>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    handleReject(previewItem.id);
                    setPreviewItem(null);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Reject Submission
                </button>
                <button
                  onClick={() => {
                    handleApprove(previewItem.id);
                    setPreviewItem(null);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  Approve Film
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}