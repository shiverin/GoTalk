// In a section component, e.g., PostsSection.jsx
import React, { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="p-6 bg-gray-50 w-full max-w-[1200px] mx-auto">
      <h2>For Gooning</h2>
      <div className="flex flex-col flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded shadow">
            <h3>{post.title}</h3>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
