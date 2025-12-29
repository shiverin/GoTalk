import React from "react";

export default function PostEditor({ postType, title, content, link, onChangeTitle, onChangeContent, onChangeLink }) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {postType === "text" && (
        <textarea
          placeholder="Your post content..."
          value={content}
          onChange={e => onChangeContent(e.target.value)}
          className="border p-2 rounded w-full h-32"
        />
      )}

      {postType === "link" && (
        <input
          type="text"
          placeholder="Paste your link here..."
          value={link}
          onChange={e => onChangeLink(e.target.value)}
          className="border p-2 rounded w-full"
        />
      )}
    </div>
  );
}
