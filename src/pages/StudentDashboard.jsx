import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/shared/UBLogo";
import Footer from "../components/shared/Footer";
import { mockFilms } from "../data/mockFilms";
import CategoryRow from "../components/student/CategoryRow";
import DirectorsStudio from "../components/student/DirectorsStudio";
import FilmUploadPortal from "../components/student/FilmUploadPortal";
import ProfileMenuHub from "../components/student/ProfileMenuHub";
import GenreFilter from "../components/student/GenreFilter";
import SettingsControlPanel from "../components/student/SettingsControlPanel";
import {
  Bell,
  Search,
  Star,
  StarHalf,
  ChevronRight,
  ScreenShare,
  Camera,
  GalleryHorizontalEnd,
  Play,
  Info,
  Plus,
  X,
  Volume2,
} from "lucide-react";

function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, idx) => (
        <Star
          key={`full-${idx}`}
          className="w-4 h-4 text-ub-gold"
          fill="currentColor"
        />
      ))}
      {hasHalf && (
        <StarHalf key="half" className="w-4 h-4 text-ub-gold" />
      )}
      {Array.from({ length: emptyStars }).map((_, idx) => (
        <Star key={`empty-${idx}`} className="w-4 h-4 text-gray-600" />
      ))}
    </div>
  );
}

