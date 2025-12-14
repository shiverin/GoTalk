// PostsSection.jsx
import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className=" bg-white max-w-[1200px] h-[2000px]">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            subreddit={post.subreddit.name}
            subredditIcon={post.subreddit.icon}
            author={post.author}
            timeAgo={post.timeAgo} // or generate from createdAt if needed
            score={post.score}
            comments={post.commentsCount}
            link={post.link}
          />
        ))}
      </div>
    </section>
  );
}
