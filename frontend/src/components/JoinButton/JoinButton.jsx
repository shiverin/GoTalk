import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { API_BASE_URL } from "../../utils/api";

export default function JoinButton({ communityId }) {
  const { user } = useAuth();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch membership status (cookie-based auth)
  useEffect(() => {
    if (!user) {
      setJoined(false);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/communities/${communityId}/joined`, {
      credentials: "include",          // <-- IMPORTANT
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch membership");
        return res.json();
      })
      .then((data) => setJoined(data.joined))
      .catch((err) => {
        console.error("Membership fetch error:", err);
        setJoined(false);
      })
      .finally(() => setLoading(false));
  }, [communityId, user]);

  // Join / Leave
  const toggleJoin = async () => {
    if (!user) {
      alert("Please log in to join a community.");
      return;
    }

    const url = joined
      ? `${API_BASE_URL}/api/communities/${communityId}/leave`
      : `${API_BASE_URL}/api/communities/${communityId}/join`;

    try {
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",         // <-- sends HttpOnly cookie
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      const msg = errData?.error || "Failed to update membership";
      alert(msg);
      throw new Error(msg);
    }
      setJoined((prev) => !prev);
    } catch (err) {
      console.error("Join/Leave error:", err);
    }
  };

  return (
    <button
      onClick={toggleJoin}
      disabled={loading}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        joined
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-[#0B449B] text-white hover:bg-[#0A2F6C]"
      }`}
    >
      {loading ? "Loading..." : joined ? "Joined" : "Join"}
    </button>
  );
}
