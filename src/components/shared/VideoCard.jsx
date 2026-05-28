import { useState } from "react";
import { Play, Info, Bookmark, X, Star, StarHalf, Film as FilmIcon, Camera } from "lucide-react";

export default function VideoCard({ film }) {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, idx) => (
          <Star key={`full-${idx}`} className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" />
        ))}
        {hasHalf && <StarHalf key="half" className="w-3.5 h-3.5 text-[#D4AF37]" />}
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <Star key={`empty-${idx}`} className="w-3.5 h-3.5 text-gray-600" />
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className="relative w-44 sm:w-52 md:w-56 cursor-pointer overflow-visible transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShowModal(true)}
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

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white truncate">{film.title}</h3>
              <p className="text-[11px] text-gray-400 truncate">{film.creator}</p>
            </div>
            <div className="flex items-center gap-1">
              {renderRatingStars(film.rating)}
              <span className="text-[11px] text-gray-300">{film.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 p-4 md:p-8">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#8B0000] shadow-sm transition hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] p-6 md:p-8">
              <div className="space-y-4">
                <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100">
                  <video
                    src={film.previewUrl}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-slate-900">{film.title}</h2>
                  <p className="text-sm text-slate-500">Directed by {film.creator}</p>
                  <p className="text-sm text-slate-600">{film.description}</p>
                </div>
              </div>
              <div className="space-y-5 rounded-3xl bg-[#8B0000] p-6 text-white">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFD700] mb-3">Why Watch</h3>
                  <p className="text-sm leading-relaxed text-white/90">
                    Experience a cinematic preview with exclusive behind-the-scenes commentary, student production notes, and festival buzz.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/95 p-4 shadow-md hover:shadow-lg transition">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#8B0000] font-bold">Rating</p>
                    <div className="mt-3 space-y-2">
                      <span className="inline-flex rounded-full bg-[#8B0000] px-3 py-1 text-sm font-bold text-white">
                        {film.rating.toFixed(1)}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderRatingStars(film.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/95 p-4 shadow-md hover:shadow-lg transition">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#8B0000] font-bold">Category</p>
                    <p className="mt-3 text-base font-bold text-[#8B0000]">{film.category}</p>
                  </div>
                </div>
                <div className="space-y-3 rounded-2xl bg-white/10 border border-white/20 p-4">
                  <div className="flex items-center gap-2">
                    <FilmIcon className="h-5 w-5 text-[#FFD700]" />
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Behind the Scenes</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl bg-white/95 p-3 shadow-sm hover:shadow-md transition">
                      <Camera className="h-4 w-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#8B0000]">Production Stills</p>
                        <p className="text-xs text-slate-600 mt-1">On-set imagery & design</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-white/95 p-3 shadow-sm hover:shadow-md transition">
                      <Info className="h-4 w-4 text-[#8B0000] mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#8B0000]">Storyboards & Notes</p>
                        <p className="text-xs text-slate-600 mt-1">Director cues & frames</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/95 p-4 shadow-md">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8B0000] font-bold">Your Rating</p>
                  <div className="mt-3 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setUserRating(index + 1);
                        }}
                        className={`rounded-full p-2 transition ${
                          userRating >= index + 1
                            ? "text-[#D4AF37]"
                            : "text-gray-400 hover:text-[#D4AF37]"
                        }`}
                      >
                        <Star
                          className="h-5 w-5"
                          fill={userRating >= index + 1 ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                    <span className="text-sm text-slate-600">
                      {userRating ? `${userRating} star${userRating === 1 ? "" : "s"}` : "Tap a star to rate"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSaved(true);
                    setShowModal(false);
                  }}
                  className="w-full rounded-2xl bg-white text-[#8B0000] px-5 py-3 text-sm font-bold transition hover:bg-gray-50 shadow-md hover:shadow-lg"
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
