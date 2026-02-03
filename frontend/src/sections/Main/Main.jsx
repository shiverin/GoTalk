import React, { useState, useEffect } from "react";
import Content from "../Content/Content.jsx";
import CardSlides from "../CardSlides/CardSlides.jsx";
import { API_BASE_URL } from "../../utils/api";

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState("Top");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data || []); // Handle null response
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoadingPosts(false);
      }
    }

    fetchPosts();
  }, []);

  // Perform sorting here before giving posts to Content
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "Top") {
      return b.score - a.score;
    }

    if (sortOption === "New") {
      return new Date(b.post.createdAt) - new Date(a.post.createdAt);
    }

    if (sortOption === "Best") {
      return b.commentsCount - a.commentsCount;
    }

    return 0;
  });

  return (
    <div className="h-full pl-16 pr-16">
      <CardSlides />

      {/* Pass sorted posts + sorting controls */}
      <Content
        posts={sortedPosts}
        loading={loadingPosts}
        error={error}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
}
