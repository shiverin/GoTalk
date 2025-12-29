import PostToolbar from "./PostToolbar.jsx";

export default function PostEditor() {
  return (
    <div className="mb-4">
      {/* Title */}
      <input
        className="w-full border rounded p-2 text-lg mb-3"
        placeholder="Title"
      />

      {/* Body Editor */}
      <PostToolbar />

      <textarea
        className="w-full border rounded p-2 mt-2 min-h-[180px]"
        placeholder="Body text (optional)"
      />
    </div>
  );
}
