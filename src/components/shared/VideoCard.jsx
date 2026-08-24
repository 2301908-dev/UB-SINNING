import { useState } from "react";
import {
  Play,
  Info,
  Bookmark,
  X,
  Star,
  StarHalf,
  Plus,
  ThumbsUp,
  Volume2,
} from "lucide-react";

export default function VideoCard({ film }) {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const openGallery = () => {
    window.dispatchEvent(
      new CustomEvent("ub-sining:navigate", {
        detail: { tab: "gallery" },
      })
    );
    setShowModal(false);
  };

  const addToMyList = () => {
    window.dispatchEvent(
      new CustomEvent("ub-sining:add-to-my-list", {
        detail: { film },
      })
    );
    setSaved(true);
    setShowModal(false);
  };

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
          {film.isAwaitingApproval && (
            <div className="absolute inset-x-3 top-3 rounded-2xl border border-[#D4AF37]/25 bg-black/70 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                <span>Awaiting approval</span>
                <span className="animate-pulse">Loading</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-2/5 animate-pulse rounded-full bg-[#D4AF37]" />
              </div>
            </div>
          )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-[#D4AF37]/15 bg-[#171315] text-white shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
              <div className="relative min-h-[28rem] overflow-hidden bg-[#090707]">
                <video
                  src={film.previewUrl}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#171315] to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8 lg:p-10">
                  <div className="max-w-2xl space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                      <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-white/90">
                        Preview
                      </span>
                      <span>{film.category}</span>
                      <span>{film.duration}</span>
                    </div>

                    <div>
                      <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                        {film.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                        Directed by {film.creator}. {film.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => film.previewUrl && window.open(film.previewUrl, "_blank")}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/90"
                      >
                        <Play className="h-4 w-4" fill="currentColor" />
                        Play
                      </button>
                      <button
                        type="button"
                        onClick={addToMyList}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                          saved
                            ? "bg-[#D4AF37]/20 text-white"
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                        {saved ? "In My List" : "My List"}
                      </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                        <Info className="h-4 w-4" />
                        More Info
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/75">
                      <div className="flex items-center gap-2">
                        {renderRatingStars(film.rating)}
                        <span>{film.rating.toFixed(1)}</span>
                      </div>
                      <span>Student Film</span>
                      <span>{film.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                <button className="absolute bottom-5 right-5 rounded-full bg-black/55 p-3 text-white/90 backdrop-blur transition hover:bg-black/80">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="border-t border-white/10 bg-[#211a1d] p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Why Watch</p>
                    <p className="mt-3 text-sm leading-6 text-white/80">
                      Experience a cinematic preview with exclusive behind-the-scenes commentary, student production notes, and festival buzz.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Rating</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-sm font-bold text-black">
                          {film.rating.toFixed(1)}
                        </span>
                        <div className="flex items-center gap-1">
                          {renderRatingStars(film.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Category</p>
                      <p className="mt-3 text-lg font-semibold text-white">{film.category}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">Your Rating</p>
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setUserRating(index + 1);
                          }}
                          className={`rounded-full p-1 transition ${
                            userRating >= index + 1
                              ? "text-[#D4AF37]"
                              : "text-white/35 hover:text-[#D4AF37]"
                          }`}
                        >
                          <Star
                            className="h-5 w-5"
                            fill={userRating >= index + 1 ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-white/60">
                      {userRating ? `${userRating} star${userRating === 1 ? "" : "s"}` : "Tap a star to rate"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">Behind the Scenes</p>
                    <div className="mt-4 space-y-3 text-sm text-white/75">
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <span>Production stills</span>
                        <span className="text-white/45">On-set imagery</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Storyboards & notes</span>
                        <span className="text-white/45">Director cues</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={openGallery}
                    className="w-full rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#e2c15b]"
                  >
                    View in 3D Gallery
                  </button>

                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/35">
                    <ThumbsUp className="h-4 w-4" />
                    Cinematic preview layout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}