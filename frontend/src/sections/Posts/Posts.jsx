import React from "react";
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

// Helper to get a random icon based on community id
const randomIconUrl = (seed) => `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;

export default function Posts({ posts = [] }) {
  return (
    <section className="bg-white max-w-[1200px] min-h-[2000px] p-0">
      <div className="flex flex-col gap-0">
        {posts.map((p) => {
          const post = p.post;
          const community = p.community;
          const comments = p.comments || [];

          return (
            <div className="border-y px-4" >
            <Post
              key={post.id}
              title={post.title}
              subreddit={community?.name || "Unknown"}
              subredditIcon={randomIconUrl(community?.id)}
              author={p.author || "Unknown"}
              timeAgo={getTimeAgo(post.createdAt)}
              score={post.score ?? 0}
              comments={comments.length}
              link={`/posts/${post.id}`}
              clink={`/communities/${post.communityId}`}
            />
            </div>
          );
        })}
      </div>
    </section>
  );
}
