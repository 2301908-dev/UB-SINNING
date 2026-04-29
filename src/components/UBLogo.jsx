export default function UBLogo({ size = 60 }) {
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
        <span className="text-white text-xl font-bold">UB SINING</span>
        <span className="text-xs text-gray-400 tracking-wide">
          STUDENT FILM SHOWCASE
        </span>
      </div>
    </div>
  );
}
