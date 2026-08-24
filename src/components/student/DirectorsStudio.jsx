import { useEffect, useMemo, useState } from "react";
import { Film, Users, Lock, History, Download, ChevronDown } from "lucide-react";
import { mockFilms } from "../../data/mockFilms";

const genres = [
  "All",
  "Narrative",
  "Documentary",
  "Experimental",
  "Animation",
  "Music Video",
  "Behind-the-Scenes",
];

const versionOptions = ["Rough Cut", "Final Cut", "Director's Cut"];

const categoryMap = {
  Narrative: ["drama", "romance", "action", "narrative"],
  Documentary: ["documentary"],
  Experimental: ["experimental"],
  Animation: ["animation"],
  "Music Video": ["music", "music video"],
  "Behind-the-Scenes": ["behind-the-scenes", "bts"],
};

export default function DirectorsStudio() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedFilmId, setSelectedFilmId] = useState(mockFilms[0]?.id ?? null);
  const [festivalMode, setFestivalMode] = useState(false);
  const [directorStatement, setDirectorStatement] = useState("");
  const [credits, setCredits] = useState("");
  const [versionHistory, setVersionHistory] = useState(
    mockFilms.reduce((acc, film) => {
      acc[film.id] = "Final Cut";
      return acc;
    }, {})
  );

  const filteredFilms = useMemo(() => {
    if (activeGenre === "All") return mockFilms;

    const lookup = categoryMap[activeGenre] || [activeGenre.toLowerCase()];
    return mockFilms.filter((film) => {
      const category = film.category?.toLowerCase() || "";
      const tags = film.tags?.map((tag) => tag.toLowerCase()) || [];
      return (
        lookup.includes(category) ||
        tags.some((tag) => lookup.includes(tag))
      );
    });
  }, [activeGenre]);

  useEffect(() => {
    if (!filteredFilms.some((film) => film.id === selectedFilmId)) {
      setSelectedFilmId(filteredFilms[0]?.id ?? null);
    }
  }, [filteredFilms, selectedFilmId]);

  const selectedFilm = mockFilms.find((film) => film.id === selectedFilmId) || filteredFilms[0];

  return (
    <section className="rounded-[32px] border border-white/10 bg-[#171315] p-6 text-white shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">Director’s Studio</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Academic Filmmaker Control Room</h2>
          <p className="mt-3 text-sm text-white/70">
            Curate your festival-ready work, manage version history, and keep your student films protected in the UB Director’s Studio.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#D4AF37] shadow-md shadow-black/20">
          <Download className="h-4 w-4" /> Download Digital Portfolio
        </button>
      </div>

      <div className="mb-6 overflow-x-auto pb-4">
        <div className="inline-flex gap-3">
          {genres.map((genre) => {
            const active = genre === activeGenre;
            return (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${
                  active
                    ? "border border-[#D4AF37]/20 bg-[#D4AF37] text-black shadow-md shadow-black/20"
                    : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.8fr_1.2fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredFilms.map((film) => (
              <button
                key={film.id}
                type="button"
                onClick={() => setSelectedFilmId(film.id)}
                className={`group flex flex-col overflow-hidden rounded-[28px] border px-4 py-4 text-left transition shadow-sm ${
                  film.id === selectedFilmId
                    ? "border-[#D4AF37]/30 bg-white/10 shadow-lg shadow-black/20"
                    : "border-white/10 bg-white/5 hover:border-[#D4AF37]/25 hover:bg-white/8"
                }`}
              >
                <div className="mb-4 overflow-hidden rounded-3xl bg-slate-950">
                  <img src={film.thumbnail} alt={film.title} className="h-40 w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-white">{film.title}</h3>
                    <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-[11px] font-semibold text-[#D4AF37]">
                      {versionHistory[film.id]}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{film.category}</p>
                  <p className="text-sm text-white/70 line-clamp-2">{film.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-white/45">
                  <span>{film.duration}</span>
                  <span>{film.views} views</span>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#20191b] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <History className="h-5 w-5 text-[#D4AF37]" />
              <h3 className="text-lg font-semibold text-white">Version History</h3>
            </div>
            {filteredFilms.map((film) => (
              <div key={film.id} className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{film.title}</p>
                    <p className="text-xs text-white/50">Pick a version for review</p>
                  </div>
                  <div className="relative inline-flex w-full max-w-[180px] items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                    <select
                      value={versionHistory[film.id]}
                      onChange={(event) =>
                        setVersionHistory((current) => ({
                          ...current,
                          [film.id]: event.target.value,
                        }))
                      }
                      className="w-full bg-transparent text-sm font-semibold text-white outline-none"
                    >
                      {versionOptions.map((version) => (
                        <option key={version} value={version}>
                          {version}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none h-4 w-4 text-white/45" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6 rounded-[28px] border border-white/10 bg-[#241d1f] p-6 shadow-sm">
          <div className="space-y-4 rounded-[24px] border border-[#D4AF37]/15 bg-white/5 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#D4AF37] text-black shadow-md shadow-black/20">
                <Film className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#D4AF37]">Student Director</p>
                <h3 className="text-xl font-semibold text-white">Leah Cruz</h3>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Emerging filmmaker and UB student focusing on cinematic storytelling, festival-ready narratives, and experimental visual essays.
            </p>
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-[#171315] p-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#D4AF37]" />
                <span>12 films in development</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#D4AF37]" />
                <span>3 festival submissions protected</span>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-[#D4AF37]">Selected Film</h3>
            {selectedFilm ? (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-white">{selectedFilm.title}</p>
                <p className="text-sm text-white/55">Directed by {selectedFilm.creator}</p>
                <div className="rounded-3xl border border-[#D4AF37]/15 bg-[#2a2022] p-4">
                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#D4AF37]">
                    <span>Festival Mode</span>
                    <label htmlFor="festivalMode" className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-white/5 px-3 py-2">
                      <span className={`h-5 w-10 rounded-full transition ${festivalMode ? "bg-[#D4AF37]" : "bg-white/20"}`}>
                        <span className={`block h-4 w-4 rounded-full bg-white transition ${festivalMode ? "translate-x-5" : "translate-x-0"}`} />
                      </span>
                      <span className="text-xs font-semibold text-white/70">{festivalMode ? "Private" : "Public"}</span>
                      <input
                        id="festivalMode"
                        type="checkbox"
                        checked={festivalMode}
                        onChange={(event) => setFestivalMode(event.target.checked)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    When active, this film is hidden from the public gallery to comply with festival rules.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-white/55">Select a film card to edit its metadata.</p>
            )}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#D4AF37]">Director’s Statement</h3>
              <span className="text-xs text-white/45">Draft</span>
            </div>
            <textarea
              rows={5}
              value={directorStatement}
              onChange={(event) => setDirectorStatement(event.target.value)}
              placeholder="Summarize your creative intent and artistic approach..."
              className="w-full resize-none rounded-3xl border border-white/10 bg-[#171315] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#D4AF37]">Full Cast & Crew Credits</h3>
              <span className="text-xs text-white/45">Editable</span>
            </div>
            <textarea
              rows={5}
              value={credits}
              onChange={(event) => setCredits(event.target.value)}
              placeholder="List cast and crew, departments, and festival collaborators..."
              className="w-full resize-none rounded-3xl border border-white/10 bg-[#171315] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
