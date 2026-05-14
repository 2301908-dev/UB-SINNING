    import { useState } from "react";
    import { useAuth } from "../context/AuthContext";

    // ─── Data ─────────────────────────────────────────────────────────────────────

    const ROLES = [
    { key: "student", label: "Student",       desc: "Access films & your watchlist",  icon: "/src/assets/icons/student.png" },
    { key: "faculty", label: "Faculty",        desc: "Manage submissions & reviews",   icon: "/src/assets/icons/teacher.png" },
    { key: "admin",   label: "Administrator",  desc: "System & user management",       icon: "/src/assets/icons/admin.png"   },
    ];

    const ACCENT       = "#8B0000";
    const ACCENT_HOVER = "#6b0000";
    const ACCENT_LIGHT = "rgba(139,0,0,0.10)";
    const GOLD         = "#ffc400";

    // ─── Left Panel ───────────────────────────────────────────────────────────────


    function LeftPanel({ selectedRole, onSelectRole, onBack }) {    
    return (
        <div
        style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            background: "linear-gradient(160deg, #6b0000 0%, #8B0000 50%, #5a0000 100%)",
            minHeight: "100vh",
            width: "28%",
            flexShrink: 0,
            padding: "24px 48px 44px 48px", // Reduced top padding from 44px to 24px
        }}
        >
        {/* Decorative circles */}
        <div style={{
            position: "absolute", top: "-80px", left: "-80px",
            width: "320px", height: "320px", borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }} />
        <div style={{
            position: "absolute", bottom: "-60px", right: "-100px",
            width: "380px", height: "380px", borderRadius: "50%", pointerEvents: "none",
            background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)",
        }} />

        <div style={{ position: "relative", zIndex: 10 }}>

            {/* Wrapper: Adjusted marginTop to nudge it even higher */}
            <div style={{ 
            height: "60px", 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "10px", // Reduced margin bottom to tighten space with logo
            marginTop: "-10px"    // Added negative margin to pull it up further
            }}>
            <button
                onClick={onBack}
                style={{
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                padding: "12px 20px",
                marginLeft: "-12px",
                fontSize: "16px",
                fontWeight: 600, 
                color: "rgba(246, 246, 246, 0.7)", 
                fontFamily: "'Poppins', sans-serif",
                background: "rgba(255, 0, 0, 0.05)",
                borderRadius: "12px",
                border: "none", 
                cursor: "pointer", 
                transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateX(0)";
                }}
            >
                <img 
                src="/src/assets/icons/left-arrow.png" 
                alt="Back" 
                style={{ 
                    width: "22px", 
                    height: "22px", 
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)", 
                    opacity: 0.9
                }} 
                />
                Back to Home
            </button>
            </div> 
                
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}></div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                <div style={{
                    width: "52px", height: "52px", borderRadius: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", flexShrink: 0,
                    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)",
                }}>
                    <img
                    src="/src/assets/ublogo.png"
                    alt="UB Sining"
                    style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", transform: "scale(1.7)" 
                    }}
                    />
                </div>
                <div>
                    <p style={{
                    color: "#ffffff", fontSize: "27px", fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif", letterSpacing: "0.04em", lineHeight: 1, margin: 0,
                    }}>
                    UB SINING
                    </p>
                    <p style={{
                    color: GOLD, fontSize: "13px", textTransform: "uppercase",
                    letterSpacing: "0.12em", fontFamily: "'Poppins', sans-serif", marginTop: "4px",
                    }}>
                    Student Film Portal
                    </p>
                </div>
                </div>

            <div style={{ margin: "28px 0", height: "1px", background: "rgba(255,255,255,0.15)" }} />

            <p style={{
            fontSize: "22px", fontWeight: 700, 
            color: "rgb(255, 255, 255)", fontFamily: "'Poppins', sans-serif", marginBottom: "16px",
            }}>
            Sign in as
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {ROLES.map((r) => {
                const isActive = selectedRole === r.key;
                return (
                <button
                    key={r.key}
                    onClick={() => onSelectRole(r.key)}
                    style={{    
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "15px 16px", borderRadius: "14px", textAlign: "left",
                    width: "100%", cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s ease",
                    background: isActive ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.95)",
                    border: isActive ? "1.5px solid rgb(255, 255, 254)" : "1.5px solid rgba(255,255,255,0.6)",
                    boxShadow: isActive ? "0 4px 16px rgba(139,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    }}      
                    onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.background = "#ffc553";   
                        e.currentTarget.style.borderColor = "#ffc553";
                    }
                    const label = e.currentTarget.querySelector(".role-label");
                    const desc  = e.currentTarget.querySelector(".role-desc");
                    const img   = e.currentTarget.querySelector(".role-icon");
                    if (label) label.style.color = isActive ? ACCENT : "#000000";
                    if (desc)  desc.style.color  = isActive ? "#888" : "rgba(0, 0, 0, 0.75)";
                    if (img && !isActive) img.style.filter = "brightness(0) invert(1)";
                    }}
                    onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    }
                    const label = e.currentTarget.querySelector(".role-label");
                    const desc  = e.currentTarget.querySelector(".role-desc");
                    const img   = e.currentTarget.querySelector(".role-icon");
                    if (label) label.style.color = ACCENT;
                    if (desc)  desc.style.color  = "#888";
                    if (img)   img.style.filter  = "none";
                    }}
                >
                    {/* Icon bubble */}
                    <div style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    background: isActive ? "rgba(139,0,0,0.10)" : "rgba(139,0,0,0.06)",
                    }}>
                    <img
                        className="role-icon"
                        src={r.icon}
                        alt={r.label}
                        style={{ width: "22px", height: "22px", objectFit: "contain" }}
                    />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="role-label" style={{
                        fontSize: "14px", fontWeight: 600, color: ACCENT,
                        margin: 0, lineHeight: 1, marginBottom: "4px",
                    }}>
                        {r.label}
                    </p>
                    <p className="role-desc" style={{
                        fontSize: "11px", color: "#888888", margin: 0, lineHeight: 1.4,
                    }}>
                        {r.desc}
                    </p>
                    </div>

                    {isActive && (
                    <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: GOLD, flexShrink: 0,
                    }} />
                    )}
                </button>
                );
            })}
            </div>
        </div>

        <p style={{
            position: "relative", zIndex: 10,
            fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'Poppins', sans-serif",
        }}>
            © {new Date().getFullYear()} UB Sining — University of Batangas
        </p>
        </div>
    );
    }

    // ─── Right Panel ──────────────────────────────────────────────────────────────

    function RightPanel({ selectedRole, onLogin }) {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const role = ROLES.find((r) => r.key === selectedRole) || ROLES[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); onLogin(selectedRole); }, 600);
    };

    const portalLabels  = { student: "Student Portal",  faculty: "Faculty Portal",  admin: "Admin Portal"  };
    const welcomeLabels = { student: "Welcome back",     faculty: "Welcome back",    admin: "Admin access"  };
    const subtitles     = {
        student: "Sign in to continue to your dashboard",
        faculty: "Sign in to manage your courses & submissions",
        admin:   "Restricted access — authorized personnel only",
    };
    const placeholders  = {
        student: "e.g. 2301947",
        faculty: "e.g. 2301947",
        admin:   "e.g. 2301947",
    };

    const inputStyle = {
        width: "100%", paddingLeft: "46px", paddingRight: "16px",
        paddingTop: "16px", paddingBottom: "16px", borderRadius: "16px",
        fontSize: "15px", outline: "none", background: "#F9FAFB",
        border: "1.5px solid #E5E7EB", fontFamily: "'Poppins', sans-serif",
        color: "#111827", transition: "all 0.2s ease", boxSizing: "border-box",
    };

    return (
        <div style={{
        flex: 1, 
        minHeight: "100vh", 
        background: "#F3F4F6", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "40px",
        }}>
        {/* ENLARGED BOX CONTAINER */}
        <div style={{ 
            maxWidth: "540px", // Increased from 480px
            width: "100%", 
            background: "#ffffff", 
            padding: "54px",    // Increased padding for more internal space
            borderRadius: "32px", 
            boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.12)",
            border: "1px solid rgba(0,0,0,0.05)",
            transition: "transform 0.3s ease",
        }}>

            {/* Portal badge */}
            <div style={{ marginBottom: "28px" }}>
            <span style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "8px 18px", borderRadius: "999px",
                fontSize: "12px", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.2em",
                background: ACCENT_LIGHT, color: ACCENT,
                border: `1px solid rgba(139,0,0,0.15)`,
                fontFamily: "'Poppins', sans-serif",
            }}>
                <img src={role.icon} alt={role.label} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                {portalLabels[selectedRole]}
            </span>
            </div>

            {/* Headline */}
            <h1 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
            fontSize: "36px", color: "#111827",
            letterSpacing: "-1px", marginBottom: "8px", lineHeight: 1.1,
            }}>
            {welcomeLabels[selectedRole]}
            </h1>
            <p style={{ fontSize: "16px", color: "#9CA3AF", fontFamily: "'Poppins', sans-serif", marginBottom: "40px" }}>
            {subtitles[selectedRole]}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            
            {/* User ID Input */}
            <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "10px", color: "#374151", fontFamily: "'Poppins', sans-serif" }}>
                User ID
                </label>
                <div style={{ position: "relative" }}>  
                <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center" }}>
                    <img src="/src/assets/icons/email.png" alt="User Icon" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </span>
                <input
                    type="text" value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder={placeholders[selectedRole]} style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.border = `1.5px solid ${ACCENT}`; e.currentTarget.style.boxShadow = `0 0 0 4px ${ACCENT_LIGHT}`; }}
                    onBlur={(e)  => { e.currentTarget.style.border = "1.5px solid #E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
                />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "10px", color: "#374151", fontFamily: "'Poppins', sans-serif" }}>
                Password
                </label>
                <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center" }}>
                    <img src="/src/assets/icons/lock.png" alt="Lock Icon" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                </span>
                <input
                    type="password" value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter your password" style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.border = `1.5px solid ${ACCENT}`; e.currentTarget.style.boxShadow = `0 0 0 4px ${ACCENT_LIGHT}`; }}
                    onBlur={(e)  => { e.currentTarget.style.border = "1.5px solid #E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
                />
                </div>
            </div>

            {/* Remember & Forgot */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: ACCENT, cursor: "pointer" }} />
                <span style={{ fontSize: "14px", color: "#6B7280", fontFamily: "'Poppins', sans-serif" }}>Remember me</span>
                </label>
                <button type="button" style={{ fontSize: "14px", fontWeight: 600, color: ACCENT, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                >
                Forgot password?
                </button>
            </div>

            {error && <p style={{ fontSize: "13px", color: "#ef4444", marginTop: "-10px", fontWeight: 500 }}>{error}</p>}

            <button type="submit" disabled={loading} style={{
                width: "100%", padding: "18px", borderRadius: "16px", border: "none",
                color: "#ffffff", fontSize: "16px", fontWeight: 700, fontFamily: "'Poppins', sans-serif",
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_HOVER} 100%)`,
                boxShadow: "0 8px 25px rgba(139,0,0,0.3)",
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; } }}
            >
                {loading ? "Signing in…" : `Sign in as ${role.label}`}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "10px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
                <span style={{ fontSize: "13px", color: "#D1D5DB", fontWeight: 500 }}>OR</span>
                <div style={{ flex: 1, height: "1px", background: "#F3F4F6" }} />
            </div>

            <button type="button" style={{
                width: "100%", padding: "16px", borderRadius: "16px", fontSize: "15px", 
                fontWeight: 600, color: "#374151", border: "1.5px solid #E5E7EB", 
                background: "#ffffff", cursor: "pointer", display: "flex", justifyContent: "center", gap: "12px",
                transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
            >
                <img src="/src/assets/icons/google.png" alt="Google" style={{ width: "20px", height: "20px" }} />
                Log in using UB Mail
            </button>
            </form>

            <p style={{ marginTop: "36px", textAlign: "center", fontSize: "14px", color: "#9CA3AF" }}>
            Need help? <button style={{ background: "none", border: "none", color: ACCENT, fontWeight: 600, cursor: "pointer", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >Contact IT Support</button>
            </p>
        </div>
        </div>
    );
    }

    // ─── Root Export ──────────────────────────────────────────────────────────────

    export default function SignInPage({ onBack }) {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState("student");

    return (
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
        <LeftPanel selectedRole={selectedRole} onSelectRole={setSelectedRole} onBack={onBack} />
        <RightPanel selectedRole={selectedRole} onLogin={login} />
        </div>
    );
    }   