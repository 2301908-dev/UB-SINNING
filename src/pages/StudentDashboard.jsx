import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import { mockFilms } from "../data/mockFilms";
import CategoryRow from "../components/CategoryRow";
import DirectorsStudio from "../components/DirectorsStudio";
import FilmUploadPortal from "../components/FilmUploadPortal";
import Footer from "../components/Footer";
import { Bell, Search, Star, StarHalf } from "lucide-react";

function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }).map((_, idx) => (
        <Star key={`full-${idx}`} className="w-4 h-4 text-ub-gold" fill="currentColor" />
      ))}
      {hasHalf && <StarHalf key="half" className="w-4 h-4 text-ub-gold" />}
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
    { id: "home", label: "Home" },
    { id: "studentFilms", label: "Student Films" },
    { id: "musicFilms", label: "Music Films" },
    { id: "portfolio", label: "My Portfolio" },
  ];

  // Featured Film
  const featured = mockFilms[0];

  return (
    <div
      className="relative min-h-screen text-slate-900 bg-cover bg-center"
      style={{ backgroundImage: "url('/studentbackround.png')" }}
    > 
      <div className="pointer-events-none absolute inset-0 bg-slate-950/10" />
      <div className="relative z-10">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white text-slate-900 flex flex-col gap-6 px-4 py-6 border-b border-gray-200 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <UBLogo titleClass="text-[#8B0000]" subtitleClass="text-gray-500" />
          <div className="flex gap-4 lg:hidden">
            <button className="rounded-full bg-[#FFF4D4] p-3 text-[#8B0000] hover:bg-[#F3E1A1]">
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
              className={`text-sm font-medium pb-1 transition ${
                activeTab === tab.id
                  ? "text-[#8B0000] border-b-2 border-[#8B0000]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + Notifications + Logout */}
        <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Search showcases..."
              className="bg-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full text-sm text-gray-900"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative notif-area hidden sm:block">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="text-gray-600 hover:text-black transition" />
                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full bg-ub-maroon flex items-center justify-center text-white">
                  {notifications.length}
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 rounded-xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-xl p-3 z-50 animate-fade-in-up">
                  <h3 className="text-sm font-semibold mb-2 text-slate-900">
                    Notifications
                  </h3>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 bg-white rounded-lg border border-gray-200 hover:border-ub-gold transition flex flex-col"
                      >
                        <span className="text-sm text-slate-900">{n.text}</span>
                        <span className="text-xs text-gray-500">{n.time}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full text-xs text-slate-500 mt-3 hover:text-ub-maroon">
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            <button onClick={logout} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-slate-700 transition hover:border-ub-maroon hover:text-ub-maroon">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="px-4 py-10 sm:px-6 lg:px-10">
        {
          {
            home: <HomeTab featured={featured} />,
            studentFilms: <StudentFilmsTab />,
            musicFilms: <MusicFilmsTab />,
            portfolio: <PortfolioTab />,
          }[activeTab]
        }
      </main>
      <Footer />
      </div>
    </div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>

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

            <p className="text-black-300 drop-shadow-md text-sm sm:text-base">
              {featured.creator} • 2026 • Student Film
            </p>

            <div className="flex flex-wrap items-center gap-3 text-gray-200">
              {renderRatingStars(featured.rating)}
              <span className="text-sm">{featured.rating.toFixed(1)} / 5</span>
            </div>

            <p className="text-gray-200 text-sm max-w-xl drop-shadow-lg">
              An award-winning short film exploring a young artist finding her voice amidst the challenges of modern society.
            </p>

            <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center">
              <button className="min-w-[150px] bg-white text-black px-6 py-3 rounded-lg font-medium border border-gray-200 shadow-sm hover:shadow-md">
                Play Now
              </button>
              <button className="min-w-[150px] bg-ub-maroon px-6 py-3 rounded-lg text-black shadow-sm hover:bg-ub-maroon-light">
                More Info
              </button>
              <button className="min-w-[150px] bg-[#8B0000] px-6 py-3 rounded-lg text-white  shadow-sm hover:bg-[#c79e2d]">
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
      <h2 className="text-3xl font-bold mb-6">Student Films</h2>
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
      <h2 className="text-3xl font-bold mb-6">Music Films</h2>
      <Section title="" films={music} />
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
          <h2 className="text-3xl font-bold">My Portfolio</h2>
          <p className="text-sm text-gray-500">Manage your films and submit new work for review.</p>
        </div>

        <div className="inline-flex overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setActivePortfolioTab("projects")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              activePortfolioTab === "projects"
                ? "bg-[#8B0000] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-50"
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
                : "bg-white text-gray-700 hover:bg-gray-50"
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
                : "bg-white text-gray-700 hover:bg-gray-50"
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
      {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
      <CategoryRow title="" films={films} />
    </div>
  );
}
