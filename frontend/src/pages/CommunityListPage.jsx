import React, { useEffect, useState } from "react";
import Layout from "./Layout.jsx";
import CommunityList from "../sections/Community/CommunityList";
import { API_BASE_URL } from "../utils/api";

export default function CommunityListPage({ onLoginClick }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all communities from backend
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/communities`);
        if (!res.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await res.json();
        setCommunities(data || []); // Handle null response
      } catch (err) {
        console.error("Error fetching communities:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);

  return (
    <Layout onLoginClick={onLoginClick}>
      {loading ? (
        <div className="pt-20 text-center">Loading...</div>
      ) : (
        <CommunityList communities={communities} />
      )}
    </Layout>
  );
}
