import UBLogo from "../components/shared/UBLogo";
import backgroundImage from "../assets/white_bg.jpg";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-8">
        <UBLogo size={72} titleSizeClass="text-3xl" />
      </div>

      <h1 className="text-8xl font-bold text-[#8B0000] leading-none">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-500 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-medium hover:bg-[#6b0000] transition cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
}
