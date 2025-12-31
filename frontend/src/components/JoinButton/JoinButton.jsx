import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";

export default function JoinButton({ communityId }) {
  const { user } = useAuth(); // Access logged-in user & token
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  // Fetch membership status if user is logged in
  useEffect(() => {
    if (!user || !token) {
      setJoined(false);
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/communities/${communityId}/joined`, {
      headers: { Authorization: `Bearer ${token}` },
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
  }, [communityId, user, token]);

  // Join or leave community
  const toggleJoin = async () => {
    if (!user || !token) {
      alert("Please log in to join a community.");
      return;
    }

    const url = joined
      ? `http://localhost:8080/api/communities/${communityId}/leave`
      : `http://localhost:8080/api/communities/${communityId}/join`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to update membership");
      setJoined(!joined);
    } catch (err) {
      console.error("Join/Leave error:", err);
      alert("Something went wrong. Please try again.");
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
