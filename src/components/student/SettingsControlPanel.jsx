import { useState } from "react";
import { User, ShieldCheck, Bell, KeyRound, Loader, Save, X, CheckCircle2, Play, Link2 } from "lucide-react";

export default function SettingsControlPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Director Profile State
  const [displayName, setDisplayName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [directorBio, setDirectorBio] = useState("");
  const [vimeoLink, setVimeoLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  // Privacy & IP Protection State
  const [festivalMode, setFestivalMode] = useState(false);
  const [autoWatermark, setAutoWatermark] = useState(false);

  // Notification State
  const [facultyCritique, setFacultyCSritique] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  // Track changes
  const handleStateChange = () => {
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setHasChanges(false);
  };

  const handleDiscard = () => {
    setDisplayName("");
    setStudioName("");
    setDirectorBio("");
    setVimeoLink("");
    setLinkedinLink("");
    setFestivalMode(false);
    setAutoWatermark(false);
    setFacultyCSritique(true);
    setDeadlineReminders(true);
    setHasChanges(false);
  };

  const menuItems = [
    { id: "profile", label: "Director Profile", icon: User },
    { id: "privacy", label: "Privacy & IP", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "verification", label: "Account Security", icon: KeyRound },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#8B0000]">Settings & Director Control</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your professional presence and content protection</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Navigation */}
          <aside className="w-56 border-r border-gray-200 bg-gray-50 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#8B0000] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Content Workspace */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {/* Director Profile View */}
              {activeTab === "profile" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-[#8B0000] mb-1">Director Profile Customization</h2>
                    <p className="text-sm text-gray-600">Manage your professional brand identity on the platform.</p>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auteur Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => {
                        setDisplayName(e.target.value);
                        handleStateChange();
                      }}
                      placeholder="e.g., Maria Santos"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                    />
                  </div>

                  {/* Studio Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Production Studio Name
                    </label>
                    <input
                      type="text"
                      value={studioName}
                      onChange={(e) => {
                        setStudioName(e.target.value);
                        handleStateChange();
                      }}
                      placeholder="e.g., Santos Cinema Productions"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                    />
                  </div>

                  {/* Director's Statement */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Director's Statement / Cinematic Bio
                      </label>
                      <span className="text-xs text-gray-500">
                        {directorBio.length}/500 characters
                      </span>
                    </div>
                    <textarea
                      value={directorBio}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setDirectorBio(e.target.value);
                          handleStateChange();
                        }
                      }}
                      placeholder="Share your cinematic vision and artistic philosophy..."
                      maxLength={500}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition resize-none"
                    />
                  </div>

                  {/* External Portfolios */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vimeo Portfolio Link
                      </label>
                      <div className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={vimeoLink}
                          onChange={(e) => {
                            setVimeoLink(e.target.value);
                            handleStateChange();
                          }}
                          placeholder="vimeo.com/yourprofile"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <div className="flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          value={linkedinLink}
                          onChange={(e) => {
                            setLinkedinLink(e.target.value);
                            handleStateChange();
                          }}
                          placeholder="linkedin.com/in/yourprofile"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & IP Protection View */}
              {activeTab === "privacy" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-[#8B0000] mb-1">Intellectual Property & Exhibition Safeguards</h2>
                    <p className="text-sm text-gray-600">Protect your creative work and control its distribution.</p>
                  </div>

                  {/* Festival Mode */}
                  <ToggleOption
                    enabled={festivalMode}
                    onChange={(value) => {
                      setFestivalMode(value);
                      handleStateChange();
                    }}
                    title="Festival Mode"
                    description="Temporarily hide your films from the public streaming gallery and WebXR hallway to ensure submission compliance for external film festival rules (e.g., Cinemalaya)."
                  />

                  {/* Watermarking */}
                  <ToggleOption
                    enabled={autoWatermark}
                    onChange={(value) => {
                      setAutoWatermark(value);
                      handleStateChange();
                    }}
                    title="Automated Video Watermarking"
                    description="Enables an automatic 'Property of University of Batangas' digital overlay across your video preview timelines to discourage unauthorized frame captures or downloads."
                  />
                </div>
              )}

              {/* Notifications & Workflow View */}
              {activeTab === "notifications" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-[#8B0000] mb-1">Communication Preferences</h2>
                    <p className="text-sm text-gray-600">Manage your notification channels and alerts.</p>
                  </div>

                  {/* Faculty Critique Alerts */}
                  <CheckboxOption
                    checked={facultyCritique}
                    onChange={(value) => {
                      setFacultyCSritique(value);
                      handleStateChange();
                    }}
                    title="Faculty Critique Alerts"
                    description="Receive immediate automated application updates and email notifications when an instructor logs a timestamped critique or updates your evaluation grading rubric."
                  />

                  {/* Deadline Reminders */}
                  <CheckboxOption
                    checked={deadlineReminders}
                    onChange={(value) => {
                      setDeadlineReminders(value);
                      handleStateChange();
                    }}
                    title="System Deadline Reminders"
                    description="Opt-in to alerts regarding upcoming CICT department screening dates and final portfolio evaluation deadlines."
                  />
                </div>
              )}

              {/* Account Verification View */}
              {activeTab === "verification" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-[#8B0000] mb-1">Institutional Verification & Security</h2>
                    <p className="text-sm text-gray-600">View and manage your account security settings.</p>
                  </div>

                  {/* Email Display */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institutional Email Address
                    </label>
                    <input
                      type="email"
                      value="student.name@ub.edu.ph"
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center gap-3 p-4 bg-[#F9FAFB] border border-[#D4AF37] rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Verified UB Academic Account</p>
                      <p className="text-xs text-gray-600 mt-0.5">Your identity has been verified through the University system</p>
                    </div>
                  </div>

                  {/* Session Termination */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Remote Session Management
                    </label>
                    <button
                      className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm"
                    >
                      Terminate All Remote Sessions
                    </button>
                    <p className="text-xs text-gray-600 mt-2">This will log you out from all devices except the current one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-4 flex items-center justify-end gap-3">
          <button
            onClick={handleDiscard}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              hasChanges
                ? "text-gray-700 hover:bg-gray-200"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`px-6 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition ${
              hasChanges && !isSaving
                ? "bg-[#8B0000] hover:bg-[#6B0000] cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Structural Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toggle Option Component ─── */
function ToggleOption({ enabled, onChange, title, description }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1 pt-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-[#8B0000]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ─── Checkbox Option Component ─── */
function CheckboxOption({ checked, onChange, title, description }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="flex-shrink-0 w-5 h-5 rounded border-gray-300 text-[#8B0000] focus:ring-2 focus:ring-[#D4AF37] cursor-pointer mt-0.5"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
