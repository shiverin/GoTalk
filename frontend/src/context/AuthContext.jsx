import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401) {
          // User is not logged in - this is normal for new users
          setUser(null);
        } else {
          console.error("Unexpected error checking session:", res.status);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        // Network error - user is not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  // login API call
  const login = async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // logout API call
  const logout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
