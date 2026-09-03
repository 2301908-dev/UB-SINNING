import { useState } from "react";
import {
    ChevronDown,
    CheckCircle2,
    Clock,
    Lock,
    Save,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Star,
    TrendingUp,
    Unlock,
} from "lucide-react";

const MAROON = "#D4AF37";

function SectionCard({ eyebrow, title, description, children }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#1d1a2b] shadow-sm">
            <div className="border-b border-white/10 px-6 pb-5 pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                    {eyebrow}
                </span>
                <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
                {description && (
                    <p className="mt-1 text-sm text-white/60">{description}</p>
                )}
            </div>
            <div className="px-6 py-6">{children}</div>
        </section>
    );
}

function TextField({ label, hint, value, onChange, placeholder }) {
    return (
        <label className="block">  
            <span className="block text-sm font-medium text-white/90">
                {label}
            </span>
            {hint && (
                <span className="mt-0.5 block text-xs text-white/45">{hint}</span>
            )}
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/15 bg-black/20 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-transparent focus:ring-2"
                style={{ "--tw-ring-color": `${MAROON}99` }}
            />
        </label>
    );
}

function Select({ label, value, onChange, options }) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-white/90">
                {label}
            </span>
            <div className="relative mt-2">
                <select
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full appearance-none rounded-lg border border-white/15 bg-[#17141f] px-3.5 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-transparent focus:ring-2"
                    style={{ "--tw-ring-color": `${MAROON}99` }}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/45"
                />
            </div>
        </label>
    );
}

function PillToggle({ options, value, onChange }) {
    return (
        <div className="inline-flex max-w-full flex-wrap rounded-full bg-white/10 p-1">
            {options.map((option) => {
                const active = option.value === value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                        style={
                            active
                                ? { backgroundColor: MAROON, color: "white" }
                                : { color: "#d4d4d8" }
                        }
                    >
                        {option.icon}
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

function StatusBanner({ tone, icon, children }) {
    const tones = {
        open: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
        closed: "border-red-400/25 bg-red-400/10 text-red-300",
        auto: "border-sky-400/25 bg-sky-400/10 text-sky-300",
        manual: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    };

    return (
        <div
            className={`mt-4 flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${tones[tone]}`}
        >
            {icon}
            <span>{children}</span>
        </div>
    );
}

export default function GeneralSettings() {
    const [showcase, setShowcase] = useState({
        siteTitle: "UB Sining",
        tagline: "The University of Batangas Film Showcase",
        festivalYear: "UB Sining 2026",
    });
    const [savedShowcase, setSavedShowcase] = useState(showcase);
    const [showcaseSaved, setShowcaseSaved] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("open");
    const [defaultSort, setDefaultSort] = useState("recent");
    const [moderationMode, setModerationMode] = useState("manual");

    const showcaseDirty =
        showcase.siteTitle !== savedShowcase.siteTitle ||
        showcase.tagline !== savedShowcase.tagline ||
        showcase.festivalYear !== savedShowcase.festivalYear;

    const handleShowcaseSave = () => {
        setSavedShowcase(showcase);
        setShowcaseSaved(true);
        window.setTimeout(() => setShowcaseSaved(false), 2200);
    };

    return (
        <div className="mx-auto max-w-3xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-white">General Settings</h1>
                <p className="mt-1 text-sm text-white/60">
                    Platform-wide controls for the {savedShowcase.festivalYear} showcase.
                </p>
            </header>

            <div className="space-y-6">
                {/* Submission Status */}
                <SectionCard
                    eyebrow="Submissions"
                    title="Submission status"
                    description="Controls whether students can submit new films to the showcase."
                >
                    <PillToggle
                        value={submissionStatus}
                        onChange={setSubmissionStatus}
                        options={[
                            {
                                value: "open",
                                label: "Open Submissions",
                                icon: <Unlock size={15} />,
                            },
                            {
                                value: "closed",
                                label: "Closed Submissions",
                                icon: <Lock size={15} />,
                            },
                        ]}
                    />
                    {submissionStatus === "open" ? (
                        <StatusBanner tone="open" icon={<Unlock size={15} />}>
                            Students can currently submit new films.
                        </StatusBanner>
                    ) : (
                        <StatusBanner tone="closed" icon={<Lock size={15} />}>
                            Submissions are closed - students cannot submit new films until
                            this is reopened.
                        </StatusBanner>
                    )}
                </SectionCard>

                {/* Default Film Display */}
                <SectionCard
                    eyebrow="Display"
                    title="Default film display"
                    description="Sets how films are sorted by default on the public showcase page."
                >
                    <div className="max-w-xs">
                        <Select
                            label="Default sorting method"
                            value={defaultSort}
                            onChange={setDefaultSort}
                            options={[
                                { value: "recent", label: "Most Recent" },
                                { value: "featured", label: "Featured" },
                                { value: "rated", label: "Highest Rated" },
                            ]}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
                        {defaultSort === "recent" && <Clock size={15} />}
                        {defaultSort === "featured" && <Sparkles size={15} />}
                        {defaultSort === "rated" && <Star size={15} />}
                        <span>
                            Visitors will see films sorted by{" "}
                            <span className="font-medium text-white/85">
                                {defaultSort === "recent" && "most recent upload"}
                                {defaultSort === "featured" && "featured status"}
                                {defaultSort === "rated" && "highest audience rating"}
                            </span>{" "}
                            by default.
                        </span>
                    </div>
                </SectionCard>

                {/* Content Moderation Mode */}
                <SectionCard
                    eyebrow="Moderation"
                    title="Content moderation mode"
                    description="Determines whether uploaded films and comments require administrator approval."
                >
                    <PillToggle
                        value={moderationMode}
                        onChange={setModerationMode}
                        options={[
                            {
                                value: "auto",
                                label: "Auto-Approval",
                                icon: <TrendingUp size={15} />,
                            },
                            {
                                value: "manual",
                                label: "Manual Approval",
                                icon: <ShieldCheck size={15} />,
                            },
                        ]}
                    />
                    {moderationMode === "auto" ? (
                        <StatusBanner tone="auto" icon={<TrendingUp size={15} />}>
                            Uploaded films and comments appear immediately, without review.
                        </StatusBanner>
                    ) : (
                        <StatusBanner tone="manual" icon={<ShieldAlert size={15} />}>
                            Uploaded films and comments are held for administrator approval
                            before appearing.
                        </StatusBanner>
                    )}
                </SectionCard>
            </div>
        </div>
    );
}