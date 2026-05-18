import logoSrc from "../../assets/ublogo.png";

export default function Footer() {
  return (
    <footer className="bg-ub-maroon border-t-2 border-[#D4AF37] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="UB Sining Logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-xl font-semibold text-[#D4AF37]">UB Sining</span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/90">
              The Official Digital Media Repository of the University of Batangas. Empowering the next generation of Filipino filmmakers through AI and VR technology.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">The Cinema</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Student Gallery</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">VR Hallway</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Film Festivals</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Director Spotlight</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">The Studio</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Upload Portal</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">IP Guidelines</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Metadata Standards</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Version Control Help</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Institutional</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">University Home</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Office of Student Affairs</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Faculty Admin</a></li>
              <li><a href="#" className="transition-colors duration-200 hover:text-[#D4AF37]">Technical Support</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#660000]">
        <div className="mx-auto flex flex-col gap-3 px-4 py-4 text-sm text-white sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p className="leading-5">
            © 2026 University of Batangas. All Rights Reserved. | Content Moderation Powered by UB Sining AI Screening.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="transition duration-200 hover:text-[#D4AF37]" aria-label="Facebook">
              <img src="/facebook.png" alt="Facebook" className="h-5 w-5 object-contain" />
            </a>
            <a href="#" className="transition duration-200 hover:text-[#D4AF37]" aria-label="YouTube">
              <img src="/youtube.png" alt="YouTube" className="h-5 w-5 object-contain" />
            </a>
            <a href="#" className="transition duration-200 hover:text-[#D4AF37]" aria-label="Instagram">
              <img src="/instagram.png" alt="Instagram" className="h-5 w-5 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
