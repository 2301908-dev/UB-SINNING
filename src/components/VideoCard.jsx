import { useState } from "react";
import { Play, Info, Bookmark, X } from "lucide-react";

export default function VideoCard({ film }) {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <>
      <div
        className="relative w-44 sm:w-52 md:w-56 cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-3xl shadow-2xl bg-black">
          {hover ? (
            <video
              src={film.previewUrl}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={film.thumbnail}
              alt={film.title}
              className="w-full h-full object-cover transition duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {film.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.2em] bg-white/10 border border-white/10 text-gray-200 rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-200 bg-black/50 px-2 py-1 rounded-lg">
                {film.duration}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSaved((prev) => !prev);
                }}
                className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] rounded-full px-3 py-1 transition ${
                  saved
                    ? "bg-ub-gold text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {saved ? "Saved" : "Watchlist"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-semibold text-white truncate">{film.title}</h3>
          <p className="text-[11px] text-gray-400 truncate">{film.creator}</p>
        </div>

        {hover && (
          <div className="absolute -top-2 left-1/2 z-50 w-72 -translate-x-1/2 rounded-3xl border border-gray-700 bg-cinema-dark p-4 shadow-2xl animate-fade-in-up">
            <div className="relative w-full h-40 overflow-hidden rounded-2xl">
              <video
                src={film.previewUrl}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="mt-3 space-y-2">
              <h3 className="text-lg font-semibold text-white truncate">{film.title}</h3>
              <p className="text-xs text-gray-400">Directed by {film.creator}</p>
              <p className="text-xs text-ub-gold">Behind the Scenes Available</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {film.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.2em] bg-white/10 text-gray-300 rounded-full px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-ub-maroon px-4 py-2 text-sm font-medium text-white transition hover:bg-ub-maroon-light">
                <Play className="w-4 h-4" /> Play Preview
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <Info className="w-4 h-4" /> Behind the Scenes
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] p-6 md:p-8">
              <div className="space-y-4">
                <div className="relative h-72 overflow-hidden rounded-3xl bg-black">
                  <video
                    src={film.previewUrl}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-white">{film.title}</h2>
                  <p className="text-sm text-gray-400">Directed by {film.creator}</p>
                  <p className="text-sm text-gray-300">{film.description}</p>
                </div>
              </div>
              <div className="space-y-4 rounded-3xl bg-cinema-black/90 p-5">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400">Why Watch</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Experience a cinematic preview with exclusive behind-the-scenes commentary, student production notes, and festival buzz.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Rating</p>
                    <p className="mt-2 text-lg font-semibold text-white">{film.rating}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Category</p>
                    <p className="mt-2 text-lg font-semibold text-white">{film.category}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {film.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSaved(true);
                    setShowModal(false);
                  }}
                  className="w-full rounded-2xl bg-ub-maroon px-5 py-3 text-sm font-semibold text-white transition hover:bg-ub-maroon-light"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
