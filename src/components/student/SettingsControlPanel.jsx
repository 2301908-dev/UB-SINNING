import { useEffect, useState } from "react";
import { User, ShieldCheck, Bell, KeyRound, Loader, Save, X, CheckCircle2, Play, Link2 } from "lucide-react";

export default function SettingsControlPanel({ onClose, initialTab = "profile", embedded = false }) {
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

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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
    <div className={embedded ? "w-full" : "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"}>
      <div className={embedded ? "flex w-full min-h-0 flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#171315] text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)]" : "flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#171315] text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)]"}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Settings & Director Control</p>
            <h1 className="mt-2 text-2xl font-bold text-white">Manage your professional presence and content protection</h1>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-white/10"
            >
              <X className="h-5 w-5 text-white/60" />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Navigation */}
          <aside className="w-56 overflow-y-auto border-r border-white/10 bg-white/5">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#8B0000] text-white shadow-sm shadow-black/20"
                        : "text-white/70 hover:bg-white/10"
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
                    <h2 className="mb-1 text-xl font-bold text-white">Director Profile Customization</h2>
                    <p className="text-sm text-white/65">Manage your professional brand identity on the platform.</p>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
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
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>

                  {/* Studio Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
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
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>

                  {/* Director's Statement */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-medium text-white/75">
                        Director's Statement / Cinematic Bio
                      </label>
                      <span className="text-xs text-white/45">
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
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>

                  {/* External Portfolios */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">
                        Vimeo Portfolio Link
                      </label>
                      <div className="flex items-center gap-2">
                        <Play className="h-5 w-5 text-white/40" />
                        <input
                          type="url"
                          value={vimeoLink}
                          onChange={(e) => {
                            setVimeoLink(e.target.value);
                            handleStateChange();
                          }}
                          placeholder="vimeo.com/yourprofile"
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">
                        LinkedIn Profile
                      </label>
                      <div className="flex items-center gap-2">
                        <Link2 className="h-5 w-5 text-white/40" />
                        <input
                          type="url"
                          value={linkedinLink}
                          onChange={(e) => {
                            setLinkedinLink(e.target.value);
                            handleStateChange();
                          }}
                          placeholder="linkedin.com/in/yourprofile"
                          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
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
                    <h2 className="mb-1 text-xl font-bold text-white">Intellectual Property & Exhibition Safeguards</h2>
                    <p className="text-sm text-white/65">Protect your creative work and control its distribution.</p>
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
                    <h2 className="mb-1 text-xl font-bold text-white">Communication Preferences</h2>
                    <p className="text-sm text-white/65">Manage your notification channels and alerts.</p>
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
                    <h2 className="mb-1 text-xl font-bold text-white">Institutional Verification & Security</h2>
                    <p className="text-sm text-white/65">View and manage your account security settings.</p>
                  </div>

                  {/* Email Display */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/75">
                      Institutional Email Address
                    </label>
                    <input
                      type="email"
                      value="student.name@ub.edu.ph"
                      disabled
                      className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/45"
                    />
                  </div>

                  {/* Verification Badge */}
                  <div className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/20 bg-[#1f1618] p-4">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Verified UB Academic Account</p>
                      <p className="mt-0.5 text-xs text-white/60">Your identity has been verified through the University system</p>
                    </div>
                  </div>

                  {/* Session Termination */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-white/75">
                      Remote Session Management
                    </label>
                    <button
                      className="w-full rounded-lg border border-[#8B0000] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8B0000]/20"
                    >
                      Terminate All Remote Sessions
                    </button>
                    <p className="mt-2 text-xs text-white/55">This will log you out from all devices except the current one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-[#120d0e] px-8 py-4">
          <button
            onClick={handleDiscard}
            disabled={!hasChanges}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              hasChanges
                ? "text-white/75 hover:bg-white/10"
                : "cursor-not-allowed text-white/30"
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
                : "cursor-not-allowed bg-white/10 text-white/30"
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
    <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="flex-1 pt-1">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-[#8B0000]" : "bg-white/20"
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
    <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-white/20 text-[#8B0000] focus:ring-2 focus:ring-[#D4AF37]"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{description}</p>
      </div>
    </div>
  );
}
