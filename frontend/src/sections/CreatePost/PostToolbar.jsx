export default function PostToolbar() {
  const buttons = [
    "Bold", "Italic", "Strikethrough",
    "Link", "Image", "Video",
    "Bullet List", "Number List",
    "Code Block", "Quote"
  ];

  return (
    <div className="flex flex-wrap gap-2 border rounded p-2 text-sm bg-gray-50">
      {buttons.map(b => (
        <button key={b} className="px-2 py-1 hover:bg-gray-200 rounded">
          {b}
        </button>
      ))}
    </div>
  );
}
