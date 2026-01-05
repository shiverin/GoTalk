import React, { useEffect, useState } from "react";
import Layout from "./Layout.jsx";
import CommunityList from "../sections/Community/CommunityList";

export default function CommunityListPage({ onLoginClick }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all communities from backend
  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("http://localhost:8080/api/communities");
        if (!res.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await res.json();
        setCommunities(data); // assuming backend returns array
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
