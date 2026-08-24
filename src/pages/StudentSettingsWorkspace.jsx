import { ArrowLeft } from "lucide-react";
import SettingsControlPanel from "../components/student/SettingsControlPanel";

export default function StudentSettingsWorkspace({ onBack, initialTab = "profile" }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.22),transparent_32%),linear-gradient(180deg,#120808_0%,#1a0d0d_46%,#0c0b0b_100%)] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <SettingsControlPanel embedded initialTab={initialTab} />
      </div>
    </div>
  );
}
