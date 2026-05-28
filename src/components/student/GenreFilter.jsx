import { useState } from "react";

const GENRES = [
  { id: "narrative", label: "Narrative / Short Film" },
  { id: "documentary", label: "Documentary" },
  { id: "animation", label: "2D / 3D Animation" },
  { id: "experimental", label: "Experimental" },
  { id: "corporate", label: "Corporate / PSA" },
];

export default function GenreFilter({ selectedGenre, onGenreChange, isSelect = false }) {
  if (isSelect) {
    // For form select input
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Film Genre <span className="text-[#8B0000]">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Required for system database indexing and archival catalog classification.
        </p>
        <select
          value={selectedGenre || ""}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition bg-white text-gray-900"
        >
          <option value="">Select a genre...</option>
          {GENRES.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // For filter pills
  return (
    <div className="flex overflow-x-auto gap-2 py-4 px-4 scrollbar-hide">
      {GENRES.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreChange(genre.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
            selectedGenre === genre.id
              ? "bg-[#8B0000] text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {genre.label}
        </button>
      ))}
    </div>
  );
}

export { GENRES };
