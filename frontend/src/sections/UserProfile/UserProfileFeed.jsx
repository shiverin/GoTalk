import React from "react";
import Post from "../../components/Post/Post.jsx";
import CommentItem from "../PostSection/CommentItem.jsx";

const randomIconUrl = (seed) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}`;

export default function UserProfileFeed({ mergedFeed, user, timeAgo, onDelete }) {
  return (
    <div>
      {mergedFeed.map((item) => {
        if (item.type === "post") {
          const p = item.data;
          const post = p.post;
          const community = p.community;
          const comments = p.comments || [];

          return (
            <div className="border-y px-0" key={`post-${post.id}`}>
              <Post
                title={post.title}
                content={post.content}
                subreddit={community?.name || "Unknown"}
                subredditIcon={randomIconUrl(community?.id)}
                author={p.author || "Unknown"}
                timeAgo={timeAgo(post.createdAt)}
                score={post.score ?? 0}
                comments={comments.length}
                link={`/posts/${post.id}`}
                clink={`/communities/${post.communityId}`}
                plink={post.link}
                postId={post.id}
              />
            </div>
          );
        }

        if (item.type === "comment") {
          return (
            <div className="border-y px-4 py-1" key={`comment-${item.id}`}>
              <CommentItem
                comment={item.data}
                timeAgo={timeAgo}
                user={user}
                onDelete={onDelete}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
