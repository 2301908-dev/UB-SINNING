export default function UBLogo({
  size = 60,
  titleClass = "text-white",
  titleSizeClass = "text-xl",
  titleWeightClass = "font-bold",
  subtitleClass = "text-gray-400"
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/src/assets/ublogo.png"
        alt="University of Batangas Logo"
        width={size}
        height={size}
        className="rounded-full"
      />

      <div className="flex flex-col">
        <span className={`${titleClass} ${titleSizeClass} ${titleWeightClass}`}>UB SINING</span>
        <span className={`${subtitleClass} text-xs tracking-wide`}>STUDENT FILM SHOWCASE</span>
      </div>
    </div>
  );
}
