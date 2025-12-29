import React from "react";

export default function PostActions({ onSubmit, onDelete, isEdit }) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEdit ? "Update Post" : "Create Post"}
      </button>
      {isEdit && onDelete && (
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Post
        </button>
      )}
    </div>
  );
}
