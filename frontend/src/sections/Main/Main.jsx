import React, { useState, useEffect } from "react";
import Content from "../Content/Content.jsx";
import CardSlides from "../CardSlides/CardSlides.jsx";

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:8080/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts");
      } finally {
        setLoadingPosts(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="h-full pl-16 pr-16">
      <div className="">
        <CardSlides />
        <Content posts={posts} loading={loadingPosts} error={error} />
      </div>
    </div>
  );
}
