import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import CommunitySection from "../sections/Community/CommunitySection";

export default function CommunityPage({ onLoginClick }) {
  const { id } = useParams(); // community ID from URL
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/communities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch community");
        return res.json();
      })
      .then((data) => setCommunity(data))
      .catch((err) => console.error("Community fetch error:", err));
  }, [id]);

  if (!community) return <div>Loading community...</div>;

  return (
    <Layout onLoginClick={onLoginClick} communityId={id}>
      <CommunitySection community={community} />
    </Layout>
  );
}
