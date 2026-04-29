import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UBLogo from "../components/UBLogo";

export default function LoginPage() {
  const { login } = useAuth();
  const [roleChoice, setRoleChoice] = useState(null);
  const [UBID, setUBID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login success — in real app validate UBID + password
    if (UBID && password && roleChoice) {
      login(roleChoice);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-black p-6">
      <div className="glass p-10 rounded-2xl w-full max-w-md space-y-8">

        <div className="flex justify-center">
          <UBLogo />
        </div>

        {!roleChoice && (
          <div className="space-y-6 text-center">
            <h1 className="text-2xl font-semibold text-white">Choose Your Role</h1>

            <button
              onClick={() => setRoleChoice("student")}
              className="w-full py-3 bg-ub-maroon text-white rounded-lg hover:bg-ub-maroon-light"
            >
              Student Login
            </button>

            <button
              onClick={() => setRoleChoice("admin")}
              className="w-full py-3 bg-cinema-gray text-white rounded-lg border border-gray-700 hover:border-ub-gold"
            >
              Admin Login
            </button>
          </div>
        )}

        {/* =============================== */}
        {/*   UB CREDENTIALS LOGIN FORM     */}
        {/* =============================== */}

        {roleChoice && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h1 className="text-xl text-white font-semibold text-center">
              {roleChoice === "student" ? "Student Login" : "Admin Login"}
            </h1>

            {/* UB ID */}
            <div>
              <label className="text-sm text-gray-300">UB ID</label>
              <input
                type="text"
                value={UBID}
                onChange={(e) => setUBID(e.target.value)}
                placeholder="e.g. 2024-00123"
                className="w-full mt-1 p-3 bg-cinema-gray text-white rounded-lg border border-gray-700 focus:border-ub-gold outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 p-3 bg-cinema-gray text-white rounded-lg border border-gray-700 focus:border-ub-gold outline-none"
              />
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" className="accent-ub-maroon" />
                Remember me
              </label>

              <button
                type="button"
                className="text-ub-gold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-ub-maroon text-white rounded-lg hover:bg-ub-maroon-light"
            >
              Log In
            </button>

            {/* OR */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Login w/ UB Mail */}
            <button
              type="button"
              className="w-full py-3 bg-cinema-gray text-white rounded-lg border border-gray-700 hover:border-ub-gold"
              onClick={() => login(roleChoice)}
            >
              Log in with UB Mail
            </button>

            {/* Back button */}
            <button
              type="button"
              className="mt-4 w-full text-gray-400 hover:text-white text-sm"
              onClick={() => setRoleChoice(null)}
            >
              ← Back to role selection
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
