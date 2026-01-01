import React from "react";

export default function PostActions({ onSubmit, onDelete, isEdit }) {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <button
        onClick={onSubmit}
        className="bg-[#0B449B] text-white px-4 py-2 rounded-full hover:bg-[#0A2F6C"
      >
        {isEdit ? "Update Post" : "Post"}
      </button>
      {isEdit && onDelete && (
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
        >
          Delete Post
        </button>
      )}
    </div>
  );
}