export default function StudentDashboard() {
  const { logout } = useAuth();

  // Tabs
  const [activeTab, setActiveTab] = useState("home");
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState("profile");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [previewFilm, setPreviewFilm] = useState(null);
  const [myListFilms, setMyListFilms] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem("ub-sining-my-list");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, text: "Your film was approved!", time: "2h ago" },
    { id: 2, text: "New comment on your film.", time: "5h ago" },
    { id: 3, text: "Admin posted new guidelines.", time: "1d ago" },
  ];

  // Click‑outside to close notifications
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".notif-area")) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Tabs
  const tabs = [
    { id: "studentFilms", label: "Student Films" },
    { id: "musicFilms", label: "Music Films" },
    { id: "gallery", label: "3D Gallery" },
    { id: "myList", label: "My List" },
    { id: "portfolio", label: "My Portfolio" },
  ];

  useEffect(() => {
    const handler = (event) => {
      if (event.detail?.tab) {
        setActiveTab(event.detail.tab);
      }
    };

    window.addEventListener("ub-sining:navigate", handler);
    return () => window.removeEventListener("ub-sining:navigate", handler);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("ub-sining-my-list", JSON.stringify(myListFilms));
    } catch {
      // Ignore storage failures.
    }
  }, [myListFilms]);

  useEffect(() => {
    const handler = (event) => {
      const film = event.detail?.film;
      if (!film) {
        return;
      }

      setMyListFilms((current) => {
        if (current.some((item) => item.id === film.id)) {
          return current;
        }

        return [film, ...current];
      });
      setActiveTab("myList");
    };

    window.addEventListener("ub-sining:add-to-my-list", handler);
    return () => window.removeEventListener("ub-sining:add-to-my-list", handler);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const film = event.detail?.film;
      if (film) {
        setPreviewFilm(film);
      }
    };

    window.addEventListener("ub-sining:preview-film", handler);
    return () => window.removeEventListener("ub-sining:preview-film", handler);
  }, []);

  // Featured Film
  const featured = mockFilms[0];

  return (
    <>
      <div
        className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.35),transparent_32%),linear-gradient(180deg,#120808_0%,#1a0d0d_46%,#0c0b0b_100%)] text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/studentbackround.png')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#090707]/72" />
        <div className="relative z-10">
          {/* ================= NAVBAR ================= */}
          <nav className="flex flex-col gap-6 border-b border-white/10 bg-[#171315]/88 px-4 py-6 text-white backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center justify-between gap-6">
            <button
              onClick={() => setActiveTab("home")}
              className="cursor-pointer hover:scale-[1.01] transition-transform duration-200"
            >
              <UBLogo titleClass="text-[#D4AF37]" subtitleClass="text-white/55" />
            </button>
            <div className="flex gap-4 lg:hidden">
              <button className="rounded-full bg-[#D4AF37] p-3 text-[#120808] hover:bg-[#e2c15b]">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  text-sm font-medium pb-1 transition
                  ${
                    activeTab === tab.id
                      ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                      : "text-white/70 hover:text-white"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + Notifications + Logout */}
          <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:items-center sm:justify-end sm:gap-6">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45" />
              <input
                placeholder="Search showcases..."
                className="w-full rounded-lg border border-white/10 bg-white/8 py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative notif-area hidden sm:block">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="text-white/70 transition hover:text-white" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-xs text-[#120808]">
                    {notifications.length}
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 z-50 mt-3 w-72 rounded-xl border border-white/10 bg-[#1b1717]/95 p-3 shadow-xl backdrop-blur-xl animate-fade-in-up">
                    <h3 className="mb-2 text-sm font-semibold text-white">
                      Notifications
                    </h3>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-3 transition hover:border-[#D4AF37]/30"
                        >
                          <span className="text-sm text-white">
                            {n.text}
                          </span>
                          <span className="text-xs text-white/45">
                            {n.time}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-3 w-full text-xs text-white/55 hover:text-[#D4AF37]">
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>

              <ProfileMenuHub
                onOpenSettings={(tab = "profile") => {
                  setSettingsTab(tab);
                  setShowSettings(true);
                }}
              />
            </div>
          </div>
        </nav>

        {/* ================= GENRE FILTER BAR ================= */}
        {activeTab === "home" && (
          <div className="border-b border-white/10 bg-[#171315]/90 backdrop-blur-xl">
            <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
          </div>
        )}

        {/* ================= PAGE CONTENT ================= */}
        <main className="px-4 py-10 sm:px-6 lg:px-10">
          {
            {
              home: <HomeTab featured={featured} />,
              studentFilms: <StudentFilmsTab />,
              musicFilms: <MusicFilmsTab />,
              gallery: <GalleryTab />,
              myList: <MyListTab films={myListFilms} setFilms={setMyListFilms} />,
              portfolio: <PortfolioTab />,
            }[activeTab]
          }
        </main>
       
        </div>
      </div>

      {showSettings && (
        <SettingsControlPanel
          initialTab={settingsTab}
          onClose={() => setShowSettings(false)}
        />
      )}

      {previewFilm && (
        <FilmPreviewOverlay film={previewFilm} onClose={() => setPreviewFilm(null)} />
      )}

      <Footer />
    </>
  );
}

//
// ================= HOME TAB =================
//

function HomeTab({ featured }) {
  return (
    <>
      {/* CINEMATIC HERO WITH FADE */}
      <header className="relative h-[70vh] w-full overflow-hidden mb-16 sm:h-[60vh]">
        {/* VIDEO BACKGROUND */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/liwanag.mp4" type="video/mp4" />
        </video>

        {/* Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent"></div>

        {/* Bottom Fade (blend to black) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cinema-black to-transparent"></div>

        {/* TEXT CONTENT */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-10 lg:px-20">
          <div className="max-w-2xl space-y-5 sm:max-w-xl">
            <span className="inline-flex px-3 py-1 bg-ub-maroon text-xs text-white rounded-lg">
              Top 10 – Highlight Film
            </span>

            <h1 className="text-4xl font-bold drop-shadow-lg sm:text-6xl">
              {featured.title}
            </h1>

            <p className="text-gray-300 drop-shadow-md text-sm sm:text-base">
              {featured.creator} • 2026 • Student Film
            </p>

            <div className="flex flex-wrap items-center gap-3 text-gray-200">
              {renderRatingStars(featured.rating)}
              <span className="text-sm">
                {featured.rating.toFixed(1)} / 5
              </span>
            </div>

            <p className="text-gray-200 text-sm max-w-xl drop-shadow-lg">
              An award-winning short film exploring a young artist finding her
              voice amidst the challenges of modern society.
            </p>

            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center">
              <button className="min-w-[150px] rounded-full border border-white/10 bg-white px-6 py-3 font-medium text-black shadow-sm hover:shadow-md">
                Play Now
              </button>
              <button className="min-w-[150px] rounded-full border border-[#D4AF37]/20 bg-[#8B0000] px-6 py-3 text-white shadow-sm hover:bg-[#a00000]">
                More Info
              </button>
              <button className="min-w-[150px] rounded-full bg-[#D4AF37] px-6 py-3 text-[#120808] shadow-sm hover:bg-[#e2c15b]">
                View in 3D Gallery
              </button>
            </div>
          </div>
        </div>
      </header>

      <Section title="Recommended For You" films={mockFilms} />
      <Section title="Trending Now" films={mockFilms} />
      <Section title="Top Rated" films={mockFilms} />
    </>
  );
}

//
// ================= STUDENT FILMS TAB =================
//

function StudentFilmsTab() {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-white">Student Films</h2>
      <Section title="" films={mockFilms} />
    </div>
  );
}

//
// ================= MUSIC FILMS TAB =================
//

function MusicFilmsTab() {
  const music = mockFilms.slice(0, 4); // Example filtered list

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-white">Music Films</h2>
      <Section title="" films={music} />
    </div>
  );
}

function MyListTab({ films, setFilms }) {
  const removeFilm = (filmId) => {
    setFilms((current) => current.filter((film) => film.id !== filmId));
  };

  const openPreview = (film) => {
    window.dispatchEvent(
      new CustomEvent("ub-sining:preview-film", {
        detail: { film },
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">My List</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Saved movies in your view</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/65">
          Films you add from the preview card appear here automatically so you can return to them later.
        </p>
      </div>

      {films.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {films.map((film) => (
            <div key={film.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-[#171315] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={film.thumbnail} alt={film.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-full bg-[#8B0000]/90 px-3 py-1 text-[11px] font-semibold text-white">
                  In My List
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">{film.title}</h3>
                  <p className="text-sm text-white/55">Directed by {film.creator}</p>
                </div>
                <p className="text-sm leading-6 text-white/70">{film.description}</p>
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-white/45">
                  <span>{film.category}</span>
                  <span>{film.duration}</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => openPreview(film)}
                    className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#120808] transition hover:bg-[#e2c15b]"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFilm(film.id)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-white/10 bg-[#171315] p-8 text-center text-white/70">
          <p className="text-lg font-semibold text-white">Your list is empty</p>
          <p className="mt-2 text-sm text-white/55">
            Open a movie preview and press My List to save it here.
          </p>
        </div>
      )}
    </div>
  );
}

function FilmPreviewOverlay({ film, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-[#D4AF37]/15 bg-[#171315] text-white shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        <button
          onClick={onClose}
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
                  <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-white/90">
                    <Play className="h-4 w-4" fill="currentColor" />
                    Play
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                    <Plus className="h-4 w-4" />
                    My List
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                    <Info className="h-4 w-4" />
                    More Info
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/75">
                  <span>{film.rating.toFixed(1)} rating</span>
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

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#e2c15b]"
              >
                Back to My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryTab() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-[#120c0c] via-[#2a1111] to-[#5f0000] text-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8 lg:p-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              <GalleryHorizontalEnd className="h-4 w-4" />
              3D Cinema Gallery
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Step into the UB Sining hallway</h2>
              <p className="max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                Explore the virtual cinema corridor, move through featured posters, and jump directly into a film preview from the hallway.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#e2c15b]">
                Enter Hallway
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                <ScreenShare className="h-4 w-4" />
                View on Screen
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Immersive hall", value: "Interactive" },
                { label: "Featured walls", value: "Student films" },
                { label: "Mode", value: "3D showcase" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[24rem] overflow-hidden rounded-[26px] border border-white/10 bg-[#0d0d10]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.2),_transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,rgba(255,255,255,0.06)_20%,transparent_20%,transparent_80%,rgba(255,255,255,0.06)_80%,transparent_100%),linear-gradient(180deg,transparent_0,rgba(255,255,255,0.06)_20%,transparent_20%,transparent_80%,rgba(255,255,255,0.06)_80%,transparent_100%)] bg-[length:100%_100%]" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#D4AF37]/25 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[18rem] w-[80%] max-w-md">
                <div className="absolute inset-x-0 bottom-0 mx-auto h-4 w-3/4 rounded-full bg-black/60 blur-2xl" />
                <div className="absolute inset-x-0 top-8 mx-auto h-[15rem] w-[88%] rounded-[28px] border border-[#D4AF37]/20 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]" />
                <div className="absolute inset-x-0 top-10 mx-auto h-[14rem] w-[80%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-0 top-16 mx-auto h-[12rem] w-[68%] rounded-[20px] border border-[#D4AF37]/25 bg-gradient-to-b from-[#251313] to-[#0f0f13]" />
                <div className="absolute inset-x-0 top-20 mx-auto h-[10rem] w-[54%] rounded-[18px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_55%),linear-gradient(180deg,rgba(139,0,0,0.45),rgba(0,0,0,0.75))]" />

                <div className="absolute left-4 top-24 h-24 w-12 rounded-2xl border border-white/10 bg-white/10 shadow-lg" />
                <div className="absolute right-4 top-24 h-24 w-12 rounded-2xl border border-white/10 bg-white/10 shadow-lg" />
                <div className="absolute left-8 bottom-10 h-16 w-20 rounded-2xl border border-white/10 bg-[#D4AF37]/10" />
                <div className="absolute right-8 bottom-10 h-16 w-20 rounded-2xl border border-white/10 bg-[#D4AF37]/10" />

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <Camera className="h-10 w-10 text-[#D4AF37]" />
                  <p className="text-xs uppercase tracking-[0.3em] text-white/55">Hallway View</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Now playing in gallery</p>
                <p className="text-sm font-semibold text-white">Feature posters and hallway projections</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-white/90">
                Open Gallery View
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Section title="Featured in the Hallway" films={mockFilms} />
    </div>
  );
}

//
// ================= PORTFOLIO TAB =================
//

function PortfolioTab() {
  const [activePortfolioTab, setActivePortfolioTab] = useState("projects");
  const userFilms = mockFilms.slice(0, 2); // Example mock user uploads

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">My Portfolio</h2>
          <p className="text-sm text-white/55">
            Manage your films and submit new work for review.
          </p>
        </div>

        <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-sm">
          <button
            type="button"
            onClick={() => setActivePortfolioTab("projects")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              activePortfolioTab === "projects"
                ? "bg-[#8B0000] text-white shadow-sm"
                : "bg-transparent text-white/70 hover:bg-white/10"
            }`}
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => setActivePortfolioTab("upload")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              activePortfolioTab === "upload"
                ? "bg-[#D4AF37] text-black shadow-sm"
                : "bg-transparent text-white/70 hover:bg-white/10"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setActivePortfolioTab("studio")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              activePortfolioTab === "studio"
                ? "bg-[#8B0000] text-white shadow-sm"
                : "bg-transparent text-white/70 hover:bg-white/10"
            }`}
          >
            Studio
          </button>
        </div>
      </div>

      {activePortfolioTab === "projects" ? (
        <Section title="Your Projects" films={userFilms} />
      ) : activePortfolioTab === "upload" ? (
        <FilmUploadPortal />
      ) : (
        <DirectorsStudio />
      )}
    </div>
  );
}

//
// ================= REUSABLE SECTION =================
//

function Section({ title, films }) {
  return (
    <div className="mt-10">
      {title && (
        <h3 className="mb-4 text-2xl font-semibold text-white">
          {title}
        </h3>
      )}
      <CategoryRow title="" films={films} />
    </div>
  );
}
