import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";

// Helper to convert timestamp to "time ago"
function getTimeAgo(timestamp) {
  const created = new Date(timestamp);
  const now = new Date();
  const diffMs = now - created;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-white max-w-[1200px] min-h-[2000px] p-4">
      <div className="flex flex-col gap-4">
        {posts.map((p) => {
          const post = p.post;
          const community = p.community;
          const comments = p.comments || [];

          return (
            <Post
              key={post.id}
              title={post.title}
              subreddit={community?.name || "Unknown"}
              subredditIcon={community?.icon || ""}
              author={p.author || "Unknown"}
              timeAgo={getTimeAgo(post.createdAt)}
              score={post.score ?? 0}
              comments={comments.length}
              link={post.link || "posts/"+post.id}
            />
          );
        })}
      </div>
    </section>
  );
}
