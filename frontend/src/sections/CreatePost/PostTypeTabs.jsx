export default function PostTypeTabs() {
  return (
    <div className="mb-4 border-b flex gap-4 text-sm">
      <button className="py-2 px-3 border-b-2 border-blue-600 font-semibold">
        Text
      </button>
      <button className="py-2 px-3 text-gray-600">Images & Video</button>
      <button className="py-2 px-3 text-gray-600">Link</button>
      <button className="py-2 px-3 text-gray-600">Poll</button>
    </div>
  );
}
