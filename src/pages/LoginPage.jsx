import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";
import { mockFilms } from "../data/mockFilms";
import { X } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [UBID, setUBID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (UBID && password) {
      login("student");
    }
  };

  const handleAdminAccess = () => {
    login("admin");
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-90"
          src="/liwanag.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <UBLogo titleClass="text-black" subtitleClass="text-gray-600" />
          <button
            onClick={() => setShowLoginModal(true)}
            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-sm transition duration-300 hover:bg-[#c79e2d] hover:shadow-lg"
          >
            Enter Gallery
          </button>
        </header>

        <main className="mt-12 grid gap-16 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#FAFAFA] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#8B0000] shadow-sm">
              University of Batangas Official Cinema
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#8B0000] sm:text-5xl lg:text-6xl">
              UB SINING
            </h1>

            <p className="max-w-2xl text-lg text-gray-700 sm:text-xl">
              A refined academic showcase for world-class student cinema, blending curated film programming with immersive digital gallery design.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-sm transition duration-300 hover:bg-[#c79e2d] hover:scale-105"
              >
                Enter Gallery
              </button>
              <button
                onClick={handleAdminAccess}
                className="inline-flex items-center justify-center rounded-full border border-[#8B0000] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B0000] transition duration-300 hover:bg-[#F5F5F7] hover:scale-105"
              >
                Admin Dashboard
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full border border-[#8B0000] bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B0000] transition duration-300 hover:bg-[#F5F5F7] hover:scale-105"
              >
                Watch Trailer
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[32px] border border-[#E0D6B7] bg-[#F5F5F7] p-6 shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-sm uppercase tracking-[0.25em] text-[#8B0000]">Cinematic Showcase</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Netflix-style gallery</h2>
              <p className="mt-3 text-sm text-gray-600">
                Browse a carefully curated film collection designed for academic presentation and cinematic appreciation.
              </p>
            </div>
            <div className="rounded-[32px] border border-[#E0D6B7] bg-[#F5F5F7] p-6 shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-sm uppercase tracking-[0.25em] text-[#8B0000]">VR Immersion</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">A-Frame 3D hallway</h2>
              <p className="mt-3 text-sm text-gray-600">
                Experience a polished virtual exhibition space with subtle depth and refined navigation.
              </p>
            </div>
            <div className="rounded-[32px] border border-[#E0D6B7] bg-[#F5F5F7] p-6 shadow-sm transition duration-300 hover:shadow-md">
              <p className="text-sm uppercase tracking-[0.25em] text-[#8B0000]">AI Powered</p>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Automated screening</h2>
              <p className="mt-3 text-sm text-gray-600">
                Use intelligent evaluation and sentiment analysis to highlight the strongest student work.
              </p>
            </div>
          </div>
        </main>

        <section className="mt-20 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Trending Now</p>
              <h2 className="mt-2 text-3xl font-semibold text-gray-900">Featured premieres</h2>
            </div>
            <p className="text-sm text-gray-500">Presented in a gallery-style portrait showcase.</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {mockFilms.slice(0, 3).map((film) => (
              <div
                key={film.id}
                className="min-w-[180px] max-w-[180px] flex-none overflow-hidden rounded-[28px] border border-[#E5E5E5] bg-[#FAFAFA] shadow-sm transition duration-300 hover:shadow-md hover:scale-105"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-black">
                  <img src={film.thumbnail} alt={film.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2 px-3 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{film.category}</p>
                  <h3 className="text-sm font-semibold text-gray-900">{film.title}</h3>
                  <p className="text-xs text-gray-600">{film.creator}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 px-4 py-6">
          <div className="relative w-full max-w-xl rounded-[32px] border border-gray-200 bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-8">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-gray-100 p-2 text-gray-700 transition hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 rounded-[28px] border border-gray-200 bg-[#FAFAFA] px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#8B0000]/10 p-2">
                  <img
                    src="/src/assets/ublogo.png"
                    alt="UB Seal"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8B0000]">University SSO</p>
                  <h2 className="text-xl font-semibold text-gray-900">UB Login Portal</h2>
                  <p className="text-sm text-gray-600">Secure access for UB students</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-gray-700">UB Email</label>
                <input
                  type="text"
                  value={UBID}
                  onChange={(e) => setUBID(e.target.value)}
                  placeholder="username@ub.edu.ph"
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-gray-900 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-gray-900 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#8B0000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-[#c79e2d] hover:scale-105"
              >
                Continue
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>Secure UB SSO access</span>
              <span>Student Portal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
