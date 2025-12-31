import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout.jsx";
import CommunitySection from "../sections/Community/CommunitySection";

export default function CommunityPage({ onLoginClick }) {
  const { id } = useParams(); // community ID from URL
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingCommunity, setLoadingCommunity] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch community info
  useEffect(() => {
    if (!id) return;

    setLoadingCommunity(true);
    fetch(`http://localhost:8080/api/communities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch community");
        return res.json();
      })
      .then((data) => setCommunity(data))
      .catch((err) => console.error("Community fetch error:", err))
      .finally(() => setLoadingCommunity(false));
  }, [id]);

  // Fetch posts within this community
  useEffect(() => {
    if (!id) return;

    setLoadingPosts(true);
    fetch(`http://localhost:8080/api/communities/${id}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => console.error("Posts fetch error:", err))
      .finally(() => setLoadingPosts(false));
  }, [id]);

  if (loadingCommunity) return <div>Loading community...</div>;

  return (
    <Layout onLoginClick={onLoginClick} communityId={id}>
      <CommunitySection
        community={community}
        posts={posts}
        loadingPosts={loadingPosts}
      />
    </Layout>
  );
}
