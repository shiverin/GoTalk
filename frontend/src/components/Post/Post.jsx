// Post.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function Post({
  title,
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
    <article className="w-full my-2 p-4 bg-neutral-50 rounded-md shadow hover:bg-neutral-100 cursor-pointer">
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

      {/* Author / Score / Comments */}
      <div className="flex items-center text-sm text-gray-500">
        <span>Posted by {author}</span>
        <span className="mx-2">•</span>
        <span>{score} points</span>
        <span className="mx-2">•</span>
        <span>{comments} comments</span>
      </div>
    </article>
  );
}
