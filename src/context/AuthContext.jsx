import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Check domain
          if (!session.user.email.endsWith("@ub.edu.ph")) {
            await supabase.auth.signOut();
            setError("Access Denied: Use your official UB email.");
            setUser(null);
            setLoading(false);
            return;
          }

          // Fetch role from database
          const { data, error: fetchError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error fetching role:", fetchError);
          }

          setRole(data?.role || "student");
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth state changes (including OAuth redirects)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === "SIGNED_IN" && session?.user) {
            const user = session.user;

            // Check domain
            if (!user.email.endsWith("@ub.edu.ph")) {
              await supabase.auth.signOut();
              setError("Access Denied: Use your official UB email.");
              setUser(null);
              setRole(null);
              return;
            }

            setUser(user);
            setError(null);

            // Try to get role from URL params (passed from sign-in flow)
            const params = new URLSearchParams(window.location.search);
            const urlRole = params.get("state");
            const storedRole = window.localStorage.getItem("auth_role");

            // Try to get role from database or use from URL/local storage
            const { data, error: fetchError } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", user.id)
              .single();

            if (fetchError && fetchError.code !== "PGRST116") {
              console.error("Error fetching role:", fetchError);
            }

            let userRole = data?.role || urlRole || storedRole || "student";

            // Save role to database if it's new
            if (urlRole || storedRole || !data) {
              await supabase.from("profiles").upsert(
                {
                  id: user.id,
                  email: user.email,
                  role: userRole,
                  updated_at: new Date().toISOString(),
                },
                { onConflict: "id" }
              );
              window.localStorage.removeItem("auth_role");
            }

            setRole(userRole);
          } else if (event === "SIGNED_OUT") {
            setUser(null);
            setRole(null);
            setError(null);
          }
        } catch (err) {
          console.error("Auth state change error:", err);
          setError(err.message);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      setError(null);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    }
  };

  // Get auth token
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