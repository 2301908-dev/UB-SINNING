import logoSrc from "../../assets/ublogo.png";

export default function UBLogo({
  size = 48,
  titleClass = "text-[#8B0000]",
  subtitleClass = "text-gray-400",
  hideSubtitle = false,
  titleSizeClass = "text-xl",
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoSrc}
        alt="UB SINING Logo"
        width={size}
        height={size}
        className="rounded-full"
      />

      <div className="flex flex-col -ml-2 mt-2">
        <span className={`${titleClass} ${titleSizeClass} font-bold whitespace-nowrap`}>UB-SINING</span>
        {!hideSubtitle && (
          <span className={`${subtitleClass} text-xs tracking-wide`}>STUDENT FILM SHOWCASE</span>
        )}
      </div>
    </div>
  );
}