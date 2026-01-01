// Post.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import PostInteractionBar from "../../sections/PostSection/PostInteractionBar";

export default function Post({
  title,
  content,
  subreddit,
  subredditIcon,
  author,
  timeAgo,
  score,
  comments,
  link,
  clink,
}) {
  return (
    <article className="w-full my-1 px-4 py-1 rounded-xl hover:bg-neutral-100 cursor-pointer">
      {/* Subreddit info */}
      <div className="flex items-center mb-2">
        <img
          src={subredditIcon}
          alt={`${subreddit} icon`}
          className="w-6 h-6 rounded-full mr-2"
        />
        {/* Community */}
        <Link to={clink} className="font-semibold text-gray-900 text-sm hover:underline">
          {subreddit}
        </Link>        
        <span className="text-gray-400 mx-1">•</span>
        <span className="text-gray-500 text-sm">{timeAgo}</span>
      </div>

      {/* Title */}
      <Link to={link} className="block font-semibold text-gray-900 text-lg mb-2 hover:underline">
        {title}
      </Link>
      {/* Post content */}
      <p className="text-base leading-relaxed mb-6">{content}</p>
      <PostInteractionBar score={score} comments={comments} />

      {/* Author / Score / Comments
      <div className="flex items-center text-sm text-gray-500">
        <span>Posted by {author}</span>
        <span className="mx-2">•</span>
        <span>{score} points</span>
        <span className="mx-2">•</span>
        <span>{comments} comments</span>
      </div> */}
    </article>
  );
}
