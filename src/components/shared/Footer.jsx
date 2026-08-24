import facebookIcon from "../../assets/icons/Facebook.png";
import xIcon from "../../assets/icons/x_logo_PNG3.png";
import youtubeIcon from "../../assets/icons/Youtube.png";
import instagramIcon from "../../assets/icons/instagram.webp";

export default function Footer() {
  return (
    <footer className="border-t border-[#374151] bg-black py-6 text-white">
      <div className="flex justify-center">
        <div className="flex items-center justify-center gap-3">
            <a href="https://www.facebook.com/ubatangas/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition hover:bg-[#D4AF37]">
              <img src={facebookIcon} alt="" className="h-5 w-5 object-contain" />
            </a>
            <a href="https://x.com/ubatangas" target="_blank" rel="noreferrer" aria-label="X" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition hover:bg-[#D4AF37]">
              <img src={xIcon} alt="" className="h-5 w-5 object-contain" />
            </a>
            <a href="https://www.linkedin.com/school/ubatangas/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition hover:bg-[#D4AF37]">
              <span className="text-xl font-bold leading-none text-[#172554]" aria-hidden="true">in</span>
            </a>
            <a href="https://www.youtube.com/@universityofbatangas1946" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition hover:bg-[#D4AF37]">
              <img src={youtubeIcon} alt="" className="h-5 w-5 object-contain" />
            </a>
            <a href="https://www.instagram.com/ubatangas" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition hover:bg-[#D4AF37]">
              <img src={instagramIcon} alt="" className="h-5 w-5 object-contain" />
            </a>
          </div>
      </div>
    </footer>
  );
}
