import React from "react";

export default function PostEditor({ postType, title, content, link, onChangeTitle, onChangeContent, onChangeLink }) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
        className="border p-2 rounded-2xl w-full"
      />

      {postType === "text" && (
        <textarea
          placeholder="Body text (optional)"
          value={content}
          onChange={e => onChangeContent(e.target.value)}
          className="border p-2 rounded-2xl w-full h-32"
        />
      )}

      {postType === "link" && (
        <input
          type="text"
          placeholder="Link URL"
          value={link}
          onChange={e => onChangeLink(e.target.value)}
          className="border p-2 rounded-2xl w-full"
        />
      )}
    </div>
  );
}
