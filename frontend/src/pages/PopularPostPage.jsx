import React, { useState, useEffect } from "react";
import Layout from "./Layout.jsx";
import Content from "../sections/Content/Content.jsx";

export default function PopularPostPage({ onLoginClick }) {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("top"); // "top" = upvotes, "new" = newest

    useEffect(() => {
    async function fetchPosts() {
        try {
        const res = await fetch("http://localhost:8080/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();

        setPosts(data); // keep unsorted, sort dynamically later
        } catch (err) {
        console.error(err);
        setError("Failed to load posts");
        } finally {
        setLoadingPosts(false);
        }
    }

    fetchPosts();
    }, []);


    const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "top") return b.score - a.score; // lowercase
    if (sortOption === "new") return new Date(b.createdAt) - new Date(a.createdAt); // lowercase
    return 0;
    });

  return (
    <Layout onLoginClick={onLoginClick}>
      <div className="h-full pl-16 pr-16">
        <Content
          posts={sortedPosts}
          loading={loadingPosts}
          error={error}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
    </Layout>
  );
}
