import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from token on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = decodeToken(token);
    if (!decoded || !decoded.user_id) return;

    // Fetch user profile from backend
    fetch(`http://localhost:8080/api/users/${decoded.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.id,
          username: data.username,
        });
      })
      .catch((err) => console.error("Failed to load user:", err));
  }, []);

  // Login handling
  const login = ({ token }) => {
    localStorage.setItem("token", token);

    const decoded = decodeToken(token);
    if (!decoded || !decoded.user_id) return;

    fetch(`http://localhost:8080/api/users/${decoded.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.id,
          username: data.username,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
