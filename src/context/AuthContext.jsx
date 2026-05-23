import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

async function resolveRole(user) {
  // Consume any role the user explicitly selected on the sign-in page.
  const pendingRole = localStorage.getItem("pending_role");
  if (pendingRole) localStorage.removeItem("pending_role");

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  // If the user chose a role at sign-in, persist it and use it.
  if (pendingRole) {
    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert(
        { id: user.id, email: user.email, role: pendingRole, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      );
    if (upsertError) console.error("Error saving role:", upsertError);
    return pendingRole;
  }

  if (data?.role) return data.role;

  // No profile and no pending role — default to student.
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      { id: user.id, email: user.email, role: "student", updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
  if (upsertError) console.error("Error creating profile:", upsertError);

  return "student";
}

function cleanAuthCallbackUrl() {
  if (typeof window !== "undefined" && window.location.pathname === "/auth/callback") {
    window.history.replaceState({}, "", "/");
  }
}

async function applySession(session, { setUser, setRole, setError }) {
  if (!session?.user) {
    setUser(null);
    setRole(null);
    return;
  }

  const user = session.user;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  // Admin bypass: skip domain check, always route to AdminDashboard.
  if (adminEmail && user.email === adminEmail) {
    setUser(user);
    setError(null);
    cleanAuthCallbackUrl();
    setRole("admin");
    return;
  }

  if (!user.email?.endsWith("@ub.edu.ph")) {
    await supabase.auth.signOut();
    setError("Access Denied: Use your official UB email.");
    setUser(null);
    setRole(null);
    return;
  }

  setUser(user);
  setError(null);
  cleanAuthCallbackUrl();

  const role = await resolveRole(user);
  setRole(role);
}


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (cancelled) return;

        if (!session?.user) {
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        const sessionUser = session.user;
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

        // Admin bypass: skip domain check, always route to AdminDashboard.
        if (adminEmail && sessionUser.email === adminEmail) {
          setUser(sessionUser);
          setError(null);
          cleanAuthCallbackUrl();
          setLoading(false);
          setRole("admin");
          return;
        }

        if (!sessionUser.email?.endsWith("@ub.edu.ph")) {
          await supabase.auth.signOut();
          if (cancelled) return;
          setError("Access Denied: Use your official UB email.");
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        setUser(sessionUser);
        setError(null);
        cleanAuthCallbackUrl();
        setLoading(false);

        resolveRole(sessionUser)
          .then((r) => { if (!cancelled) setRole(r); })
          .catch((err) => console.error("Role fetch failed:", err));
      } catch (err) {
        console.error("Auth initialization error:", err);
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          setRole(null);
          setError(null);
          return;
        }
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
          // Defer async work — running awaits inside this callback can deadlock
          // the Supabase auth client lock (other queries hang indefinitely).
          setTimeout(() => {
            applySession(session, { setUser, setRole, setError })
              .catch((err) => {
                console.error("Auth state change error:", err);
                setError(err.message);
              });
          }, 0);
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    // Clear local state first so the UI returns to the landing page immediately,
    // even if the network signOut call is slow or fails.
    setUser(null);
    setRole(null);
    setError(null);
    cleanAuthCallbackUrl();
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
  };

  const value = {
    user,
    role,
    loading,
    error,
    logout,
    getToken,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
